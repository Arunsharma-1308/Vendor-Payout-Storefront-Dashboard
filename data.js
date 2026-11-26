/* js/data.js
   Owner: Aryan Goswami (Data Simulation & State Management)
   Helpers, global state, seeded mock-data engine, localStorage save/load. */

const $=s=>document.querySelector(s),money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='vpsd1';let S,timer,played=false,editId=null;

/* Data generation (seeded random) */
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function gen(seed){
 const r=rng(seed),ri=(a,b)=>a+Math.floor(r()*(b-a+1));
 const cat=[['Wireless Earbuds','🎧',1499],['Smart Watch','⌚',2999],['Power Bank 20000mAh','🔋',1299],['Bluetooth Speaker','🔊',1799],['USB-C Cable','🔌',299],['Phone Case','📱',399],['Laptop Stand','💻',999],['Mechanical Keyboard','⌨️',2499],['Gaming Mouse','🖱️',899],['Webcam HD','📷',1599],['LED Desk Lamp','💡',699],['Fitness Band','🏃',1999]];
 const products=cat.map((c,i)=>({id:i+1,name:c[0],emo:c[1],price:c[2]+ri(-5,5)*10,stock:ri(0,60),rating:(3.5+r()*1.5).toFixed(1)}));
 const orders=[],payouts=[];
 for(let i=0;i<26;i++){
  const p=products[ri(0,11)],q=ri(1,4),amt=p.price*q,id='ORD-'+(1001+i),x=r();
  orders.push({id,name:p.name,qty:q,amt,date:new Date(Date.UTC(2026,8,1+i*2+ri(0,1))).toISOString().slice(0,10)});
  const exp=Math.round(amt*.92);
  if(i>20?x<.7:x<.07)continue;            /* pending: payout not received yet */
  payouts.push({oid:id,amt:x>.88?exp-ri(25,180):exp}); /* ~12% mismatched */
 }
 return{seed,vendor:'Sharma Electronics',products,orders,payouts,nid:13};
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function load(){try{const j=localStorage.getItem(KEY);if(j)return JSON.parse(j)}catch(e){}return null}
