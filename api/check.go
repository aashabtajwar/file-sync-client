package api

import (
	"fmt"
	"io"
	"net/http"

	"github.com/aashabtajwar/desktop-th/errorhandling"
)

func CheckWorkspaces(token string) string {
	endPoint := "http://127.0.0.1:3333/check"
	r, err := http.NewRequest("GET", endPoint, nil)
	if err != nil {
		fmt.Println("Error Preparing http request")
	}
	r.Header.Add("Content-Type", "application/json")
	if token != "" {
		r.Header.Add("Authorization", token)
	}
	client := &http.Client{}
	res, err := client.Do(r)
	errorhandling.RequestError(err)
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	return string(body)

}
