package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"
)

func main() {
	if len(os.Getenv("RONG_UPLOADPATH")) > 0 {
		uploadPath = os.Getenv("RONG_UPLOADPATH")
	} else {
		uploadPath = "uploads"
	}
	var err error
	db, err = sql.Open("postgres", psqlInfo)
	checkErr(err)
	defer db.Close()
	db.SetMaxOpenConns(100)
	db.SetMaxIdleConns(10)

	http.HandleFunc("/userinfo/changeOthers", changeUserInfoOther)
	http.HandleFunc("/userinfo/changeSelf", changeUserInfoSelf)
	http.HandleFunc("/userinfoOther", userInfoOther)
	http.HandleFunc("/userRelationChange", userRelationAction)
	http.HandleFunc("/userinfo", userInfo)
	http.HandleFunc("/userList", userList)
	http.HandleFunc("/getConversationMessages", conversationMessagesGet)
	http.HandleFunc("/getConversation", conversationGet)
	http.HandleFunc("/updateConversation", conversationUpdate)
	http.HandleFunc("/sendMessage", sendMessage)
	http.HandleFunc("/readMessage", readMessage)
	http.HandleFunc("/editMessage", editMessage)
	http.HandleFunc("/uploadFile", uploadFile)
	http.HandleFunc("/recallMessage", recallMessage)
	http.HandleFunc("/readConversation", readConversation)
	http.HandleFunc("/logout", logout)
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)

	http.HandleFunc("/", homepage)

	http.Handle("/uploads/", http.StripPrefix("/uploads", http.FileServer(http.Dir(uploadPath))))

	log.Fatal(http.ListenAndServe(":8081", nil))
}
