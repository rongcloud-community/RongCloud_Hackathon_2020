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
	sessionID, _ := r.Cookie("SESSIONID")
	w.Header().Set("Content-Type", "application/json")

	db, err := sql.Open("postgres", psqlInfo)
	checkErr(err)

	sessionQuery, err := db.Query(fmt.Sprintf(`SELECT sessionid, userinDB, remote FROM sessions WHERE sessionid='%s';`, sessionID.Value))
	checkErr(err)
	var session userSession
	sessionQuery.Next()
	sessionQuery.Scan(&session.sessionID, &session.userinDB, &session.remote)

	var remote string

	if xFor := r.Header.Get("X-FORWARDED-FOR"); xFor != "" {
		remote = xFor
	} else {
		remote = strings.Split(r.RemoteAddr, ":")[0]
	}

	var curUser userDB

	if remote == session.remote {
		userQuery, err := db.Query(fmt.Sprintf(`SELECT userid, nickname, portraituri, token FROM accounts WHERE userid='%s';`, session.userinDB))
		checkErr(err)
		userQuery.Next()
		userQuery.Scan(&curUser.UserID, &curUser.Nickname, &curUser.PortraitURI, &curUser.Token)
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "userInfo": map[string]string{"userID": curUser.UserID, "nickname": curUser.Nickname, "portraitURI": curUser.PortraitURI, "token": curUser.Token}})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"status": "failure"})
	}

	db.Close()
}
