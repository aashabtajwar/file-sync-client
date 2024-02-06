// preprocess some elements
// before sending them to GUI
package main

import "strings"

func separateDirNames(dirs []string) []string {
	var dirNamesOnly []string
	for _, e := range dirs {
		splittedNames := strings.Split(e, " ")
		dirNamesOnly = append(dirNamesOnly, splittedNames[0])
	}
	return dirNamesOnly
}
