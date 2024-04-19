package api

import (
	"fmt"
)

var URL = "http://192.168.171.200:3333/"

func AddUserToWorkspace(email string, endPoint string, token string, workspaceId string) string {
	requestString := fmt.Sprintf(`
	{
		"email" : "%s",
		"workspace_id" : "%s"
	}
	`, email, workspaceId)
	return makeRequest(requestString, endPoint, token)
}

func ViewAddedUsers(workspaceID string, authToken string, url string) []byte {
	requestString := fmt.Sprintf(
		`
		{
			"workspace_id" : "%s"
		}
		`, workspaceID,
	)
	requestBody := []byte(requestString)
	fmt.Println("url == ", url)
	// fmt.Println("method == ", )
	return makeRequestV2(requestBody, url, "POST", authToken)
}
