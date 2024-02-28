package main

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/aashabtajwar/desktop-th/api"
	"github.com/aashabtajwar/desktop-th/global"
	"github.com/aashabtajwar/desktop-th/tasks"
	"github.com/aashabtajwar/desktop-th/tcp"
	"github.com/aashabtajwar/desktop-th/tokens"
	"github.com/labstack/gommon/log"
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

			go tcp.Connect(authToken)
			return "Already Logged In"
		}
	}
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	// return fmt.Sprintf("Hello %s, It's show time!", name)
	return ("Whatever man")
}

func (a *App) Nice(name string) string {
	return ("Nevermind man")
}

func (a *App) Register(firstName string, lastName string, username string, email string, password string) string {
	res := api.Register(firstName, lastName, username, email, password, remoteUrl+"register")
	fmt.Println(res)
	return res
}

// login user
func (a *App) Login(email string, password string) string {
	res := api.Login(email, password)
	token = res["token"]
	go tcp.Connect(token)
	return res["message"]
}

func (a *App) AddContent() [][]string {
	// bring the list of local repositories
	dirs := fetchWorkspaces()
	names = separateDirNames(dirs)
	return names
}

func (a *App) CreateWorkspace(workspaceName string) string {
	res := api.CreateWorkspace("/home/aashab/"+workspaceName, workspaceName, authToken, remoteUrl+"createw")
	msg, id := tasks.Parse(res)
	global.WorkspaceDetails[workspaceName] = id
	return msg
}

// this assumes workspaceID is already stored in workspaceDetail map.
// Therefore user can be added only after creating a workspace
// fix this
func (a *App) AddUserWithEmail(userEmail string, workspaceName string) string {
	fmt.Println("name == ", workspaceName)
	fmt.Println("workspace id == ", global.WorkspaceDetails[workspaceName])
	msg := api.AddUserToWorkspace(userEmail, remoteUrl+"add-user", authToken, global.WorkspaceDetails[workspaceName])
	return msg
}

// func (a *App) DisplayAllLocalFiles() [][]string {
// 	fileNames =
// }

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
	r := api.CheckWorkspaces(authToken, "http://")
	fmt.Println("Remote Workspaces\n", r)
	return remoteWorkspaces
}

func (a *App) GetRemoteWorkspacesV2() [][]string {
	var remoteWorkspaces [][]string
	r := api.CheckWorkspaces(authToken, remoteUrl+"check-remote")["workspaces"]
	fmt.Println(r)
	for _, e := range r {
		// fmt.Println("id is the workspace id = ", id)
		var w []string
		for workspaceName, id := range e {
			w = append(w, workspaceName)
			w = append(w, id)
			workspaceDetail[workspaceName] = id
		}
		remoteWorkspaces = append(remoteWorkspaces, w)
	}
	fmt.Println(remoteWorkspaces)
	return remoteWorkspaces
}

// func (a *App) GetRemoteFiles(workspaceID string, workspaceName string) [][]string {

// 	fmt.Println("WS ID = ", workspaceID)
// 	r := api.RetrieveWorkspaceFiles(workspaceID, authToken)
// 	fmt.Println(r)
// 	names := sortFileNamesFromPath(r["file_names"], workspaceName, workspaceID)
// 	fmt.Println(names)
// 	return names
// }

func (a *App) DisplaySharedUsers(workspaceName string) [][]string {
	// var sharedUsers [][]string // name and userID
	fmt.Println("workspace id == ", global.WorkspaceDetails[workspaceName])
	body := api.ViewAddedUsers(global.WorkspaceDetails[workspaceName], authToken, remoteUrl+"shared-users")
	users := sortUsers(body, workspaceName)
	fmt.Println("shared users == ", users)
	return users
}

func (a *App) SetUserPermission(permission string, userID string, workspaceID string) {
	fmt.Println("changing user permission...")
	responseBody := api.ChangePermission(permission, userID, workspaceID, authToken)
	fmt.Println(responseBody)
}

func (a *App) SetPermission(permission string, userID string, workspaceID string) {
	fmt.Println("Coming here...")
	responseBody := api.ChangePermission(permission, userID, workspaceID, authToken)
	fmt.Println(responseBody)
}

func (a *App) ListSpecificFiles(fileType []string) [][]string {
	var allDocs [][]string
	localWorkspaces := fetchWorkspaces()
	for _, e := range localWorkspaces {
		splitted := strings.Split(e, " ")
		for _, x := range fileType {
			files := getFileNamesWithExtensions(splitted[2], splitted[0], x)
			allDocs = append(allDocs, files...)
		}
	}
	return allDocs
}

func (a *App) ListAllFiles() [][]string {
	var allFiles [][]string
	localWorkspaces := fetchWorkspaces()
	for _, e := range localWorkspaces {
		splitted := strings.Split(e, " ")
		files := getFileNames(splitted[2], splitted[0])
		allFiles = append(allFiles, files...)
	}
	fmt.Println(allFiles)
	return allFiles
}

func (a *App) GetSharedWorkspaces() [][]string {
	var sharedWorkspaces [][]string // 0 - name; 1 - id
	r := api.CheckWorkspaces(authToken, remoteUrl+"check")["workspaces"]
	fmt.Println(r)
	for _, e := range r {
		// fmt.Println("id is the workspace id = ", id)
		var w []string
		for workspaceName, id := range e {
			w = append(w, workspaceName)
			w = append(w, id)
			workspaceDetail[workspaceName] = id
		}
		sharedWorkspaces = append(sharedWorkspaces, w)
	}
	fmt.Println(sharedWorkspaces)
	return sharedWorkspaces
}

func (a *App) DisplaySharedWorkspaceFiles(workspaceID string, workspaceName string) [][]string {
	fmt.Println("WS ID = ", workspaceID)
	r := api.RetrieveWorkspaceFiles(workspaceID, authToken)
	fmt.Println(r)
	names := sortFileNamesFromPath(r["file_names"], workspaceName, workspaceID)
	fmt.Println(names)
	return names
}

func (a *App) DownloadSharedWorkspace(workspaceName string, workspaceID string) {
	fmt.Println("Workspace Name = ", workspaceName)
	fmt.Println("Workspace ID = ", workspaceID)
	r := api.DownloadWorkspaceV2(authToken, workspaceID, workspaceName)
	fmt.Println(r)
	// add to workspaces.txt file
	fileTwo, err := os.OpenFile("storage/workspaces.txt", os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Error Opening File for Workspace Dirs\n", err)
	}
	defer fileTwo.Close()
	if _, err := fileTwo.WriteString("\n" + workspaceName + " " + workspaceID + " /home/aashab/FileSync/" + workspaceName); err != nil {
		fmt.Println("Error Storing workspace name to workspaces.txt file", err)
	}

	// watcher := monitor.CreateWatcher()
	// watcher.Add("/home/aashab/FileSync/" + workspaceName) // config later
}

// random Debugger function
func (a *App) Debug(content string) {
	fmt.Println("here = ", content)
}

func (a *App) ArrayDebug(content []string) {
	fmt.Println("content = ", content)
}

// Error Message
func (a *App) ErrorMsg(msg string) {
	log.Error(msg)
}
