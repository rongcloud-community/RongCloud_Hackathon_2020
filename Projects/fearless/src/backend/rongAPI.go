package main

import (
	"crypto/sha1"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"math/rand"
	"net/http"
	"net/url"
	"strings"
	"time"
)

func registerAPI(data *userForm) userRes {
	client := &http.Client{}
	rand.Seed(64)

	nonce, timestamp := fmt.Sprintf("%d", uint(rand.Float64()*math.Pow10(19))), fmt.Sprintf("%d", uint(time.Now().Unix()))
	sig := fmt.Sprintf("%x", sha1.Sum([]byte(appSec+nonce+timestamp)))
	theData := url.Values{}
	theData.Set("userId", data.UserID)
	theData.Set("name", data.Nickname)
	theData.Set("portraitURI", data.PortraitURI)
	req, _ := http.NewRequest("POST", rongURI+"/user/getToken.json", strings.NewReader(theData.Encode()))
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("App-Key", appKey)
	req.Header.Set("Nonce", nonce)
	req.Header.Set("Timestamp", timestamp)
	req.Header.Set("Signature", sig)
	resp, err := client.Do(req)
	checkErr(err)
	body, err := ioutil.ReadAll(resp.Body)
	checkErr(err)
	var result userRes
	err = json.Unmarshal(body, &result)
	checkErr(err)

	return result
}
