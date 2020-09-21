package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/login", login)
	http.HandleFunc("/register", register)
	http.HandleFunc("/", homepage)
	log.Fatal(http.ListenAndServe(":8081", nil))
}
