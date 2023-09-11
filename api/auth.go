package api

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/aashabtajwar/desktop-th/errorhandling"
)

func Register(first string, last string, username string, email string, password string, url string) {
	requestString := fmt.Sprintf(`
	{
	"first_name": "%s",
	"last_name": "%s",
	"email": "%s",
	"password": "%s"
	}`, first, last, email, password)
	makeRequest(requestString, "http://127.0.0.1:3333/register")
}

func Login(email string, password string) {
	requestString := fmt.Sprintf(`
	{
	"email": "%s",
	"password": "%s"
	}`, email, password)
	makeRequest(requestString, "http://127.0.0.1:3333/login")

}

func makeRequest(bodyData string, endpoint string) {
	request := []byte(bodyData)
	r, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(request))

	errorhandling.RequestCreaterError(err)

	r.Header.Add("Content-Type", "application/json")

	client := &http.Client{}

	res, err := client.Do(r)

	errorhandling.RequestError(err)

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)

	fmt.Println(string(body))
}
