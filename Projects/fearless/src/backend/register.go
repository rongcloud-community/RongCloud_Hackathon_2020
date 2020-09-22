package main

import (
	"crypto/sha1"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"math/rand"
	"net/http"
	"net/url"
	"strings"
	"time"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

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
		if strings.Contains(err.Error(), "duplicate") && strings.Contains(err.Error(), "userid") {
			json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "userID already in use"})
		} else {
			json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
		}
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
	client := &http.Client{}
	rand.Seed(64)

	nonce, timestamp := fmt.Sprintf("%d", uint(rand.Float64()*math.Pow10(19))), fmt.Sprintf("%d", uint(time.Now().Unix()))
	sig := fmt.Sprintf("%x", sha1.Sum([]byte(appSec+nonce+timestamp)))
	theData := url.Values{}
	theData.Set("userId", data.UserID)
	theData.Set("name", data.Nickname)
	theData.Set("portraitURI", data.PortraitURI)
	req, _ := http.NewRequest("POST", rongURI+"/user/getToken.json", strings.NewReader(theData.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("App-Key", appKey)
	req.Header.Set("Nonce", nonce)
	req.Header.Set("Timestamp", timestamp)
	req.Header.Set("Signature", sig)
	resp, err := client.Do(req)
	checkErr(err)
	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err)
	var result userRes
	err = json.Unmarshal(body, &result)
	checkErr(err)
	newUser, err := db.Prepare(`INSERT INTO accounts(userID, nickname, portraitURI, password, created, token) VALUES($1, $2, $3, $4, $5, $6);`)
	checkErr(err)
	password, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
	checkErr(err)
	_, err = newUser.Exec(data.UserID, data.Nickname, data.PortraitURI, password, time.Now(), result.Token)
	return db, err
}
