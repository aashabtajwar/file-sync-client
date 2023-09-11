package main

import "github.com/aashabtajwar/desktop-th/api"

func main() {
	// the desktop app has multiple parts
	api.Register("professor", "snape", "prof", "snape@gmail.com", "12345", "/register")

}
