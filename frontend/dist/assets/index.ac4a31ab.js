(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerpolicy&&(o.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?o.credentials="include":n.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();function s(){return window.go.main.App.CheckAuthStatus()}function u(e){return window.go.main.App.Greet(e)}function a(e,t){return window.go.main.App.Login(e,t)}function d(e){return window.go.main.App.Nice(e)}function p(){try{s().then(e=>{e=="Already Logged In",i.innerText=e}).catch(e=>{console.error(e)})}catch(e){console.error(e)}}document.querySelector("#app").innerHTML=`
      <div class="result" id="result">Login</div>
      <div class="input-box" id="input-email">
        <input class="input" id="email" type="text" autocomplete="off" />
      </div>
      <br>
      
    <div class="input-box" id="input-password">
        <input class="input" id="password" type="password" autocomplete="off" />
    </div>
      <br>
    <button class="btn" onclick="login()">Submit</button>
    </div>
`;p();let i=document.getElementById("result"),f=document.getElementById("email"),m=document.getElementById("password");window.login=function(){let e=f.value,t=m.value;try{a(e,t).then(r=>{i.innerText=r}).catch(r=>{console.error(r)})}catch(r){console.error(r)}};window.nice=function(){let e=nameElement.value;if(e!=="")try{d(e).then(t=>{i.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};window.greet=function(){let e=nameElement.value;if(e!=="")try{u(e).then(t=>{i.innerText=t}).catch(t=>{console.error(t)})}catch(t){console.error(t)}};
