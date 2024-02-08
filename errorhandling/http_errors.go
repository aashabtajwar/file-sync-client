package errorhandling

import (
	"fmt"
	"log"
)

// error when creating an request object
func RequestCreaterError(err error) {
	if err != nil {
		fmt.Println("Error creating an http request maker:\n", err)
	}
}

// error when actually sending an http request using client
func RequestError(err error) {
	if err != nil {
		log.Println("Error Sending HTTP request:\n", err)
	}
}
