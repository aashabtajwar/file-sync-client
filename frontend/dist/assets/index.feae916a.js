(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();function d(){return window.go.main.App.AddContent()}function u(){return window.go.main.App.CheckAuthStatus()}function p(e){return window.go.main.App.CreateWorkspace(e)}function f(e){return window.go.main.App.DisplayFiles(e)}function m(){return window.go.main.App.GetRemoteWorkspaces()}function v(e){return window.go.main.App.Greet(e)}function w(e,t){return window.go.main.App.Login(e,t)}function b(e){return window.go.main.App.Nice(e)}function h(e){return window.go.main.App.OpenFile(e)}let y="",s=`
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
            <div><button class="nav-button" onclick="loadRemoteWorkspaces()">Remote</button></div>
        </div>
        ${y}
    </div>
</div>
`;function a(){document.getElementById("app").innerHTML=s,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function g(){try{u().then(e=>{e=="Already Logged In"&&a(),c.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;g();window.loadRemoteWorkspaces=function(){try{m().then(e=>{}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.addNewContent=function(){try{console.log("adding new content"),d().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(i=>{t+=`<button style="font-size:20px" onclick="dispFiles('${i[2]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>  ${i[0]}</button>
`}),t=t+"</div>",t+=`
<div>
                    <button onclick="openPrompt()">Create Workspace</button
                </div>`,document.querySelector("#app").innerHTML=s+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.openPrompt=function(){let e=prompt("Enter Workspace Name");p(e).then(t=>{addNewContent()}).catch(t=>{console.error(t)})};window.dispFiles=function(e){try{console.log("HEREEEE"),f(e).then(t=>{let o=`<div style="display: table-cell" class="left-corner">
`;t.forEach(i=>{o+=`<button style="font-size:13px" onclick="openfile('${i[1]}')"><i class="fa fa-file" style="font-size:30px">  ${i[0]}</button>`}),o+="</div>",document.querySelector("#app").innerHTML=s+`
`+o}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.openfile=function(e){try{console.log("opening file..."),h(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};let c=document.getElementById("result"),k=document.getElementById("email"),E=document.getElementById("password");window.login=function(){let e=k.value,t=E.value;try{w(e,t).then(o=>{c.innerText=o,o=="Log In Successful!"&&a()}).catch(o=>{console.error(o)})}catch(o){console.error(o)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{b(e).then(t=>{c.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{v(e).then(t=>{c.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
