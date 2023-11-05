package api

import "fmt"

func AddUserToWorkspace(email string, endPoint string, token string, workspaceId string) string {
	requestString := fmt.Sprintf(`
	{
		"email" : "%s",
		"workspace_id" : "%s"
	}
	`, email, workspaceId)
	return makeRequest(requestString, endPoint, token)
}
