package main

import (
	"embed"
	"fmt"
	"os"
	"strings"

	"github.com/aashabtajwar/desktop-th/monitor"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

var remoteUrl = "http://127.0.0.1:3333/"

var authToken string

// a local data store should be created
// that would contain all the workspace names and their corresponding ids
var workspaceDetail = make(map[string]string)

// var workspaceDetail map[string]string // workspace name, id
var authUserDetails map[string]string // id, name

func loadWorkspaces() {
	data, err := os.ReadFile("storage/workspaces.txt")
	if err != nil {
		fmt.Println("Error reading workspaces\n", err)
	}
	// by new line
	splitted_dirs := strings.Split(string(data), "\n")

	for _, e := range splitted_dirs {
		s := strings.Split(e, " ")
		workspaceDetail[s[0]] = s[1]
	}
}

// fetch workspace list
func fetchWorkspaces() []string {
	data, err := os.ReadFile("storage/workspaces.txt")
	if err != nil {
		fmt.Println("Error Reading Workspaces\n", err)
	}
	splitted_dirs := strings.Split(string(data), "\n")
	return splitted_dirs
}

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// open.Run("/home/aashab/faltu/zcost.pdf")

	// --------------GUI Starts--------------------
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "FS",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 192, G: 192, B: 192},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
	// --------------GUI Ends-------------------

	// the desktop app has multiple parts

	loadWorkspaces()

	go monitor.Watch()

	// check for token

	// forever loop to read data
	// Login: login <email> <password>
	// Register: register <fname> <lname> <username> <password>
	// Create Workspace: create <workspace_name>

	/*
		authToken = tokens.ReadTokenFromStorage()
		if authToken != "" {

			// check if token is validated
			res := api.Validate(authToken)
			if res == "Token has expired" {
				fmt.Println("Credentials expired. Log in again")
				read := bufio.NewReader(os.Stdin)

				fmt.Printf("Enter Email and Password: ")
				command, _ := read.ReadString('\n')
				args := strings.Split(command, " ")
				authToken = api.Login(strings.TrimSpace(args[0]), strings.TrimSpace(args[1]))
			} else {

				fmt.Println("Welcome \n", authToken)
			}

		} else {
			// authenticate, i.e. bring in the login page

		}

		tcp.Connect(authToken)
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
					tokens.SaveTokenToStorage(authToken)

				} else if args[0] == "register" {
					reg := api.Register(strings.TrimSpace(args[1]), strings.TrimSpace(args[2]), strings.TrimSpace(args[3]), strings.TrimSpace(args[4]), strings.TrimSpace(args[5]), "http://127.0.0.1:3333/register")
					fmt.Println("registered\n", reg)

				} else if args[0] == "add" {
					// add <user_email> <workspace_name>

					api.AddUserToWorkspace(strings.TrimSpace(args[1]), "http://127.0.0.1:3333/add-user", authToken, workspaceDetail[strings.TrimSpace(args[2])])

				} else if args[0] == "create" {

					// first check if user is authenticated
					if authToken == "" {
						fmt.Println("Log in first")

					} else {
						res := (api.CreateWorkspace(strings.TrimSpace(args[1]), strings.TrimSpace(args[2]), authToken, "http://127.0.0.1:3333/createw"))

						msg, id := tasks.Parse(res)
						fmt.Println(msg)
						workspaceDetail[strings.TrimSpace(args[2])] = id
					}

					// check workspaces shared with this user
					// command: check workspaces
				} else if strings.TrimSpace(args[0]) == "check" && strings.TrimSpace(args[1]) == "workspaces" {
					res := api.CheckWorkspaces(authToken)
					// iterate over res to get the workspace keys and values
					fmt.Println("Showing all remote workspaces")
					for _, v := range res {
						for _, v2 := range v {
							for key, value := range v2 {
								fmt.Println(key)
								workspaceDetail[key] = value
							}
						}
					}

					// fmt.Println(workspaceDetail)

					// download a workspace
					// download <workspace_name>
				} else if strings.TrimSpace(args[0]) == "download" {

					res := api.DownloadWorkspaceV2(authToken, workspaceDetail[strings.TrimSpace(args[1])], strings.TrimSpace(args[1]))
					fmt.Println(res)

				} else if strings.TrimSpace(args[0]) == "--v" {
					// file version checking
					// --v <file_name> <workspace_name>
					// params -> workspaceName, workspaceId, filename, authToken
					res := api.CheckVersions(strings.TrimSpace(args[2]), workspaceDetail[strings.TrimSpace(args[2])], strings.TrimSpace(args[1]), authToken)
					fmt.Println(res)
				}
			}

		}
	*/

}
