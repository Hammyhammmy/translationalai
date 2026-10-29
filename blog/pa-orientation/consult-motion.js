// Consult animations for "Urology Consults.html": each <div class="cmotion" data-scenario="…">
// becomes a small step-by-step player that sits beside the consult it teaches.
// Same drawing language as the Interactive model (kidneys, ureters, bladder, pill callouts).
// Clinical numbers in captions come only from the Consults page's own text.
// No libraries. prefers-reduced-motion → paused on the most instructive frame.
const NS='http://www.w3.org/2000/svg';

// One closure per player, so the six players never share state or element ids.
function makeScenario(id,pre){
  const $=id=>document.getElementById(pre+id);
  const mk=(t,a={})=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);return e;};
  const S=(id,a)=>{const e=typeof id==='string'?$(id):id;if(!e)return;for(const k in a)e.setAttribute(k,a[k]);};
  const show=(id,on)=>{const e=$(id);if(e)e.style.display=on?'':'none';};
  const C01=t=>Math.max(0,Math.min(1,t)), lerp=(a,b,t)=>a+(b-a)*C01(t), ease=t=>{t=C01(t);return t*t*(3-2*t);};
  const hex=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16));
  const mix=(a,b,t)=>{const A=hex(a),B=hex(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*C01(t)).toString(16).padStart(2,'0')).join('');};
  const URINE='#d99a1e',BLOOD='#b91c1c',PUS='#8a9a2c',ABX='#2563eb',SALINE='#38bdf8';

  // ---- shared pieces ----
  const KID_A="M100,76 C68,76 54,110 54,142 C54,178 70,208 102,208 C128,208 144,192 142,176 C140,164 128,156 128,142 C128,128 140,120 142,108 C144,90 128,76 100,76 Z";
  const KID_B="M300,76 C332,76 346,110 346,142 C346,178 330,208 298,208 C272,208 256,192 258,176 C260,164 272,156 272,142 C272,128 260,120 258,108 C256,90 272,76 300,76 Z";
  const UR_A="M128,156 C146,232 136,300 148,360 C154,400 166,436 184,466";
  const UR_B="M272,156 C254,232 264,300 252,360 C246,400 234,436 216,466";
  function tract(){return `
  <path d="${KID_A}" fill="#e9c3b8" stroke="#b9786a" stroke-width="2"/>
  <path id="kidB" d="${KID_B}" fill="#e9c3b8" stroke="#b9786a" stroke-width="2"/>
  <g id="behind"></g>
  <ellipse id="pelA" cx="126" cy="146" rx="9" ry="12" fill="#f2d675" stroke="#c9a640" stroke-width="1.2"/>
  <ellipse id="pelB" cx="274" cy="146" rx="9" ry="12" fill="#f2d675" stroke="#c9a640" stroke-width="1.2"/>
  <path id="urA" d="${UR_A}" fill="none" stroke="#dccb9c" stroke-width="5" stroke-linecap="round"/>
  <path id="urB" d="${UR_B}" fill="none" stroke="#dccb9c" stroke-width="5" stroke-linecap="round"/>
  <path id="dilA" d="${UR_A}" fill="none" stroke="#f2d675" stroke-linecap="round" opacity="0"/>
  <path id="dilB" d="${UR_B}" fill="none" stroke="#f2d675" stroke-linecap="round" opacity="0"/>
  <g id="pA"></g><g id="pB"></g>
  <ellipse id="bl" cx="200" cy="480" rx="40" ry="28" fill="#f2d675" stroke="#c97a6a" stroke-width="5"/>
  <ellipse id="prost" cx="200" cy="530" rx="20" ry="15" fill="#d8b46a" stroke="#a8843a" stroke-width="1.5"/>
  <rect x="196.5" y="508" width="7" height="108" rx="3.5" fill="#efe3c2" stroke="#b8a77c"/>
  <rect x="183" y="553" width="17" height="9" rx="3" fill="#7c3aed"/><rect x="200" y="553" width="17" height="9" rx="3" fill="#7c3aed"/>
  <g font-size="11" fill="#78716c"><text x="100" y="64" text-anchor="middle">right kidney</text><text x="300" y="64" text-anchor="middle">left kidney</text><text x="66" y="486">bladder</text></g>`;}
  function bladder(f,opt={}){const ry=26+38*f,rx=38+40*f,cy=508-ry;S('bl',{rx,ry,cy,fill:opt.fill||'#f2d675',stroke:opt.stroke||'#c97a6a','stroke-width':opt.w||5});return{rx,ry,cy};}
  function dilate(a,b,cutB=null){S('pelA',{rx:9+13*a,ry:12+16*a});S('pelB',{rx:9+13*b,ry:12+16*b});
    S('dilA',{opacity:a>.05?1:0,'stroke-width':5+6*a});const L=path('urB').L;S('dilB',{opacity:b>.05?1:0,'stroke-width':5+6*b,'stroke-dasharray':cutB==null?`${L} 0`:`${cutB*L} ${2*L}`});}
  function parts(gid,n,fill,r=3){const g=$(gid);return Array.from({length:n},(_,i)=>{const c=mk('circle',{r,fill,stroke:'#fff','stroke-width':1});g.appendChild(c);return{el:c,t:i/n,i};});}
  const P={};function path(id){if(!P[id]){const e=$(id);P[id]={e,L:e.getTotalLength()};}return P[id];}
  function at(id,t){const p=path(id);const q=p.e.getPointAtLength(C01(t)*p.L);return[q.x,q.y];}
  function place(pt,xy,vis=true,fill){pt.el.setAttribute('cx',xy[0]);pt.el.setAttribute('cy',xy[1]);pt.el.style.display=vis?'':'none';if(fill)pt.el.setAttribute('fill',fill);}
  // flow particles along a path; cap = stop point (they queue behind it)
  function flow(arr,id,dt,speed,{cap=null,vis=true,fill=null,rev=false}={}){arr.forEach(p=>{
    p.t+=speed*dt;if(cap!=null){const c=cap-.03-.028*(p.i%6);if(p.t>c)p.t=Math.max(0,c);}else if(p.t>=1)p.t-=1;
    place(p,at(id,rev?1-p.t:p.t),vis,fill);});}
  // callout pills, pooled
  const CO={};
  function co(key,text,color,x,y){let g=CO[key];
    if(!g||g._t!==text){if(g)g.remove();g=mk('g');g._t=text;g._w=text.length*6.1+14;
      g.append(mk('rect',{x:0,y:-11,width:g._w,height:20,rx:6,fill:color}));
      const t=mk('text',{x:7,y:3,'font-size':11,'font-weight':700,fill:'#fff'});t.textContent=text;g.append(t);$('co').append(g);CO[key]=g;}
    g._on=true;g.setAttribute('transform',`translate(${Math.max(4,Math.min(x,396-g._w))},${y})`);}
  const coBegin=()=>{for(const k in CO)CO[k]._on=false;}, coEnd=()=>{for(const k in CO)CO[k].style.display=CO[k]._on?'':'none';};

  // ---------------- scenarios ----------------
  const SC={};

  // 1. Urinary retention
  SC.retention={label:'Retention',badge:['urg','Urgent'],speed:'hours for the kidneys; minutes for the pain',
    title:'1. Urinary retention',
    what:'A slowly narrowed outlet suddenly can\'t cope. The bladder stretches, urine backs up toward both kidneys, and the patient can\'t pee.',
    watch:['The bladder keeps growing and the back-pressure reaches both kidneys.','A bladder scan over 300 mL in a patient who can\'t void is retention (local thresholds vary).','Once the Foley drains it, urine can surge: post-obstructive diuresis.'],
    rule:'Drain with a Foley before you finish the workup. Post-obstructive diuresis means more than 200 mL/hr for 2 hours in a row, or more than 3 L in 24 hours. Replace half of each hour\'s output with IV fluids and recheck electrolytes. If you can\'t pass the catheter, call before forcing it.',
    steps:[{n:'Outlet blocks',d:5,c:'The enlarged prostate blocks the outlet. The bladder fills and can\'t empty.'},
      {n:'Bladder scan',d:4,c:'Scan first. Over 300 mL in a patient who can\'t void is retention.'},
      {n:'Foley drains it',d:6,c:'Drain before you finish the workup. Back-pressure comes off both kidneys.'},
      {n:'Watch the output',d:6,c:'Urine can surge once the block is relieved. Start tamsulosin if the outlet is blocked.'}],
    poster:[2,4.5],
    build(){return tract()+`
      <path id="tube" d="M200,628 C210,650 280,640 306,604" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
      <path id="cath" d="M200,628 L200,476" fill="none" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
      <path id="drainP" d="M200,480 L200,628 C210,650 280,640 306,604" fill="none" stroke="none"/>
      <circle id="ball" cx="200" cy="496" r="0" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
      <g id="bag"><rect x="290" y="560" width="58" height="76" rx="8" fill="#fff" stroke="#94a3b8" stroke-width="2"/><rect id="bagf" x="292" y="634" width="54" height="0" rx="6" fill="#f2d675"/><text x="319" y="654" text-anchor="middle" font-size="11" fill="#78716c">bag</text></g>
      <g id="probe"><path id="fan" d="M200,0 L150,70 Q200,90 250,70 Z" fill="#93c5fd" opacity=".35"/><rect x="186" y="-18" width="28" height="20" rx="5" fill="#475569"/></g>
      <g id="pD"></g><text x="230" y="534" font-size="11" fill="#78716c">prostate</text>`;},
    init(){this.a=parts('pA',9,URINE);this.b=parts('pB',9,URINE);this.dr=parts('pD',10,URINE);},
    draw({k,st,dt,T}){let f,dil,cath=0,ball=0,drain=0,surge=false,bag=0;
      if(k===0){f=lerp(.7,1.3,st/4);dil=lerp(0,.8,(st-1)/3);}
      else if(k===1){f=1.3;dil=.8;}
      else if(k===2){cath=C01(st/1.6);ball=C01((st-1.8)/.6);const d=ease((st-2.4)/3.4);f=lerp(1.3,.15,d);dil=lerp(.8,.05,d);drain=st>2.4;bag=d*.55;}
      else{f=.15;dil=.05;cath=1;ball=1;drain=true;surge=true;bag=.55+.4*C01(st/6);}
      S('prost',{rx:33,ry:25});
      const {rx,ry,cy}=bladder(f);dilate(dil,dil);
      const sp=(surge?.45:.16)*(1-.6*dil);flow(this.a,'urA',dt,sp);flow(this.b,'urB',dt,sp);
      S('cath',{'stroke-dasharray':`${cath*152} 400`});show('tube',cath>=1);S('ball',{r:7*ball});
      flow(this.dr,'drainP',dt,surge?.8:.4,{vis:!!drain});
      const h=70*bag;S('bagf',{y:634-h,height:h});show('bag',cath>=1);
      show('probe',k===1);$('probe').setAttribute('transform',`translate(0,${cy-ry-40})`);S('fan',{opacity:.25+.2*Math.sin(T*6)});
      coBegin();const ml=Math.round(f*450);
      if(k===0){co('a','can\'t pee','#b45309',8,cy-ry-16);if(dil>.5)co('b','back-pressure on both kidneys','#b45309',150,232);}
      if(k===1)co('s',`scan: ${ml} mL · over 300 = retention`,'#2563eb',8,cy-ry-62);
      if(k===2)co('f','Foley drains it first','#2563eb',214,600);
      if(k===3){co('d','urine surges: post-obstructive diuresis','#b45309',8,260);co('t','start tamsulosin','#16a34a',8,300);}
      coEnd();}};

  // 2. Renal colic
  SC.colic={label:'Renal colic',badge:['urg','Urgent'],speed:'hours if infected; days if not',
    title:'2. Renal colic / ureteric stone',
    what:'A stone moves down the ureter and sticks at its three natural narrow points. Each time it sticks, urine backs up and the kidney swells. The pain moves lower as the stone does.',
    watch:['Pain moves flank → groin → testis or labia as the stone moves down.','Pain moving toward the groin or scrotum suggests the stone has reached the UVJ.','The kidney swells above wherever the stone sticks.'],
    rule:'Under 5 mm in the lower ureter: about 80% pass. 5–10 mm: about half pass with time. Over 10 mm: rarely pass on their own. Fever + stone + hydronephrosis is urosepsis until proven otherwise: drain it now.',
    steps:[{n:'Leaves the kidney (UPJ)',d:4,c:'Stuck where the ureter leaves the kidney. Pain in the flank.'},
      {n:'Pelvic brim',d:4,c:'Stuck where the ureter crosses the pelvic brim. The pain moves lower.'},
      {n:'Enters the bladder (UVJ)',d:4,c:'Stuck where the ureter enters the bladder. Pain toward the groin, testis or labia.'},
      {n:'Passes',d:4,c:'Into the bladder. The swelling settles; strain the urine to catch the stone.'}],
    poster:[2,3.5],
    build(){return tract()+`<g id="pain"><circle id="painC" r="18" fill="rgba(220,38,38,.22)" stroke="#dc2626" stroke-width="2"/></g>
      <path id="stone" d="M-6,-3 l5,-4 l7,3 l1,7 l-6,4 l-7,-3 Z" fill="#57534e" stroke="#292524"/>`;},
    init(){this.a=parts('pA',9,URINE);this.b=parts('pB',9,URINE);},
    draw({k,st,dt,T}){const stops=[0,.06,.47,.9];let s,dil,pain,pl;
      if(k<3){s=lerp(stops[k],stops[k+1],st/(k?1.6:1));dil=k===0?ease(st/2.5):1;}
      else{s=lerp(.9,1.15,st/1.2);dil=1-ease(st/3);}
      if(k===0){pain=[346,170];pl='pain: flank';}
      else if(k===1){const u=ease(st/1.6);pain=[lerp(346,318,u),lerp(170,320,u)];pl='pain moves lower';}
      else if(k===2){const u=ease(st/1.6);pain=[lerp(318,262,u),lerp(320,520,u)];pl='pain: groin → testis / labia';}
      const {cy,ry}=bladder(.45);dilate(0,dil,s<1?s:null);
      flow(this.a,'urA',dt,.16);flow(this.b,'urB',dt,.16,{cap:s<1?s:null});
      const xy=s<=1?at('urB',s):[210,cy+ry-10];$('stone').setAttribute('transform',`translate(${xy[0]},${xy[1]})`);
      show('pain',k<3);if(k<3)S('painC',{cx:pain[0],cy:pain[1],r:16+4*Math.sin(T*5)});
      coBegin();
      if(k<3){co('pl',pl,'#dc2626',pain[0]+22,pain[1]);const nm=['UPJ','pelvic brim','UVJ'][k];
        const w=nm.length*6.1+14;co('st',nm,'#44403c',xy[0]-18-w,xy[1]);}
      else co('ok','in the bladder: strain the urine','#16a34a',8,cy-ry-16);
      if(dil>.5)co('h','hydronephrosis','#b45309',290,232);
      coEnd();}};

  // 3. Urosepsis
  SC.sepsis={label:'Urosepsis',badge:['crit','Critical'],speed:'hours; risk of death rises with each one',
    title:'4. Urosepsis: the blocked, infected kidney',
    what:'An infected, blocked kidney is an infection in a closed space. Antibiotics alone won\'t drain it.',
    watch:['Antibiotics reach the kidney through the blood but can\'t get into the blocked, pus-filled space.','A stent from below or a nephrostomy through the back lets the pus out.','Only then can the antibiotics do their job.'],
    rule:'Antibiotics won\'t work until it\'s drained. A ureteral stent (urology, in the OR) or a percutaneous nephrostomy (IR): whoever can drain it faster. The wrong answer is "let\'s see if the antibiotics work." Call urology at the same time as IR.',
    steps:[{n:'Blocked + infected',d:4,c:'A stone blocks the left kidney. Pus fills the closed space: fever, fast heart rate, low blood pressure.'},
      {n:'Antibiotics alone',d:5,c:'Antibiotics arrive through the blood, but they can\'t get into the blocked space.'},
      {n:'Drain: stent from below',d:5,c:'Urology passes a stent up past the stone. The pus drains into the bladder.'},
      {n:'Or: nephrostomy',d:5,c:'IR places a tube through the back into the kidney. Whoever can drain it faster.'},
      {n:'Now antibiotics work',d:4,c:'Drained. Now the antibiotics can reach the infection.'}],
    poster:[1,4],
    build(){return tract()+`
      <circle id="halo" cx="300" cy="142" r="56" fill="rgba(225,29,72,.16)" stroke="rgba(225,29,72,.55)" stroke-width="2"/>
      <path d="M-6,-3 l5,-4 l7,3 l1,7 l-6,4 l-7,-3 Z" fill="#57534e" stroke="#292524" transform="translate(265,176)"/>
      <path id="abxP" d="M398,300 C372,262 360,214 343,166" fill="none" stroke="#fecaca" stroke-width="4" stroke-linecap="round"/>
      <path id="stentP" d="M214,470 C234,436 246,400 252,360 C264,300 254,232 272,156 C266,146 276,136 284,144" fill="none" stroke="#2563eb" stroke-width="3" stroke-dasharray="6 3"/>
      <path id="nephP" d="M398,96 C360,110 320,128 282,144" fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>
      <g id="pP"></g><g id="pX"></g>`;},
    init(){this.a=parts('pA',9,URINE);this.b=parts('pB',9,URINE);this.pus=parts('pP',12,PUS,3.2);this.abx=parts('pX',8,ABX,3.2);},
    draw({k,st,dt,T}){const {cy,ry}=bladder(.4);
      let dil=1,halo=1,stent=0,neph=0,mode='trap';
      if(k===2){stent=C01(st/2);mode=st>2?'stent':'trap';const d=ease((st-2)/3);dil=lerp(1,.3,d);halo=lerp(1,.45,d);}
      if(k===3){neph=C01(st/2);mode=st>2?'neph':'trap';const d=ease((st-2)/3);dil=lerp(1,.3,d);halo=lerp(1,.45,d);}
      if(k===4){neph=1;mode='neph';dil=.25;halo=lerp(.45,0,st/3);}
      dilate(0,dil,.1);
      flow(this.a,'urA',dt,.16);flow(this.b,'urB',dt,.16,{cap:.1});
      S('halo',{r:54+4*Math.sin(T*3),opacity:halo});
      const sl=path('stentP').L,nl=path('nephP').L;
      S('stentP',{'stroke-dasharray':stent>=1?'6 3':`${stent*sl} ${sl}`,'stroke-dashoffset':stent>=1?0:-(1-stent)*sl*0});
      show('stentP',k===2);show('nephP',k>=3);S('nephP',{'stroke-dasharray':`${neph*nl} ${nl}`});
      // pus: swirl in the pelvis, or drain along the tube
      this.pus.forEach(p=>{
        if(mode==='trap'){const a=T*1.3+p.i*2.1,r=6+(p.i%4)*3*dil;place(p,[274+Math.cos(a)*r*1.2,148+Math.sin(a)*r*1.4],true);}
        else{p.t=(p.t+.35*dt)%1;place(p,at(mode==='stent'?'stentP':'nephP',1-p.t),true);}});
      // antibiotics: arrive through the blood; blocked out of the closed space until it's drained
      show('abxP',k>=1);
      this.abx.forEach(p=>{if(k<1){p.el.style.display='none';return;}
        if(k<4){p.t=Math.min(p.t+.25*dt,.97-.02*(p.i%5));place(p,at('abxP',p.t),true);}
        else{p.t+=.3*dt;if(p.t>1.35)p.t=0;place(p,p.t<=1?at('abxP',p.t):[lerp(343,280,(p.t-1)/.35),lerp(166,148,(p.t-1)/.35)],true);}});
      coBegin();
      if(k===0)co('f','fever · fast HR · low BP','#9f1239',200,232);
      if(k===1)co('x','can\'t get into the closed space','#9f1239',180,232);
      if(k===2&&st>2)co('s','stent: pus drains down','#2563eb',150,300);
      if(k===3&&st>2)co('n','nephrostomy: out through the back','#2563eb',180,44);
      if(k===4)co('w','drained: antibiotics can work','#16a34a',160,232);
      if(k<2)co('d','closed space','#b45309',160,112);coEnd();}};

  // 4. Clot retention
  SC.clot={label:'Clot retention',badge:['urg','Urgent'],speed:'hours if clot retention; days if not',
    title:'3. Gross hematuria with clot retention',
    what:'Bleeding into the bladder forms clots that block the outlet. The fix is a large 3-way catheter, a washout by hand, and only then continuous irrigation.',
    watch:['The catheter has three channels: balloon, inflow and outflow.','The Toomey syringe pulls the clots out before irrigation starts.','CBI into a bladder full of clot has nowhere to drain, and it blows the bladder up.'],
    rule:'3-way Foley (22–24 Fr, large bore) with continuous bladder irrigation (CBI). Wash out the clots by hand with a Toomey syringe before starting CBI. Clots that won\'t clear after washout and CBI: call urology.',
    steps:[{n:'Clots fill the bladder',d:4,c:'Blood clots in the bladder and blocks the outlet. The bladder stretches.'},
      {n:'3-way catheter',d:4,c:'A large 3-way Foley: one channel for the balloon, one for inflow, one for outflow.'},
      {n:'Wash out by hand',d:7,c:'The Toomey syringe pushes saline in and pulls the clots out.'},
      {n:'Then run CBI',d:6,c:'With the clots out, saline runs in continuously and drains out.'},
      {n:'What not to do',d:5,c:'CBI into a bladder full of clot: the clots block the outflow and the bladder blows up.'}],
    poster:[2,4],
    build(){const clots=[[150,170],[235,150],[190,210],[255,215],[160,245],[215,260],[120,215],[280,180]];
      return `
      <ellipse id="cb" cx="200" cy="200" rx="100" ry="80" fill="#c2413a" stroke="#c97a6a" stroke-width="6"/>
      <g id="clots">${clots.map((c,i)=>`<ellipse id="cl${i}" cx="${c[0]}" cy="${c[1]}" rx="${13+i%3*3}" ry="${9+i%2*3}" fill="#6b1515"/>`).join('')}</g>
      <ellipse cx="200" cy="350" rx="34" ry="24" fill="#d8b46a" stroke="#a8843a" stroke-width="1.5"/>
      <rect x="193" y="320" width="14" height="230" rx="6" fill="#efe3c2" stroke="#b8a77c"/>
      <path id="cath" d="M200,570 L200,252" fill="none" stroke="#94a3b8" stroke-width="9" stroke-linecap="round"/>
      <circle id="ball" cx="200" cy="318" r="0" fill="#93c5fd" stroke="#2563eb" stroke-width="1.5"/>
      <g id="hub"><path d="M200,570 L150,606 M200,570 L250,606 M200,570 L200,612" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" fill="none"/></g>
      <g id="sbag"><rect x="22" y="40" width="54" height="70" rx="8" fill="#e0f2fe" stroke="#7dd3fc" stroke-width="2"/><text x="49" y="128" text-anchor="middle" font-size="11" fill="#78716c">saline</text></g>
      <path id="inT" d="M49,110 C49,420 90,606 150,606" fill="none" stroke="#7dd3fc" stroke-width="3"/>
      <g id="dbag"><rect x="300" y="560" width="58" height="76" rx="8" fill="#fff" stroke="#94a3b8" stroke-width="2"/><rect id="dbf" x="302" y="634" width="54" height="0" rx="6" fill="#e48a84"/><text x="329" y="654" text-anchor="middle" font-size="11" fill="#78716c">drainage</text></g>
      <path id="outT" d="M250,606 C270,620 290,620 302,610" fill="none" stroke="#94a3b8" stroke-width="3"/>
      <g id="toomey"><rect x="186" y="618" width="28" height="54" rx="4" fill="#fff" stroke="#64748b" stroke-width="2"/><rect id="plunger" x="190" y="640" width="20" height="30" fill="#cbd5e1"/></g>
      <path id="inP" d="M49,110 C49,420 90,606 150,606 L196,572 L196,262" fill="none"/>
      <path id="outP" d="M204,262 L204,572 L250,606 C270,620 290,620 302,610" fill="none"/>
      <path id="tmP" d="M200,630 L200,262" fill="none"/>
      <g id="pI"></g><g id="pO"></g><g id="pT"></g><g id="co2"></g>`;},
    init(){this.i=parts('pI',10,SALINE);this.o=parts('pO',10,'#e48a84');this.t=parts('pT',6,SALINE);},
    draw({k,st,dt,T}){let ry=80,rx=100,clots=0,col=0,cath=0,ball=0,cbi=false,block=false,toom=false,wall='#c97a6a',dbag=0;
      if(k===0){ry=lerp(70,105,st/3);rx=lerp(92,125,st/3);clots=8*ease(st/3);}
      else if(k===1){ry=105;rx=125;clots=8;cath=C01(st/1.6);ball=C01((st-1.8)/.6);}
      else if(k===2){cath=1;ball=1;toom=true;const d=ease(st/6.2);clots=8*(1-d);col=d*.85;ry=lerp(105,78,d);rx=lerp(125,100,d);}
      else if(k===3){cath=1;ball=1;cbi=true;col=.85;ry=78;rx=100;dbag=C01(st/6)*.7;}
      else{cath=1;ball=1;cbi=true;block=true;clots=8;ry=lerp(100,132,st/4.5);rx=lerp(122,145,st/4.5);wall=mix('#c97a6a','#dc2626',st/3);}
      const cy=320-ry;S('cb',{cx:200,cy,rx,ry,fill:mix('#c2413a','#f2b8b0',col),stroke:wall,'stroke-width':6+(block?2*Math.sin(T*8):0)});
      for(let i=0;i<8;i++){const e=$('cl'+i);e.style.display=i<Math.round(clots)?'':'none';e.setAttribute('transform',`translate(0,${cy-200+(ry-80)*.3})`);}
      S('cath',{'stroke-dasharray':`${cath*318} 400`});S('ball',{r:8*ball});
      ['hub','sbag','inT','dbag','outT'].forEach(id=>show(id,cath>=1&&(id==='hub'||k!==2)));show('toomey',toom);
      const ph=(st%2)/2,push=ph<.5;
      if(toom)S('plunger',{y:push?lerp(640,624,ph*2):lerp(624,640,(ph-.5)*2)});
      // syringe phase: saline in on the push, clot out on the pull
      this.t.forEach(p=>{if(!toom){p.el.style.display='none';return;}
        const u=push?ph*2:(ph-.5)*2,y=push?lerp(630,262,u-p.i*.08):lerp(262,630,u-p.i*.08);
        place(p,[200,y],u-p.i*.08>0&&u-p.i*.08<1,push?SALINE:'#6b1515');});
      flow(this.i,'inP',dt,.22,{vis:cbi,cap:block?.99:null});
      flow(this.o,'outP',dt,.3,{vis:cbi&&!block,fill:mix('#c2413a','#e48a84',col)});
      S('dbf',{y:634-70*dbag,height:70*dbag});
      coBegin();
      if(k===0)co('a','clots block the outflow: can\'t pass urine','#9f1239',8,24);
      if(k===1&&cath>=1){co('in','inflow','#0284c7',120,560);co('out','outflow','#475569',236,580);co('bal','balloon','#2563eb',214,318);co('fr','3-way · 22–24 Fr','#2563eb',8,24);}
      if(k===2)co('t','Toomey syringe: '+(push?'saline in':'clots out'),'#2563eb',8,24);
      if(k===3)co('c','CBI: saline in, drains out','#16a34a',8,24);
      if(k===4){co('x','CBI into clot: blows the bladder up','#dc2626',8,24);co('b','outflow blocked','#dc2626',220,560);}
      coEnd();}};

  // 5. Priapism
  SC.priapism={label:'Priapism',badge:['crit','Critical'],speed:'act within 4 h to save function; 24 h is too late',
    title:'6. Priapism',
    what:'Ischemic (low-flow): blood is trapped, so it acts like a compartment syndrome of the erectile chambers. Non-ischemic (high-flow): a leaking artery, after perineal trauma.',
    watch:['The trapped blood darkens; the blood drawn out is dark.','Aspirate, irrigate, then phenylephrine in small repeated doses.','The non-ischemic type has bright, arterial blood and is handled differently.'],
    rule:'Aspirate with a 16–18G angiocatheter or butterfly needle. Phenylephrine ~200 mcg every 3–5 minutes, watching BP and HR, up to a maximum of 1 mg within 1 hour. If aspiration + phenylephrine fail: surgical shunt. Non-ischemic: watch and wait at first; embolize if it persists.',
    steps:[{n:'Blood trapped',d:6,c:'Ischemic: blood can\'t drain out, so it darkens. The clock is running.'},
      {n:'Aspirate',d:5,c:'A 16–18G needle into the erectile chamber draws out the dark blood.'},
      {n:'Irrigate',d:4,c:'Saline in and out.'},
      {n:'Phenylephrine',d:7,c:'About 200 mcg every 3–5 minutes, watching BP and HR. Maximum 1 mg within 1 hour.'},
      {n:'Non-ischemic is different',d:6,c:'A leaking artery: bright blood flows in and out. Watch and wait; embolize if it persists.'}],
    poster:[1,3.5],
    build(){return `
      <rect x="110" y="70" width="180" height="22" rx="8" fill="#e7e5e4"/><text x="200" y="64" text-anchor="middle" font-size="11" fill="#78716c">pubic bone</text>
      <path id="vL" d="M152,140 C120,130 100,112 82,92" fill="none" stroke="#7c6aa8" stroke-width="4" stroke-linecap="round"/>
      <path id="vR" d="M248,140 C280,130 300,112 318,92" fill="none" stroke="#7c6aa8" stroke-width="4" stroke-linecap="round"/>
      <g id="xL"><path d="M104,100 l14,14 M118,100 l-14,14" stroke="#dc2626" stroke-width="3"/></g>
      <g id="xR"><path d="M282,100 l14,14 M296,100 l-14,14" stroke="#dc2626" stroke-width="3"/></g>
      <rect id="cvL" x="148" y="100" width="50" height="370" rx="24" stroke="#9f1239" stroke-width="2"/>
      <rect id="cvR" x="202" y="100" width="50" height="370" rx="24" stroke="#9f1239" stroke-width="2"/>
      <ellipse id="glans" cx="200" cy="498" rx="62" ry="34" fill="#f0c4c4" stroke="#c98a8a" stroke-width="2"/>
      <text id="glT" x="200" y="502" text-anchor="middle" font-size="11" fill="#78716c">glans: soft</text>
      <path id="aL" d="M173,96 L173,440" stroke="#dc2626" stroke-width="2.5"/><path id="aR" d="M227,96 L227,440" stroke="#dc2626" stroke-width="2.5"/>
      <path id="leak" d="M227,250 C240,262 236,280 226,290" fill="none" stroke="#ef4444" stroke-width="3"/>
      <path id="needle" d="M360,280 L232,280" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
      <g id="syr"><rect x="320" y="266" width="64" height="28" rx="4" fill="#fff" stroke="#64748b" stroke-width="2"/><rect id="syf" x="322" y="268" width="0" height="24" fill="#4c1d3f"/></g>
      <path id="asP" d="M228,280 L380,280" fill="none"/>
      <g id="clk"><circle cx="70" cy="300" r="40" fill="#fff" stroke="#e7e5e4" stroke-width="8"/><path id="arc" fill="none" stroke="#dc2626" stroke-width="8"/>
        <text id="hrs" x="70" y="306" text-anchor="middle" font-size="16" font-weight="700" fill="#1c1917">0 h</text></g>
      <g id="pAL"></g><g id="pAR"></g><g id="pVL"></g><g id="pVR"></g><g id="pAs"></g>`;},
    init(){this.al=parts('pAL',6,'#ef4444',2.6);this.ar=parts('pAR',6,'#ef4444',2.6);this.vl=parts('pVL',5,'#7c6aa8',2.6);this.vr=parts('pVR',5,'#7c6aa8',2.6);this.as=parts('pAs',7,'#4c1d3f',3);},
    draw({k,st,dt,T}){let hrs=6,len=370,dark=1,needle=0,asp=false,sal=false,veins=false,inflow=.05,leak=false,fill='#4c1d3f',clock=true,syf=0;
      if(k===0){hrs=6*C01(st/5.5);dark=hrs/6;inflow=.25*(1-dark);}
      else if(k===1){needle=C01(st/1);asp=st>1;dark=lerp(1,.75,(st-1)/4);syf=C01((st-1)/4);}
      else if(k===2){needle=1;sal=true;dark=lerp(.75,.55,st/4);syf=1;}
      else if(k===3){needle=C01(1-st/1.5);const d=ease((st-1)/5);len=lerp(370,250,d);dark=lerp(.55,0,d);veins=st>2;inflow=.25*d;}
      else{clock=false;leak=true;veins=true;len=330;dark=0;inflow=.6;}
      fill=k===4?'#ef4444':mix('#e88b8b','#4c1d3f',dark);
      S('cvL',{height:len,fill});S('cvR',{height:len,fill});S('glans',{cy:100+len+28});S('glT',{y:100+len+32});
      S('aL',{d:`M173,96 L173,${80+len}`});S('aR',{d:`M227,96 L227,${80+len}`});
      show('xL',!veins);show('xR',!veins);show('leak',leak);
      show('needle',needle>0);S('needle',{d:`M360,280 L${lerp(360,232,needle)},280`});show('syr',k===1||k===2);S('syf',{width:60*syf,fill:k===2?'#bae6fd':'#4c1d3f'});
      show('clk',clock);const a=Math.min(hrs/24,.999)*2*Math.PI;
      S('arc',{d:`M70,260 A40,40 0 ${a>Math.PI?1:0} 1 ${70+40*Math.sin(a)},${300-40*Math.cos(a)}`,stroke:hrs>=4?'#dc2626':'#d97706'});
      $('hrs').textContent=`${hrs.toFixed(hrs<10?1:0)} h`;
      const aLen=len-30;
      this.al.forEach(p=>{p.t=(p.t+inflow*dt)%1;place(p,[173,96+p.t*aLen],inflow>.02);});
      this.ar.forEach(p=>{p.t=(p.t+inflow*dt)%1;const y=96+p.t*aLen;place(p,leak&&p.i%2&&y>250?[lerp(227,236,(y-250)/40),Math.min(y,300)]:[227,y],inflow>.02);});
      flow(this.vl,'vL',dt,leak?.6:.3,{vis:veins});flow(this.vr,'vR',dt,leak?.6:.3,{vis:veins});
      flow(this.as,'asP',dt,.5,{vis:asp||sal,fill:sal?(Math.floor(T*1.2)%2?SALINE:'#e88b8b'):'#4c1d3f',rev:sal&&Math.floor(T*1.2)%2===1});
      coBegin();
      if(k===0&&hrs>=4)co('4','past 4 h: function at risk','#dc2626',8,370);
      if(k===0)co('r','rigid shaft · soft glans','#9f1239',250,190);
      if(k===1&&asp)co('d','16–18G: dark blood out','#4c1d3f',240,240);
      if(k===2)co('s','irrigate with saline','#0284c7',240,240);
      if(k===3){const n=Math.min(5,Math.floor(st/1.3)+1);co('p',`phenylephrine ~200 mcg × ${n}`,'#2563eb',240,190);co('m','max 1 mg in 1 h · watch BP, HR','#475569',240,216);}
      if(k===4){co('l','leaking artery: bright blood','#dc2626',240,250);co('w','watch and wait · embolize if it persists','#16a34a',8,620);}
      coEnd();}};

  // 6. Testicular torsion
  SC.torsion={label:'Torsion',badge:['crit','Critical'],speed:'6 h to save the testis',
    title:'7. Testicular torsion',
    what:'The spermatic cord twists and chokes the testicular artery. The testis sits high and lies sideways. The clock starts when the cord twists, not when the patient arrives.',
    watch:['Blood stops at the twist, and the testis darkens.','The chance of saving it falls with every hour.','Untwisting by hand rotates the testis outward, away from the midline.'],
    rule:'The testis is saved in more than 90% of cases under 6 hours and fewer than 10% after 24 hours. Untwisting by hand eases pain and may restore flow, but it doesn\'t replace the operation. In the OR: untwist, and fix both testes in place (the other side has the same bell-clapper weakness).',
    steps:[{n:'Normal',d:3,c:'Blood runs down the spermatic cord into the testis.'},
      {n:'Cord twists',d:5,c:'The twist chokes the artery. The testis rides high and lies sideways.'},
      {n:'The clock',d:6,c:'Every hour lowers the chance of saving it.'},
      {n:'Open the book',d:5,c:'While the OR gets ready: rotate the testis outward, away from the midline.'},
      {n:'OR: fix both',d:4,c:'Untwist and fix both testes in place.'}],
    poster:[2,3],
    build(){return `
      <path d="M60,60 L340,60" stroke="#e7e5e4" stroke-width="10" stroke-linecap="round"/><text x="200" y="48" text-anchor="middle" font-size="11" fill="#78716c">groin</text>
      <path d="M150,64 C146,180 136,260 130,330" fill="none" stroke="#caa15a" stroke-width="7" stroke-linecap="round"/>
      <ellipse cx="130" cy="390" rx="34" ry="48" fill="#d9a38a" stroke="#a86b54" stroke-width="1.5"/>
      <path id="cordB" fill="none" stroke="#caa15a" stroke-width="7" stroke-linecap="round"/>
      <g id="tB"><ellipse id="tBe" rx="40" ry="56" fill="#d9a38a" stroke="#a86b54" stroke-width="1.5"/><path d="M28,-40 C46,-20 46,20 30,42" fill="none" stroke="#b9786a" stroke-width="7" stroke-linecap="round"/></g>
      <g id="st"><path d="M120,350 l8,8 M128,350 l-8,8 M120,420 l8,8 M128,420 l-8,8" stroke="#2563eb" stroke-width="2.5"/><g id="stB"></g></g>
      <path id="arrow" d="M300,300 C340,310 348,350 330,380" fill="none" stroke="#2563eb" stroke-width="3" marker-end="url(#ah)"/>
      <defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#2563eb"/></marker></defs>
      <g><rect x="40" y="600" width="80" height="14" fill="#bbf7d0"/><rect x="120" y="600" width="240" height="14" fill="#fde68a"/>
        <text x="40" y="632" font-size="11" fill="#78716c">0 h</text><text x="120" y="632" font-size="11" fill="#78716c" text-anchor="middle">6 h</text><text x="360" y="632" font-size="11" fill="#78716c" text-anchor="end">24 h</text>
        <path id="mark" d="M0,-8 L6,0 L-6,0 Z" fill="#1c1917"/></g>
      <text x="130" y="460" text-anchor="middle" font-size="11" fill="#78716c">other side</text>
      <g id="pC"></g>`;},
    init(){this.c=parts('pC',9,'#dc2626',2.8);this.st=0;},
    draw({k,st,dt,T}){let A=0,rot=0,rise=0,hrs=0,isch=0,flowOK=true,untw=false,stitch=false;
      if(k===1){A=ease(st/2);rot=80*A;rise=A;hrs=lerp(0,2,st/5);isch=hrs/24*1.6;flowOK=A<.4;}
      else if(k===2){A=1;rot=80;rise=1;hrs=lerp(2,24,ease(st/5.5));isch=Math.min(1,hrs/18);flowOK=false;}
      else if(k===3){const u=ease((st-1)/2);A=1-u;rot=80*(1-u);rise=1-u;hrs=2;isch=.15*(1-u);flowOK=u>.6;untw=st<3.2;}
      else if(k===4){stitch=true;}
      const ty=380-50*rise,tx=262;
      $('tB').setAttribute('transform',`translate(${tx},${ty}) rotate(${rot})`);S('tBe',{fill:mix('#d9a38a','#5b1a36',isch)});
      const top=ty-56+16*rise,cord=t=>{const y=64+t*(top-64),env=Math.sin(Math.PI*C01((t-.25)/.55));return[250+12*t+A*14*Math.sin(t*Math.PI*9)*env,y];};
      let d='';for(let i=0;i<=60;i++){const[x,y]=cord(i/60);d+=(i?'L':'M')+x.toFixed(1)+','+y.toFixed(1);}S('cordB',{d});
      this.c.forEach(p=>{p.t+=.25*dt;const cap=flowOK?null:.28-.025*(p.i%6);if(cap!=null&&p.t>cap)p.t=Math.max(0,cap);else if(p.t>=1)p.t-=1;place(p,cord(p.t),true);});
      show('arrow',untw);show('st',stitch);
      $('stB').innerHTML=stitch?`<path d="M${tx-10},${ty-30} l8,8 M${tx-2},${ty-30} l-8,8 M${tx-10},${ty+34} l8,8 M${tx-2},${ty+34} l-8,8" stroke="#2563eb" stroke-width="2.5"/>`:'';
      $('mark').setAttribute('transform',`translate(${40+320*Math.min(hrs,24)/24},598)`);
      coBegin();
      if(k===1&&A>.5){co('h','high, sideways testis','#9f1239',230,ty+80);co('c','twist chokes the artery','#dc2626',270,170);}
      if(k===2){const txt=hrs<6?'>90% saved under 6 h':hrs<23.5?'every hour lowers the odds':'<10% saved after 24 h';co('m',txt,hrs<6?'#16a34a':'#dc2626',40+320*hrs/24-60,576);}
      if(k===3&&untw)co('o','rotate outward, away from the midline','#2563eb',150,250);
      if(k===3&&!untw)co('r','may restore flow: still needs the OR','#b45309',150,250);
      if(k===4)co('b','fix both sides: bell-clapper','#2563eb',150,250);
      coEnd();}};
  return SC[id];
}

