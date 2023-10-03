package monitor

import (
	"fmt"
	"log"
	"os"
	"strings"

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
}

func Watch() {
	watcher := CreateWatcher()
	// watcher, err := fsnotify.NewWatcher()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	defer watcher.Close()
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				log.Println("type of event: ", event.Op, " file dir: ", event.Name)
				// fmt.Println("file dir: ", event.Name)
				splitted := strings.Split(event.Name, "/")
				// secondSplit := strings.Split(splitted[len(splitted)-1], ".")
				// log.Println(secondSplit)

				// check if it is a stream
				if strings.Contains(splitted[len(splitted)-1], ".goutputstream") {
					// fmt.Println("in the middle of changing")
					// file is updated
					// send file
					// conn := tcp.SetUp()
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
					// if event.Op == "WRITE" {

					// }

					if event.Has(fsnotify.Write) {
						evenLog = append(evenLog, "reached")
						// fmt.Println("modified")
						// fmt.Println(len(evenLog))
						// send file
					}

					// file pasting and file changes
					if event.Op&fsnotify.Create == fsnotify.Create {
						fmt.Println("flow here: ", event.Name)
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
	AddDirToWatcher(watcher, "/home/aashab/code/src/github.com/aashabtajwar/desktop-th/samples")
	<-make(chan struct{})
}
