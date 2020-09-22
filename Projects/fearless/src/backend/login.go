package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func login(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)

	checkErr(err)
	defer db.Close()

	var requestBody loginForm
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	checkErr(err)

	db, curUser, err := userLogin(db, err, &requestBody, w, r)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "statusText": "Login successful.", "userInfo": map[string]string{"token": curUser.Token, "name": curUser.Nickname, "userID": curUser.UserID, "portraitURI": curUser.PortraitURI}})
	}
}

func userLogin(db *sql.DB, err error, data *loginForm, w http.ResponseWriter, r *http.Request) (*sql.DB, userDB, error) {
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
		db, err = createSessionTable(db, err)
		db, session, err := addToSessionTable(db, err, r, &currentUser)
		http.SetCookie(w, &http.Cookie{Name: "SESSIONID", Value: session, Expires: time.Now().Add(24 * time.Hour), Path: "/"})
		return db, currentUser, err
	}
	return db, currentUser, errors.New("password not matched")
}

func createSessionTable(db *sql.DB, err error) (*sql.DB, error) {
	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS sessions (
		sessionID varchar(128) UNIQUE PRIMARY KEY,
		userinDB varchar(64) NOT NULL,
		expiration date,
		remote inet NOT NULL
	)`)
	if err != nil {
		return db, err
	}
	_, err = crt.Exec()
	return db, err
}

func addToSessionTable(db *sql.DB, err error, r *http.Request, user *userDB) (*sql.DB, string, error) {
	newS, err := db.Prepare(`INSERT INTO sessions (sessionID, userinDB, expiration, remote) VALUES ($1, $2, $3, $4);`)
	if err != nil {
		return db, "", err
	}
	var remote string
	if theRem := r.Header.Get("X-FORWARDED-FOR"); theRem != "" {
		remote = theRem
	} else {
		remote = strings.Split(r.RemoteAddr, ":")[0]
	}
	userID, expiration := user.UserID, time.Now().Add(24*time.Hour)
	session := uuid.New().String()
	_, err = newS.Exec(session, userID, expiration, remote)
	return db, session, err
}
