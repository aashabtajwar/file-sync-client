package errorhandling

import "fmt"

func ErrorReadingDir(err error) {
	if err != nil {
		fmt.Println("Error Listing Files in a Dir\n", err)
	}
}
