package main

import (
	"fmt"

	"github.com/aashabtajwar/desktop-th/api"
	"github.com/aashabtajwar/desktop-th/monitor"
	"github.com/aashabtajwar/desktop-th/tcp"
)

var authToken string

func main() {
	// the desktop app has multiple parts
	go monitor.Watch()
	authToken = (api.Login("snape@gmail.com", "12345"))
	fmt.Println(authToken)
	api.CreateWorkspace("/home/aashab/NewFolderfolder", "NewFolderfolder", authToken, "http://127.0.0.1:3333/createw")
	tcp.Connect()

}
