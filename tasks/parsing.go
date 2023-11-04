package tasks

import (
	"encoding/json"
	"fmt"
)

func Parse(response string) (string, string) {
	data := make(map[string]string)
	if err := json.Unmarshal([]byte(response), &data); err != nil {
		fmt.Println("Error Unmarshalling Workspace Id\n", err)
	}
	return data["message"], data["workspace_id"]
}
