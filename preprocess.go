// preprocess some elements
// before sending them to GUI
package main

import "strings"

func separateDirNames(dirs []string) ([]string, []string) {
	var dirNamesOnly []string
	var dirPaths []string
	for _, e := range dirs {
		splittedNames := strings.Split(e, " ")
		dirNamesOnly = append(dirNamesOnly, splittedNames[0])
		dirPaths = append(dirPaths, splittedNames[2])
	}
	return dirNamesOnly, dirPaths
}
