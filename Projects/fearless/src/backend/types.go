package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type userDB struct {
	UserID      string
	Nickname    string
	Password    string
	PortraitURI string
	Token       string
	isAdmin     bool
	code        int
}

func (user *userDB) userLogin(db *sql.DB, w http.ResponseWriter, r *http.Request) error {
	userInDB := userDB{}
	userInDB.UserID = user.UserID
	err := userInDB.queryUserDB(db)
	if err != nil {
		panic(err)
	} else if user.UserID == "" {
		return errors.New("no corresponding user found")
	} else if bcrypt.CompareHashAndPassword([]byte(userInDB.Password), []byte(user.Password)) == nil {
		err = createSessionTable(db)
		session, err := user.addToSessionTable(db, r)
		if session != "" {
			http.SetCookie(w, &http.Cookie{Name: "SESSIONID", Value: session, Expires: time.Now().Add(24 * time.Hour), Path: "/"})
		}
		return err
	}
	return errors.New("password not matched")
}

func (user *userDB) addNewUser(db *sql.DB) error {
	err := user.queryUserDB(db)
	checkErr(err)
	if user.Token != "" {
		return fmt.Errorf(`userID %s already in use`, user.UserID)
	}

	err = user.registerAPI()
	if err != nil {
		return err
	}
	newUser, err := db.Prepare(`INSERT INTO accounts(userID, nickname, portraitURI, password, created, token, isAdmin) VALUES($1, $2, $3, $4, $5, $6, $7);`)
	checkErr(err)
	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	checkErr(err)
	_, err = newUser.Exec(user.UserID, user.Nickname, user.PortraitURI, password, time.Now(), user.Token, false)
	user.isAdmin = false
	return err
}

func (user *userDB) addToSessionTable(db *sql.DB, r *http.Request) (string, error) {
	chkfmt, err := db.Prepare(`SELECT sessionID, userinDB, remote FROM sessions WHERE userinDB=$1;`)
	if err != nil {
		return "", err
	}
	check, err := chkfmt.Query(user.UserID)
	var currentUserSessions []userSession

	// no more than 3 sessions from a same user

	for check.Next() {
		var currentUser userSession
		check.Scan(&currentUser.sessionID, &currentUser.userinDB, &currentUser.remote)
		currentUserSessions = append(currentUserSessions, currentUser)
	}
	for len(currentUserSessions) >= 3 {
		delfmt, err := db.Prepare(`DELETE FROM sessions WHERE sessionID=$1;`)
		if err != nil {
			return "", err
		}
		_, err = delfmt.Exec(currentUserSessions[0].sessionID)
		if err != nil {
			return "", err
		}
		currentUserSessions = deleteFromArray(currentUserSessions, 0)
	}

	newS, err := db.Prepare(`INSERT INTO sessions (sessionID, userinDB, expiration, remote) VALUES ($1, $2, $3, $4);`)
	if err != nil {
		return "", err
	}
	var remote string
	if theRem := r.Header.Get("X-FORWARDED-FOR"); theRem != "" {
		remoteArray := strings.Split(theRem, ", ")
		remote = remoteArray[len(remoteArray)-1]
	} else {
		remote = strings.Split(r.RemoteAddr, ":")[0]
	}
	userID, expiration := user.UserID, time.Now().Add(24*time.Hour)
	session := uuid.New().String()
	_, err = newS.Exec(session, userID, expiration, remote)
	return session, err
}

func (user *userDB) queryUserDB(db *sql.DB) (err error) {
	qfmt, err := db.Prepare(`SELECT userid, nickname, password, portraituri, token, isAdmin FROM accounts WHERE userid=$1;`)
	if err != nil {
		return
	}
	userQuery, err := qfmt.Query(user.UserID)
	if err != nil {
		return
	}
	userQuery.Next()
	userQuery.Scan(&user.UserID, &user.Nickname, &user.Password, &user.PortraitURI, &user.Token, &user.isAdmin)
	return
}

func (user *userDB) registerAPI() (err error) {
	data := &url.Values{}
	data.Set("userId", user.UserID)
	data.Set("name", user.Nickname)
	data.Set("portraitURI", user.PortraitURI)

	err = user.requestRongAPI("POST", "/user/getToken.json", data)
	return
	// user, err := rongIns.UserRegister(user.UserID, user.Nickname, user.PortraitURI)
	// checkErr(err)

	// return userRes{user.Status, user.UserID, user.Token}
}

