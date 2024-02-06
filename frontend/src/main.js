import './style.css';
import './app.css';
import './home.js';

import {Greet, AddContent, Nice, Login, CheckAuthStatus} from '../wailsjs/go/main/App';


let moreContent = '';
let navBar = `
<div style="width: 100%; display: table">
    <div style="display: table-row; height: 100px">
        <div class="sidebar" style="width: 15%; display: table-cell">
            <div><button class="nav-button">All Files</button></div>
            <div><button class="nav-button">Photos</button></div>
            <div><button class="nav-button">Documents</button>
            <div><button class="nav-button">Presentations</button></div>
            <button class="nav-button" onclick="facts()">Shared</button>
            <!-- Add more sidebar links as needed -->
            <div class="sep-line"></div>
            <div><button class="nav-button" onclick="addNewContent()">Local</button></div>
            <div><button class="nav-button">Remote</button></div>
        </div>
        ${moreContent}
    </div>
</div>
`
let fileContent = `

`

let localFolderContent = `
<div style="display: table-cell" class="left-corner">
    <button style="font-size:20px"><i class="fa fa-folder" style="font-size: 50px;"></i>  Folder 1</button>
  
    <button style="font-size:24px"><i class="fa fa-folder" style="font-size: 50px"></i></button>
    <button style="font-size:24px"><i class="fa fa-folder" style="font-size: 50px"></i></button>
</div>
`

let remoteFolderContent = ``


let allDocuments = ``



let allPhotos = ``


let mainContent = `
    <h1>MAIN CONTENT</h1>
`




function homePage() {
    document.getElementById('app').innerHTML = navBar;
    
    x = document.getElementById('app')
    // x.innerHTML = navBar
    // document.querySelector('#apptwo').innerHTML = mainContent;
    var newDiv = document.createElement("div")
    newDiv.setAttribute("class", "nav-button")
    newDiv.textContent = "Main Content Here"
    x.appendChild(newDiv);

}


function checkToken() {
    try {
        CheckAuthStatus()
            .then(result => {
                if (result == "Already Logged In") {
                    homePage()
                }
                resultElement.innerText = result;
            })
            .catch(err => {
                console.error(err);
            })
    } catch (err) {
        console.error(err)
    }
}


document.querySelector('#app').innerHTML = `
      <div class="result" id="result">Login</div>
      <div class="input-box" id="input-email">
        <input class="input" id="email" type="text" autocomplete="off" />
      </div>
      <br>
      
    <div class="input-box" id="input-password">
        <input class="input" id="password" type="password" autocomplete="off" />
    </div>
      <br>
    <button class="btn btn-primary" onclick="login()">Submit</button>
    </div>
`;

checkToken()




window.addNewContent = function() {
    try {
        AddContent()
            .then(result => {
                // let dirs = ""
                let dirs = `<div style="display: table-cell" class="left-corner">`
                result.forEach(dir => {
                    dirs = dirs + `<button style="font-size:13px"><i class="fa fa-folder" style="font-size:20px">  ${dir}</button>\n`
                });
                dirs = dirs + `</div>`
                // document.querySelector("#app").innerHTML = navBar + "\n" + localFolderContent
                document.querySelector('#app').innerHTML = navBar + "\n" + dirs;
            })
            .catch(err => {
                console.error(err)
            })
    } catch (err) {
        console.error(err)
    }
}







// document.getElementById('logo').src = logo;

// let nameElement = document.getElementById("name");
// nameElement.focus();



let resultElement = document.getElementById("result");
let emailElement = document.getElementById("email");
// emailElement.focus()
let passwordElement = document.getElementById("password");
// passwordElement.focus()
window.login = function() {
    let email = emailElement.value;
    let password = passwordElement.value;
    try {
        Login(email, password)
            .then((result) => {
                resultElement.innerText = result
            })
            .catch((err) => {
                console.error(err)
            })
    } catch (err) {
        console.error(err)
    }

}




window.nice = function () {

    // Get name
    let name = nameElement.value;

    // Check if the input is empty
    if (name === "") return;

    // Call App.Greet(name)
    try {
        Nice(name)
            .then((result) => {
                // Update result with data back from App.Greet()
                resultElement.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};



// Setup the greet function
window.greet = function () {

    // Get name
    let name = nameElement.value;

    // Check if the input is empty
    if (name === "") return;

    // Call App.Greet(name)
    try {
        Greet(name)
            .then((result) => {
                // Update result with data back from App.Greet()
                resultElement.innerText = result;
            })
            .catch((err) => {
                console.error(err);
            });
    } catch (err) {
        console.error(err);
    }
};
