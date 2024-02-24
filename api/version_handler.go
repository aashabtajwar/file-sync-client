package api

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"
)

func CheckVersions(workspaceName, workspaceId string, fileName string, token string) string {
	// map of fileversion number as key and id as value
	body := make(map[string]string)
	versions := make(map[string]string)
	requestString := fmt.Sprintf(
		`
			{
				"workspace_name": "%s",
				"workspace_id": "%s",
				"file_name": "%s"
			}
		`, workspaceName, workspaceId, fileName,
	)
	response := makeRequest(requestString, URL+"versions", token)
	fmt.Println(response)
	er := json.Unmarshal([]byte(response), &body)
	if er != nil {
		fmt.Println("Error Unmarshalling JSON Body")
	}
	er = json.Unmarshal([]byte(body["versions"]), &versions)
	if er != nil {
		fmt.Println("Error Unmarshalling versions string")
	}
	x := "All File Versions\nVersion\tDate Created\n"

	for i, e := range versions {
		timeParsed, er := strconv.ParseInt(e, 10, 64)
		if er != nil {
			fmt.Println("Error Parsing UNIX Timestamp to String")
		}
		tm := time.Unix(timeParsed, 0)
		n := fmt.Sprintf("%s\t%s\n", i, tm)
		x += n
	}
	return x
}
