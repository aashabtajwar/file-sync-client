package monitor

import (
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/fsnotify/fsnotify"
)

func addDirToWatcher(watcher *fsnotify.Watcher, dir string) {
	err := watcher.Add(dir)
	if err != nil {
		fmt.Println("Error Adding Directory to Watcher List\n", err)
	}
}

func Watch() {
	// writeOp := 0
	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				fmt.Println("file dir: ", event.Name)
				splitted := strings.Split(event.Name, "/")
				secondSplit := strings.Split(splitted[len(splitted)-1], ".")
				log.Println(secondSplit)

				// check if file or folder
				fi, err := os.Stat(event.Name)
				if err != nil {
					fmt.Println("Error checking stat of file\n", err)
				}
				switch mode := fi.Mode(); {
				case mode.IsDir():
					// a directory was created
					// add this to watcher list
					addDirToWatcher(watcher, event.Name)
				}

				if event.Has(fsnotify.Write) {
					fmt.Println("modified")
					// splitted := strings.Split(event.Name, "/")
					// log.Println(splitted[len(splitted)-1])
					// log.Println("Modified File: ", event.Name)
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				fmt.Println("Error: \n", err)
			}

		}
	}()
	err = watcher.Add("/home/aashab/code/src/github.com/aashabtajwar/desktop-th/samples")
	if err != nil {
		log.Fatal(err)
	}
	// Block main goroutine forever.
	<-make(chan struct{})
}