func (user *userDB) changeInfoAPI() (err error) {
	data := &url.Values{}
	data.Set("userId", user.UserID)
	data.Set("name", user.Nickname)
	data.Set("portraitURI", user.PortraitURI)

	err = user.requestRongAPI("POST", "/user/refresh.json", data)
	return
}

func (user *userDB) requestRongAPI(reqType string, uri string, data *url.Values) error {
	client := &http.Client{}
	nonce, timestamp, sig := signatureUniqueRong()

	req, _ := http.NewRequest(reqType, rongURI+uri, strings.NewReader(data.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("App-Key", appKey)
	req.Header.Set("Nonce", nonce)
	req.Header.Set("Timestamp", timestamp)
	req.Header.Set("Signature", sig)
	// if uri == "/user/getToken.json" {
	log.Output(1, "[Request Header] Content-Type: "+req.Header.Get("Content-Type"))
	log.Output(1, "[Request Header] App-Key: "+req.Header.Get("App-Key"))
	log.Output(1, "[Request Header] Nonce: "+req.Header.Get("Nonce"))
	log.Output(1, "[Request Header] Timestamp: "+req.Header.Get("Timestamp"))
	log.Output(1, "[Request Header] Signature: "+req.Header.Get("Signature"))

	log.Output(1, "[Request] userId: "+data.Get("userId"))
	log.Output(1, "[Request] name: "+data.Get("name"))
	log.Output(1, "[Request] portraitURI: "+data.Get("portraitURI"))
	// }

	resp, err := client.Do(req)
	checkErr(err)

	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err)

	err = json.Unmarshal(body, user)

	// if uri == "/user/getToken.json" {
	log.Output(1, fmt.Sprintf("[Responce] code: %d", user.code))
	log.Output(1, "[Responce] userId: "+user.UserID)
	log.Output(1, "[Responce] token: "+user.Token)
	// }

	// fmt.Println("code: ", result.Code, "userID: ", result.UserID, "token: ", result.Token)
	if user.code != 200 && user.code != 0 {
		return fmt.Errorf(`Registration failure, code %d`, user.code)
	}

	return err
}

type listedUser struct {
	UserID      string
	Nickname    string
	PortraitURI string
	IsAdmin     bool
}

type userSession struct {
	sessionID string
	userinDB  string
	remote    string
}

// userRelation
// subjectID: the user ID of subjective
// objectID: the user ID of objective
// relation: the relation between the two users (-1 - blacklisted; 1 - friend)

type userRelation struct {
	id        int
	SubjectID string
	ObjectID  string
	Relation  int
}

func (relation *userRelation) write(db *sql.DB) (err error) {
	relationExisted := userRelation{}
	relationExisted.ObjectID, relationExisted.SubjectID = relation.ObjectID, relation.SubjectID
	err = relationExisted.query(db)
	if err != nil {
		return fmt.Errorf(`Database Query Error: %s`, err.Error())
	}
	if relation.id == relationExisted.id {
		writePre, err := db.Prepare(`INSERT INTO userRelation (subjectID, objectID, relation) VALUES ($1, $2, $3);`)
		if err != nil {
			return fmt.Errorf(`Prepare Error: %s`, err.Error())
		}
		_, err = writePre.Exec(relation.SubjectID, relation.ObjectID, relation.Relation)
		if err != nil {
			return fmt.Errorf(`Execute Error: %s`, err.Error())
		}
	} else {
		writePre, err := db.Prepare(`UPDATE userRelation SET subjectID=$1, objectID=$2, relation=$3 WHERE id=$4;`)
		if err != nil {
			return fmt.Errorf(`Prepare Error: %s`, err.Error())
		}
		_, err = writePre.Exec(relation.SubjectID, relation.ObjectID, relation.Relation, relationExisted.id)
		if err != nil {
			return fmt.Errorf(`Execute Error: %s`, err.Error())
		}
	}
	return
}

func (relation *userRelation) query(db *sql.DB) (err error) {
	relationQueryPre, err := db.Prepare(`SELECT id, relation FROM userRelation WHERE subjectID = $1 AND objectID = $2;`)
	if err != nil {
		return
	}
	relationQuery, err := relationQueryPre.Query(relation.SubjectID, relation.ObjectID)
	if err != nil {
		return
	}
	relationQuery.Next()
	relationQuery.Scan(&relation.id, &relation.Relation)
	return
}
