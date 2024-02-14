(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function u(){return window.go.main.App.AddContent()}function p(e,t){return window.go.main.App.AddUserWithEmail(e,t)}function f(){return window.go.main.App.CheckAuthStatus()}function m(e){return window.go.main.App.CreateWorkspace(e)}function a(){return window.go.main.App.Debug()}function h(e,t){return window.go.main.App.DisplayFiles(e,t)}function w(e,t){return window.go.main.App.DisplaySharedWorkspaceFiles(e,t)}function y(e,t){return window.go.main.App.DownloadSharedWorkspace(e,t)}function b(){return window.go.main.App.GetRemoteWorkspaces()}function v(){return window.go.main.App.GetSharedWorkspaces()}function g(e){return window.go.main.App.Greet(e)}function k(e,t){return window.go.main.App.Login(e,t)}function A(e){return window.go.main.App.Nice(e)}function E(e){return window.go.main.App.OpenFile(e)}let W="",l=`
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
        ${W}
    </div>
</div>
`;function d(){document.getElementById("app").innerHTML=l,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function S(){try{f().then(e=>{e=="Already Logged In"&&d(),s.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;S();window.viewSharedWorkspaces=function(){try{v().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}', '${n[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{})}catch(e){console.error(e)}};window.displaySharedWorkspaceFiles=function(e,t){a();try{w(e,t).then(n=>{a();let r=`<div style="display: table-cell" class="left-corner">
`;n.forEach(c=>{r+=`<button style="font-size:20px" onclick="openfile('')"><i class="fa fa-file" style="font-size:20px">  ${c[0]}</button>`}),r+="</div>";let o=n[0],i=`
<div>
                    <button onclick="downloadThisWorkspace('${o[1]}', '${o[2]}')">Download</button>
                <div>
                `;r+=i,document.querySelector("#app").innerHTML=l+`
`+r}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.downloadThisWorkspace=function(e,t){try{y(e,t)}catch(n){console.error(n)}};window.loadRemoteWorkspaces=function(){try{b().then(e=>{}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.addNewContent=function(){try{console.log("adding new content"),u().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(r=>{console.log(r),t+=`<button style="font-size:20px" onclick="dispFiles('${r[2]}', '${r[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>  ${r[0]}</button>
`}),t=t+"</div>",t+=`
<div>
                    <button onclick="openPrompt()">Create Workspace</button
                </div>`,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.openPrompt=function(){let e=prompt("Enter Workspace Name");m(e).then(t=>{addNewContent()}).catch(t=>{console.error(t)})};window.dispFiles=function(e,t){console.log(e,t);try{h(e,t).then(n=>{let r=`<div style="display: table-cell" class="left-corner">
`;n.forEach(i=>{r+=`<button style="font-size:20px" onclick="openfile('${i[1]}')"><i class="fa fa-file" style="font-size:20px">  ${i[0]}</button>`}),r+="</div>";let o=`
<div>
                    <button id='${n[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;r+=o,document.querySelector("#app").innerHTML=l+`
`+r}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.openfile=function(e){try{E(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};window.openUserAddPrompt=function(e){try{let t=prompt("Enter User Email");p(t,e).then(n=>{console.log(n)}).catch(n=>{console.error(n)})}catch(t){console.error(t)}};let s=document.getElementById("result"),L=document.getElementById("email"),C=document.getElementById("password");window.login=function(){let e=L.value,t=C.value;try{k(e,t).then(n=>{s.innerText=n,n=="Log In Successful!"&&d()}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{A(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{g(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
