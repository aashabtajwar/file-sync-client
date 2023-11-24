package api

import (
	"fmt"

	"github.com/aashabtajwar/desktop-th/tasks"
)

// download workspace
func DownloadWorkspace(token string, workspaceId string) string {
	// send http request first
	// the server will respond with workspace name and other relevant data
	requestString := fmt.Sprintf(`
	{
		"workspace_id": "%s"
	}
	`, workspaceId)
	name := makeRequest(requestString, "http://127.0.0.1:3333/download", token)
	tasks.CreateWorkspaceDir(name)
	return "done"
}

// download workspace - version 2.0
func DownloadWorkspaceV2(token string, workspaceId string, workspaceName string) {
	// first create a workspace with the name given on arguments
	// then, send an http request to server which will prompt it to send files
	tasks.CreateWorkspaceDir(workspaceName)

	// send http request
}
