package main

import (
	"crypto/sha1"
	"fmt"
	"math"
	"math/rand"
	"time"
)

// Some APIs have been migrated into types.go

func signatureUniqueRong() (string, string, string) {
	rand.Seed(64)
	nonce, timestamp := fmt.Sprintf("%d", uint(rand.Float64()*math.Pow10(19))), fmt.Sprintf("%d", uint(time.Now().Unix()))
	sig := fmt.Sprintf("%x", sha1.Sum([]byte(appSec+nonce+timestamp)))
	return nonce, timestamp, sig
}
