package monitor

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/aashabtajwar/desktop-th/tcp"
	"github.com/fsnotify/fsnotify"
)

var evenLog []string

// the watcher list will only contain on watcher
var watcherList []*fsnotify.Watcher

func CreateWatcher() *fsnotify.Watcher {
	// check if there is watcher in the list
	if len(watcherList) == 1 {
		return watcherList[0]
	}
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		fmt.Println("Error creating new watcher")
	}
	watcherList = append(watcherList, watcher)
	return watcher
}

func AddDirToWatcher(watcher *fsnotify.Watcher, dir string) {
	err := watcher.Add(dir)
	if err != nil {
		fmt.Println("Error Adding Directory to Watcher List\n", err)
	}
	file, err := os.OpenFile("storage/dirs.txt", os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		fmt.Println("Error Opening File for storage dirs\n", err)
	}
	defer file.Close()
	if _, err := file.WriteString(dir + "\n"); err != nil {
		fmt.Println("Error Storing Dir name to file\n", err)
	}

}

func Watch() {
	watcher := CreateWatcher()
	defer watcher.Close()
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				log.Println("type of event: ", event.Op, " file dir: ", event.Name)
				splitted := strings.Split(event.Name, "/")
				// secondSplit := strings.Split(splitted[len(splitted)-1], ".")

				// check if it is a stream
				if strings.Contains(splitted[len(splitted)-1], ".goutputstream") {

				} else {

					// check if file or folder
					fi, err := os.Stat(event.Name)
					if err != nil {
						fmt.Println("Error checking stat of file\n", err)
					}
					switch mode := fi.Mode(); {
					case mode.IsDir():
						// a directory was created
						// add this to watcher list
						AddDirToWatcher(watcher, event.Name)
					}

					if event.Has(fsnotify.Write) {
						evenLog = append(evenLog, "reached")
					}

					// file pasting and file changes
					if event.Op&fsnotify.Create == fsnotify.Create {
						workspaceDir := splitted[len(splitted)-2]
						fileName := strings.Split(splitted[len(splitted)-1], ".")
						mimeType := fileName[len(fileName)-1]
						f := strings.Split(event.Name, "/")
						name := f[len(f)-1]
						tcp.SendFile(name, event.Name, workspaceDir, mimeType)

					}

				}

			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				fmt.Println("Error: \n", err)
			}

		}
	}()

	AddDirToWatcher(watcher, "/home/aashab/works")
	<-make(chan struct{})
}
