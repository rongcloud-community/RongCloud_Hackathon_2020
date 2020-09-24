package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

// TODO: Add Role in accounts database

func register(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)

	checkErr(err)
	defer db.Close()

	db, err = createUserTable(db, err)
	checkErr(err)

	var requestBody userForm
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	checkErr(err)

	db, err = addNewUser(db, err, &requestBody)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"status": "success", "statusText": "Registration successful."})
	}
}

func homepage(w http.ResponseWriter, r *http.Request) {
	fmt.Println("index")
	fmt.Fprintf(w, "This is my personal backend.")
}

func createUserTable(db *sql.DB, err error) (*sql.DB, error) {
	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS accounts(
		id SERIAL PRIMARY KEY,
		userID varchar(64) UNIQUE NOT NULL,
		nickname varchar(128) NOT NULL,
		portraitURI varchar(1024) NOT NULL,
		password varchar(64) NOT NULL,
		token varchar(256) UNIQUE NOT NULL,
		created date NOT NULL
		)`)
	checkErr(err)
	_, err = crt.Exec()
	return db, err
}

func addNewUser(db *sql.DB, err error, data *userForm) (*sql.DB, error) {
	if theUser, err := db.Query(fmt.Sprintf(`SELECT userID FROM accounts WHERE userID='%s';`, data.UserID)); err == nil {
		theUser.Next()
		var userNow userDB
		if theUser.Scan(&userNow.UserID); userNow.UserID != "" {
			return db, fmt.Errorf(`userID %s already in use`, data.UserID)
		}
		return db, err
	}

	result := registerAPI(data)
	newUser, err := db.Prepare(`INSERT INTO accounts(userID, nickname, portraitURI, password, created, token) VALUES($1, $2, $3, $4, $5, $6);`)
	checkErr(err)
	password, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
	checkErr(err)
	_, err = newUser.Exec(data.UserID, data.Nickname, data.PortraitURI, password, time.Now(), result.Token)
	return db, err
}
