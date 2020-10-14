package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
)

func sendMessage(w http.ResponseWriter, r *http.Request) {
	err := createMessageTable()
	checkErr(err)
	mes := message{}
	json.NewDecoder(r.Body).Decode(&mes)
	err = mes.send()
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
	}
}

func readMessage(w http.ResponseWriter, r *http.Request) {
	err := createMessageTable()
	checkErr(err)
	mes := message{}
	json.NewDecoder(r.Body).Decode(&mes)
	err = mes.read()
	checkErr(err)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
}

func recallMessage(w http.ResponseWriter, r *http.Request) {
	mes := message{}
	json.NewDecoder(r.Body).Decode(&mes)
	err := mes.recall()
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "error", "errorText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
	}
}

func editMessage(w http.ResponseWriter, r *http.Request) {
	mes := message{}
	json.NewDecoder(r.Body).Decode(&mes)
	err := mes.edit()
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "error", "errorText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
	}
}

func readConversation(w http.ResponseWriter, r *http.Request) {
	session := userSession{}
	err := session.getSessionFromRequest(r)
	checkErr(err)
	conv := conversation{}
	json.NewDecoder(r.Body).Decode(&conv)
	conv.SenderUserID = session.userinDB
	conv.read()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
}

func conversationUpdate(w http.ResponseWriter, r *http.Request) {
	err := createConversationTable()
	checkErr(err)
	session := userSession{}
	err = session.getSessionFromRequest(r)
	checkErr(err)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var cons []conversation
		json.NewDecoder(r.Body).Decode(&cons)
		for _, con := range cons {
			con.SenderUserID = session.userinDB
			err = con.update()
			checkErr(err)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success"})
	}
}

func conversationGet(w http.ResponseWriter, r *http.Request) {
	err := createConversationTable()
	checkErr(err)
	session := userSession{}
	err = session.getSessionFromRequest(r)
	checkErr(err)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var (
			finalCons        []map[string]interface{}
			finalTargetInfos map[string]interface{} = make(map[string]interface{})
		)
		queryRes, err := db.Query(`SELECT UnreadMessageCount, LatestMessage, TargetID, HasMentiond, MentiondInfo, LastUnreadTime, NotificationStatus, IsTop, Type, HasMentioned, MentionedInfo FROM conversation WHERE SenderUserID=$1 ORDER BY UpdateTime DESC;`, session.userinDB)
		checkErr(err)
		for queryRes.Next() {
			conCur := conversation{}
			var latestMessage, mentiondInfo, mentionedInfo string
			queryRes.Scan(&conCur.UnreadMessageCount, &latestMessage, &conCur.TargetID, &conCur.HasMentiond, &mentiondInfo, &conCur.LastUnreadTime, &conCur.NotificationStatus, &conCur.IsTop, &conCur.Type, &conCur.HasMentioned, &mentionedInfo)
			err = json.Unmarshal([]byte(latestMessage), &conCur.LatestMessage)
			checkErr(err)
			finalLatestMessage := map[string]interface{}{"type": conCur.LatestMessage.Type, "targetId": conCur.LatestMessage.TargetID, "messageType": conCur.LatestMessage.MessageType, "messageUId": conCur.LatestMessage.MessageUID, "isPersited": conCur.LatestMessage.IsPersited, "isCounted": conCur.LatestMessage.IsCounted, "isStatusMessage": conCur.LatestMessage.IsStatusMessage, "senderUserId": conCur.LatestMessage.SenderUserID, "content": map[string]string{"content": conCur.LatestMessage.Content.Content}, "sentTime": conCur.LatestMessage.SentTime, "receivedTime": conCur.LatestMessage.ReceivedTime, "messageDirection": conCur.LatestMessage.MessageDirection, "isOffLineMessage": conCur.LatestMessage.IsOffLineMessage, "disableNotification": conCur.LatestMessage.DisableNotification, "canIncludeExpansion": conCur.LatestMessage.CanIncludeExpansion, "expansion": conCur.LatestMessage.Expansion}
			err = json.Unmarshal([]byte(mentiondInfo), &conCur.MentiondInfo)
			checkErr(err)
			finalMentiondInfo := map[string]interface{}{"type": conCur.MentiondInfo.Type, "userIdList": conCur.MentiondInfo.UserIDList}
			err = json.Unmarshal([]byte(mentionedInfo), &conCur.MentionedInfo)
			checkErr(err)
			finalMentionedInfo := map[string]interface{}{"type": conCur.MentionedInfo.Type, "userIdList": conCur.MentionedInfo.UserIDList}
			finalCon := map[string]interface{}{"unreadMessageCount": conCur.UnreadMessageCount, "latestMessage": finalLatestMessage, "targetId": conCur.TargetID, "hasMentiond": conCur.HasMentiond, "mentiondInfo": finalMentiondInfo, "lastUnreadTime": conCur.LastUnreadTime, "notificationStatus": conCur.NotificationStatus, "isTop": conCur.IsTop, "type": conCur.Type, "hasMentioned": conCur.HasMentioned, "mentionedInfo": finalMentionedInfo}
			finalCons = append(finalCons, finalCon)

			finalTargetInfo := userDB{}
			finalTargetInfo.UserID = conCur.TargetID
			err = finalTargetInfo.queryUserDB()
			checkErr(err)
			curRelation := userRelation{}
			curRelation.SubjectID, curRelation.ObjectID = session.userinDB, conCur.TargetID
			err = curRelation.query()
			finalTargetInfos[conCur.TargetID] = map[string]interface{}{"portraitUri": finalTargetInfo.PortraitURI, "nickname": finalTargetInfo.Nickname, "relation": curRelation.Relation}
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "conversations": finalCons, "targetInfos": finalTargetInfos})
	}
}

func conversationMessagesGet(w http.ResponseWriter, r *http.Request) {
	var conversationCur conversation
	json.NewDecoder(r.Body).Decode(&conversationCur)
	err := conversationCur.queryMessages(r)
	checkErr(err)
	log.Output(1, fmt.Sprintf(`Connection number now: %d, inuse: %d, idle: %d`, db.Stats().OpenConnections, db.Stats().InUse, db.Stats().Idle))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "messages": conversationCur.Messages})
}

func uploadFile(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(1 << 20)

	file, handler, err := r.FormFile("file")
	checkErr(err)
	defer file.Close()
	log.Output(1, fmt.Sprintf(`File Header: %s`, handler.Header))
	log.Output(1, fmt.Sprintf(`File Name: %s`, handler.Filename))
	log.Output(1, fmt.Sprintf(`File Size: %+v`, handler.Size))

	targetFile, err := ioutil.TempFile(uploadPath, "upload-*"+filepath.Ext(handler.Filename))
	checkErr(err)
	defer targetFile.Close()

	fileBytes, err := ioutil.ReadAll(file)
	checkErr(err)
	targetFile.Write(fileBytes)
	log.Output(1, "file upload successful")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "statusText": "File uploaded successfully", "filePath": targetFile.Name()})
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

func createConversationTable() (err error) {
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

func createMessageTable() (err error) {
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
