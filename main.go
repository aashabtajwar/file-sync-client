package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/aashabtajwar/desktop-th/api"
	"github.com/aashabtajwar/desktop-th/monitor"
)

var authToken string

func main() {
	// the desktop app has multiple parts

	go monitor.Watch()
	// tcp.Connect()

	// forever loop to read data
	// Login: login <email> <password>
	// Register: register <fname> <lname> <username> <password>
	// Create Workspace: create <workspace_name>
	for {

		fmt.Println("printing auth token\n", authToken)
		read := bufio.NewReader(os.Stdin)
		fmt.Printf(">> ")
		command, _ := read.ReadString('\n')
		args := strings.Split(command, " ")
		if len(args) == 1 {
			fmt.Println("here")
			fmt.Println(command)
			if command == "exit" {
				os.Exit(3)
			}
		} else {
			if args[0] == "login" {
				fmt.Println("user wants to log in")
				// fmt.Println()
				fmt.Println(args[2])
				authToken = api.Login(strings.TrimSpace(args[1]), strings.TrimSpace(args[2]))
				fmt.Println(authToken)
			} else if args[0] == "register" {
				reg := api.Register(args[1], args[2], args[3], args[4], args[5], "http://127.0.0.1:3333/register")
				fmt.Println("registered\n", reg)
			} else if args[0] == "create" {
				// first check if user is authenticated
				if authToken == "" {
					fmt.Println("Log in first")
				} else {
					api.CreateWorkspace(strings.TrimSpace(args[1]), strings.TrimSpace(args[2]), authToken, "http://127.0.0.1:3333/createw")
				}
			}
		}

	}
}
