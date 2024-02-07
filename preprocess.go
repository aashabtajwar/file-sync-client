// preprocess some elements
// before sending them to GUI
package main

import "strings"

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
