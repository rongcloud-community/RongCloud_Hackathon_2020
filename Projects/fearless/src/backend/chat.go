package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

func sendMessage(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)
	checkErr(err)
	err = createMessageTable(db)
	checkErr(err)
	mes := message{}
	json.NewDecoder(r.Body).Decode(&mes)
	err = mes.send(db)
	checkErr(err)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
	db.Close()
}

func readMessage(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)
	checkErr(err)
	err = createMessageTable(db)
	checkErr(err)
	mes := message{}
	json.NewDecoder(r.Body).Decode(&mes)
	err = mes.read(db)
	checkErr(err)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
	db.Close()
}

func conversationUpdate(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)
	checkErr(err)
	err = createConversationTable(db)
	checkErr(err)
	session, err := sessionInfoAndTrueRemote(db, r)
	checkErr(err)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var cons []conversation
		json.NewDecoder(r.Body).Decode(&cons)
		for _, con := range cons {
			con.SenderUserID = session.userinDB
			err = con.update(db)
			checkErr(err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
	}
	db.Close()
}

func conversationGet(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)
	checkErr(err)
	err = createConversationTable(db)
	checkErr(err)
	session, err := sessionInfoAndTrueRemote(db, r)
	checkErr(err)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var finalCons []conversationRes
		queryFmt, err := db.Prepare(`SELECT UnreadMessageCount, LatestMessage, TargetID, HasMentiond, MentiondInfo, LastUnreadTime, NotificationStatus, IsTop, Type, HasMentioned, MentionedInfo FROM conversation WHERE SenderUserID=$1 ORDER BY UpdateTime DESC;`)
		checkErr(err)
		queryRes, err := queryFmt.Query(session.userinDB)
		checkErr(err)
		for queryRes.Next() {
			conCur := conversationRes{}
			queryRes.Scan(&conCur.UnreadMessageCount, &conCur.LatestMessage, &conCur.TargetID, &conCur.HasMentiond, &conCur.MentiondInfo, &conCur.LastUnreadTime, &conCur.NotificationStatus, &conCur.IsTop, &conCur.Type, &conCur.HasMentioned, &conCur.MentionedInfo)
			finalCons = append(finalCons, conCur)
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "conversations": finalCons})
	}
	db.Close()
}

// TODO: conversation model for chat messages
// {
// 	"unreadMessageCount": 0,
// 	"hasMentiond": false,
// 	"mentiondInfo": null,
// 	"lastUnreadTime": 0,
// 	"notificationStatus": 2,
// 	"isTop": false,
// 	"type": 1,
// 	"targetId": "test2",
// "latestMessage": {
//   "type": 1,
//   "targetId": "test2",
//   "messageType": "s:person",
//   "messageUId": "BKV3-S94Q-43C5-4JF0",
//   "isPersited": true,
//   "isCounted": true,
//   "isStatusMessage": false,
//   "senderUserId": "sim",
//   "content": {
// 	"content": "asdasdasdas"
//   },
//   "sentTime": 1601904874088,
//   "receivedTime": 1601904873741,
//   "messageDirection": 1,
//   "isOffLineMessage": false,
//   "disableNotification": false,
//   "canIncludeExpansion": false,
//   "expansion": null
// },
// 	"hasMentioned": false,
// 	"mentionedInfo": null
//   }

func createConversationTable(db *sql.DB) (err error) {
	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS conversation (
		id SERIAL PRIMARY KEY,
		senderUserId varchar(64) NOT NULL,
		unreadMessageCount int NOT NULL,
		hasMentiond bool NOT NULL,
		mentiondInfo json,
		lastUnreadTime bigint NOT NULL,
		notificationStatus int NOT NULL,
		isTop int NOT NULL,
		type int NOT NULL,
		targetId varchar(64) NOT NULL,
		latestMessage json,
		hasMentioned bool NOT NULL,
		mentionedInfo json,
		updateTime bigint
		)`)
	checkErr(err)
	_, err = crt.Exec()
	return err
}

// TODO: message model for chat messages
// "latestMessage": {
// 	"type": 1,
// 	"targetId": "test2",
// 	"messageType": "s:person",
// 	"messageUId": "BKV3-S94Q-43C5-4JF0",
// 	"isPersited": true,
// 	"isCounted": true,
// 	"isStatusMessage": false,
// 	"senderUserId": "sim",
// 	"content": {
// 	  "content": "asdasdasdas"
// 	},
// 	"sentTime": 1601904874088,
// 	"receivedTime": 1601904873741,
// 	"messageDirection": 1,
// 	"isOffLineMessage": false,
// 	"disableNotification": false,
// 	"canIncludeExpansion": false,
// 	"expansion": null
//   },

func createMessageTable(db *sql.DB) (err error) {
	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS message (
		id SERIAL PRIMARY KEY,
		type int NOT NULL,
		targetId varchar(64) NOT NULL,
		messageType varchar(20) NOT NULL,
		messageUId varchar(30) NOT NULL,
		isPersited bool NOT NULL,
		isCounted bool NOT NULL,
		isStatusMessage bool NOT NULL,
		senderUserId varchar(64) NOT NULL,
		content json,
		sentTime bigint NOT NULL,
		receivedTime bigint NOT NULL,
		messageDirection int NOT NULL,
		isOffLineMessage bool NOT NULL,
		disableNotification bool NOT NULL,
		canIncludeExpansion bool NOT NULL,
		expansion json
		)`)
	checkErr(err)
	_, err = crt.Exec()
	return err
}
