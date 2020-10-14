package main

import (
	"database/sql"
	"fmt"
	"os"
)

var (
	host     = "localhost"
	port     = os.Getenv("PGSQL_RONG_PORT")
	user     = os.Getenv("PGSQL_RONG_USER")
	dbname   = os.Getenv("PGSQL_RONG_DBNAME")
	rongURI  = os.Getenv("RONG_URI")
	appKey   = os.Getenv("RONG_appKey")
	appSec   = os.Getenv("RONG_appSec")
	psqlInfo = fmt.Sprintf("host=%s port=%s user=%s "+
		"dbname=%s sslmode=disable",
		host, port, user, dbname)
	uploadPath string
	db         *sql.DB
)
