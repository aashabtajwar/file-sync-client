(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();function a(){return window.go.main.App.AddContent()}function d(){return window.go.main.App.CheckAuthStatus()}function u(e){return window.go.main.App.DisplayFiles(e)}function p(e){return window.go.main.App.Greet(e)}function f(e,t){return window.go.main.App.Login(e,t)}function m(e){return window.go.main.App.Nice(e)}function v(e){return window.go.main.App.OpenFile(e)}let b="",s=`
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
        ${b}
    </div>
</div>
`;function y(){document.getElementById("app").innerHTML=s,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function h(){try{d().then(e=>{e=="Already Logged In"&&y(),l.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;h();window.addNewContent=function(){try{console.log("adding new content"),a().then(e=>{let t=`<div style="display: table-cell" class="left-corner">
`;e.forEach(o=>{t+=`<button style="font-size:20px" onclick="dispFiles('${o[2]}')"><i class="fa fa-folder" style="font-size: 20px;"></i>  ${o[0]}</button>
`}),t=t+"</div>",document.querySelector("#app").innerHTML=s+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.dispFiles=function(e){try{console.log("HEREEEE"),u(e).then(t=>{let o='<div style="display: table-cell" class="left-corner"';t.forEach(r=>{o+=`<button style="font-size:13px" onclick="openfile('${r[1]}')"><i class="fa fa-folder" style="font-size:20px">  ${r[0]}</button>`}),o+="</div>",document.querySelector("#app").innerHTML=s+`
`+o}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.openfile=function(e){try{console.log("opening file..."),v(e).then(t=>{console.log(t)}).catch(t=>{})}catch(t){console.error(t)}};let l=document.getElementById("result"),w=document.getElementById("email"),g=document.getElementById("password");window.login=function(){let e=w.value,t=g.value;try{f(e,t).then(o=>{l.innerText=o}).catch(o=>{console.error(o)})}catch(o){console.error(o)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{m(e).then(t=>{l.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{p(e).then(t=>{l.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
