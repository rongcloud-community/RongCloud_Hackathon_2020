package main

import (
	"log"
	"net/http"
)

func main() {
	rongIns.PrivateURI("https://api-sg01.ronghub.com", "http://api.sms.ronghub.com")
	http.HandleFunc("/userinfo/changeOthers", changeUserInfoOther)
	http.HandleFunc("/userinfo/changeSelf", changeUserInfoSelf)
	http.HandleFunc("/userinfoOther", userInfoOther)
	http.HandleFunc("/userinfo", userInfo)
	http.HandleFunc("/userList", userList)
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)
	http.HandleFunc("/", homepage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}
