package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

// TODO: Add Role in accounts database

func userInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db, session, remote, err := sessionInfoAndTrueRemote(r)
	checkErr(err)

	var curUser userDB

	if remote == session.remote {
		userQuery, err := db.Query(fmt.Sprintf(`SELECT userid, nickname, portraituri, token, isAdmin FROM accounts WHERE userid='%s';`, session.userinDB))
		checkErr(err)
		userQuery.Next()
		userQuery.Scan(&curUser.UserID, &curUser.Nickname, &curUser.PortraitURI, &curUser.Token, &curUser.isAdmin)
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "userInfo": map[string]interface{}{"userID": curUser.UserID, "nickname": curUser.Nickname, "portraitUri": curUser.PortraitURI, "token": curUser.Token, "isAdmin": curUser.isAdmin}})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"status": "failure"})
	}

	db.Close()
}

func changeUserInfoSelf(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var userCur userDB
	json.NewDecoder(r.Body).Decode(&userCur)
	res := changeSelfInfoAPI(&userCur)

	if res.Code == 200 {
		db, err := sql.Open("postgres", psqlInfo)
		checkErr(err)
		if userCur.PortraitURI != "" {
			_, err = db.Exec(fmt.Sprintf(`UPDATE accounts SET nickname='%s', portraituri='%s' WHERE userid='%s';`, userCur.Nickname, userCur.PortraitURI, userCur.UserID))
		} else {
			_, err = db.Exec(fmt.Sprintf(`UPDATE accounts SET nickname='%s' WHERE userid='%s';`, userCur.Nickname, userCur.UserID))
		}
		if err != nil {
			json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
			panic(err)
		} else {
			json.NewEncoder(w).Encode(map[string]string{"status": "success"})
		}
	} else {
		json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
	}
}

// TODO: Change User Info for self and admin
// func changeUserInfoOther(w http.ResponseWriter, r *http.Request) {
// 	var userCur userDB
// 	json.NewDecoder(r.Body).Decode(&userCur)
// }

// func userList(w http.Response, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// }

func sessionInfoAndTrueRemote(r *http.Request) (db *sql.DB, session userSession, remote string, err error) {
	sessionID, _ := r.Cookie("SESSIONID")
	db, err = sql.Open("postgres", psqlInfo)
	checkErr(err)

	sessionQuery, err := db.Query(fmt.Sprintf(`SELECT sessionid, userinDB, remote FROM sessions WHERE sessionid='%s';`, sessionID.Value))
	checkErr(err)
	sessionQuery.Next()
	sessionQuery.Scan(&session.sessionID, &session.userinDB, &session.remote)

	if xFor := r.Header.Get("X-FORWARDED-FOR"); xFor != "" {
		remote = xFor
	} else {
		remote = strings.Split(r.RemoteAddr, ":")[0]
	}

	return
}
