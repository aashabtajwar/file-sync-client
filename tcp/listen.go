// listens for incoming data
package tcp

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net"
	"os"
	"strings"

	"github.com/aashabtajwar/desktop-th/notifications"
	"github.com/gen2brain/beeep"
)

// real time notification
func showNotification(metadata map[string]string, fileData *bytes.Buffer) {
	err := beeep.Notify("File Sync", fileData.String(), "assets/information.png")
	if err != nil {
		panic(err)
	}
}

func delete(metadata map[string]string) {
	workspaceName := metadata["workspace"]
	f := strings.Split(metadata["name"], ".")
	fileName := f[0]
	// check := metadata["workspace"] + "_" + metadata["name"]
	check := workspaceName + "_" + fileName
	dir := "/home/aashab/FileSync/" + workspaceName
	entries, err := os.ReadDir(dir)
	if err != nil {
		fmt.Println("Error Reading Dir\n", err)
	}
	for _, e := range entries {
		if strings.Contains(e.Name(), check) {
			er := os.Remove("dir" + e.Name())
			if er != nil {
				log.Println("Error Deleting File\n", er)
			}
		}
	}
}

func save(metadata map[string]string, fileData *bytes.Buffer) {
	// direct the dir in which files will be stored

	fmt.Println(fileData.Bytes())
	fmt.Println("meta => ", metadata["name"])
	if metadata["isNotification"] == "1" {
		// fmt.Println("Following this path")
		showNotification(metadata, fileData)
	} else {

		// for now, files are being saved in this directory
		// you should change it so that they are saved in the intended workspace dir
		f, err := os.Create("/home/aashab/FileSync" + metadata["workspace"] + "/" + metadata["name"])
		if err != nil {
			fmt.Println("Error creating file: \n", err)
		}
		defer f.Close()
		_, err = f.Write(fileData.Bytes())
		if err != nil {
			fmt.Println("Error writing file\n", err)
		}
		f.Sync()

		// alert notification
		msg := fmt.Sprintf(`File: "%s" from workspace: "%s" has been updated!`, metadata["name"], metadata["workspace"])
		notifications.AlertNotification("File Sync", msg, "file_update.png")
	}
}

func ListenForData(conn net.Conn) {
	// receive file data
	// then the metadata
	dataBuffer := new(bytes.Buffer)
	fileData := new(bytes.Buffer)
	c := 0
	var metadata map[string]string
	for {
		// server {}
		var size int64
		binary.Read(conn, binary.LittleEndian, &size)
		_, err := io.CopyN(dataBuffer, conn, int64(size))

		if err != nil {
			fmt.Println("Error Streaming In Data:\n", err)
		}

		c++

		if c%2 != 0 {
			// filedata
			fileData.Write(dataBuffer.Bytes())
			fmt.Println("Received file data => \n", fileData)
			dataBuffer.Reset()

		} else if c%2 == 0 {
			// metadata
			data := dataBuffer.Bytes()
			fmt.Println("meta data in bytes\n", data)
			metaDataString := string(data[:])
			if err := json.Unmarshal([]byte(metaDataString), &metadata); err != nil {
				fmt.Println("Error Unmarshalling metadata\n", err)
			}
			fmt.Println("Received metadata =>\n", metaDataString)
			dataBuffer.Reset()
		}

		if c == 2 {
			if metadata["isDeleted"] == "Yes" {
				go delete(metadata)
			} else {
				go save(metadata, fileData)
			}
			c = 0 // reset
		}
	}
}
