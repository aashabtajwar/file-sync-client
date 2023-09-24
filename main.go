package main

import (
	"fmt"

	"github.com/aashabtajwar/desktop-th/api"
)

var authToken string

func main() {
	// the desktop app has multiple parts

	// reg := api.Register("Monkey", "Luffy", "strawHat", "luffy@gmail.com", "12345", "http://127.0.0.1:3333/register")
	// fmt.Println(reg)

	// go monitor.Watch()
	// fmt.Println(authToken)
	// api.CreateWorkspace("/home/aashab/NewFolderfolder", "NewFolderfolder", authToken, "http://127.0.0.1:3333/createw")
	// tcp.Connect()

	// add user to a workspace

	authToken = (api.Login("aashab@gmail.com", "12345"))
	addUser := api.AddUserToWorkspace("luffy@gmail.com", "http://127.0.0.1:3333/add-user", authToken, "1")
	fmt.Println(addUser)
}
