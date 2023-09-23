package api

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/aashabtajwar/desktop-th/errorhandling"
)

func Register(first string, last string, username string, email string, password string, url string) string {
	requestString := fmt.Sprintf(`
	{
	"first_name": "%s",
	"last_name": "%s",
	"email": "%s",
	"password": "%s"
	}`, first, last, email, password)
	return makeRequest(requestString, "http://127.0.0.1:3333/register", "")
}

func Login(email string, password string) string {
	requestString := fmt.Sprintf(`
	{
	"email": "%s",
	"password": "%s"
	}`, email, password)
	return makeRequest(requestString, "http://127.0.0.1:3333/login", "")

}

func makeRequest(bodyData string, endpoint string, token string) string {
	request := []byte(bodyData)
	r, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(request))

	errorhandling.RequestCreaterError(err)

	r.Header.Add("Content-Type", "application/json")
	if token != "" {
		fmt.Println("adding auth token")
		r.Header.Add("Authorization", token)
	}

	client := &http.Client{}
	res, err := client.Do(r)

	errorhandling.RequestError(err)
	fmt.Println("request sent")
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	fmt.Println("request body\n", string(body))
	return string(body)

}
