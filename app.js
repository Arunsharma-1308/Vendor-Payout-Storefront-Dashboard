/* js/app.js
   Owner: Arun Sharma (Page Architecture) with Aryan Goswami
   Storefront, Inventory and Overview views, event handling and app start-up. */

/* Views */
function dash(){const rows=reconcile(),sum=(a,f)=>a.reduce((s,x)=>s+f(x),0),wk=[];
 rows.forEach((r,i)=>{const k=Math.floor(i/4);wk[k]=(wk[k]||0)+r.amt});
 $('#dash').innerHTML=`<div class="kpis"><div class="mu">Total sales<b>${money(sum(rows,r=>r.amt))}</b></div><div class="mu">Payouts received<b>${money(rows.length?rows[rows.length-1].bal:0)}</b></div><div class="mu">Pending payouts<b>${money(sum(rows.filter(r=>r.st=='pending'),r=>r.exp))}</b></div><div class="mu">Mismatched orders<b>${rows.filter(r=>r.st=='mismatch').length}</b></div></div>
 <div class="g2"><div><h3>Sales per 4-order period</h3>${chart(wk,wk.map((_,i)=>'P'+(i+1)),'bar')}</div><div><h3>Running payout balance</h3>${rows.length>1?chart(rows.map(r=>r.bal),[],'line'):''}</div></div>`}
function store(){const s=x=>x.stock==0?['er','Out of stock']:x.stock<10?['wa','Only '+x.stock+' left']:['ok','In stock'];
 $('#store').innerHTML=S.products.length?`<div class="grid">${S.products.map(x=>`<div class="prod"><div class="e">${x.emo}</div><h3>${esc(x.name)}</h3><div class="pr">${money(x.price)}</div><div class="mu">★ ${x.rating}</div><span class="b2 ${s(x)[0]}">${s(x)[1]}</span></div>`).join('')}</div>`:'<div class="empty">No products listed yet. Add your first product in Inventory.</div>'}
function inv(){const e=S.products.find(x=>x.id===editId)||{name:'',price:'',stock:''};
 $('#inv').innerHTML=`<div class="form"><label>Product name<input id="pn" value="${esc(e.name)}"></label><label>Price (₹)<input id="pp" type="number" min="1" value="${e.price}"></label><label>Stock<input id="ps" type="number" min="0" value="${e.stock}"></label>
 <button class="btn" data-act="save">${editId?'Save changes':'Add product'}</button>${editId?'<button class="ghost" data-act="cancel">Cancel</button>':''}<p id="err"></p></div>
 <div class="wrap"><table><thead><tr><th>Product</th><th class="n">Price</th><th>Stock</th><th></th></tr></thead><tbody>${S.products.map(x=>`<tr><td>${x.emo} ${esc(x.name)}</td><td class="n">${money(x.price)}</td><td><button class="sm" data-act="dec" data-id="${x.id}" aria-label="Decrease stock">−</button> <b>${x.stock}</b> <button class="sm" data-act="inc" data-id="${x.id}" aria-label="Increase stock">+</button></td><td class="n"><button class="sm" data-act="edit" data-id="${x.id}">Edit</button> <button class="sm" data-act="del" data-id="${x.id}">Remove</button></td></tr>`).join('')||'<tr><td colspan="4" class="empty">Inventory is empty.</td></tr>'}</tbody></table></div>`}
function all(){$('#vn').textContent=S.vendor+' · simulated data, nothing leaves your browser';dash();store();inv()}

/* Events */
document.addEventListener('click',ev=>{const b=ev.target.closest('[data-act]');if(!b)return;
 const id=+b.dataset.id,p=S.products.find(x=>x.id===id),a=b.dataset.act;
 if(a=='save'){const n=$('#pn').value.trim(),pr=+$('#pp').value,st=$('#ps').value;
  if(!n||!(pr>0)||st===''||+st<0){$('#err').textContent='Enter a product name, a price above 0 and a stock of 0 or more.';return}
  if(editId)Object.assign(S.products.find(x=>x.id===editId),{name:n,price:pr,stock:Math.floor(+st)});
  else S.products.push({id:S.nid++,name:n,emo:'📦',price:pr,stock:Math.floor(+st),rating:(3.8+Math.random()).toFixed(1)});
  editId=null}
 if(a=='cancel')editId=null;if(a=='edit')editId=id;
 if(a=='inc')p.stock++;if(a=='dec')p.stock=Math.max(0,p.stock-1);
 if(a=='del')S.products=S.products.filter(x=>x.id!=id);
 save();all()});
$('#nav').onclick=e=>{const t=e.target.dataset.t;if(!t)return;
 document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x==e.target));
 document.querySelectorAll('main section').forEach(x=>x.hidden=x.id!=t);
 if(t=='led'&&!played){played=true;play()}};
$('#play').onclick=play;
$('#regen').onclick=()=>{S=gen(Date.now()%100000);save();all();play()};
$('#th').onclick=()=>{const d=document.documentElement,c=d.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');d.dataset.theme=c=='dark'?'light':'dark'};

S=load()||gen(2026);save();all();
