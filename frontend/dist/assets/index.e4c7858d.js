(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();function a(){return window.go.main.App.AddContent()}function d(){return window.go.main.App.CheckAuthStatus()}function u(e){return window.go.main.App.Greet(e)}function p(e,t){return window.go.main.App.Login(e,t)}function f(e){return window.go.main.App.Nice(e)}let m="",r=`
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
        ${m}
    </div>
</div>
`;function v(){document.getElementById("app").innerHTML=r,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function y(){try{d().then(e=>{e=="Already Logged In"&&v(),l.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;y();window.addNewContent=function(){try{a().then(e=>{let t='<div style="display: table-cell" class="left-corner">';e.forEach(o=>{t+=`<button style="font-size:20px" onclick="dispFiles()"><i class="fa fa-folder" style="font-size: 20px;"></i>  ${o[0]}</button>
  `}),t=t+"</div>",document.querySelector("#app").innerHTML=r+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.dispFiles=function(){try{DisplayFiles().then(e=>{let t='<div style="display: table-cell" class="left-corner"';e.forEach(o=>{t+=`<button style="font-size:13px"><i class="fa fa-folder" style="font-size:20px">  ${o}</button>`}),t+="</div>",document.querySelector("#app").innerHTML=r+`
`+t}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};window.showFiles=function(){try{ShowFiles().then(e=>{let t='<div style="display: table-cell" class="left-corner"';e.forEach(o=>{t+=`<button onclick="OpenFile()" style="font-size:13px"><i class="fa fa-folder" style="font-size:20px">  ${o}</button>`}),t+="</div>",document.querySelector("#app").innerHTML=r+`
`+t}).catch(e=>{console.error(e)})}catch{}};let l=document.getElementById("result"),b=document.getElementById("email"),h=document.getElementById("password");window.login=function(){let e=b.value,t=h.value;try{p(e,t).then(o=>{l.innerText=o}).catch(o=>{console.error(o)})}catch(o){console.error(o)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{f(e).then(t=>{l.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{u(e).then(t=>{l.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
