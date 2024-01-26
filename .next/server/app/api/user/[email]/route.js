"use strict";(()=>{var e={};e.id=175,e.ids=[175],e.modules={1185:e=>{e.exports=require("mongoose")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},2648:(e,r,t)=>{t.r(r),t.d(r,{headerHooks:()=>g,originalPathname:()=>y,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>p,serverHooks:()=>m,staticGenerationAsyncStorage:()=>c,staticGenerationBailout:()=>v});var a={};t.r(a),t.d(a,{GET:()=>l});var s=t(5419),i=t(9108),n=t(9678),o=t(8070),u=t(7165);async function l(e,{params:r}){try{let e=await u.Z.findOne({email:r.email});return o.Z.json({success:!0,data:e},{status:200})}catch(e){return console.error(" - ERRORE: \xe8 avvenuto un problema durante l'uso dell'api di 'api/user/[email]' --> ",e.message),o.Z.json({success:!1,message:e.message||"Si \xe8 verificato un errore durante il recupero delle informazioni dell'utente"},{status:e.status||500})}}(0,t(1694).I)();let p=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/user/[email]/route",pathname:"/api/user/[email]",filename:"route",bundlePath:"app/api/user/[email]/route"},resolvedPagePath:"C:\\Users\\aless\\Desktop\\uni\\BookEasy\\app\\api\\user\\[email]\\route.ts",nextConfigOutput:"export",userland:a}),{requestAsyncStorage:d,staticGenerationAsyncStorage:c,serverHooks:m,headerHooks:g,staticGenerationBailout:v}=p,y="/api/user/[email]/route";function h(){return(0,n.patchFetch)({serverHooks:m,staticGenerationAsyncStorage:c})}},7165:(e,r,t)=>{t.d(r,{Z:()=>n});var a=t(1185),s=t.n(a);let i=new(s()).Schema({_id:{type:String},name:{type:String,required:!0},surname:{type:String,required:!0},tel_number:{type:Number,required:!0},tel_area_code:{type:Number,required:!0},email:{type:String,required:!0,unique:!0},isAdmin:{type:Boolean,default:!1,require:!1},password:{type:String,required:!0}},{timestamps:!0}),n=s().models.User||s().model("User",i)},1694:(e,r,t)=>{t.d(r,{I:()=>i});var a=t(1185),s=t.n(a);let i=async()=>{try{await s().connect(process.env.MONGO_URL),console.log(" - Connessione al DataBase riuscita")}catch(e){console.log(" - ERRORE: si \xe8 verificato un problema nella connessione al DataBase --> ",e.message)}}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[638,206],()=>t(2648));module.exports=a})();