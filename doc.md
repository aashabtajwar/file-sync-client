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
2. BUG #2.0: Show Files func in GUI(js) not working
3. BUG #2.1: First file does not appear as a button, rather as an invisible text
4. BUG #2.1.2: Opening a file also causes the file (whose button does not appear and has invisible text) to open

### Notes
1. A local storage should keep a list of all the monitored directories. So when the app restarts, those directories will be added to the watcher list  


### Commits/Features
1. COMMIT #1.0: Clicking on local folder leads to the files it contains