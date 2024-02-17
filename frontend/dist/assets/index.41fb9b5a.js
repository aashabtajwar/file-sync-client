(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function p(){return window.go.main.App.AddContent()}function u(e,t){return window.go.main.App.AddUserWithEmail(e,t)}function f(){return window.go.main.App.CheckAuthStatus()}function m(e){return window.go.main.App.CreateWorkspace(e)}function a(){return window.go.main.App.Debug()}function h(e,t){return window.go.main.App.DisplayFiles(e,t)}function w(e,t){return window.go.main.App.DisplaySharedWorkspaceFiles(e,t)}function y(e,t){return window.go.main.App.DownloadSharedWorkspace(e,t)}function b(){return window.go.main.App.GetRemoteWorkspacesV2()}function v(){return window.go.main.App.GetSharedWorkspaces()}function g(e){return window.go.main.App.Greet(e)}function k(){return window.go.main.App.ListAllFiles()}function A(e){return window.go.main.App.ListSpecificFiles(e)}function S(e,t){return window.go.main.App.Login(e,t)}function E(e){return window.go.main.App.Nice(e)}function L(e){return window.go.main.App.OpenFile(e)}let W="",l=`
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
        ${W}
    </div>
</div>
`;function d(){document.getElementById("app").innerHTML=l,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function $(){try{f().then(e=>{e=="Already Logged In"&&d(),s.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;$();window.allDocs=function(e,t){try{A([e,t]).then(n=>{let o=`<div style="display: table-cell" class="left-corner">
`;n.forEach(r=>{o+=`<button style="font-size:20px" onclick="openfile('${r[1]}')"><i class="fa fa-file" style="font-size:20px">  ${r[0]}</button>`}),o+="</div>";let i=`
<div>
                    <button id='${n[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;o+=i,document.querySelector("#app").innerHTML=l+`
`+o}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.allFiles=function(){try{k().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{t+=`<button style="font-size:20px" onclick="openfile('${o[1]}')"><i class="fa fa-file" style="font-size:20px">  ${o[0]}</button>`}),t+="</div>";let n=`
<div>
                    <button id='${e[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;t+=n,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.viewSharedWorkspaces=function(){try{v().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}', '${n[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{})}catch(e){console.error(e)}};window.displaySharedWorkspaceFiles=function(e,t){a();try{w(e,t).then(n=>{a();let o=`<div style="display: table-cell" class="left-corner">
`;n.forEach(c=>{o+=`<button style="font-size:20px" onclick="openfile('')"><i class="fa fa-file" style="font-size:20px">  ${c[0]}</button>`}),o+="</div>";let i=n[0],r=`
<div>
                    <button onclick="downloadThisWorkspace('${i[1]}', '${i[2]}')">Download</button>
                <div>
                `;o+=r,document.querySelector("#app").innerHTML=l+`
`+o}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.downloadThisWorkspace=function(e,t){try{y(e,t)}catch(n){console.error(n)}};window.loadRemoteWorkspaces=function(){try{b().then(e=>{console.log(e);let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(n=>{t+=`<button style="font-size: 20px" onclick="displaySharedWorkspaceFiles('${n[1]}', '${n[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>${n[0]}</button>`}),t=t+"</div>",document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.addNewContent=function(){try{console.log("adding new content"),p().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{console.log(o),t+=`<button style="font-size:20px" onclick="dispFiles('${o[2]}', '${o[0]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>  ${o[0]}</button>
`}),t=t+"</div>",t+=`
<div>
                    <button onclick="openPrompt()">Create Workspace</button
                </div>`,document.querySelector("#app").innerHTML=l+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.openPrompt=function(){let e=prompt("Enter Workspace Name");m(e).then(t=>{addNewContent()}).catch(t=>{console.error(t)})};window.dispFiles=function(e,t){console.log(e,t);try{h(e,t).then(n=>{let o=`<div style="display: table-cell" class="left-corner">
`;n.forEach(c=>{o+=`<button style="font-size:20px" onclick="openfile('${c[1]}')"><i class="fa fa-file" style="font-size:20px">  ${c[0]}</button>`}),o+="</div>";let i=`
<div>
                    <button id='${n[0][2]}' onclick="openUserAddPrompt(this.id)">Add User</button
                </div>`;o+=i,o+=`
<div>
                    <button id="" onclick="viewUsers()">Check Users</button>
                `,document.querySelector("#app").innerHTML=l+`
`+o}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.openfile=function(e){try{L(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};window.openUserAddPrompt=function(e){try{let t=prompt("Enter User Email");u(t,e).then(n=>{console.log(n)}).catch(n=>{console.error(n)})}catch(t){console.error(t)}};let s=document.getElementById("result"),F=document.getElementById("email"),T=document.getElementById("password");window.login=function(){let e=F.value,t=T.value;try{S(e,t).then(n=>{s.innerText=n,n=="Log In Successful!"&&d()}).catch(n=>{console.error(n)})}catch(n){console.error(n)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{E(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{g(e).then(t=>{s.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
