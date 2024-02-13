(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();function d(){return window.go.main.App.AddContent()}function u(e,t){return window.go.main.App.AddUserWithEmail(e,t)}function p(){return window.go.main.App.CheckAuthStatus()}function f(e){return window.go.main.App.CreateWorkspace(e)}function m(){return window.go.main.App.Debug()}function h(e,t){return window.go.main.App.DisplayFiles(e,t)}function w(e){return window.go.main.App.DisplaySharedWorkspaceFiles(e)}function y(){return window.go.main.App.GetRemoteWorkspaces()}function b(){return window.go.main.App.GetSharedWorkspaces()}function v(e){return window.go.main.App.Greet(e)}function g(e,t){return window.go.main.App.Login(e,t)}function k(e){return window.go.main.App.Nice(e)}function A(e){return window.go.main.App.OpenFile(e)}let E="",c=`
<div style="width: 100%; display: table">
    <div style="display: table-row; height: 100px">
        <div class="sidebar" style="width: 15%; display: table-cell">
            <div><button class="nav-button">All Files</button></div>
            <div><button class="nav-button">Photos</button></div>
            <div><button class="nav-button">Documents</button>
            <div><button class="nav-button">Presentations</button></div>
            <button class="nav-button" onclick="viewSharedWorkspaces()">Shared</button>
            <!-- Add more sidebar links as needed -->
            <div class="sep-line"></div>
            <div><button class="nav-button" onclick="addNewContent()">Local</button></div>
            <div><button class="nav-button" onclick="loadRemoteWorkspaces()">Remote</button></div>
        </div>
        ${E}
    </div>
</div>
`;function a(){document.getElementById("app").innerHTML=c,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function S(){try{p().then(e=>{e=="Already Logged In"&&a(),l.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;S();window.viewSharedWorkspaces=function(){try{b().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=c+`
`+t}).catch(e=>{})}catch(e){console.error(e)}};window.displaySharedWorkspaceFiles=function(e){try{w(e).then(t=>{m();let n=`<div style="display: table-cell" class="left-corner">
`;t.forEach(o=>{n+=`<button style="font-size:20px" onclick="openfile('')"><i class="fa fa-file" style="font-size:20px">  ${o}</button>`}),n+="</div>";let i=`
<div>
                    <button onclick="downloadThisWorkspace()">Download</button>
                <div>
                `;n+=createDownloadOption,document.querySelector("#app").innerHTML=c+`
`+n}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.loadRemoteWorkspaces=function(){try{y().then(e=>{}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.addNewContent=function(){try{console.log("adding new content"),d().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(i=>{console.log(i),t+=`<button style="font-size:20px" onclick="dispFiles('${i[2]}', '${i[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>  ${i[0]}</button>
`}),t=t+"</div>",t+=`
<div>
                    <button onclick="openPrompt()">Create Workspace</button
                </div>`,document.querySelector("#app").innerHTML=c+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.openPrompt=function(){let e=prompt("Enter Workspace Name");f(e).then(t=>{addNewContent()}).catch(t=>{console.error(t)})};window.dispFiles=function(e,t){console.log(e,t);try{h(e,t).then(n=>{let i=`<div style="display: table-cell" class="left-corner">
`;n.forEach(r=>{i+=`<button style="font-size:20px" onclick="openfile('${r[1]}')"><i class="fa fa-file" style="font-size:20px">  ${r[0]}</button>`}),i+="</div>";let o=`
<div>
                    <button id='${n[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;i+=o,document.querySelector("#app").innerHTML=c+`
`+i}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.openfile=function(e){try{A(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};window.openUserAddPrompt=function(e){try{let t=prompt("Enter User Email");u(t,e).then(n=>{console.log(n)}).catch(n=>{console.error(n)})}catch(t){console.error(t)}};let l=document.getElementById("result"),W=document.getElementById("email"),L=document.getElementById("password");window.login=function(){let e=W.value,t=L.value;try{g(e,t).then(n=>{l.innerText=n,n=="Log In Successful!"&&a()}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{k(e).then(t=>{l.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{v(e).then(t=>{l.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
