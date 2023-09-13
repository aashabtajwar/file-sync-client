package tcp

import (
	"fmt"
	"net"
)

// connect to tcp server
func Connect() {
	conn, err := net.Dial("tcp", ":3030")
	if err != nil {
		fmt.Println("Error connecting to TCP Server:\n", err)
	}
	go ListenForData(conn)
}
