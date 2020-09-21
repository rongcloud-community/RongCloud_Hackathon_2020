package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func login(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)

	checkErr(err)
	defer db.Close()

	var requestBody loginForm
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	checkErr(err)

	db, curUser, err := userLogin(db, err, &requestBody, w)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "statusText": "Login successful.", "userInfo": map[string]string{"token": curUser.Token, "name": curUser.Nickname, "userID": curUser.UserID, "portraitURI": curUser.PortraitURI}})
	}
}

func userLogin(db *sql.DB, err error, data *loginForm, w http.ResponseWriter) (*sql.DB, userDB, error) {
	theUser, err := db.Query(`SELECT nickname, password, portraituri, userid, token FROM accounts WHERE userID='` + data.UserID + `';`)
	var currentUser userDB
	if err != nil {
		return db, currentUser, err
	}
	theUser.Next()

	if err := theUser.Scan(&currentUser.Nickname, &currentUser.Password, &currentUser.PortraitURI, &currentUser.UserID, &currentUser.Token); err != nil {
		return db, currentUser, err
	}
	if bcrypt.CompareHashAndPassword([]byte(currentUser.Password), []byte(data.Password)) == nil {
		http.SetCookie(w, &http.Cookie{Name: "Nickname", Value: currentUser.Nickname, Expires: time.Now().Add(24 * time.Hour), Path: "/"})
		http.SetCookie(w, &http.Cookie{Name: "PortraitURI", Value: currentUser.PortraitURI, Expires: time.Now().Add(24 * time.Hour), Path: "/"})
		http.SetCookie(w, &http.Cookie{Name: "UserID", Value: currentUser.UserID, Expires: time.Now().Add(24 * time.Hour), Path: "/"})
		return db, currentUser, err
	}
	return db, currentUser, errors.New("password not matched")
}

// TODO: session ID creation and store, I'll combine it with the IP
// func createSessionTable(db *sql.DB, err error) (*sql.DB, error) {
// 	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS sessions (
// 		sessionID varchar(128) UNIQUE PRIMARY KEY,
// 		userinDB SERIAL UNIQUE NOT NULL,
// 		expiration date NOT NULL
// 		)`)
// 	checkErr(err)
// 	_, err = crt.Exec()
// 	return db, err
// }
