(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function p(){return window.go.main.App.AddContent()}function u(e,t){return window.go.main.App.AddUserWithEmail(e,t)}function f(e){return window.go.main.App.ArrayDebug(e)}function m(){return window.go.main.App.CheckAuthStatus()}function h(e){return window.go.main.App.CreateWorkspace(e)}function c(e){return window.go.main.App.Debug(e)}function b(e,t){return window.go.main.App.DisplayFiles(e,t)}function y(e){return window.go.main.App.DisplaySharedUsers(e)}function v(e,t){return window.go.main.App.DisplaySharedWorkspaceFiles(e,t)}function w(e,t){return window.go.main.App.DownloadSharedWorkspace(e,t)}function g(){return window.go.main.App.GetRemoteWorkspacesV2()}function k(){return window.go.main.App.GetSharedWorkspaces()}function A(e){return window.go.main.App.Greet(e)}function S(){return window.go.main.App.ListAllFiles()}function L(e){return window.go.main.App.ListSpecificFiles(e)}function E(e,t){return window.go.main.App.Login(e,t)}function $(e){return window.go.main.App.Nice(e)}function W(e){return window.go.main.App.OpenFile(e)}function C(e,t,n,o,i){return window.go.main.App.Register(e,t,n,o,i)}let D={".txt":"Text",".docx":"Word/Document",".ppt":"Presentation",".pptx":"Presentation",".pdf":"Document",".py":"Python/Code",".c":"C/Code",".cpp":"C++/Code",".cc":"C++/Code",".js":"JavaScript",rb:"Ruby/Code",".go":"Go/Code",".jpg":"Image",".jpeg":"Image",".png":"Image",".gif":"GIF",".zip":"ZIP",".mp4":"Video",".m4v":"Video",".m4p":"Video",".mov":"Video",".sql":"SQL File"},F="",l=`
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
        ${F}
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
    `;document.querySelector("#app").innerHTML=e};window.register=function(){let e=document.getElementById("fname").value,t=document.getElementById("lname").value,n=document.getElementById("username").value,o=document.getElementById("r-email").value,i=document.getElementById("r-password").value;try{C(e,t,n,o,i).then(r=>{T(r+". Log into your account.")}).catch(r=>{console.error(r)})}catch(r){console.error(r)}};function T(e){document.querySelector("#app").innerHTML=`
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
`}function d(){document.getElementById("app").innerHTML=l,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function P(){try{m().then(e=>{e=="Already Logged In"&&d(),a.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;P();window.allDocs=function(e,t){try{L([e,t]).then(n=>{let o=`<div style="display: table-cell" class="left-corner">
`;n.forEach(r=>{o+=`<button style="font-size:20px" onclick="openfile('${r[1]}')"><i class="fa fa-file" style="font-size:20px">  ${r[0]}</button>`}),o+="</div>";let i=`
<div>
                    <button id='${n[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;o+=i,document.querySelector("#app").innerHTML=l+`
`+o}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.allFiles=function(){try{S().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{t+=`<button style="font-size:20px" onclick="openfile('${o[1]}')"><i class="fa fa-file" style="font-size:20px">  ${o[0]}</button>`}),t+="</div>";let n=`
<div>
                    <button id='${e[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;t+=n,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.viewSharedWorkspaces=function(){try{k().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}', '${n[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{})}catch(e){console.error(e)}};window.displaySharedWorkspaceFiles=function(e,t){c();try{v(e,t).then(n=>{c();let o=`<div style="display: table-cell" class="left-corner">
`;n.forEach(s=>{o+=`<button style="font-size:20px" onclick="openfile('')"><i class="fa fa-file" style="font-size:20px">  ${s[0]}</button>`}),o+="</div>";let i=n[0],r=`
<div>
                    <button onclick="downloadThisWorkspace('${i[1]}', '${i[2]}')">Download</button>
                <div>
                `;o+=r,document.querySelector("#app").innerHTML=l+`
`+o}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.downloadThisWorkspace=function(e,t){try{w(e,t)}catch(n){console.error(n)}};window.loadRemoteWorkspaces=function(){try{g().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}', '${n[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.addNewContent=function(){try{console.log("adding new content"),p().then(e=>{let t=`<div style="display: table-cell" class="left-corner"><h1 class="workspace-heading" align="left">Local</h1>
<ul>
`;e.forEach(o=>{console.log(o),t+=`
                    <li align="left">
                        <div class="parent">
                            <div class="child inline-block-child">
                                <button class="text-left button-width-prop" style="font-size:20px" onclick="dispFiles('${o[2]}', '${o[0]}')"><i class="text-left fa fa-folder" style="font-size: 20px;"></i>  ${o[0]}</button>
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
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.openPrompt=function(){let e=prompt("Enter Workspace Name");h(e).then(t=>{addNewContent()}).catch(t=>{console.error(t)})};window.showUsers=function(e){try{c("jjjj"),y(e).then(t=>{c("111"),c("over"),f(t[0]);let n=`
                    <div style="display: table-cell" class="left-corner">
                        <h2 class="workspace-heading" align="left">Shared Users</h2>

                    `;if(t.shift(),t[0].length!=0)for(let o=0;o<t.length;o++)c(t[o][0]),n+=`
                            <li align="left">
                                <div class="parent">
                                    <div class="child inline-block-child">
                                        <h3 class="">${t[o][0]}</h3>
                                        <!-- drop down here -->
                                    </div>
                                </div>
                            </li>    
                            <br>
`;document.querySelector("#app").innerHTML=l+n}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.dispFiles=function(e,t){console.log(e,t);try{b(e,t).then(n=>{if(n[0][0]=="0")document.querySelector("#app").innerHTML=l;else{let o=`<div style="display: table-cell" class="left-corner">
                            <h1 class="workspace-heading" align="left">${n[0][0]}</h1><ul>
                            <button class="right-corner add-user-button" id='${n[1][3]}' onclick="openUserAddPrompt(this.id)">Add User</button>
                            <button onclick="showUsers('${n[1][3]}')">Show Shared Users</button>
                            
                    
`;if(n.shift(),n[0].length!=0)for(let i=0;i<n.length;i++)o+=`
                            <li align="left">
                                <div class="parent">
                                    <div class="child inline-block-child">
                                        <button class="text-left button-width-prop" onclick="openfile('${n[i][1]}')"><i class="fa fa-file"> ${n[i][0]}</button>
                                        <time class="date-property">${D["."+n[i][2]]}</time>
                                        <!-- <button class="version-button-1">Versions</button> -->
                                    </div>
                                </div>
                            </li>    
                            <br>
`;o+="</div></ul>",document.querySelector("#app").innerHTML=l+`
`+o}}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.openfile=function(e){try{W(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};window.openUserAddPrompt=function(e){try{let t=prompt("Enter User Email");u(t,e).then(n=>{console.log(n)}).catch(n=>{console.error(n)})}catch(t){console.error(t)}};let a=document.getElementById("result"),I=document.getElementById("email"),U=document.getElementById("password");window.login=function(){let e=I.value,t=U.value;try{E(e,t).then(n=>{a.innerText=n,n=="Log In Successful!"&&d()}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{$(e).then(t=>{a.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{A(e).then(t=>{a.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
