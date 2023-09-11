package main

import (
	"github.com/aashabtajwar/desktop-th/api"
)

var authToken string

func main() {
	// the desktop app has multiple parts
	// api.Register("professor", "snape", "prof", "snape@gmail.com", "12345", "/register")
	authToken = (api.Login("snape@gmail.com", "12345"))
	api.DownloadWorkspace(authToken, "1")

}
