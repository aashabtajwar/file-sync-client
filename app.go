package main

import (
	"context"
	"fmt"

	"github.com/aashabtajwar/desktop-th/api"
	"github.com/aashabtajwar/desktop-th/tokens"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// func (a *App) Tester() string {
// 	return fmt.Sprintf("tested")
// }

func (a *App) CheckAuthStatus() string {
	// first check local storage for token
	authToken = tokens.ReadTokenFromStorage()
	if authToken == "" {
		return "Log In To Continue"
	} else {
		res := api.Validate(authToken)
		if res == "Token has expired" {
			return "Credentials expired. Please log in again"
		} else {
			// if token is still valid, move to home page
			return "Already Logged In"
		}
	}
	return ""
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	// return fmt.Sprintf("Hello %s, It's show time!", name)
	return fmt.Sprintf("Whatever man")
}

func (a *App) Nice(name string) string {
	fmt.Println("Here")
	return fmt.Sprintf("Nevermind man")
}

// login user
func (a *App) Login(email string, password string) string {
	res := api.Login(email, password)
	return res
	// return fmt.Sprintf("Your Email: %s. And your password: %s", email, password)
}

func (a *App) AddContent() []string {
	// bring the list of local repositories
	dirs := fetchWorkspaces()
	fmt.Println(dirs)
	return dirs
}
