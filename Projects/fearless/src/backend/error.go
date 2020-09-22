package main

func checkErr(err interface{}) {
	if err != nil {
		panic(err)
	}
}
