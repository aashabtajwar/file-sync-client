package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/aashabtajwar/desktop-th/errorhandling"
	"github.com/aashabtajwar/desktop-th/tokens"
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

func Login(email string, password string) map[string]string {
	requestString := fmt.Sprintf(`
	{
	"email": "%s",
	"password": "%s"
	}`, email, password)
	res := makeRequest(requestString, "http://127.0.0.1:3333/login", "")
	d := make(map[string]string)
	fmt.Println(res)
	err := json.Unmarshal([]byte(res), &d)

	if err != nil {
		fmt.Println("Error Unmarshalling json data\n", err)
	}
	fmt.Println(d["token"])
	tokens.SaveTokenToStorage(d["token"])
	return d
}

func Validate(token string) string {
	r, err := http.NewRequest("POST", "http://127.0.0.1:3333/validate-token", nil)
	errorhandling.RequestCreaterError(err)
	r.Header.Add("Authorization", token)
	client := &http.Client{}
	res, err := client.Do(r)
	errorhandling.RequestError(err)
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	m := make(map[string]string)
	if err = json.Unmarshal(body, &m); err != nil {
		fmt.Println("Error Unmarshalling Json\n", err)
	}
	return m["message"]
	// return string(body)
}

func makeRequest(bodyData string, endpoint string, token string) string {
	request := []byte(bodyData)
	r, err := http.NewRequest("POST", endpoint, bytes.NewBuffer(request))

	errorhandling.RequestCreaterError(err)

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
