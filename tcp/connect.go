package tcp

import (
	"fmt"
	"log"
	"net"
)

var server []net.Conn

func SetUpConn() net.Conn {
	if len(server) == 1 {
		return server[0]
	}
	conn, err := net.Dial("tcp", ":3030")
	if err != nil {
		fmt.Println("Error Connecting to TCP Server\n", err)
	}
	server = append(server, conn)
	return conn

}

// connect to tcp server
func Connect() {
	// conn, err := net.Dial("tcp", ":3030")
	// if err != nil {
	// 	fmt.Println("Error connecting to TCP Server:\n", err)
	// }
	conn := SetUpConn()
	go ListenForData(conn)
	ln, err := net.Listen("tcp", ":3000")
	if err != nil {
		log.Fatal(err)
	}
	for {
		_, err := ln.Accept()
		if err != nil {
			log.Fatal(err)
		}
	}
}
