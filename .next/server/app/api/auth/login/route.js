"use strict";(()=>{var e={};e.id=873,e.ids=[873],e.modules={1185:e=>{e.exports=require("mongoose")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},6113:e=>{e.exports=require("crypto")},8519:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>y,originalPathname:()=>f,patchFetch:()=>w,requestAsyncStorage:()=>g,routeModule:()=>m,serverHooks:()=>v,staticGenerationAsyncStorage:()=>h,staticGenerationBailout:()=>q});var a={};r.r(a),r.d(a,{POST:()=>c});var i=r(5419),o=r(9108),n=r(9678),s=r(1694),u=r(7165),l=r(8070),d=r(6521),p=r.n(d);async function c(e){try{let t=await e.json(),r=await u.Z.findOne({email:t.email});if(!r)throw Error("(!!) Non esiste un utente registrato con questo indirizzo e-mail");if(!await p().compare(t.password,r.password))throw Error("(!!) Credenziali inserite non valide");return l.Z.json({success:!0,message:"Login Effettuato",data:{isAdmin:r.isAdmin}},{status:200})}catch(e){return console.error(" - ERRORE: \xe8 avvenuto un problema durante l'uso dell'api di 'api/login' --> ",e.message),l.Z.json({success:!1,message:e.message||"Si \xe8 verificato un errore durante il login dell'utente"},{status:e.status||500})}}(0,s.I)();let m=new i.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/auth/login/route",pathname:"/api/auth/login",filename:"route",bundlePath:"app/api/auth/login/route"},resolvedPagePath:"C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\api\\auth\\login\\route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:g,staticGenerationAsyncStorage:h,serverHooks:v,headerHooks:y,staticGenerationBailout:q}=m,f="/api/auth/login/route";function w(){return(0,n.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:h})}},7165:(e,t,r)=>{r.d(t,{Z:()=>n});var a=r(1185),i=r.n(a);let o=new(i()).Schema({_id:{type:String},name:{type:String,required:!0},surname:{type:String,required:!0},tel_number:{type:Number,required:!0},tel_area_code:{type:Number,required:!0},email:{type:String,required:!0,unique:!0},isAdmin:{type:Boolean,default:!1,require:!1},password:{type:String,required:!0}},{timestamps:!0}),n=i().models.User||i().model("User",o)},1694:(e,t,r)=>{r.d(t,{I:()=>o});var a=r(1185),i=r.n(a);let o=async()=>{try{await i().connect(process.env.MONGO_URL),console.log(" - Connessione al DataBase riuscita")}catch(e){console.log(" - ERRORE: si \xe8 verificato un problema nella connessione al DataBase --> ",e.message)}}}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,206,521],()=>r(8519));module.exports=a})();