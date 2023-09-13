package tasks

import (
	"fmt"
	"os"
)

// create folder
func CreateWorkspaceDir(workspaceName string) {
	dir := "/home/aashab/" + workspaceName
	fmt.Println(dir)
	err := os.Mkdir(dir, 0755)
	if err != nil {
		fmt.Println("Error Creating Directory:\n", err)
	}

	// add this directory to watcher list

	// download files

}
