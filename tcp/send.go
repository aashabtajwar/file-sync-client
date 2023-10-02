package tcp

import (
	"fmt"
	"net"
	"os"
)

func SendFile(conn net.Conn, filePath string) {
	file, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Error Opening File")
	}
	fi, err := file.Stat()
}
