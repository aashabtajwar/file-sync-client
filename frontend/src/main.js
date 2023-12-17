import './style.css';
import './app.css';

// import logo from './assets/images/logo-universal.png';
import {Greet, Nice, Login, CheckAuthStatus} from '../wailsjs/go/main/App';


// var homePage = `

// `

function homePage() {
    document.querySelector('#app').innerHTML = `
        <div class="sidebar">
            <a href="#">All Files</a>
            <a href="#">Photos</a>
            <a href="#">Documents</a>
            <a href="#">Presentations</a>
            <a href="#" onclick="facts()">Shared</a>
            <!-- Add more sidebar links as needed -->
        </div>

    
    `;
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



window.facts = function() {
    console.log("Show files")
    try {} catch(er) {console.error(er)}
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
