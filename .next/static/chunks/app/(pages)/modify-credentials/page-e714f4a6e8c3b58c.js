(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[804],{6357:function(e,t,r){Promise.resolve().then(r.bind(r,6880))},6880:function(e,t,r){"use strict";r.r(t);var n=r(7437),s=r(2265),i=r(6364),a=r(9858),o=r(2483),l=r(6250),u=r(6572),h=r(4033),c=r(2173),d=r(9874),f=r(253),p=r.n(f);let{Option:m}=i.default;t.default=function(){let[e]=a.Z.useForm(),t=(0,h.useRouter)(),[r,f]=s.useState(!1);s.useEffect(()=>{(async()=>{try{let t=localStorage.getItem("email")||"",r=(await c.Z.get("/api/user/".concat(t))).data.data;e.setFieldsValue({name:r.name,surname:r.surname,tel_number:r.tel_number,tel_area_code:r.tel_area_code,email:r.email})}catch(e){o.ZP.error(e.response.data.message)}})()},[e]);let g=async e=>{try{f(!0);let r=localStorage.getItem("email")||"";await c.Z.post("/api/modify-credentials/".concat(r),e),o.ZP.success("Modifica delle Credenziali effettuata"),localStorage.setItem("email",e.email),t.push("/private-area")}catch(e){return d.Z.json({message:e.message},{status:400})}finally{f(!1)}},b=(0,n.jsx)(a.Z.Item,{name:"tel_area_code",noStyle:!0,children:(0,n.jsxs)(i.default,{children:[(0,n.jsx)(m,{value:"39",children:"+39"}),(0,n.jsx)(m,{value:"44",children:"+44"}),(0,n.jsx)(m,{value:"49",children:"+49"})]})});return(0,n.jsx)("section",{className:"container",children:(0,n.jsx)("div",{className:p().form,children:(0,n.jsxs)(a.Z,{name:"register",form:e,onFinish:g,scrollToFirstError:!0,children:[(0,n.jsx)("h2",{children:"Modifica Credenziali"}),(0,n.jsx)("hr",{}),(0,n.jsx)(a.Z.Item,{name:"name",rules:[{required:!0,message:"Inserisci il tuo nome"}],children:(0,n.jsx)(l.Z,{placeholder:"Nome",style:{height:"3rem"}})}),(0,n.jsx)(a.Z.Item,{name:"surname",rules:[{required:!0,message:"Inserisci il tuo Cognome"}],children:(0,n.jsx)(l.Z,{placeholder:"Cognome",style:{height:"3rem"}})}),(0,n.jsx)(a.Z.Item,{className:p().numb,name:"tel_number",rules:[{required:!0,message:"Inserisci il tuo Numero di Telefono"}],children:(0,n.jsx)(l.Z,{addonBefore:b,placeholder:"Numnero di Telefono",style:{width:"75%"}})}),(0,n.jsx)(a.Z.Item,{name:"email",rules:[{type:"email",message:"E-Mail inserita non \xe8 valida"},{required:!0,message:"Inserire un indirizzo E-Mail"}],children:(0,n.jsx)(l.Z,{placeholder:"E-Mail",style:{height:"3rem"}})}),(0,n.jsx)(u.ZP,{htmlType:"submit",block:!0,loading:r,children:"Conferma le Modifiche"})]})})})}},6830:function(e,t){"use strict";function r(e,t){let r;if((null==t?void 0:t.host)&&!Array.isArray(t.host))r=t.host.toString().split(":",1)[0];else{if(!e.hostname)return;r=e.hostname}return r.toLowerCase()}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getHostname",{enumerable:!0,get:function(){return r}})},5366:function(e,t){"use strict";function r(e,t,r){if(e)for(let i of(r&&(r=r.toLowerCase()),e)){var n,s;if(t===(null==(n=i.domain)?void 0:n.split(":",1)[0].toLowerCase())||r===i.defaultLocale.toLowerCase()||(null==(s=i.locales)?void 0:s.some(e=>e.toLowerCase()===r)))return i}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"detectDomainLocale",{enumerable:!0,get:function(){return r}})},1123:function(e,t){"use strict";function r(e,t){let r;let n=e.split("/");return(t||[]).some(t=>!!n[1]&&n[1].toLowerCase()===t.toLowerCase()&&(r=t,n.splice(1,1),e=n.join("/")||"/",!0)),{pathname:e,detectedLocale:r}}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"normalizeLocalePath",{enumerable:!0,get:function(){return r}})},7393:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addLocale",{enumerable:!0,get:function(){return i}});let n=r(1312),s=r(7027);function i(e,t,r,i){if(!t||t===r)return e;let a=e.toLowerCase();return!i&&((0,s.pathHasPrefix)(a,"/api")||(0,s.pathHasPrefix)(a,"/"+t.toLowerCase()))?e:(0,n.addPathPrefix)(e,"/"+t)}},7084:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addPathSuffix",{enumerable:!0,get:function(){return s}});let n=r(6506);function s(e,t){if(!e.startsWith("/")||!t)return e;let{pathname:r,query:s,hash:i}=(0,n.parsePath)(e);return""+r+t+s+i}},3531:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"formatNextPathnameInfo",{enumerable:!0,get:function(){return o}});let n=r(5868),s=r(1312),i=r(7084),a=r(7393);function o(e){let t=(0,a.addLocale)(e.pathname,e.locale,e.buildId?void 0:e.defaultLocale,e.ignorePrefix);return(e.buildId||!e.trailingSlash)&&(t=(0,n.removeTrailingSlash)(t)),e.buildId&&(t=(0,i.addPathSuffix)((0,s.addPathPrefix)(t,"/_next/data/"+e.buildId),"/"===e.pathname?"index.json":".json")),t=(0,s.addPathPrefix)(t,e.basePath),!e.buildId&&e.trailingSlash?t.endsWith("/")?t:(0,i.addPathSuffix)(t,"/"):(0,n.removeTrailingSlash)(t)}},2339:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getNextPathnameInfo",{enumerable:!0,get:function(){return a}});let n=r(1123),s=r(7323),i=r(7027);function a(e,t){var r,a;let{basePath:o,i18n:l,trailingSlash:u}=null!=(r=t.nextConfig)?r:{},h={pathname:e,trailingSlash:"/"!==e?e.endsWith("/"):u};o&&(0,i.pathHasPrefix)(h.pathname,o)&&(h.pathname=(0,s.removePathPrefix)(h.pathname,o),h.basePath=o);let c=h.pathname;if(h.pathname.startsWith("/_next/data/")&&h.pathname.endsWith(".json")){let e=h.pathname.replace(/^\/_next\/data\//,"").replace(/\.json$/,"").split("/"),r=e[0];h.buildId=r,c="index"!==e[1]?"/"+e.slice(1).join("/"):"/",!0===t.parseData&&(h.pathname=c)}if(l){let e=t.i18nProvider?t.i18nProvider.analyze(h.pathname):(0,n.normalizeLocalePath)(h.pathname,l.locales);h.locale=e.detectedLocale,h.pathname=null!=(a=e.pathname)?a:h.pathname,!e.detectedLocale&&h.buildId&&(e=t.i18nProvider?t.i18nProvider.analyze(c):(0,n.normalizeLocalePath)(c,l.locales)).detectedLocale&&(h.locale=e.detectedLocale)}return h}},7323:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"removePathPrefix",{enumerable:!0,get:function(){return s}});let n=r(7027);function s(e,t){if(!(0,n.pathHasPrefix)(e,t))return e;let r=e.slice(t.length);return r.startsWith("/")?r:"/"+r}},253:function(e){e.exports={form:"auth_form__yY450",link:"auth_link__fCwis",prefix:"auth_prefix__OCqsp",postfix:"auth_postfix__kV_7U",blabla:"auth_blabla__JdH1O",date:"auth_date__oH2yK",past_rev:"auth_past_rev__AxvjO",post_rev:"auth_post_rev__5pfit",review:"auth_review__6ctUl"}},4741:function(e){"use strict";var t=Object.defineProperty,r=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,s=Object.prototype.hasOwnProperty,i={};function a(e){var t;let r=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean);return`${e.name}=${encodeURIComponent(null!=(t=e.value)?t:"")}; ${r.join("; ")}`}function o(e){let t=new Map;for(let r of e.split(/; */)){if(!r)continue;let e=r.indexOf("=");if(-1===e){t.set(r,"true");continue}let[n,s]=[r.slice(0,e),r.slice(e+1)];try{t.set(n,decodeURIComponent(null!=s?s:"true"))}catch{}}return t}function l(e){var t,r;if(!e)return;let[[n,s],...i]=o(e),{domain:a,expires:l,httponly:c,maxage:d,path:f,samesite:p,secure:m,priority:g}=Object.fromEntries(i.map(([e,t])=>[e.toLowerCase(),t]));return function(e){let t={};for(let r in e)e[r]&&(t[r]=e[r]);return t}({name:n,value:decodeURIComponent(s),domain:a,...l&&{expires:new Date(l)},...c&&{httpOnly:!0},..."string"==typeof d&&{maxAge:Number(d)},path:f,...p&&{sameSite:u.includes(t=(t=p).toLowerCase())?t:void 0},...m&&{secure:!0},...g&&{priority:h.includes(r=(r=g).toLowerCase())?r:void 0}})}((e,r)=>{for(var n in r)t(e,n,{get:r[n],enumerable:!0})})(i,{RequestCookies:()=>c,ResponseCookies:()=>d,parseCookie:()=>o,parseSetCookie:()=>l,stringifyCookie:()=>a}),e.exports=((e,i,a,o)=>{if(i&&"object"==typeof i||"function"==typeof i)for(let a of n(i))s.call(e,a)||void 0===a||t(e,a,{get:()=>i[a],enumerable:!(o=r(i,a))||o.enumerable});return e})(t({},"__esModule",{value:!0}),i);var u=["strict","lax","none"],h=["low","medium","high"],c=class{constructor(e){this._parsed=new Map,this._headers=e;let t=e.get("cookie");if(t)for(let[e,r]of o(t))this._parsed.set(e,{name:e,value:r})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed);if(!e.length)return r.map(([e,t])=>t);let n="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(([e])=>e===n).map(([e,t])=>t)}has(e){return this._parsed.has(e)}set(...e){let[t,r]=1===e.length?[e[0].name,e[0].value]:e,n=this._parsed;return n.set(t,{name:t,value:r}),this._headers.set("cookie",Array.from(n).map(([e,t])=>a(t)).join("; ")),this}delete(e){let t=this._parsed,r=Array.isArray(e)?e.map(e=>t.delete(e)):t.delete(e);return this._headers.set("cookie",Array.from(t).map(([e,t])=>a(t)).join("; ")),r}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},d=class{constructor(e){var t,r,n;this._parsed=new Map,this._headers=e;let s=null!=(n=null!=(r=null==(t=e.getSetCookie)?void 0:t.call(e))?r:e.get("set-cookie"))?n:[];for(let e of Array.isArray(s)?s:function(e){if(!e)return[];var t,r,n,s,i,a=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,i=!1;l();)if(","===(r=e.charAt(o))){for(n=o,o+=1,l(),s=o;o<e.length&&"="!==(r=e.charAt(o))&&";"!==r&&","!==r;)o+=1;o<e.length&&"="===e.charAt(o)?(i=!0,o=s,a.push(e.substring(t,n)),t=o):o=n+1}else o+=1;(!i||o>=e.length)&&a.push(e.substring(t,e.length))}return a}(s)){let t=l(e);t&&this._parsed.set(t.name,t)}}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let r=Array.from(this._parsed.values());if(!e.length)return r;let n="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return r.filter(e=>e.name===n)}has(e){return this._parsed.has(e)}set(...e){let[t,r,n]=1===e.length?[e[0].name,e[0].value,e[0]]:e,s=this._parsed;return s.set(t,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:t,value:r,...n})),function(e,t){for(let[,r]of(t.delete("set-cookie"),e)){let e=a(r);t.append("set-cookie",e)}}(s,this._headers),this}delete(...e){let[t,r,n]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0].path,e[0].domain];return this.set({name:t,path:r,domain:n,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(a).join("; ")}}},9874:function(e,t,r){"use strict";Object.defineProperty(t,"Z",{enumerable:!0,get:function(){return n.NextResponse}});let n=r(5950)},4954:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NextURL",{enumerable:!0,get:function(){return h}});let n=r(5366),s=r(3531),i=r(6830),a=r(2339),o=/(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;function l(e,t){return new URL(String(e).replace(o,"localhost"),t&&String(t).replace(o,"localhost"))}let u=Symbol("NextURLInternal");class h{constructor(e,t,r){let n,s;"object"==typeof t&&"pathname"in t||"string"==typeof t?(n=t,s=r||{}):s=r||t||{},this[u]={url:l(e,n??s.base),options:s,basePath:""},this.analyze()}analyze(){var e,t,r,s,o;let l=(0,a.getNextPathnameInfo)(this[u].url.pathname,{nextConfig:this[u].options.nextConfig,parseData:!0,i18nProvider:this[u].options.i18nProvider}),h=(0,i.getHostname)(this[u].url,this[u].options.headers);this[u].domainLocale=this[u].options.i18nProvider?this[u].options.i18nProvider.detectDomainLocale(h):(0,n.detectDomainLocale)(null==(t=this[u].options.nextConfig)?void 0:null==(e=t.i18n)?void 0:e.domains,h);let c=(null==(r=this[u].domainLocale)?void 0:r.defaultLocale)||(null==(o=this[u].options.nextConfig)?void 0:null==(s=o.i18n)?void 0:s.defaultLocale);this[u].url.pathname=l.pathname,this[u].defaultLocale=c,this[u].basePath=l.basePath??"",this[u].buildId=l.buildId,this[u].locale=l.locale??c,this[u].trailingSlash=l.trailingSlash}formatPathname(){return(0,s.formatNextPathnameInfo)({basePath:this[u].basePath,buildId:this[u].buildId,defaultLocale:this[u].options.forceLocale?void 0:this[u].defaultLocale,locale:this[u].locale,pathname:this[u].url.pathname,trailingSlash:this[u].trailingSlash})}formatSearch(){return this[u].url.search}get buildId(){return this[u].buildId}set buildId(e){this[u].buildId=e}get locale(){return this[u].locale??""}set locale(e){var t,r;if(!this[u].locale||!(null==(r=this[u].options.nextConfig)?void 0:null==(t=r.i18n)?void 0:t.locales.includes(e)))throw TypeError(`The NextURL configuration includes no locale "${e}"`);this[u].locale=e}get defaultLocale(){return this[u].defaultLocale}get domainLocale(){return this[u].domainLocale}get searchParams(){return this[u].url.searchParams}get host(){return this[u].url.host}set host(e){this[u].url.host=e}get hostname(){return this[u].url.hostname}set hostname(e){this[u].url.hostname=e}get port(){return this[u].url.port}set port(e){this[u].url.port=e}get protocol(){return this[u].url.protocol}set protocol(e){this[u].url.protocol=e}get href(){let e=this.formatPathname(),t=this.formatSearch();return`${this.protocol}//${this.host}${e}${t}${this.hash}`}set href(e){this[u].url=l(e),this.analyze()}get origin(){return this[u].url.origin}get pathname(){return this[u].url.pathname}set pathname(e){this[u].url.pathname=e}get hash(){return this[u].url.hash}set hash(e){this[u].url.hash=e}get search(){return this[u].url.search}set search(e){this[u].url.search=e}get password(){return this[u].url.password}set password(e){this[u].url.password=e}get username(){return this[u].url.username}set username(e){this[u].url.username=e}get basePath(){return this[u].basePath}set basePath(e){this[u].basePath=e.startsWith("/")?e:`/${e}`}toString(){return this.href}toJSON(){return this.href}[Symbol.for("edge-runtime.inspect.custom")](){return{href:this.href,origin:this.origin,protocol:this.protocol,username:this.username,password:this.password,host:this.host,hostname:this.hostname,port:this.port,pathname:this.pathname,search:this.search,searchParams:this.searchParams,hash:this.hash}}clone(){return new h(String(this),this[u].options)}}},589:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{RequestCookies:function(){return n.RequestCookies},ResponseCookies:function(){return n.ResponseCookies}});let n=r(4741)},5950:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"NextResponse",{enumerable:!0,get:function(){return u}});let n=r(4954),s=r(22),i=r(589),a=Symbol("internal response"),o=new Set([301,302,303,307,308]);function l(e,t){var r;if(null==e?void 0:null==(r=e.request)?void 0:r.headers){if(!(e.request.headers instanceof Headers))throw Error("request.headers must be an instance of Headers");let r=[];for(let[n,s]of e.request.headers)t.set("x-middleware-request-"+n,s),r.push(n);t.set("x-middleware-override-headers",r.join(","))}}class u extends Response{constructor(e,t={}){super(e,t),this[a]={cookies:new i.ResponseCookies(this.headers),url:t.url?new n.NextURL(t.url,{headers:(0,s.toNodeOutgoingHttpHeaders)(this.headers),nextConfig:t.nextConfig}):void 0}}[Symbol.for("edge-runtime.inspect.custom")](){return{cookies:this.cookies,url:this.url,body:this.body,bodyUsed:this.bodyUsed,headers:Object.fromEntries(this.headers),ok:this.ok,redirected:this.redirected,status:this.status,statusText:this.statusText,type:this.type}}get cookies(){return this[a].cookies}static json(e,t){let r=Response.json(e,t);return new u(r.body,r)}static redirect(e,t){let r="number"==typeof t?t:(null==t?void 0:t.status)??307;if(!o.has(r))throw RangeError('Failed to execute "redirect" on "response": Invalid status code');let n="object"==typeof t?t:{},i=new Headers(null==n?void 0:n.headers);return i.set("Location",(0,s.validateURL)(e)),new u(null,{...n,headers:i,status:r})}static rewrite(e,t){let r=new Headers(null==t?void 0:t.headers);return r.set("x-middleware-rewrite",(0,s.validateURL)(e)),l(t,r),new u(null,{...t,headers:r})}static next(e){let t=new Headers(null==e?void 0:e.headers);return t.set("x-middleware-next","1"),l(e,t),new u(null,{...e,headers:t})}}},22:function(e,t){"use strict";function r(e){let t=new Headers;for(let[r,n]of Object.entries(e))for(let e of Array.isArray(n)?n:[n])void 0!==e&&("number"==typeof e&&(e=e.toString()),t.append(r,e));return t}function n(e){var t,r,n,s,i,a=[],o=0;function l(){for(;o<e.length&&/\s/.test(e.charAt(o));)o+=1;return o<e.length}for(;o<e.length;){for(t=o,i=!1;l();)if(","===(r=e.charAt(o))){for(n=o,o+=1,l(),s=o;o<e.length&&"="!==(r=e.charAt(o))&&";"!==r&&","!==r;)o+=1;o<e.length&&"="===e.charAt(o)?(i=!0,o=s,a.push(e.substring(t,n)),t=o):o=n+1}else o+=1;(!i||o>=e.length)&&a.push(e.substring(t,e.length))}return a}function s(e){let t={},r=[];if(e)for(let[s,i]of e.entries())"set-cookie"===s.toLowerCase()?(r.push(...n(i)),t[s]=1===r.length?r[0]:r):t[s]=i;return t}function i(e){try{return String(new URL(String(e)))}catch(t){throw Error(`URL is malformed "${String(e)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`,{cause:t})}}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{fromNodeOutgoingHttpHeaders:function(){return r},splitCookiesString:function(){return n},toNodeOutgoingHttpHeaders:function(){return s},validateURL:function(){return i}})}},function(e){e.O(0,[998,127,303,918,173,250,364,971,938,744],function(){return e(e.s=6357)}),_N_E=e.O()}]);