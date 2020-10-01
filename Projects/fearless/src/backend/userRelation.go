package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
)

// TODO: test this feature.

func userRelationAction(w http.ResponseWriter, r *http.Request) {
	db, err := sql.Open("postgres", psqlInfo)
	checkErr(err)

	if err := createUserRelationTable(db); err != nil {
		panic(err)
	}

	w.Header().Set("application/type", "json")
	session, err := sessionInfoAndTrueRemote(db, r)
	if err != nil {
		json.NewEncoder(w).Encode(map[string]string{"status": "error", "statusText": err.Error()})
	} else {
		curUser := &userDB{}
		curUser.UserID = session.userinDB
		err = curUser.queryUserDB(db)
		if err != nil {
			panic(err)
		} else if curUser.Token != "" {
			relation := userRelation{}
			json.NewDecoder(r.Body).Decode(&relation)
			if curUser.UserID == relation.subjectID || curUser.isAdmin {
				err = relation.write(db)
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
func createUserRelationTable(db *sql.DB) error {
	crt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS userRelation(
		id SERIAL PRIMARY KEY,
		subjectID int NOT NULL,
		objectID int NOT NULL,
		relation int NOT NULL
		)`)
	checkErr(err)
	_, err = crt.Exec()
	return err
}
