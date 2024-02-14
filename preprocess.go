// preprocess some elements
// before sending them to GUI
package main

import (
	"fmt"
	"os"
	"strings"
)

func separateDirNames(dirs []string) [][]string {
	// var dirNamesOnly []string
	// var dirPaths []string
	var splitted [][]string
	for _, e := range dirs {
		splittedNames := strings.Split(e, " ")
		splitted = append(splitted, splittedNames)
		// dirNamesOnly = append(dirNamesOnly, splittedNames[0])
		// dirPaths = append(dirPaths, splittedNames[2])
	}
	return splitted
}

func getFileNames(path string, workspaceName string) [][]string {
	var fileNames [][]string
	entries, err := os.ReadDir(path)
	if err != nil {
		fmt.Println("Error fetching file names from dir\n", err)
	}
	for _, e := range entries {
		var entry []string
		entry = append(entry, e.Name())
		entry = append(entry, path+"/"+e.Name())
		entry = append(entry, workspaceName)
		fileNames = append(fileNames, entry)
	}
	return fileNames
}

func sortFileNamesFromPath(paths []string, workspaceName string, workspaceID string) [][]string {
	// also remove workspace prefixes
	var names [][]string
	for _, e := range paths {
		splitted := strings.Split(e, "/")
		name := splitted[len(splitted)-1]
		var n []string
		n = append(n, name)
		n = append(n, workspaceName)
		n = append(n, workspaceID)
		names = append(names, n)
	}
	return names
}

// func sharedWorkspaceDirs() [][]string {

// }
