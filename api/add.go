package api

import "fmt"

func AddUserToWorkspace(email string, endPoint string, token string, workspaceId int) string {
	requestString := fmt.Sprintf(`
	{
		"email" : "%s",
		"workspace_id" : "%d"
	}
	`, email, workspaceId)
	return makeRequest(requestString, endPoint, token)
}
