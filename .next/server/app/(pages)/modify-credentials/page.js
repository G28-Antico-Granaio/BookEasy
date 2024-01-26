(()=>{var e={};e.id=804,e.ids=[804],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},95:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>c,originalPathname:()=>d,pages:()=>h,routeModule:()=>p,tree:()=>u});var s=r(482),i=r(9108),n=r(2563),a=r.n(n),o=r(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let u=["",{children:["(pages)",{children:["modify-credentials",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,18)),"C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\(pages)\\modify-credentials\\page.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3871))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,2461)),"C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3871))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],h=["C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\(pages)\\modify-credentials\\page.tsx"],d="/(pages)/modify-credentials/page",c={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(pages)/modify-credentials/page",pathname:"/modify-credentials",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},6042:(e,t,r)=>{Promise.resolve().then(r.bind(r,5428))},5428:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x});var s=r(5344),i=r(3729),n=r.n(i),a=r(1103),o=r(398),l=r(4478),u=r(3990),h=r(8194),d=r(2254),c=r(3608),p=r(4065),m=r(659),f=r.n(m);let{Option:g}=a.default,x=function(){let[e]=o.Z.useForm(),t=(0,d.useRouter)(),[r,i]=n().useState(!1);n().useEffect(()=>{(async()=>{try{let t=localStorage.getItem("email")||"",r=(await c.Z.get(`/api/user/${t}`)).data.data;e.setFieldsValue({name:r.name,surname:r.surname,tel_number:r.tel_number,tel_area_code:r.tel_area_code,email:r.email})}catch(e){l.ZP.error(e.response.data.message)}})()},[e]);let m=async e=>{try{i(!0);let r=localStorage.getItem("email")||"";await c.Z.post(`/api/modify-credentials/${r}`,e),l.ZP.success("Modifica delle Credenziali effettuata"),localStorage.setItem("email",e.email),t.push("/private-area")}catch(e){return p.Z.json({message:e.message},{status:400})}finally{i(!1)}},x=s.jsx(o.Z.Item,{name:"tel_area_code",noStyle:!0,children:(0,s.jsxs)(a.default,{children:[s.jsx(g,{value:"39",children:"+39"}),s.jsx(g,{value:"44",children:"+44"}),s.jsx(g,{value:"49",children:"+49"})]})});return s.jsx("section",{className:"container",children:s.jsx("div",{className:f().form,children:(0,s.jsxs)(o.Z,{name:"register",form:e,onFinish:m,scrollToFirstError:!0,children:[s.jsx("h2",{children:"Modifica Credenziali"}),s.jsx("hr",{}),s.jsx(o.Z.Item,{name:"name",rules:[{required:!0,message:"Inserisci il tuo nome"}],children:s.jsx(u.Z,{placeholder:"Nome",style:{height:"3rem"}})}),s.jsx(o.Z.Item,{name:"surname",rules:[{required:!0,message:"Inserisci il tuo Cognome"}],children:s.jsx(u.Z,{placeholder:"Cognome",style:{height:"3rem"}})}),s.jsx(o.Z.Item,{className:f().numb,name:"tel_number",rules:[{required:!0,message:"Inserisci il tuo Numero di Telefono"}],children:s.jsx(u.Z,{addonBefore:x,placeholder:"Numnero di Telefono",style:{width:"75%"}})}),s.jsx(o.Z.Item,{name:"email",rules:[{type:"email",message:"E-Mail inserita non \xe8 valida"},{required:!0,message:"Inserire un indirizzo E-Mail"}],children:s.jsx(u.Z,{placeholder:"E-Mail",style:{height:"3rem"}})}),s.jsx(h.ZP,{htmlType:"submit",block:!0,loading:r,children:"Conferma le Modifiche"})]})})})}},9243:e=>{"use strict";var t=Object.defineProperty,r=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,i=Object.prototype.hasOwnProperty,n={};function a(e){var t;let r=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean);return`${e.name}=${encodeURIComponent(null!=(t=e.value)?t:"")}; ${r.join("; ")}`}function o(e){let t=new Map;for(let r of e.split(/; */)){if(!r)continue;let e=r.indexOf("=");if(-1===e){t.set(r,"true");continue}let[s,i]=[r.slice(0,e),r.slice(e+1)];try{t.set(s,decodeURIComponent(null!=i?i:"true"))}catch{}}return t}function l(e){var t,r;if(!e)return;let[[s,i],...n]=o(e),{domain:a,expires:l,httponly:d,maxage:c,path:p,samesite:m,secure:f,priority:g}=Object.fromEntries(n.map(([e,t])=>[e.toLowerCase(),t]));return function(e){let t={};for(let r in e)e[r]&&(t[r]=e[r]);return t}({name:s,value:decodeURIComponent(i),domain:a,...l&&{expires:new Date(l)},...d&&{httpOnly:!0},..."string"==typeof c&&{maxAge:Number(c)},path:p,...m&&{sameSite:u.includes(t=(t=m).toLowerCase())?t:void 0},...f&&{secure:!0},...g&&{priority:h.includes(r=(r=g).toLowerCase())?r:void 0}})}((e,r)=>{for(var s in r)t(e,s,{get:r[s],enumerable:!0})})(n,{RequestCookies:()=>d,ResponseCookies:()=>c,parseCookie:()=>o,parseSetCookie:()=>l,stringifyCookie:()=>a}),e.exports=((e,n,a,o)=>{if(n&&"object"==typeof n||"function"==typeof n)for(let a of s(n))i.call(e,a)||void 0===a||t(e,a,{get:()=>n[a],enumerable:!(o=r(n,a))||o.enumerable});return e})(t({},"__esModule",{value:!0}),n);var u=["strict","lax","none"],h=["low","medium","high"],d=class{constructor(e){this._parsed=new Map,this._headers=e;let t=e.get("cookie");if(t)for(let[e,r]of o(t))this._parsed.set(e,{name:e,value:r})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed);if(!e.length)return r.map(([e,t])=>t);let s="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(([e])=>e===s).map(([e,t])=>t)}has(e){return this._parsed.has(e)}set(...e){let[t,r]=1===e.length?[e[0].name,e[0].value]:e,s=this._parsed;return s.set(t,{name:t,value:r}),this._headers.set("cookie",Array.from(s).map(([e,t])=>a(t)).join("; ")),this}delete(e){let t=this._parsed,r=Array.isArray(e)?e.map(e=>t.delete(e)):t.delete(e);return this._headers.set("cookie",Array.from(t).map(([e,t])=>a(t)).join("; ")),r}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},c=class{constructor(e){var t,r,s;this._parsed=new Map,this._headers=e;let i=null!=(s=null!=(r=null==(t=e.getSetCookie)?void 0:t.call(e))?r:e.get("set-cookie"))?s:[];for(let e of Array.isArray(i)?i:function(e){if(!e)return[];var t,r,s,i,n,a=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,n=!1;l();)if(","===(r=e.charAt(o))){for(s=o,o+=1,l(),i=o;o<e.length&&"="!==(r=e.charAt(o))&&";"!==r&&","!==r;)o+=1;o<e.length&&"="===e.charAt(o)?(n=!0,o=i,a.push(e.substring(t,s)),t=o):o=s+1}else o+=1;(!n||o>=e.length)&&a.push(e.substring(t,e.length))}return a}(i)){let t=l(e);t&&this._parsed.set(t.name,t)}}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed.values());if(!e.length)return r;let s="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(e=>e.name===s)}has(e){return this._parsed.has(e)}set(...e){let[t,r,s]=1===e.length?[e[0].name,e[0].value,e[0]]:e,i=this._parsed;return i.set(t,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:t,value:r,...s})),function(e,t){for(let[,r]of(t.delete("set-cookie"),e)){let e=a(r);t.append("set-cookie",e)}}(i,this._headers),this}delete(...e){let[t,r,s]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0].path,e[0].domain];return this.set({name:t,path:r,domain:s,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(a).join("; ")}}},4065:(e,t,r)=>{"use strict";Object.defineProperty(t,"Z",{enumerable:!0,get:function(){return s.NextResponse}});let s=r(6260)},6557:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NextURL",{enumerable:!0,get:function(){return h}});let s=r(9463),i=r(6395),n=r(6944),a=r(3730),o=/(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;function l(e,t){return new URL(String(e).replace(o,"localhost"),t&&String(t).replace(o,"localhost"))}let u=Symbol("NextURLInternal");class h{constructor(e,t,r){let s,i;"object"==typeof t&&"pathname"in t||"string"==typeof t?(s=t,i=r||{}):i=r||t||{},this[u]={url:l(e,s??i.base),options:i,basePath:""},this.analyze()}analyze(){var e,t,r,i,o;let l=(0,a.getNextPathnameInfo)(this[u].url.pathname,{nextConfig:this[u].options.nextConfig,parseData:!0,i18nProvider:this[u].options.i18nProvider}),h=(0,n.getHostname)(this[u].url,this[u].options.headers);this[u].domainLocale=this[u].options.i18nProvider?this[u].options.i18nProvider.detectDomainLocale(h):(0,s.detectDomainLocale)(null==(t=this[u].options.nextConfig)?void 0:null==(e=t.i18n)?void 0:e.domains,h);let d=(null==(r=this[u].domainLocale)?void 0:r.defaultLocale)||(null==(o=this[u].options.nextConfig)?void 0:null==(i=o.i18n)?void 0:i.defaultLocale);this[u].url.pathname=l.pathname,this[u].defaultLocale=d,this[u].basePath=l.basePath??"",this[u].buildId=l.buildId,this[u].locale=l.locale??d,this[u].trailingSlash=l.trailingSlash}formatPathname(){return(0,i.formatNextPathnameInfo)({basePath:this[u].basePath,buildId:this[u].buildId,defaultLocale:this[u].options.forceLocale?void 0:this[u].defaultLocale,locale:this[u].locale,pathname:this[u].url.pathname,trailingSlash:this[u].trailingSlash})}formatSearch(){return this[u].url.search}get buildId(){return this[u].buildId}set buildId(e){this[u].buildId=e}get locale(){return this[u].locale??""}set locale(e){var t,r;if(!this[u].locale||!(null==(r=this[u].options.nextConfig)?void 0:null==(t=r.i18n)?void 0:t.locales.includes(e)))throw TypeError(`The NextURL configuration includes no locale "${e}"`);this[u].locale=e}get defaultLocale(){return this[u].defaultLocale}get domainLocale(){return this[u].domainLocale}get searchParams(){return this[u].url.searchParams}get host(){return this[u].url.host}set host(e){this[u].url.host=e}get hostname(){return this[u].url.hostname}set hostname(e){this[u].url.hostname=e}get port(){return this[u].url.port}set port(e){this[u].url.port=e}get protocol(){return this[u].url.protocol}set protocol(e){this[u].url.protocol=e}get href(){let e=this.formatPathname(),t=this.formatSearch();return`${this.protocol}//${this.host}${e}${t}${this.hash}`}set href(e){this[u].url=l(e),this.analyze()}get origin(){return this[u].url.origin}get pathname(){return this[u].url.pathname}set pathname(e){this[u].url.pathname=e}get hash(){return this[u].url.hash}set hash(e){this[u].url.hash=e}get search(){return this[u].url.search}set search(e){this[u].url.search=e}get password(){return this[u].url.password}set password(e){this[u].url.password=e}get username(){return this[u].url.username}set username(e){this[u].url.username=e}get basePath(){return this[u].basePath}set basePath(e){this[u].basePath=e.startsWith("/")?e:`/${e}`}toString(){return this.href}toJSON(){return this.href}[Symbol.for("edge-runtime.inspect.custom")](){return{href:this.href,origin:this.origin,protocol:this.protocol,username:this.username,password:this.password,host:this.host,hostname:this.hostname,port:this.port,pathname:this.pathname,search:this.search,searchParams:this.searchParams,hash:this.hash}}clone(){return new h(String(this),this[u].options)}}},5807:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RequestCookies:function(){return s.RequestCookies},ResponseCookies:function(){return s.ResponseCookies}});let s=r(9243)},6260:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NextResponse",{enumerable:!0,get:function(){return u}});let s=r(6557),i=r(6950),n=r(5807),a=Symbol("internal response"),o=new Set([301,302,303,307,308]);function l(e,t){var r;if(null==e?void 0:null==(r=e.request)?void 0:r.headers){if(!(e.request.headers instanceof Headers))throw Error("request.headers must be an instance of Headers");let r=[];for(let[s,i]of e.request.headers)t.set("x-middleware-request-"+s,i),r.push(s);t.set("x-middleware-override-headers",r.join(","))}}class u extends Response{constructor(e,t={}){super(e,t),this[a]={cookies:new n.ResponseCookies(this.headers),url:t.url?new s.NextURL(t.url,{headers:(0,i.toNodeOutgoingHttpHeaders)(this.headers),nextConfig:t.nextConfig}):void 0}}[Symbol.for("edge-runtime.inspect.custom")](){return{cookies:this.cookies,url:this.url,body:this.body,bodyUsed:this.bodyUsed,headers:Object.fromEntries(this.headers),ok:this.ok,redirected:this.redirected,status:this.status,statusText:this.statusText,type:this.type}}get cookies(){return this[a].cookies}static json(e,t){let r=Response.json(e,t);return new u(r.body,r)}static redirect(e,t){let r="number"==typeof t?t:(null==t?void 0:t.status)??307;if(!o.has(r))throw RangeError('Failed to execute "redirect" on "response": Invalid status code');let s="object"==typeof t?t:{},n=new Headers(null==s?void 0:s.headers);return n.set("Location",(0,i.validateURL)(e)),new u(null,{...s,headers:n,status:r})}static rewrite(e,t){let r=new Headers(null==t?void 0:t.headers);return r.set("x-middleware-rewrite",(0,i.validateURL)(e)),l(t,r),new u(null,{...t,headers:r})}static next(e){let t=new Headers(null==e?void 0:e.headers);return t.set("x-middleware-next","1"),l(e,t),new u(null,{...e,headers:t})}}},6950:(e,t)=>{"use strict";function r(e){let t=new Headers;for(let[r,s]of Object.entries(e))for(let e of Array.isArray(s)?s:[s])void 0!==e&&("number"==typeof e&&(e=e.toString()),t.append(r,e));return t}function s(e){var t,r,s,i,n,a=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,n=!1;l();)if(","===(r=e.charAt(o))){for(s=o,o+=1,l(),i=o;o<e.length&&"="!==(r=e.charAt(o))&&";"!==r&&","!==r;)o+=1;o<e.length&&"="===e.charAt(o)?(n=!0,o=i,a.push(e.substring(t,s)),t=o):o=s+1}else o+=1;(!n||o>=e.length)&&a.push(e.substring(t,e.length))}return a}function i(e){let t={},r=[];if(e)for(let[i,n]of e.entries())"set-cookie"===i.toLowerCase()?(r.push(...s(n)),t[i]=1===r.length?r[0]:r):t[i]=n;return t}function n(e){try{return String(new URL(String(e)))}catch(t){throw Error(`URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,{cause:t})}}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{fromNodeOutgoingHttpHeaders:function(){return r},splitCookiesString:function(){return s},toNodeOutgoingHttpHeaders:function(){return i},validateURL:function(){return n}})},6944:(e,t)=>{"use strict";function r(e,t){let r;if((null==t?void 0:t.host)&&!Array.isArray(t.host))r=t.host.toString().split(":",1)[0];else{if(!e.hostname)return;r=e.hostname}return r.toLowerCase()}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getHostname",{enumerable:!0,get:function(){return r}})},9463:(e,t)=>{"use strict";function r(e,t,r){if(e)for(let n of(r&&(r=r.toLowerCase()),e)){var s,i;if(t===(null==(s=n.domain)?void 0:s.split(":",1)[0].toLowerCase())||r===n.defaultLocale.toLowerCase()||(null==(i=n.locales)?void 0:i.some(e=>e.toLowerCase()===r)))return n}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"detectDomainLocale",{enumerable:!0,get:function(){return r}})},7015:(e,t)=>{"use strict";function r(e,t){let r;let s=e.split("/");return(t||[]).some(t=>!!s[1]&&s[1].toLowerCase()===t.toLowerCase()&&(r=t,s.splice(1,1),e=s.join("/")||"/",!0)),{pathname:e,detectedLocale:r}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"normalizeLocalePath",{enumerable:!0,get:function(){return r}})},7992:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addLocale",{enumerable:!0,get:function(){return n}});let s=r(1870),i=r(6050);function n(e,t,r,n){if(!t||t===r)return e;let a=e.toLowerCase();return!n&&((0,i.pathHasPrefix)(a,"/api")||(0,i.pathHasPrefix)(a,"/"+t.toLowerCase()))?e:(0,s.addPathPrefix)(e,"/"+t)}},7585:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addPathSuffix",{enumerable:!0,get:function(){return i}});let s=r(2244);function i(e,t){if(!e.startsWith("/")||!t)return e;let{pathname:r,query:i,hash:n}=(0,s.parsePath)(e);return""+r+t+i+n}},6395:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"formatNextPathnameInfo",{enumerable:!0,get:function(){return o}});let s=r(4310),i=r(1870),n=r(7585),a=r(7992);function o(e){let t=(0,a.addLocale)(e.pathname,e.locale,e.buildId?void 0:e.defaultLocale,e.ignorePrefix);return(e.buildId||!e.trailingSlash)&&(t=(0,s.removeTrailingSlash)(t)),e.buildId&&(t=(0,n.addPathSuffix)((0,i.addPathPrefix)(t,"/_next/data/"+e.buildId),"/"===e.pathname?"index.json":".json")),t=(0,i.addPathPrefix)(t,e.basePath),!e.buildId&&e.trailingSlash?t.endsWith("/")?t:(0,n.addPathSuffix)(t,"/"):(0,s.removeTrailingSlash)(t)}},3730:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getNextPathnameInfo",{enumerable:!0,get:function(){return a}});let s=r(7015),i=r(9181),n=r(6050);function a(e,t){var r,a;let{basePath:o,i18n:l,trailingSlash:u}=null!=(r=t.nextConfig)?r:{},h={pathname:e,trailingSlash:"/"!==e?e.endsWith("/"):u};o&&(0,n.pathHasPrefix)(h.pathname,o)&&(h.pathname=(0,i.removePathPrefix)(h.pathname,o),h.basePath=o);let d=h.pathname;if(h.pathname.startsWith("/_next/data/")&&h.pathname.endsWith(".json")){let e=h.pathname.replace(/^\/_next\/data\//,"").replace(/\.json$/,"").split("/"),r=e[0];h.buildId=r,d="index"!==e[1]?"/"+e.slice(1).join("/"):"/",!0===t.parseData&&(h.pathname=d)}if(l){let e=t.i18nProvider?t.i18nProvider.analyze(h.pathname):(0,s.normalizeLocalePath)(h.pathname,l.locales);h.locale=e.detectedLocale,h.pathname=null!=(a=e.pathname)?a:h.pathname,!e.detectedLocale&&h.buildId&&(e=t.i18nProvider?t.i18nProvider.analyze(d):(0,s.normalizeLocalePath)(d,l.locales)).detectedLocale&&(h.locale=e.detectedLocale)}return h}},9181:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"removePathPrefix",{enumerable:!0,get:function(){return i}});let s=r(6050);function i(e,t){if(!(0,s.pathHasPrefix)(e,t))return e;let r=e.slice(t.length);return r.startsWith("/")?r:"/"+r}},18:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>a});let s=(0,r(6843).createProxy)(String.raw`C:\Users\aless\Desktop\uni\BookEasy\app\(pages)\modify-credentials\page.tsx`),{__esModule:i,$$typeof:n}=s,a=s.default}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,742,106,194,608,990,103,65],()=>r(95));module.exports=s})();