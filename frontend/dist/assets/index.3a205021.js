(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();function a(){return window.go.main.App.AddContent()}function d(){return window.go.main.App.CheckAuthStatus()}function u(e){return window.go.main.App.Greet(e)}function p(e,t){return window.go.main.App.Login(e,t)}function m(e){return window.go.main.App.Nice(e)}let f="",c=`
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
        ${f}
    </div>
</div>
`,v=`
<div style="display: table-cell" class="left">
    <button style="font-size:24px"><i class="fa fa-folder" style="font-size: 50px"></i></button>
</div>
`;function b(){document.getElementById("app").innerHTML=c,x=document.getElementById("app");var e=document.createElement("div");e.setAttribute("class","nav-button"),e.textContent="Main Content Here",x.appendChild(e)}function y(){try{d().then(e=>{e=="Already Logged In"&&b(),r.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
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
`;y();window.addNewContent=function(){try{a().then(e=>{document.querySelector("#app").innerHTML=c+`
`+v}).catch(e=>{console.error(e)})}catch(e){console.error(e)}};let r=document.getElementById("result"),h=document.getElementById("email"),w=document.getElementById("password");window.login=function(){let e=h.value,t=w.value;try{p(e,t).then(i=>{r.innerText=i}).catch(i=>{console.error(i)})}catch(i){console.error(i)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{m(e).then(t=>{r.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{u(e).then(t=>{r.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
