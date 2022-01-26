import{u as S,a as q,d as y,o as c,c as d,b as k,e as g,r as h,f as w,w as _,g as N,v as D,n as $,h as B,i as W,F as x,j as L,k as C,l as j,m as V,V as T}from"./vendor.a69ace03.js";const F=function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}};F();const A=S(),K=q(A),O={"text-xl":"","mt-6":"","inline-flex":"","gap-2":""},R={key:0,"i-carbon-moon":""},E={key:1,"i-carbon-sun":""},H=k("a",{class:"icon-btn","i-carbon-logo-github":"",rel:"noreferrer",href:"https://github.com/ms-fadaei/wordlemple",target:"_blank",title:"GitHub"},null,-1),I=y({setup(n){return(l,r)=>(c(),d("nav",O,[k("button",{class:"icon-btn !outline-none",onClick:r[0]||(r[0]=o=>g(K)())},[g(A)?(c(),d("div",R)):(c(),d("div",E))]),H]))}}),U=y({props:{letter:{type:String,required:!0},word:{type:String,required:!0},canValidate:{type:Boolean,required:!0}},emits:["update"],setup(n,{emit:l}){const r=n,o=h(""),e=w(()=>o.value.toLowerCase()===r.letter.toLowerCase()),t=w(()=>!e.value&&o.value&&r.word.toLowerCase().includes(o.value.toLowerCase())),s=w(()=>!e.value&&!t.value);_(o,()=>{l("update",o.value.toLowerCase())});function f(i){console.log(i);const m=i.key.toLowerCase().charCodeAt(0)||i.which;(m<97||m>122)&&i.preventDefault()}return(i,m)=>N((c(),d("input",{"onUpdate:modelValue":m[0]||(m[0]=a=>o.value=a),type:"text",maxlength:"1",class:$(["letter-box",{"letter-box--green":n.canValidate&&g(e),"letter-box--orange":n.canValidate&&g(t),"letter-box--disabled":n.canValidate&&g(s)}]),onKeydown:f},null,34)),[[D,o.value]])}}),G=y({props:{word:{type:String,required:!0},isActive:{type:Boolean,default:!1}},emits:["done"],setup(n,{emit:l}){const r=n,o=h(null),e=w(()=>r.word.length),t=h(Array(e.value).fill("")),s=w(()=>t.value.join("")),f=w(()=>e.value===s.value.length);B(()=>{r.isActive&&W(()=>{var a;(a=o.value)==null||a.querySelectorAll("input")[0].focus()})}),_(s,()=>{s.value.length===e.value&&l("done",s.value)});const i=(a,p)=>{var u;t.value[p]=a;const v=(u=o.value)==null?void 0:u.querySelectorAll("input");a&&p<e.value-1&&v[p+1].focus()},m=(a,p)=>{var v;if(console.log(a),(a.key==="Backspace"||a.which===8)&&t.value[p]===""){const u=(v=o.value)==null?void 0:v.querySelectorAll("input");p>0&&(u[p-1].focus(),a.preventDefault())}};return(a,p)=>{const v=U;return c(),d("div",{ref_key:"box",ref:o,class:"flex mb-3 last:mb-0","un-flex":"row nowrap","un-justify":"center","un-items":"center","un-gap":"2"},[(c(!0),d(x,null,L(n.word.length,u=>(c(),C(v,{key:u,disabled:!n.isActive,letter:n.word[u-1],word:n.word,"can-validate":g(f),onUpdate:b=>i(b,u-1),onKeydown:b=>m(b,u-1)},null,8,["disabled","letter","word","can-validate","onUpdate","onKeydown"]))),128))],512)}}}),M=y({props:{word:{type:String,required:!0},tries:{type:Number,default:5}},setup(n){const l=n,r=h(1),o=(e,t)=>{e===l.word.toLowerCase()?(r.value=0,alert("You win!")):r.value=t+1};return(e,t)=>{const s=G;return c(),d("div",null,[(c(!0),d(x,null,L(n.tries,f=>(c(),C(s,{key:f,word:n.word,"is-active":f===r.value,onNext:i=>r.value=f+1,onDone:i=>o(i,f)},null,8,["word","is-active","onNext","onDone"]))),128))])}}}),P={"font-sans":"",class:"flex flex-col h-screen justify-center items-center","un-bg":"gray-50 dark:gray-900","un-text":"gray-700 dark:gray-200"},z=y({setup(n){return j({title:"Wordlemple",meta:[{name:"description",content:"A simple implementation of the wordle game."}]}),(l,r)=>{const o=M,e=I;return c(),d("main",P,[V(o,{word:"ticket",tries:5,class:"p-4 rounded-2","un-bg":"gray-100 dark:gray-800"}),V(e)])}}});T(z);