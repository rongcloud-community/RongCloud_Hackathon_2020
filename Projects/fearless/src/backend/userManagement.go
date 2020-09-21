package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"time"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type userForm struct {
	UserID      string
	Nickname    string
	Password    string
	PortraitURI string
}

type loginForm struct {
	UserID   string
	Password string
}

const (
	host   = "localhost"
	port   = 5432
	user   = "postgres"
	dbname = "RongCloudTest"
)

var psqlInfo string = fmt.Sprintf("host=%s port=%d user=%s "+
	"dbname=%s sslmode=disable",
	host, port, user, dbname)

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

func login(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)

	checkErr(err)
	defer db.Close()

	var requestBody loginForm
	err = json.NewDecoder(r.Body).Decode(&requestBody)
	checkErr(err)

	resp, err := http.Get("http://baidu.com")
	checkErr(err)
	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err)
	fmt.Println(string(body))

	db, err = userLogin(db, err, &requestBody)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		json.NewEncoder(w).Encode(map[string]string{"status": "success", "statusText": "Login successful."})
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
		created date NOT NULL
		)`)
	checkErr(err)
	_, err = crt.Exec()
	return db, err
}

func addNewUser(db *sql.DB, err error, data *userForm) (*sql.DB, error) {
	newUser, err := db.Prepare(`INSERT INTO accounts(userID, nickname, portraitURI, password, created) VALUES($1, $2, $3, $4, $5);`)
	checkErr(err)
	password, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)
	checkErr(err)
	_, err = newUser.Exec(data.UserID, data.Nickname, data.PortraitURI, password, time.Now())
	return db, err
}

func userLogin(db *sql.DB, err error, data *loginForm) (*sql.DB, error) {
	theUser, err := db.Query(`SELECT nickname, password, portraituri, userid FROM accounts WHERE userID='` + data.UserID + `';`)
	var currentUser userForm
	if err != nil {
		return db, err
	}
	theUser.Next()
	err = theUser.Scan(&currentUser.Nickname, &currentUser.Password, &currentUser.PortraitURI, &currentUser.UserID)
	if err != nil {
		return db, err
	}
	if bcrypt.CompareHashAndPassword([]byte(currentUser.Password), []byte(data.Password)) == nil {
		return db, err
	}
	return db, errors.New("password not matched")

}

func checkErr(err interface{}) {
	if err != nil {
		panic(err)
	}
}
