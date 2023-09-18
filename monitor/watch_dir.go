package monitor

import (
	"fmt"
	"log"
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
				// spliited := strings.Split(event.(string), ": ")
				fmt.Println("Name of the Event: ", event)

				splitted := strings.Split(event.Name, "/")
				secondSplit := strings.Split(splitted[len(splitted)-1], ".")
				log.Println(secondSplit)

				if event.Has(fsnotify.Write) {
					splitted := strings.Split(event.Name, "/")
					log.Println(splitted[len(splitted)-1])
					log.Println("Modified File: ", event.Name)
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
