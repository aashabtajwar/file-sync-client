// listens for incoming data
package tcp

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"io"
	"net"
)

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
			dataBuffer.Reset()

		} else if c%2 == 0 {
			// metadata
			data := dataBuffer.Bytes()
			metaDataString := string(data[:])
			if err := json.Unmarshal([]byte(metaDataString), &metadata); err != nil {
				fmt.Println("Error Unmarshalling metadata\n", err)
			}
			dataBuffer.Reset()
		}

		if c == 2 {
			dir := metadata["workspace_dir"]

			c = 0 // reset
		}
	}
}
