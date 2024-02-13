package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/aashabtajwar/desktop-th/errorhandling"
)

func RetrieveWorkspaceFiles(workspaceID string, authToken string) map[string][]string {
	requestString := fmt.Sprintf(`
	{
		"workspace_id": "%s"
	}
	`, workspaceID)
	bodyData := []byte(requestString)
	r, err := http.NewRequest("POST", "http://127.0.0.1:3333/workspace-files", bytes.NewBuffer(bodyData))
	if err != nil {
		fmt.Println("Error Creating New Request\n", err)
	}
	r.Header.Add("Content-Type", "application/json")
	if authToken != "" {
		r.Header.Add("Authorization", authToken)
	}
	client := &http.Client{}
	res, err := client.Do(r)

	errorhandling.RequestCreaterError(err)
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	d := make(map[string][]string)
	if err := json.Unmarshal(body, &d); err != nil {
		fmt.Println("Unmarshall Error\n", err)
	}
	return d

	// return makeRequest(requestString, "http://127.0.0.1:3333/workspace-files", authToken)

}
