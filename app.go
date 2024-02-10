package main

import (
	"context"
	"fmt"

	"github.com/aashabtajwar/desktop-th/api"
	"github.com/aashabtajwar/desktop-th/tasks"
	"github.com/aashabtajwar/desktop-th/tokens"
	"github.com/skratchdot/open-golang/open"
)

var token string
var dirNames []string
var dirPaths []string
var names [][]string
var fileNames [][]string

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) CheckAuthStatus() string {
	// first check local storage for token
	authToken = tokens.ReadTokenFromStorage()
	if authToken == "" {
		return "Log In To Continue"
	} else {
		res := api.Validate(authToken)
		if res == "Token has expired" {
			return "Credentials expired. Please log in again"
		} else {
			// if token is still valid, move to home page
			return "Already Logged In"
		}
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	// return fmt.Sprintf("Hello %s, It's show time!", name)
	return fmt.Sprintf("Whatever man")
}

func (a *App) Nice(name string) string {
	return fmt.Sprintf("Nevermind man")
}

// login user
func (a *App) Login(email string, password string) string {
	res := api.Login(email, password)
	token = res["token"]
	return res["message"]
}

func (a *App) AddContent() [][]string {
	// bring the list of local repositories
	dirs := fetchWorkspaces()
	names = separateDirNames(dirs)
	return names
}

func (a *App) CreateWorkspace(workspaceName string) string {
	res := api.CreateWorkspace("/home/aashab/"+workspaceName, workspaceName, authToken, "http://127.0.0.1:3333/createw")
	msg, id := tasks.Parse(res)
	workspaceDetail[workspaceName] = id
	return msg
}

func (a *App) AddUserWithEmail(userEmail string, workspaceName string) string {
	fmt.Println("PRINTING WORKSPACE NAME = ", workspaceName)
	msg := api.AddUserToWorkspace(userEmail, "http://127.0.0.1:3333/add-user", authToken, workspaceDetail[userEmail])
	return msg
}

func (a *App) DisplayFiles(path string, workspaceName string) [][]string {
	fileNames = getFileNames(path, workspaceName)
	return fileNames
}

func (a *App) OpenFile(filePath string) string {
	open.Run(filePath)
	return "Opening File: " + filePath
}

func (a *App) GetRemoteWorkspaces() []string {
	var remoteWorkspaces []string
	r := api.CheckWorkspaces(authToken)
	fmt.Println("Remote Workspaces\n", r)
	return remoteWorkspaces
}
