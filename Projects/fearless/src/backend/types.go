package main

type userForm struct {
	UserID      string
	Nickname    string
	Password    string
	PortraitURI string
}

// TODO: Add Role in accounts database

type userDB struct {
	UserID      string
	Nickname    string
	Password    string
	PortraitURI string
	Token       string
	isAdmin     bool
}

type loginForm struct {
	UserID   string
	Password string
}

type userRes struct {
	Code   int    `json:"code"`
	UserID string `json:"userId"`
	Token  string `json:"token"`
}

type userSession struct {
	sessionID string
	userinDB  string
	remote    string
}