const prefixIds=(html,pre)=>html.replace(/id="([^"]+)"/g,`id="${pre}$1"`).replace(/url\(#([^)]+)\)/g,`url(#${pre}$1)`);

const CSS=`
.cmotion{border:1px solid var(--border);border-radius:12px;background:var(--bg);margin:6px 0 18px;padding:12px;display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:16px;align-items:start}
.cmotion svg{display:block;width:100%;height:auto;background:#fff;border-radius:10px}
.cm-side{display:flex;flex-direction:column;gap:10px;min-width:0}
.cm-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.cm-k{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.cm-play{margin-left:auto;font:inherit;font-size:12px;border:1px solid var(--border);background:var(--card);border-radius:7px;padding:3px 10px;cursor:pointer;color:var(--text)}
.cm-steps{display:flex;flex-wrap:wrap;gap:6px}
.cm-steps button{font:inherit;font-size:12px;line-height:1.4;border:1px solid var(--border);background:var(--card);border-radius:7px;padding:4px 9px;cursor:pointer;color:var(--text);text-align:left}
.cm-steps button[aria-current="true"]{background:var(--accent-light);border-color:var(--accent);color:var(--accent);font-weight:600}
.cm-cap{font-size:14px;line-height:1.55;min-height:3.2em}
.cm-cap b{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
@media(max-width:640px){.cmotion{grid-template-columns:1fr}.cmotion svg{max-width:340px;margin:0 auto}}
`;

