package api

import (
	"bytes"
	"fmt"
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
	request := []byte(requestString)

	r, err := http.NewRequest("POST", "http://127.0.0.1:3333/register", bytes.NewBuffer(request))

	errorhandling.RequestCreaterError(err)

	r.Header.Add("Content-Type", "application/json")

	client := &http.Client{}

	res, err := client.Do(r)

	errorhandling.RequestError(err)

	defer res.Body.Close()
}
