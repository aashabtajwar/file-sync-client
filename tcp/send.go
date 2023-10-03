package tcp

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"io"
	"os"
)

func SendFile(filePath string) {
	conn := SetUpConn()
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error opening file\n", err)
	}
	fi, err := file.Stat()
	if err != nil {
		fmt.Println("Error getting file stat\n", err)
	}
	byteData := make([]byte, fi.Size())
	x, err := file.Read(byteData)
	binary.Write(conn, binary.LittleEndian, int64(fi.Size()))
	n, err := io.CopyN(conn, bytes.NewReader(byteData), int64(fi.Size()))

}
