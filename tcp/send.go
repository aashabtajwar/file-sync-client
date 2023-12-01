package tcp

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io"
	"os"
	"time"
)

func SendFile(name string, filePath string, workspace string, mimeType string) {
	time.Sleep(100 * time.Millisecond)
	conn := SetUpConn()
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error opening file\n", err)
	}
	fi, err := file.Stat()
	if err != nil {
		fmt.Println("Error getting file stat\n", err)
	}
	// byteData := make([]byte, fi.Size())
	// _, err = file.Read(byteData)
	byteData, errr := os.ReadFile(filePath)
	if errr != nil {
		fmt.Println("error reading file\n", errr)
	}

	fmt.Println("data --> \n", byteData)

	// how do i get the user id?
	userId := "1" // for now

	// name is the filename
	metaDataString := fmt.Sprintf(`
		{
			"workspace": "%s",
			"filename": "%s",
			"mimetype": "%s",
			"type": "file",
			"user_id": "%s",
			"name" : "%s"
			
		}`, workspace, filePath, mimeType, userId, name)
	metaDataBytes := []byte(metaDataString)

	// send file data
	binary.Write(conn, binary.LittleEndian, int64(fi.Size()))
	n, err := io.CopyN(conn, bytes.NewReader(byteData), int64(fi.Size()))
	if err != nil {
		fmt.Println("Error Sending File data\n", err)
	}

	fmt.Printf("Written %d bytes\n", n)
	time.Sleep(100 * time.Millisecond)

	// send meta data
	binary.Write(conn, binary.LittleEndian, int64(len(metaDataBytes)))
	n1, err := io.CopyN(conn, bytes.NewReader(metaDataBytes), int64(len(metaDataBytes)))
	if err != nil {
		fmt.Println("Error sending file metadata\n", err)
	}
	fmt.Printf("Written %d bytes\n", n1)

}
