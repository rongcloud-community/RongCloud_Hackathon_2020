package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

func userInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db, session, remote, err := sessionInfoAndTrueRemote(r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var curUser userDB
		if remote == session.remote {
			db, err = queryUserDB(db, session.userinDB, &curUser)
			if err != nil {
				panic(err)
				// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
			} else {
				json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "userInfo": map[string]interface{}{"userID": curUser.UserID, "nickname": curUser.Nickname, "portraitUri": curUser.PortraitURI, "token": curUser.Token, "isAdmin": curUser.isAdmin}})
			}
		} else {
			json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Session expired."})
		}
	}
	db.Close()
}

func userInfoOther(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	db, session, remote, err := sessionInfoAndTrueRemote(r)
	if err != nil {
		panic(err)
		// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		if remote == session.remote {
			var curUser userDB
			db, err = queryUserDB(db, session.userinDB, &curUser)
			if err != nil {
				panic(err)
				// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
			} else if curUser.isAdmin {
				var targetUser userDB
				json.NewDecoder(r.Body).Decode(&targetUser)
				db, err = queryUserDB(db, targetUser.UserID, &targetUser)
				if err != nil {
					panic(err)
					// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
				} else {
					json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "userInfo": map[string]interface{}{"userID": targetUser.UserID, "nickname": targetUser.Nickname, "portraitUri": targetUser.PortraitURI, "isAdmin": targetUser.isAdmin}})
				}
			} else {
				json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Sorry, you are not in the admin group!"})
			}
		} else {
			json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Session expired."})
		}
	}
	db.Close()
}

func changeUserInfoSelf(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var userCur userDB
	json.NewDecoder(r.Body).Decode(&userCur)
	res := changeInfoAPI(&userCur)

	if res.Code == 200 {
		db, err := sql.Open("postgres", psqlInfo)
		checkErr(err)
		if userCur.PortraitURI != "" {
			_, err = db.Exec(fmt.Sprintf(`UPDATE accounts SET portraituri='%s' WHERE userid='%s';`, userCur.PortraitURI, userCur.UserID))
			if err != nil {
				panic(err)
				// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
			}
		}
		if userCur.Nickname != "" {
			_, err = db.Exec(fmt.Sprintf(`UPDATE accounts SET nickname='%s' WHERE userid='%s';`, userCur.Nickname, userCur.UserID))
			if err != nil {
				panic(err)
				// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
			}
		}
		if err == nil {
			json.NewEncoder(w).Encode(map[string]string{"status": "success"})
		}
	} else {
		panic(res)
		// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
	}
}

func changeUserInfoOther(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var userCur userDB
	json.NewDecoder(r.Body).Decode(&userCur)

	db, session, remote, _ := sessionInfoAndTrueRemote(r)
	if remote == session.remote {
		var curUser userDB
		_, err := queryUserDB(db, session.userinDB, &curUser)
		if err != nil {
			panic(err)

			// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
		} else if curUser.isAdmin {
			res := changeInfoAPI(&userCur)

			if res.Code == 200 {
				db, err := sql.Open("postgres", psqlInfo)
				checkErr(err)
				if userCur.PortraitURI != "" {
					_, err = db.Exec(fmt.Sprintf(`UPDATE accounts SET portraituri='%s' WHERE userid='%s';`, userCur.PortraitURI, userCur.UserID))
					if err != nil {
						// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
						panic(err)
					}
				}
				if userCur.Nickname != "" {
					_, err = db.Exec(fmt.Sprintf(`UPDATE accounts SET nickname='%s' WHERE userid='%s';`, userCur.Nickname, userCur.UserID))
					if err != nil {
						// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
						panic(err)
					}
				}
				if err == nil {
					json.NewEncoder(w).Encode(map[string]string{"status": "success"})
				}
			} else {
				panic(err)
				// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
			}
		} else {
			json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Sorry, you are not in the admin group!"})
		}
	} else {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Session expired."})
	}

}

func userList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	db, session, remote, _ := sessionInfoAndTrueRemote(r)
	if remote == session.remote {
		var curUser userDB
		db, err := queryUserDB(db, session.userinDB, &curUser)
		if err != nil {
			panic(err)
			// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
		} else if curUser.isAdmin {
			var userList []listedUser
			userListQuery, err := db.Query(`SELECT userid, nickname, portraituri, isadmin FROM accounts;`)
			checkErr(err)
			for userListQuery.Next() {
				var theUser listedUser
				userListQuery.Scan(&theUser.UserID, &theUser.Nickname, &theUser.PortraitURI, &theUser.IsAdmin)
				userList = append(userList, theUser)
			}
			json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "data": userList})
		} else {
			json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Sorry, you are not in the admin group!"})
		}
	} else {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Session expired."})
	}
}

func queryUserDB(db *sql.DB, user string, curUser *userDB) (*sql.DB, error) {
	userQuery, err := db.Query(fmt.Sprintf(`SELECT userid, nickname, password, portraituri, token, isAdmin FROM accounts WHERE userid='%s';`, user))
	if err != nil {
		return db, err
	}
	userQuery.Next()
	userQuery.Scan(&curUser.UserID, &curUser.Nickname, &curUser.Password, &curUser.PortraitURI, &curUser.Token, &curUser.isAdmin)
	return db, err
}

func sessionInfoAndTrueRemote(r *http.Request) (db *sql.DB, session userSession, remote string, err error) {
	db, err = sql.Open("postgres", psqlInfo)
	checkErr(err)

	if xFor := r.Header.Get("X-FORWARDED-FOR"); xFor != "" {
		remoteArray := strings.Split(xFor, ", ")
		remote = remoteArray[len(remoteArray)-1]
	} else {
		remote = strings.Split(r.RemoteAddr, ":")[0]
	}

	sessionID, err := r.Cookie("SESSIONID")
	if err != nil && strings.Contains(err.Error(), "not present") {
		err = fmt.Errorf(`Session ID not existed`)
		return
	}

	sessionQuery, err := db.Query(fmt.Sprintf(`SELECT sessionid, userinDB, remote FROM sessions WHERE sessionid='%s';`, sessionID.Value))
	sessionQuery.Next()
	sessionQuery.Scan(&session.sessionID, &session.userinDB, &session.remote)

	return
}
