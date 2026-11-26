/* js/charts.js
   Owner: Aryan Goswami (Charts & Analytics)
   Plain SVG bar and line charts. */

/* Charts (plain SVG) */
function chart(v,lab,type){const W=360,H=170,p=26,m=Math.max(...v,1),n=v.length,bw=(W-2*p)/n,y=x=>H-p-(H-2*p)*x/m;
 let g=`<line class="a" x1="${p}" y1="${H-p}" x2="${W-p}" y2="${H-p}"/><text x="${p}" y="12">${money(m)}</text>`;
 if(type=='bar')v.forEach((x,i)=>g+=`<rect class="b" x="${p+i*bw+5}" y="${y(x)}" width="${bw-10}" height="${H-p-y(x)}" rx="3"/><text x="${p+i*bw+bw/2}" y="${H-10}" text-anchor="middle">${lab[i]}</text>`);
 else g+=`<polyline class="l" points="${v.map((x,i)=>`${p+i*(W-2*p)/(n-1)},${y(x)}`).join(' ')}"/><text x="${W-p}" y="${H-10}" text-anchor="end">Order ${n}</text><text x="${p}" y="${H-10}">Order 1</text>`;
 return`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${type} chart">${g}</svg>`}
