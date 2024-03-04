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
	"time"

	"github.com/aashabtajwar/desktop-th/notifications"
	"github.com/gen2brain/beeep"
)

// func removePermission(metadata map[string]string) {

// }

func setPermission(metadata map[string]string) {
	workspaceName := metadata["workspace"]
	dir := "/home/aashab/FileSync/" + workspaceName // change this
	// add to workspaces.txt
	fileTwo, err := os.OpenFile("storage/workspaces.txt", os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Error Opening File for Workspace Dirs\n", err)
	}
	defer fileTwo.Close()
	if _, err := fileTwo.WriteString("\n" + workspaceName + " " + metadata["workspace_id"] + " " + dir); err != nil {
		fmt.Println("Error Storing workspace name to workspaces.txt file", err)
	}

	// now restart the app to take effect
	msg := fmt.Sprintf("You have been granted write permission for %s workspace. Please restart the app for this permission to take effect", workspaceName)
	err = beeep.Notify("File Sync", msg, "assets/information.png")
	if err != nil {
		log.Println("Error Generating Notification\n", err)
	}
}

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
	} else if metadata["isPermission"] == "1" {
		setPermission(metadata)
	} else {

		// for now, files are being saved in this directory
		// you should change it so that they are saved in the intended workspace dir
		// splittedFileName := strings.Split(metadata["name"], "_")
		// fileName := splittedFileName[1] + splittedFileName[len(splittedFileName)-1]
		fmt.Println("FULL DIR === " + "/home/aashab/FileSync/" + metadata["workspace"] + "/" + metadata["name"])
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

		// alert notification
		msg := fmt.Sprintf(`File: "%s" from workspace: "%s" has been updated!`, metadata["name"], metadata["workspace"])
		notifications.AlertNotification("File Sync", msg, "file_update.png")
	}
}

func (cl *TcpClient) ListenForData(conn net.Conn) {
	// receive file data
	// then the metadata
	dataBuffer := new(bytes.Buffer)
	fileData := new(bytes.Buffer)
	c := 0
	var metadata map[string]string
ReadLoop:
	for {
		select {
		case <-cl.quit:
			fmt.Println("ending...")
			return
		default:
			conn.SetDeadline(time.Now().Add(200 * time.Second))
			// server {}
			var size int64
			binary.Read(conn, binary.LittleEndian, &size)
			_, err := io.CopyN(dataBuffer, conn, int64(size))

			if err != nil {
				fmt.Println("Error Streaming In Data:\n", err)
				if opErr, ok := err.(*net.OpError); ok && opErr.Timeout() {
					continue ReadLoop

				} else if err != io.EOF {
					log.Println("read error\n", err)
					return
				} else {
					log.Println(err)
					fmt.Println("unknown error...")
					return
				}

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
					delete(metadata)
				} else {
					save(metadata, fileData)
				}
				c = 0 // reset
				fileData.Reset()
				continue ReadLoop
			}
		}

	}
}
