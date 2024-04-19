# File Synchronization System Client
Code for the Desktop Application of File Synchronization System. For the server, check [here](https://github.com/aashabtajwar/file-sync-server).

# Installation
1. Make sure to have Go in your system. You can install it from [here](https://go.dev/doc/install).
2. Clone this repository
```
git clone git@github.com:aashabtajwar/file-sync-client.git
```
3. Use `go mod tidy`. This will install necessary packages.
4. Use `go run main.go` or `go build main.go` with `./main` to start the server.

**Note**
You might need additional linux packages for Wails to work. They will be shown to you when you try to run the application.

<!-- # System Design
The design discussed here only covers the Backend side of the application. For 

## System Architecture -->

# Features
- File storage and sharing: Store files and share them with other users. This is done using workspaces.
- Real time file synchronization: Shared users will receive real-time updates whenever a file from source computer is updated. The changes are made right in to the shared users' computers. Therefore, they can view the updated versions without visiting and downloading from the browser.
- Desktop Notifications: Users get notifications whenever shared files are updated and when another user has shared a workspace.

# Further Notes
## Features to Expect in Future
The client still has more features that are yet to be implemented. These include 
- Better UI
- Setting Permissions
- Opening files internally from the desktop client


## 