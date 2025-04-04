package main

import (
	"crypto/tls"
	"fmt"
	"io"
	"net/http"
	"strings"
)

func main() {

	url := "https://localhost:3000/graphql"
	method := "POST"

	payload := strings.NewReader("{\"query\":\"{\\n  books {\\n    title\\n    id\\n  }\\n}\",\"variables\":{}}")

	tr := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}

	client := &http.Client{Transport: tr}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("Content-Type", "application/json")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
}

func generaldisable() {
	http.DefaultTransport.(*http.Transport).TLSClientConfig = &tls.Config{InsecureSkipVerify: true}
	_, err := http.Get("https://golang.org/")
	if err != nil {
		fmt.Println(err)
	}
}
