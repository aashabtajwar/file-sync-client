package api

import (
	"fmt"
	"os"

	"github.com/aashabtajwar/desktop-th/monitor"
)

func CreateWorkspace(dir string, name string, token string, endPoint string) string {
	// create a folder here
	// add it to the watchlist
	// send http request to create one remotely (in server)
	err := os.Mkdir(dir, 0755)
	// if dir already exists, inform the user
	if err != nil {
		fmt.Println("Error Creating Directory\n", err)
	}
	watcher := monitor.CreateWatcher()
	monitor.AddDirToWatcher(watcher, dir, name)
	requestString := fmt.Sprintf(`
	{
		"name" : "%s"
	}
	`, name)
	return makeRequest(requestString, endPoint, token)

}
