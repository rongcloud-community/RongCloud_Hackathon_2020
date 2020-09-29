package main

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"math/rand"
	"net/http"
	"net/url"
	"strings"
	"time"
)

func registerAPI(data *userForm) userRes {
	fmt.Println(rongIns)

	theData := url.Values{}
	theData.Set("userId", data.UserID)
	theData.Set("name", data.Nickname)
	theData.Set("portraitURI", data.PortraitURI)

	result, err := requestRongAPI("POST", &theData, "/user/getToken.json")
	checkErr(err)
	// user, err := rongIns.UserRegister(data.UserID, data.Nickname, data.PortraitURI)
	// checkErr(err)

	// return userRes{user.Status, user.UserID, user.Token}
	return result
}

func changeInfoAPI(data *userDB) userRes {
	theData := url.Values{}
	theData.Set("userId", data.UserID)
	theData.Set("name", data.Nickname)
	theData.Set("portraitURI", data.PortraitURI)

	result, err := requestRongAPI("POST", &theData, "/user/refresh.json")
	checkErr(err)

	return result
}

func signatureUniqueRong() (string, string, string) {
	rand.Seed(64)
	nonce, timestamp := fmt.Sprintf("%d", uint(rand.Float64()*math.Pow10(19))), fmt.Sprintf("%d", uint(time.Now().Unix()))
	sig := fmt.Sprintf("%x", sha1.Sum([]byte(appSec+nonce+timestamp)))
	return nonce, timestamp, sig
}

func requestRongAPI(reqType string, data *url.Values, url string) (result userRes, err error) {
	client := &http.Client{}
	nonce, timestamp, sig := signatureUniqueRong()

	req, _ := http.NewRequest(reqType, rongURI+url, strings.NewReader(data.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("App-Key", appKey)
	req.Header.Set("Nonce", nonce)
	req.Header.Set("Timestamp", timestamp)
	req.Header.Set("Signature", sig)
	if url == "/user/getToken.json" {
		log.Output(1, "[Request Header] Content-Type: "+req.Header.Get("Content-Type"))
		log.Output(1, "[Request Header] App-Key: "+req.Header.Get("App-Key"))
		log.Output(1, "[Request Header] Nonce: "+req.Header.Get("Nonce"))
		log.Output(1, "[Request Header] Timestamp: "+req.Header.Get("Timestamp"))
		log.Output(1, "[Request Header] Signature: "+req.Header.Get("Signature"))

		log.Output(1, "[Request] userId: "+data.Get("userId"))
		log.Output(1, "[Request] name: "+data.Get("name"))
		log.Output(1, "[Request] portraitURI: "+data.Get("portraitURI"))
	}

	resp, err := client.Do(req)
	checkErr(err)

	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err)

	err = json.Unmarshal(body, &result)

	if url == "/user/getToken.json" {
		log.Output(1, fmt.Sprintf("[Responce] code: %d", result.Code))
		log.Output(1, "[Responce] userId: "+result.UserID)
		log.Output(1, "[Responce] token: "+result.Token)
	}

	// fmt.Println("code: ", result.Code, "userID: ", result.UserID, "token: ", result.Token)
	if result.Code != 200 {
		return result, fmt.Errorf(`Registration failure, code %d`, result.Code)
	}

	return result, err
}
