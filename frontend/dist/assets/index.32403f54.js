(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function u(){return window.go.main.App.AddContent()}function f(e,t){return window.go.main.App.AddUserWithEmail(e,t)}function m(){return window.go.main.App.CheckAuthStatus()}function h(e){return window.go.main.App.CreateWorkspace(e)}function d(){return window.go.main.App.Debug()}function y(e,t){return window.go.main.App.DisplayFiles(e,t)}function w(e,t){return window.go.main.App.DisplaySharedWorkspaceFiles(e,t)}function b(e,t){return window.go.main.App.DownloadSharedWorkspace(e,t)}function v(){return window.go.main.App.GetRemoteWorkspacesV2()}function g(){return window.go.main.App.GetSharedWorkspaces()}function k(e){return window.go.main.App.Greet(e)}function A(){return window.go.main.App.ListAllFiles()}function E(e){return window.go.main.App.ListSpecificFiles(e)}function S(e,t){return window.go.main.App.Login(e,t)}function L(e){return window.go.main.App.Nice(e)}function W(e){return window.go.main.App.OpenFile(e)}function T(e,t,n,o,i){return window.go.main.App.Register(e,t,n,o,i)}let $="",l=`
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
        ${$}
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
    `;document.querySelector("#app").innerHTML=e};window.register=function(){let e=document.getElementById("fname").value,t=document.getElementById("lname").value,n=document.getElementById("username").value,o=document.getElementById("r-email").value,i=document.getElementById("r-password").value;try{T(e,t,n,o,i).then(r=>{}).catch(r=>{console.error(r)})}catch(r){console.error(r)}};function p(){document.getElementById("app").innerHTML=l,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function F(){try{m().then(e=>{e=="Already Logged In"&&p(),s.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;F();window.allDocs=function(e,t){try{E([e,t]).then(n=>{let o=`<div style="display: table-cell" class="left-corner">
`;n.forEach(r=>{o+=`<button style="font-size:20px" onclick="openfile('${r[1]}')"><i class="fa fa-file" style="font-size:20px">  ${r[0]}</button>`}),o+="</div>";let i=`
<div>
                    <button id='${n[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;o+=i,document.querySelector("#app").innerHTML=l+`
`+o}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.allFiles=function(){try{A().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{t+=`<button style="font-size:20px" onclick="openfile('${o[1]}')"><i class="fa fa-file" style="font-size:20px">  ${o[0]}</button>`}),t+="</div>";let n=`
<div>
                    <button id='${e[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;t+=n,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.viewSharedWorkspaces=function(){try{g().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}', '${n[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{})}catch(e){console.error(e)}};window.displaySharedWorkspaceFiles=function(e,t){d();try{w(e,t).then(n=>{d();let o=`<div style="display: table-cell" class="left-corner">
`;n.forEach(c=>{o+=`<button style="font-size:20px" onclick="openfile('')"><i class="fa fa-file" style="font-size:20px">  ${c[0]}</button>`}),o+="</div>";let i=n[0],r=`
<div>
                    <button onclick="downloadThisWorkspace('${i[1]}', '${i[2]}')">Download</button>
                <div>
                `;o+=r,document.querySelector("#app").innerHTML=l+`
`+o}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.downloadThisWorkspace=function(e,t){try{b(e,t)}catch(n){console.error(n)}};window.loadRemoteWorkspaces=function(){try{v().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}', '${n[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.addNewContent=function(){try{console.log("adding new content"),u().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{console.log(o),t+=`<button style="font-size:20px" onclick="dispFiles('${o[2]}', '${o[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>  ${o[0]}</button>
`}),t=t+"</div>",t+=`
<div>
                    <button onclick="openPrompt()">Create Workspace</button
                </div>`,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.openPrompt=function(){let e=prompt("Enter Workspace Name");h(e).then(t=>{addNewContent()}).catch(t=>{console.error(t)})};window.dispFiles=function(e,t){console.log(e,t);try{y(e,t).then(n=>{if(n[0][0]=="0")document.querySelector("#app").innerHTML=l;else{let o=`<div style="display: table-cell" class="left-corner">
`;n[0].length!=0&&n.forEach(a=>{o+=`<button style="font-size:20px" onclick="openfile('${a[1]}')"><i class="fa fa-file" style="font-size:20px">  ${a[0]}</button>`}),o+="</div>";let i=`
<div>
                        <button id='${n[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                    </div>`;o+=i,o+=`
<div>
                        <button id="" onclick="viewUsers()">Check Users</button>
                    `,o+=`
<div>
                    <form action="">
                        <input type="file" id="myFile" name="filename">
                        <input type="submit">
                    </form>
                    
                    `,document.querySelector("#app").innerHTML=l+`
`+o}}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.openfile=function(e){try{W(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};window.openUserAddPrompt=function(e){try{let t=prompt("Enter User Email");f(t,e).then(n=>{console.log(n)}).catch(n=>{console.error(n)})}catch(t){console.error(t)}};let s=document.getElementById("result"),D=document.getElementById("email"),C=document.getElementById("password");window.login=function(){let e=D.value,t=C.value;try{S(e,t).then(n=>{s.innerText=n,n=="Log In Successful!"&&p()}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{L(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{k(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
