package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func userInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	session := userSession{}
	err := session.getSessionFromRequest(r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var curUser userDB
		curUser.UserID = session.userinDB
		err = curUser.queryUserDB()
		if err != nil {
			panic(err)
			// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
		} else {
			json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "userInfo": map[string]interface{}{"userID": curUser.UserID, "nickname": curUser.Nickname, "portraitUri": curUser.PortraitURI, "token": curUser.Token, "isAdmin": curUser.isAdmin}})
		}
	}
	log.Output(1, fmt.Sprintf(`Connection number now: %d, inuse: %d, idle: %d`, db.Stats().OpenConnections, db.Stats().InUse, db.Stats().Idle))
}

func userInfoOther(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	session := userSession{}
	err := session.getSessionFromRequest(r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var curUser userDB
		curUser.UserID = session.userinDB
		err = curUser.queryUserDB()
		if err != nil {
			panic(err)
			// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
		} else {
			var targetUser userDB
			json.NewDecoder(r.Body).Decode(&targetUser)
			err = targetUser.queryUserDB()
			if err != nil {
				panic(err)
				// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
			} else {
				curRelation := userRelation{}
				curRelation.SubjectID, curRelation.ObjectID = curUser.UserID, targetUser.UserID
				err = curRelation.query()
				if err != nil {
					panic(err)
				}
				json.NewEncoder(w).Encode(map[string]interface{}{"status": "success", "userInfo": map[string]interface{}{"userID": targetUser.UserID, "nickname": targetUser.Nickname, "portraitUri": targetUser.PortraitURI, "isAdmin": targetUser.isAdmin, "relation": curRelation.Relation}})
			}
		}
	}
}

func changeUserInfoSelf(w http.ResponseWriter, r *http.Request) {
	session := userSession{}
	err := session.getSessionFromRequest(r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		w.Header().Set("Content-Type", "application/json")
		var userCur userDB
		json.NewDecoder(r.Body).Decode(&userCur)
		err = userCur.changeInfoAPI()

		if err == nil {
			if userCur.PortraitURI != "" {
				ufmt, err := db.Prepare(`UPDATE accounts SET portraituri=$1 WHERE userid=$2;`)
				if err != nil {
					panic(err)
					// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
				}
				_, err = ufmt.Exec(userCur.PortraitURI, userCur.UserID)
				if err != nil {
					panic(err)
					// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
				}
			}
			if userCur.Nickname != "" {
				ufmt, err := db.Prepare(`UPDATE accounts SET nickname=$1 WHERE userid=$2;`)
				if err != nil {
					panic(err)
					// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
				}
				_, err = ufmt.Exec(userCur.Nickname, userCur.UserID)
				if err != nil {
					panic(err)
					// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
				}
			}
			if err == nil {
				json.NewEncoder(w).Encode(map[string]string{"status": "success"})
			}
		} else {
			// panic(fmt.Sprintf(`Error: %d`, userCur.code))
			json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": err.Error()})
		}
	}
}

func changeUserInfoOther(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var userCur userDB
	json.NewDecoder(r.Body).Decode(&userCur)

	session := userSession{}
	err := session.getSessionFromRequest(r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var curUser userDB
		curUser.UserID = session.userinDB
		err = curUser.queryUserDB()
		if err != nil {
			panic(err)

			// json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
		} else if curUser.isAdmin {
			err = userCur.changeInfoAPI()

			if err == nil {
				db, err := sql.Open("postgres", psqlInfo)
				checkErr(err)
				if userCur.PortraitURI != "" {
					ufmt, err := db.Prepare(`UPDATE accounts SET portraituri=$1 WHERE userid=$2;`)
					if err != nil {
						panic(err)
						// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
					}
					_, err = ufmt.Exec(userCur.PortraitURI, userCur.UserID)
					if err != nil {
						panic(err)
						// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
					}
				}
				if userCur.Nickname != "" {
					ufmt, err := db.Prepare(`UPDATE accounts SET nickname=$1 WHERE userid=$2;`)
					if err != nil {
						panic(err)
						// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
					}
					_, err = ufmt.Exec(userCur.Nickname, userCur.UserID)
					if err != nil {
						panic(err)
						// json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": "check the backend log"})
					}
				}
				if err == nil {
					json.NewEncoder(w).Encode(map[string]string{"status": "success"})
				}
			} else {
				// panic(fmt.Sprintf(`Error %d`, curUser.code))
				json.NewEncoder(w).Encode(map[string]string{"status": "failure", "statusText": err.Error()})
			}
		} else {
			json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": "Sorry, you are not in the admin group!"})
		}
	}
}

func userList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	session := userSession{}
	err := session.getSessionFromRequest(r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		var curUser userDB
		curUser.UserID = session.userinDB
		err = curUser.queryUserDB()
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
	}
	log.Output(1, fmt.Sprintf(`Connection number now: %d, inuse: %d, idle: %d`, db.Stats().OpenConnections, db.Stats().InUse, db.Stats().Idle))
}
