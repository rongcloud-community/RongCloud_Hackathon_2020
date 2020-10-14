package main

import (
	"encoding/json"
	"net/http"
)

// TODO: test this feature.

func userRelationAction(w http.ResponseWriter, r *http.Request) {
	if err := createUserRelationTable(); err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	session := userSession{}
	err := session.getSessionFromRequest(r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		curUser := &userDB{}
		curUser.UserID = session.userinDB
		err = curUser.queryUserDB()
		if err != nil {
			panic(err)
		} else if curUser.Token != "" {
			relation := userRelation{}
			relation.SubjectID = curUser.UserID
			json.NewDecoder(r.Body).Decode(&relation)
			if curUser.UserID == relation.SubjectID || curUser.isAdmin {
				err = relation.write()
				if err != nil {
					panic(err)
				} else {
					json.NewEncoder(w).Encode(map[string]string{"status": "success"})
				}
			}
		}
	}
}

// user relationship
// relation: -1 blacklisted; 1 friend
func createUserRelationTable() error {
	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS userRelation(
		id SERIAL PRIMARY KEY,
		subjectID varchar(64) NOT NULL,
		objectID varchar(64) NOT NULL,
		relation int NOT NULL
		)`)
	checkErr(err)
	_, err = crt.Exec()
	return err
}
