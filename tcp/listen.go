// listens for incoming data
package tcp

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"os"

	"github.com/gen2brain/beeep"
)

// real time notification
func showNotification(metadata map[string]string, file *bytes.Buffer) {
	err := beeep.Notify("File Sync", metadata["message"], "assets/information.png")
	if err != nil {
		panic(err)
	}
}

func save(metadata map[string]string, fileData *bytes.Buffer) {
	// direct the dir in which files will be stored

	fmt.Println(fileData.Bytes())
	fmt.Println("meta => ", metadata["name"])
	if metadata["isNotification"] == "1" {
		showNotification(metadata, fileData)
	} else {

		// for now, files are being saved in this directory
		// you should change it so that they are saved in the intended workspace dir
		f, err := os.Create("/home/aashab/FileSync/" + metadata["workspace"] + "/" + metadata["name"])
		if err != nil {
			fmt.Println("Error creating file: \n", err)
		}
		defer f.Close()
		_, err = f.Write(fileData.Bytes())
		if err != nil {
			fmt.Println("Error writing file\n", err)
		}
		f.Sync()
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
			go save(metadata, fileData)
			c = 0 // reset
		}
	}
}
