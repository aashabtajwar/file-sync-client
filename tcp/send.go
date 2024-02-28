package tcp

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io"
	"net"
	"os"
	"time"

	"github.com/aashabtajwar/desktop-th/errorhandling"
)

// send deleted file name and workspace
func SendDeletedFileName(workspaceName string, fileName string) {
	time.Sleep(100 * time.Millisecond)
	conn := SetUpConn()
	metadataString := fmt.Sprintf(
		`
			{
				"workspace": "%s",
				"fileName": "%s",
				"isDeleted": "Yes",
				"type": "file"
			}
		`, workspaceName, fileName)
	metadataBytes := []byte(metadataString)
	randomString := []byte("Random Useless String")
	binary.Write(conn, binary.LittleEndian, int64(len(randomString)))
	_, err := io.CopyN(conn, bytes.NewReader(randomString), int64(len(randomString)))

	errorhandling.ErrorSendingFileData(err)

	time.Sleep(100 * time.Millisecond)

	// send meta data
	binary.Write(conn, binary.LittleEndian, int64(len(metadataBytes)))
	_, err = io.CopyN(conn, bytes.NewReader(metadataBytes), int64(len(metadataBytes)))

	errorhandling.ErrorSendingMetaData(err)
}

// send token along with metadata
func SendToken(token string, conn net.Conn) {
	time.Sleep(100 * time.Millisecond)
	tokenMetaData := fmt.Sprintf(`
		{
			"type" : "token"
		}
	`)
	tokenMetaDataBytes := []byte(tokenMetaData)
	tokenBytes := []byte(token)
	binary.Write(conn, binary.LittleEndian, int64(len(tokenBytes)))
	n1, err := io.CopyN(conn, bytes.NewReader(tokenBytes), int64(len(tokenBytes)))
	if err != nil {
		fmt.Println("Error sending token data\n", err)
	}
	fmt.Printf("Written %d token metadata bytes\n", n1)
	time.Sleep(100 * time.Millisecond)

	binary.Write(conn, binary.LittleEndian, int64(len(tokenMetaDataBytes)))
	n2, err := io.CopyN(conn, bytes.NewReader(tokenMetaDataBytes), int64(len(tokenMetaDataBytes)))

	if err != nil {
		fmt.Println("Error Sending File metadata\n", err)

	}
	fmt.Printf("Written %d token bytes\n", n2)

}

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
	fmt.Println("file content ==\n", string(byteData))
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
			"name" : "%s",
			"isDeleted": "No"
			
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
