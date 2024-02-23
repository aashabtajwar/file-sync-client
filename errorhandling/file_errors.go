package errorhandling

import "fmt"

func ErrorReadingDir(err error) {
	if err != nil {
		fmt.Println("Error Listing Files in a Dir\n", err)
	}
}

func ErrorSendingFileData(err error) {
	if err != nil {
		fmt.Println("Error Sending File Data\n", err)
	}
}

func ErrorSendingMetaData(err error) {
	if err != nil {
		fmt.Println("Error Sending MetaData\n", err)
	}
}
