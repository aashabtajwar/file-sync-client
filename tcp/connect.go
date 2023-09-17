package tcp

import (
	"fmt"
	"log"
	"net"
)

// connect to tcp server
func Connect() {
	conn, err := net.Dial("tcp", ":3030")
	if err != nil {
		fmt.Println("Error connecting to TCP Server:\n", err)
	}
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
