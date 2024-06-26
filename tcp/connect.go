package tcp

import (
	"fmt"
	"net"
)

type TcpClient struct {
	quit chan interface{}
}

var server []net.Conn

func SetUpConn() net.Conn {
	if len(server) == 1 {
		return server[0]
	}

	conn, err := net.Dial("tcp", "192.168.171.200:3030")
	if err != nil {
		fmt.Println("Error Connecting to TCP Server\n", err)
	}
	server = append(server, conn)
	return conn

}

// connect to tcp server
func Connect(authToken string) {
	cl := &TcpClient{
		quit: make(chan interface{}),
	}
	conn := SetUpConn()
	// send token
	SendToken(authToken, conn)
	go cl.ListenForData(conn)
}
