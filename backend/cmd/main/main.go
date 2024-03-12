package main

import (
	"fmt"
	Go "hackathon/backend/cmd/go"
	"net/http"
)

func main() {
	port := ":8888"

	http.HandleFunc("/", Go.Index)
	fmt.Println("(http://localhost:8888)- Server started on port", port)
	err := http.ListenAndServe(port, nil)
	if err != nil {
		return
	}
}
