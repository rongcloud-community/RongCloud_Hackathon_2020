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
	theData := url.Values{}
	theData.Set("userId", data.UserID)
	theData.Set("name", data.Nickname)
	theData.Set("portraitURI", data.PortraitURI)

	result, err := requestRongAPI("POST", &theData, "/user/getToken.json")
	checkErr(err)

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

	log.Output(1, "App-Key: "+appKey)
	log.Output(1, "Nonce: "+nonce)
	log.Output(1, "Timestamp: "+timestamp)
	log.Output(1, "Signature: "+sig)

	resp, err := client.Do(req)
	checkErr(err)

	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err)

	err = json.Unmarshal(body, &result)

	// fmt.Println("code: ", result.Code, "userID: ", result.UserID, "token: ", result.Token)
	if result.Code != 200 {
		return result, fmt.Errorf(`Registration failure, code %d`, result.Code)
	}

	return result, err
}
