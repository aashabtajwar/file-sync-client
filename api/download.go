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
