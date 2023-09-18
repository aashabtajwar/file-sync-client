package main

import (
	"github.com/aashabtajwar/desktop-th/api"
	"github.com/aashabtajwar/desktop-th/monitor"
	"github.com/aashabtajwar/desktop-th/tcp"
)

var authToken string

func main() {
	// the desktop app has multiple parts
	authToken = (api.Login("snape@gmail.com", "12345"))
	go monitor.Watch()
	tcp.Connect()

}
