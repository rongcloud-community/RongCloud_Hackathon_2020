package main

import (
	"encoding/json"
	"net/http"
	"time"
)

func login(w http.ResponseWriter, r *http.Request) {
	var requestBody userDB
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	checkErr(err)

	err = requestBody.userLogin(w, r)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "statusText": "Login successful."})
	}
}

func logout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{Name: "SESSIONID", Value: "invalid", Expires: time.Now(), Path: "/"})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "statusText": "Logout successful."})
}

func createSessionTable() error {
	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS sessions (
		sessionID varchar(128) UNIQUE PRIMARY KEY,
		userinDB varchar(64) NOT NULL,
		expiration date,
		remote inet NOT NULL
	)`)
	if err != nil {
		return err
	}
	_, err = crt.Exec()
	return err
}
