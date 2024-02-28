# Technical Documentation

## Parts

### 1. GUI
### 2. HTTP
### 3. TCP
### 4. Watcher

## GUI


## Others

### Bugs
1. Create workspace doesn't send HTTP request to server
2. BUG #2.0: Show Files func in GUI(js) not working (FIXED)
3. BUG #2.1: First file does not appear as a button, rather as an invisible text (FIXED)
4. BUG #2.1.2: Opening a file also causes the file (whose button does not appear and has invisible text) to open (FIXED)
5. BUG #3.1: Not receiving token

### Notes
1. A local storage should keep a list of all the monitored directories. So when the app restarts, those directories will be added to the watcher list  


### Commits/Features
1. COMMIT #1.0: Clicking on local folder leads to the files it contains


### Permission Changing/Setting
1. shared_workspaces table = new column 'permissions', bool
2. Default = False
3. can be changed
4. send http request carrying permission_name, userID and workspaceID in body
5. change and let the user know through tcp
6. send info in metadata and send random string as filedata
7. after receiving, the user's client will add the workspace name to watcher