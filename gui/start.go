package gui

import (
	"log"
	"net/http"
	"text/template"
)

// contains several user details
type Details struct {
	userToken    string
	userValidity bool
	authMessage  string
}

func home(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./templates/index.html"))
	tmpl.Execute(w, nil)
}

func (details *Details) login(w http.ResponseWriter, r *http.Request) {
	if !details.userValidity {
		http.Redirect(w, r, "/home", 307)
	}
	tmpl := template.Must(template.ParseFiles("./templates/login.html"))
	tmpl.Execute(w, nil)
}

func StartServer(msg string, authToken string, valid bool) {
	details := &Details{}
	mux := http.NewServeMux()

	mux.HandleFunc("/login", details.login)
	mux.HandleFunc("/home", home)
	err := http.ListenAndServe(":3000", mux)
	if err != nil {
		log.Fatal("Could Not Start App")
	}
}
