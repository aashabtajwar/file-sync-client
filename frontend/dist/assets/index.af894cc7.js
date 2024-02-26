(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();function p(){return window.go.main.App.AddContent()}function u(e,t){return window.go.main.App.AddUserWithEmail(e,t)}function f(){return window.go.main.App.CheckAuthStatus()}function m(e){return window.go.main.App.CreateWorkspace(e)}function a(){return window.go.main.App.Debug()}function b(e,t){return window.go.main.App.DisplayFiles(e,t)}function h(e,t){return window.go.main.App.DisplaySharedWorkspaceFiles(e,t)}function y(e,t){return window.go.main.App.DownloadSharedWorkspace(e,t)}function v(){return window.go.main.App.GetRemoteWorkspacesV2()}function w(){return window.go.main.App.GetSharedWorkspaces()}function g(e){return window.go.main.App.Greet(e)}function k(){return window.go.main.App.ListAllFiles()}function A(e){return window.go.main.App.ListSpecificFiles(e)}function S(e,t){return window.go.main.App.Login(e,t)}function L(e){return window.go.main.App.Nice(e)}function E(e){return window.go.main.App.OpenFile(e)}function $(e,t,o,n,i){return window.go.main.App.Register(e,t,o,n,i)}let W={".txt":"Text",".docx":"Word/Document",".ppt":"Presentation",".pptx":"Presentation",".pdf":"Document",".py":"Python/Code",".c":"C/Code",".cpp":"C++/Code",".cc":"C++/Code",".js":"JavaScript",rb:"Ruby/Code",".go":"Go/Code",".jpg":"Image",".jpeg":"Image",".png":"Image",".gif":"GIF",".zip":"ZIP",".mp4":"Video",".m4v":"Video",".m4p":"Video",".mov":"Video",".sql":"SQL File"},C="",l=`
<div style="width: 100%; display: table">
    <div style="display: table-row; height: 100px">
        <div class="sidebar" style="width: 15%; display: table-cell">
            <div><button class="nav-button" onclick="allFiles()">All Files</button></div>
            <div><button class="nav-button" onclick="allDocs('jpg', 'png')">Photos</button></div>
            <div><button class="nav-button" onclick="allDocs('pdf', 'docx')">Documents</button>
            <div><button class="nav-button" onclick="allDocs('pptx', 'ppt')">Presentations</button></div>
            <button class="nav-button" onclick="viewSharedWorkspaces()">Shared</button>
            <!-- Add more sidebar links as needed -->
            <div class="sep-line"></div>
            <div><button class="nav-button" onclick="addNewContent()">Local</button></div>
            <div><button class="nav-button" onclick="loadRemoteWorkspaces()">Remote</button></div>
        </div>
        ${C}
    </div>
</div>
`;window.registrationPage=function(){let e=`
    <div class="" id="">Registration</div>
    <div class="" id="r-">
        <input class="" id="fname" type="text" autocomplete="off" placeholder="First Name" />
    </div>
    <br>
    <div class="" id="r-">
        <input class="" id="lname" type="text" autocomplete="off" placeholder="Last Name" />
    </div>
    <br>
    <div class="" id="r-">
        <input class="" id="username" type="text" autocomplete="off" placeholder="Username" />
    </div>
    <br>
    <div class="" id="r-">
        <input class="" id="r-email" type="text" autocomplete="off" placeholder="Email" />
    </div>
    <br>
    <div class="" id="r-">
        <input class="" id="r-password" type="password" autocomplete="off" placeholder="Password" />
    </div>
    <br>
    <br>
    <a href='#' onclick="loginPage();">Login</a>
      <br>
      <br>
      <br>
    <button class="btn btn-primary" onclick="register()">Submit</button>
    </div>
    `;document.querySelector("#app").innerHTML=e};window.register=function(){let e=document.getElementById("fname").value,t=document.getElementById("lname").value,o=document.getElementById("username").value,n=document.getElementById("r-email").value,i=document.getElementById("r-password").value;try{$(e,t,o,n,i).then(r=>{F(r+". Log into your account.")}).catch(r=>{console.error(r)})}catch(r){console.error(r)}};function F(e){document.querySelector("#app").innerHTML=`
      <div class="result" id="result">${e}</div>
      <div class="input-box" id="input-email">
        <input class="input" id="email" type="text" autocomplete="off" />
      </div>
      <br>
      
    <div class="input-box" id="input-password">
        <input class="input" id="password" type="password" autocomplete="off" />
    </div>
    <br>
    <a href='#' onclick="registrationPage();">Register</a>
      <br>
      <br>
    <button class="btn btn-primary" onclick="login()">Submit</button>
    </div>
`}function d(){document.getElementById("app").innerHTML=l,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function P(){try{f().then(e=>{e=="Already Logged In"&&d(),s.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
      <div class="result" id="result">Login</div>
      <div class="input-box" id="input-email">
        <input class="input" id="email" type="text" autocomplete="off" />
      </div>
      <br>
      
    <div class="input-box" id="input-password">
        <input class="input" id="password" type="password" autocomplete="off" />
    </div>
    <br>
    <a href='#' onclick="registrationPage();">Register</a>
      <br>
      <br>
    <button class="btn btn-primary" onclick="login()">Submit</button>
    </div>
`;P();window.allDocs=function(e,t){try{A([e,t]).then(o=>{let n=`<div style="display: table-cell" class="left-corner">
`;o.forEach(r=>{n+=`<button style="font-size:20px" onclick="openfile('${r[1]}')"><i class="fa fa-file" style="font-size:20px">  ${r[0]}</button>`}),n+="</div>";let i=`
<div>
                    <button id='${o[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;n+=i,document.querySelector("#app").innerHTML=l+`
`+n}).catch(o=>{console.error(o)})}catch(o){console.error(o)}};window.allFiles=function(){try{k().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size:20px" onclick="openfile('${n[1]}')"><i class="fa fa-file" style="font-size:20px">  ${n[0]}</button>`}),t+="</div>";let o=`
<div>
                    <button id='${e[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;t+=o,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.viewSharedWorkspaces=function(){try{w().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${o[1]}', '${o[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${o[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{})}catch(e){console.error(e)}};window.displaySharedWorkspaceFiles=function(e,t){a();try{h(e,t).then(o=>{a();let n=`<div style="display: table-cell" class="left-corner">
`;o.forEach(c=>{n+=`<button style="font-size:20px" onclick="openfile('')"><i class="fa fa-file" style="font-size:20px">  ${c[0]}</button>`}),n+="</div>";let i=o[0],r=`
<div>
                    <button onclick="downloadThisWorkspace('${i[1]}', '${i[2]}')">Download</button>
                <div>
                `;n+=r,document.querySelector("#app").innerHTML=l+`
`+n}).catch(o=>{console.error(o)})}catch(o){console.error(o)}};window.downloadThisWorkspace=function(e,t){try{y(e,t)}catch(o){console.error(o)}};window.loadRemoteWorkspaces=function(){try{v().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${o[1]}', '${o[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${o[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.addNewContent=function(){try{console.log("adding new content"),p().then(e=>{let t=`<div style="display: table-cell" class="left-corner"><h1 class="workspace-heading" align="left">Local</h1>
<ul>
`;e.forEach(n=>{console.log(n),t+=`
                    <li align="left">
                        <div class="parent">
                            <div class="child inline-block-child">
                                <button class="text-left button-width-prop" style="font-size:20px" onclick="dispFiles('${n[2]}', '${n[0]}')"><i class="text-left fa fa-folder" style="font-size: 20px;"></i>  ${n[0]}</button>
                                <time class="date-property">24-01-2023</time>
                            </div>
                        </div>
                    </li>
                    <br>
`}),t+=`

                <li>
                <div>
                    <button onclick="openPrompt()">Create Workspace</button
                </div>
                </li>
                </ul>
                </div>
                `,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.openPrompt=function(){let e=prompt("Enter Workspace Name");m(e).then(t=>{addNewContent()}).catch(t=>{console.error(t)})};window.dispFiles=function(e,t){console.log(e,t);try{b(e,t).then(o=>{if(o[0][0]=="0")document.querySelector("#app").innerHTML=l;else{let n=`<div style="display: table-cell" class="left-corner">
                            <h1 class="workspace-heading" align="left">${o[0][0]}</h1><ul>
                            <!-- <button class="add-user-button" id='${o[1][2]}' onclick="openUserAddPrompt(this.id)">Add User</button> -->
                    
`,i=0;o[0].length!=0&&o.forEach(r=>{i>0&&(n+=`
                                <li align="left">
                                    <div class="parent">
                                        <div class="child inline-block-child">
                                            <button class="text-left button-width-prop-two" onclick="openfile('${r[1]}')"><i class="fa fa-file"> ${r[0]}</button>
                                            <!-- <time class="file-type bordered-text">${W["."+r[2]]}</time>
                                            <button class="version-button-1">Versions</button> -->
                                        </div>
                                    </div>
                                </li>    
                                <br>
`),i+=1}),n+="</div></ul>",document.querySelector("#app").innerHTML=l+`
`+n}}).catch(o=>{console.error(o)})}catch(o){console.error(o)}};window.openfile=function(e){try{E(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};window.openUserAddPrompt=function(e){try{let t=prompt("Enter User Email");u(t,e).then(o=>{console.log(o)}).catch(o=>{console.error(o)})}catch(t){console.error(t)}};let s=document.getElementById("result"),T=document.getElementById("email"),D=document.getElementById("password");window.login=function(){let e=T.value,t=D.value;try{S(e,t).then(o=>{s.innerText=o,o=="Log In Successful!"&&d()}).catch(o=>{console.error(o)})}catch(o){console.error(o)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{L(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{g(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
