(()=>{var e={};e.id=0,e.ids=[0],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},1877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},5319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},1653:(e,s,r)=>{"use strict";r.r(s),r.d(s,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>d,routeModule:()=>m,tree:()=>u});var t=r(482),i=r(9108),a=r(2563),n=r.n(a),o=r(8300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(s,l);let u=["",{children:["(pages)",{children:["(auth)",{children:["register",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2900)),"C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\(pages)\\(auth)\\register\\page.tsx"]}]},{}]},{}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3871))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,2461)),"C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,3871))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\(pages)\\(auth)\\register\\page.tsx"],c="/(pages)/(auth)/register/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new t.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(pages)/(auth)/register/page",pathname:"/register",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},973:(e,s,r)=>{Promise.resolve().then(r.bind(r,1109))},1109:(e,s,r)=>{"use strict";r.r(s),r.d(s,{default:()=>q});var t=r(5344),i=r(3729),a=r.n(i),n=r(1103),o=r(398),l=r(4478),u=r(3990),d=r(6934),c=r(8194),p=r(783),m=r.n(p),h=r(2254),x=r(3608),g=r(659),f=r.n(g);let{Option:j}=n.default,q=function(){let[e]=o.Z.useForm(),s=(0,h.useRouter)(),[r,i]=a().useState(!1),p=async e=>{try{i(!0),await x.Z.post("/api/auth/register",e),l.ZP.success("Registrazione effettuata con successo, ora effettuare il login"),s.push("/login")}catch(e){l.ZP.error(e.response.data.message)}finally{i(!1)}},g=t.jsx(o.Z.Item,{name:"tel_area_code",noStyle:!0,children:(0,t.jsxs)(n.default,{children:[t.jsx(j,{value:"39",children:"+39"}),t.jsx(j,{value:"44",children:"+44"}),t.jsx(j,{value:"49",children:"+49"})]})});return t.jsx("section",{className:"container",children:t.jsx("div",{className:f().form,children:(0,t.jsxs)(o.Z,{name:"register",form:e,onFinish:p,initialValues:{tel_area_code:"39"},scrollToFirstError:!0,children:[t.jsx("h1",{children:"Registrati"}),t.jsx("hr",{className:"hr_r_l"}),t.jsx(o.Z.Item,{name:"name",rules:[{required:!0,message:"Inserisci il tuo nome"}],children:t.jsx(u.Z,{placeholder:"Nome",style:{height:"3rem"}})}),t.jsx(o.Z.Item,{name:"surname",rules:[{required:!0,message:"Inserisci il tuo Cognome"}],children:t.jsx(u.Z,{placeholder:"Cognome",style:{height:"3rem"}})}),t.jsx(o.Z.Item,{className:f().numb,name:"tel_number",rules:[{required:!0,message:"Inserisci il tuo Numero di Telefono"}],children:t.jsx(d.Z,{addonBefore:g,placeholder:"Numnero di Telefono",style:{width:"75%",height:"3rem",borderRadius:"30px"}})}),t.jsx(o.Z.Item,{name:"email",rules:[{type:"email",message:"E-Mail inserita non \xe8 valida"},{required:!0,message:"Inserire un indirizzo E-Mail"}],children:t.jsx(u.Z,{placeholder:"E-Mail",style:{height:"3rem"}})}),t.jsx("hr",{className:"hr_r_l"}),t.jsx(o.Z.Item,{name:"password",rules:[{required:!0,message:"Inserisci la tua Password"}],hasFeedback:!0,children:t.jsx(u.Z.Password,{placeholder:"Password",style:{width:"75%",height:"3rem",borderRadius:"30px"}})}),t.jsx(o.Z.Item,{name:"conf_password",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Conferma la password"},({getFieldValue:e})=>({validator:(s,r)=>r&&e("password")!==r?Promise.reject(Error("Le password inserite non coincidono!")):Promise.resolve()})],children:t.jsx(u.Z.Password,{placeholder:"Conferma Password",style:{width:"75%",height:"3rem",borderRadius:"30px"}})}),t.jsx(c.ZP,{htmlType:"submit",block:!0,loading:r,children:"Registrati"}),t.jsx("hr",{className:"hr_r_l"}),(0,t.jsxs)("div",{children:["Hai g\xe0 un account?",t.jsx("br",{}),t.jsx(m(),{href:"/login",className:f().link,children:"Accedi"})]})]})})})}},2900:(e,s,r)=>{"use strict";r.r(s),r.d(s,{$$typeof:()=>a,__esModule:()=>i,default:()=>n});let t=(0,r(6843).createProxy)(String.raw`C:\Users\aless\Desktop\uni\BookEasy\app\(pages)\(auth)\register\page.tsx`),{__esModule:i,$$typeof:a}=t,n=t.default}};var s=require("../../../../webpack-runtime.js");s.C(e);var r=e=>s(s.s=e),t=s.X(0,[638,742,106,194,608,990,103,934,783,65],()=>r(1653));module.exports=t})();