(function(){"use strict";var e={5989:function(e,n,t){var r=t(9963),o=t(6252);function i(e,n){const t=(0,o.up)("router-view");return(0,o.wg)(),(0,o.j4)(t)}var a=t(3744);const u={},c=(0,a.Z)(u,[["render",i]]);var f=c,s=t(26),l=(t(4415),t(2201));const d=()=>Promise.all([t.e(103),t.e(658),t.e(636)]).then(t.bind(t,8636)),p=()=>Promise.all([t.e(103),t.e(658),t.e(898)]).then(t.bind(t,7695)),m=()=>Promise.all([t.e(658),t.e(723)]).then(t.bind(t,3708)),h=()=>Promise.all([t.e(103),t.e(1)]).then(t.bind(t,8001)),g=()=>Promise.all([t.e(103),t.e(658),t.e(149)]).then(t.bind(t,5823)),v=()=>Promise.all([t.e(103),t.e(658),t.e(486)]).then(t.bind(t,5223)),b=(0,l.p7)({history:(0,l.PO)(),routes:[{path:"/",redirect:"login"},{path:"/login",name:"login",component:d},{path:"/register",name:"register",component:p},{path:"/home",name:"home",component:m,children:[{path:"",component:h},{path:"my_posts",component:g},{path:"add-new-post",component:v}]}]});var y=b;const k=(0,r.ri)(f);y.beforeEach(((e,n,t)=>{"login"===e.name?(sessionStorage.clear(),t()):"register"===e.name||void 0!==sessionStorage.getItem("token")&&null!==sessionStorage.getItem("token")&&null!==sessionStorage.getItem("token")?t():t({name:"login"})})),k.use(s.Z).use(y).mount("#app")}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={exports:{}};return e[r].call(i.exports,i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,r,o,i){if(!r){var a=1/0;for(s=0;s<e.length;s++){r=e[s][0],o=e[s][1],i=e[s][2];for(var u=!0,c=0;c<r.length;c++)(!1&i||a>=i)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(u=!1,i<a&&(a=i));if(u){e.splice(s--,1);var f=o();void 0!==f&&(n=f)}}return n}i=i||0;for(var s=e.length;s>0&&e[s-1][2]>i;s--)e[s]=e[s-1];e[s]=[r,o,i]}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+e+"."+{1:"f45ad995",103:"3775a084",149:"aa957f18",486:"7bf14f5d",636:"35227391",658:"b56b5f84",723:"f9fa70da",898:"6c9619cd"}[e]+".js"}}(),function(){t.miniCssF=function(e){return"css/"+e+"."+{149:"de0f91bd",486:"1d0153b6",636:"70584360",723:"3aa65f4e",898:"7eed9b1a"}[e]+".css"}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="secboard:";t.l=function(r,o,i,a){if(e[r])e[r].push(o);else{var u,c;if(void 0!==i)for(var f=document.getElementsByTagName("script"),s=0;s<f.length;s++){var l=f[s];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==n+i){u=l;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,t.nc&&u.setAttribute("nonce",t.nc),u.setAttribute("data-webpack",n+i),u.src=r),e[r]=[o];var d=function(n,t){u.onerror=u.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(t)})),n)return n(t)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,n,t,r,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var a=function(t){if(i.onerror=i.onload=null,"load"===t.type)r();else{var a=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.href||n,c=new Error("Loading CSS chunk "+e+" failed.\n("+u+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=u,i.parentNode&&i.parentNode.removeChild(i),o(c)}};return i.onerror=i.onload=a,i.href=n,t?t.parentNode.insertBefore(i,t.nextSibling):document.head.appendChild(i),i},n=function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var o=t[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===n))return o}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){o=a[r],i=o.getAttribute("data-href");if(i===e||i===n)return o}},r=function(r){return new Promise((function(o,i){var a=t.miniCssF(r),u=t.p+a;if(n(a,u))return o();e(r,u,null,o,i)}))},o={143:0};t.f.miniCss=function(e,n){var t={149:1,486:1,636:1,723:1,898:1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=r(e).then((function(){o[e]=0}),(function(n){throw delete o[e],n})))}}}(),function(){var e={143:0};t.f.j=function(n,r){var o=t.o(e,n)?e[n]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(t,r){o=e[n]=[t,r]}));r.push(o[2]=i);var a=t.p+t.u(n),u=new Error,c=function(r){if(t.o(e,n)&&(o=e[n],0!==o&&(e[n]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;u.message="Loading chunk "+n+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};t.l(a,c,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var o,i,a=r[0],u=r[1],c=r[2],f=0;if(a.some((function(n){return 0!==e[n]}))){for(o in u)t.o(u,o)&&(t.m[o]=u[o]);if(c)var s=c(t)}for(n&&n(r);f<a.length;f++)i=a[f],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(s)},r=self["webpackChunksecboard"]=self["webpackChunksecboard"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(5989)}));r=t.O(r)})();
//# sourceMappingURL=app.3e2d89e5.js.map