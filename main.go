package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"

	"github.com/aashabtajwar/desktop-th/api"
	"github.com/aashabtajwar/desktop-th/monitor"
	"github.com/aashabtajwar/desktop-th/tasks"
	"github.com/aashabtajwar/desktop-th/tcp"
	"github.com/aashabtajwar/desktop-th/tokens"
)

var authToken string

// a local data store should be created
// that would contain all the workspace names and their corresponding ids
var workspaceDetail = make(map[string]string)

// var workspaceDetail map[string]string // workspace name, id
var authUserDetails map[string]string // id, name

func main() {
	// the desktop app has multiple parts

	go monitor.Watch()
	tcp.Connect()

	// forever loop to read data
	// Login: login <email> <password>
	// Register: register <fname> <lname> <username> <password>
	// Create Workspace: create <workspace_name>
	for {

		// fmt.Println("printing auth token\n", authToken)
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
				authToken = api.Login(strings.TrimSpace(args[1]), strings.TrimSpace(args[2]))
				userData := tokens.DecodeToken(authToken)
				fmt.Println(userData)
				fmt.Println("Log in Successful")
			} else if args[0] == "register" {
				reg := api.Register(strings.TrimSpace(args[1]), strings.TrimSpace(args[2]), strings.TrimSpace(args[3]), strings.TrimSpace(args[4]), strings.TrimSpace(args[5]), "http://127.0.0.1:3333/register")
				fmt.Println("registered\n", reg)
			} else if args[0] == "add" {
				api.AddUserToWorkspace(strings.TrimSpace(args[1]), "https://127.0.0.1:3030/add-user", authToken, 30)

			} else if args[0] == "create" {

				// first check if user is authenticated
				if authToken == "" {
					fmt.Println("Log in first")

				} else {
					res := (api.CreateWorkspace(strings.TrimSpace(args[1]), strings.TrimSpace(args[2]), authToken, "http://127.0.0.1:3333/createw"))

					msg, id := tasks.Parse(res)
					fmt.Println(msg)
					workspaceDetail[args[2]] = id
					fmt.Println(workspaceDetail)
				}

			}
		}

	}
}
