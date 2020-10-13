package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"time"
)

func login(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)

	checkErr(err)

	var requestBody userDB
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	checkErr(err)

	err = requestBody.userLogin(db, w, r)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "statusText": "Login successful."})
	}
	db.Close()
}

func logout(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)
	checkErr(err)

	http.SetCookie(w, &http.Cookie{Name: "SESSIONID", Value: "invalid", Expires: time.Now(), Path: "/"})

	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "statusText": "Logout successful."})
	}
	db.Close()
}

func createSessionTable(db *sql.DB) error {
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
