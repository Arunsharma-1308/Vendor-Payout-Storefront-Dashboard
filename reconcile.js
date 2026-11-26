/* js/reconcile.js
   Owner: Aryan Shukla (Reconciliation Logic & Animation)
   Order-to-payout reconciliation, animated ledger rows, running-balance counter. */

/* Reconciliation engine */
function reconcile(){let bal=0;return S.orders.map(o=>{
 const exp=Math.round(o.amt*.92),p=S.payouts.find(x=>x.oid===o.id);let st='pending',got=0;
 if(p){got=p.amt;st=Math.abs(got-exp)<=1?'matched':'mismatch'}
 bal+=got;return{...o,exp,got,st,bal}})}

/* Ledger + animation */
const LBL={matched:'Matched',pending:'Pending',mismatch:'Mismatch'};
const row=(r,anim)=>`<tr class="${anim?'new':''}"><td>${r.id}</td><td>${r.date}</td><td>${esc(r.name)} × ${r.qty}</td><td class="n">${money(r.amt)}</td><td class="n">${money(r.exp)}</td><td class="n">${r.st=='pending'?'—':money(r.got)}</td><td><span class="b2 ${r.st}">${LBL[r.st]}</span></td><td class="n"><b>${money(r.bal)}</b></td></tr>`;
function pills(rows){const c=k=>rows.filter(r=>r.st==k).length;
 $('#pills').innerHTML=['matched','pending','mismatch'].map(k=>`<span class="b2 ${k}">${c(k)} ${LBL[k].toLowerCase()}</span>`).join('')}
function count(el,a,b,ms=400){const t0=performance.now();(function f(t){const k=Math.min((t-t0)/ms,1);el.textContent=money(a+(b-a)*k);if(k<1)requestAnimationFrame(f)})(t0)}
function play(){clearInterval(timer);const rows=reconcile(),tb=$('#lb');tb.innerHTML='';let i=0,from=0;pills([]);$('#bal').textContent=money(0);
 timer=setInterval(()=>{if(i>=rows.length)return clearInterval(timer);
  const r=rows[i++];tb.insertAdjacentHTML('afterbegin',row(r,1));count($('#bal'),from,r.bal);from=r.bal;pills(rows.slice(0,i))},300)}