let REDUCE=false;try{REDUCE=matchMedia('(prefers-reduced-motion: reduce)').matches;}catch(e){}

function mount(host,n){
  const pre='cm'+n+'-',cur=makeScenario(host.dataset.scenario,pre);if(!cur)return;
  host.innerHTML=`<svg viewBox="0 0 400 680" role="img" aria-label="Animation: ${cur.title.replace(/^\d+\.\s*/,'')}">${prefixIds(cur.build()+'<g id="co"></g>',pre)}</svg>
    <div class="cm-side"><div class="cm-top"><span class="cm-k">Watch it happen</span><button class="cm-play">Pause</button></div>
    <div class="cm-steps">${cur.steps.map((s,i)=>`<button data-i="${i}">${i+1}. ${s.n}</button>`).join('')}</div>
    <div class="cm-cap" aria-live="polite"></div></div>`;
  cur.init();
  const playBtn=host.querySelector('.cm-play'),cap=host.querySelector('.cm-cap'),btns=[...host.querySelectorAll('.cm-steps button')];
  let k=0,st=0,T=0,playing=false,userPaused=REDUCE,visible=false,done=false;
  const caption=()=>{cap.innerHTML=`<b>Step ${k+1} of ${cur.steps.length}</b>${cur.steps[k].c}`;btns.forEach((b,i)=>b.setAttribute('aria-current',String(i===k)));};
  const frame=(dt,force)=>{T+=dt;if(playing||force){st+=dt;const d=cur.steps[k].d;
    if(st>d&&!force){if(k<cur.steps.length-1){k++;st=0;caption();}else{st=d;done=true;setPlay(false);}}}
    cur.draw({k,st,dt,T});};
  const jump=(i,sec)=>{k=Math.max(0,Math.min(i,cur.steps.length-1));st=0;done=false;const m=Math.round(sec*30);for(let j=0;j<m;j++)frame(1/30,true);frame(0,true);caption();};
  const setPlay=on=>{playing=on;playBtn.textContent=on?'Pause':(done?'Replay':'Play');};
  const want=()=>setPlay(visible&&!userPaused&&!done);
  playBtn.onclick=()=>{if(done){jump(0,0);userPaused=false;setPlay(true);}else if(playing){userPaused=true;setPlay(false);}else{userPaused=false;setPlay(true);}};
  btns.forEach(b=>b.onclick=()=>{jump(+b.dataset.i,0);userPaused=REDUCE;if(!REDUCE)setPlay(true);});
  if(REDUCE)jump(cur.poster[0],cur.poster[1]);else jump(0,0);
  // only animate while on screen
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{visible=es[0].isIntersecting;want();},{threshold:.35}).observe(host);
  else{visible=true;want();}
  let last=0;const loop=ts=>{const dt=Math.min((ts-last)/1000,.05)||.016;last=ts;if(playing)frame(dt);requestAnimationFrame(loop);};
  requestAnimationFrame(loop);
  return{jump,host,pause(){userPaused=true;setPlay(false);}};
}

const hosts=[...document.querySelectorAll('.cmotion[data-scenario]')];
if(hosts.length){const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);}
const players=hosts.map((h,i)=>mount(h,i));
// test hook: ?cm=scenario-step-seconds → jump that player, pause it, scroll it into view
const q=new URLSearchParams(location.search).get('cm');
if(q){const[sc,s,sec]=q.split('-');const p=players.find(p=>p&&p.host.dataset.scenario===sc);
  if(p){p.jump(+s||0,+(sec||0));p.pause();p.host.dataset.top=Math.round(p.host.getBoundingClientRect().top+scrollY);
    if(!new URLSearchParams(location.search).has('noscroll'))p.host.scrollIntoView({block:'start'});}}
