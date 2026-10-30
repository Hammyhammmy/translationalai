// Animated procedure players for "Urology Procedures.html".
// Each <div data-proc="foley|spa|cbi|stoma"> becomes a step-by-step player: the
// catheter, needle or irrigation moves along the anatomy, and the red options act
// out the page's own "what goes wrong" warnings. Step wording mirrors the card text.
// Respects prefers-reduced-motion (steps jump to their end state). No dependencies.
// The loop, visibility, callouts, particles and test hook live in ../shared/motion/.
import { REDUCE, mk, set, clamp, lerpRaw as lerp, easeInOut as ease, callouts, dots, ride, pxRate, nearestLen, onFrame, onVisible, injectCSS, testHook } from '../shared/motion/motion-core.js';

// the player being drawn right now (frames run one player at a time)
let svg=null,RATE=null,cur=null;
const URINE='#d99a1e';

// pill callouts, reused per key (kept above the drawing)
const co=(...a)=>cur.C.co(...a), coBegin=()=>cur.C.begin(), coEnd=()=>cur.C.end();
function label(x,y,t,anchor='start'){const e=mk('text',{x,y,'font-size':11,fill:'#78716c','text-anchor':anchor},svg);e.textContent=t;return e;}
// dots that ride a path at a steady on-screen speed: step(dt, px per 60 fps frame, visible, colour)
const flow=(path,n,color,r=2.8)=>{const g=mk('g',{},svg),L=path.getTotalLength(),ps=dots(g,n,color,r);
  return{g,L,ps,step(dt,speed,vis=true,col){ride(ps,path,L,dt,pxRate(speed*60,L),{vis,fill:col,group:g});}};};

// ---------- shared sagittal pelvis (patient facing left) ----------
function pelvis(o){
  const skinD='M112,30 L112,236 C112,262 122,300 140,322 L140,360 C150,382 190,392 230,388 C268,384 300,372 318,352 L340,250 C350,190 352,120 346,30';
  mk('path',{d:skinD,fill:'#f8ede6',stroke:'#d6b8a6','stroke-width':2},svg);
  // sacrum + rectum
  mk('path',{d:'M352,60 C372,140 372,220 346,300',fill:'none',stroke:'#e0d6c8','stroke-width':14,'stroke-linecap':'round'},svg);
  mk('path',{d:'M300,150 C318,210 312,280 290,340 L284,372',fill:'none',stroke:'#d9b8a8','stroke-width':16,'stroke-linecap':'round',opacity:.9},svg);
  // bowel loops above the bladder
  o.bowel=[[170,64],[214,52],[258,66],[292,100],[200,104],[248,112]].map(([x,y])=>mk('circle',{cx:x,cy:y,r:20,fill:'#f3d7c9',stroke:'#d4a593','stroke-width':1.5},svg));
  o.bladder=mk('ellipse',{cx:222,cy:210,rx:62,ry:52,fill:'#f2d675',stroke:'#c97a6a','stroke-width':5},svg);
  // symphysis pubis
  mk('ellipse',{cx:150,cy:268,rx:13,ry:32,fill:'#ece4d4',stroke:'#bfb39c','stroke-width':1.5},svg);
  // penis (held perpendicular) + scrotum
  mk('path',{d:'M140,326 L46,326 C30,326 26,358 46,358 L140,358 Z',fill:'#f1d9cc',stroke:'#d6b8a6','stroke-width':2},svg);
  mk('ellipse',{cx:170,cy:392,rx:28,ry:24,fill:'#ecc8b6',stroke:'#d6b8a6','stroke-width':1.5},svg);
  o.prostate=mk('ellipse',{cx:214,cy:292,rx:24,ry:21,fill:'#d8b46a',stroke:'#a8843a','stroke-width':1.5},svg);
  o.lobe=mk('ellipse',{cx:220,cy:276,rx:11,ry:9,fill:'#c99a45',stroke:'#a8843a','stroke-width':1.5,style:'display:none'},svg);
  // urethra: meatus → penile → bulbar dip → membranous → prostatic → bladder neck → into the bladder
  const d='M40,342 L138,342 C164,344 176,364 192,352 C202,344 204,332 205,320 C208,302 214,286 220,268 L224,226';
  o.ureMark=mk('path',{d:d.replace(' L224,226',''),fill:'none',stroke:'#efe3c2','stroke-width':9,'stroke-linecap':'round'},svg);
  o.gel=mk('path',{d,fill:'none',stroke:'#93c5fd','stroke-width':7,'stroke-linecap':'round',opacity:.85},svg);
  o.path=mk('path',{d,fill:'none',stroke:'none'},svg);
  o.L=o.path.getTotalLength();
  mk('rect',{x:196,y:316,width:20,height:8,rx:3,fill:'#7c3aed',opacity:.8},svg); // external sphincter
  label(150,312,'pubic bone','end');label(248,222,'bladder');label(246,312,'prostate');label(226,332,'sphincter');
  label(60,320,'penis');label(318,160,'rectum');label(124,24,'abdominal wall');label(290,40,'bowel');
}

// ---------- 1. Foley (male) ----------
const FOLEY={label:'Foley catheter',title:'Foley catheter (male)',
  vars:[['standard','Standard'],['bph','Prostate stops it'],['coude','Coudé tip'],['early','Inflated too early',1],['female','Female'],['vagina','Female: into the vagina',1]],
  steps(v){if(v==='female')return[['Supine, knees flexed, frog-legged. Find the meatus: between the clitoris and the vaginal introitus.'],['Prep, lubricate, and advance until urine returns or to the hub.'],['Inflate the balloon with 10 mL sterile water.'],['Gently retract until the balloon meets the bladder neck.']];
    if(v==='vagina')return[['Supine, knees flexed, frog-legged. Find the meatus: between the clitoris and the vaginal introitus.'],['The catheter has gone into the vagina: no urine.',1],['Leave it there as a marker and pass a second catheter above it, into the urethra.'],['Urine returns. Then remove the misplaced one.']];
    const s=[
    ['Hold the penis perpendicular. Instil 10 mL of lidocaine jelly and hold the meatus closed for 2 minutes.'],
    ['Advance steadily. Most resistance is at the external sphincter: ask for a slow breath.']];
    if(v==='early')return s.concat([['No urine yet, but the balloon is inflated anyway.',1],['Stop. Deflate, withdraw, and call urology.',1]]);
    if(v==='bph')return s.concat([['A straight tip catches on the median lobe of the prostate.',1],['Next: a 16 Fr Coudé. Two failed passes is the ceiling.']]);
    return s.concat([[v==='coude'?'Coudé tip pointing at 12 o\'clock rides over the median lobe.':'Through the prostate into the bladder. Confirm urine return before inflating.'],
      ['Inflate the balloon with 10 mL sterile water.'],['Gently retract until the balloon meets the bladder neck.']]);},
  note(v){if(v==='female')return['warn','In post-menopausal or obese patients the meatus can be hard to see: retract with the index and middle fingers of the non-dominant hand to spread the labia.'];
    if(v==='vagina')return['warn','A misplaced catheter in the vagina is a useful landmark: the urethra sits just above it.'];
    return v==='early'?['stop','Balloon won\'t inflate easily, pain, blood at the meatus: the catheter is in the urethra, not the bladder. Never inflate without urine return.']
    :v==='bph'?['warn','The prostate is the most common stopping point in older men. Try a Coudé, then upsize (18–20 Fr), don\'t downsize. Downsizing is for strictures.']
    :v==='coude'?['warn','Keep the indicator stripe at 12 o\'clock (pointing at the belly) the whole way in.']:null;},
  rule:'If no urine returns and you have not reached the hub, do not inflate.',
  build(o,v){if(v==='female'||v==='vagina')return femaleBuild(o);pelvis(o);
    o.ext=mk('path',{d:'M40,342 L16,342 L16,420',fill:'none',stroke:'#e7c08a','stroke-width':5,'stroke-linecap':'round',style:'display:none'},svg);
    o.bag=mk('rect',{x:4,y:404,width:44,height:50,rx:6,fill:'#fff',stroke:'#a8a29e','stroke-width':1.5},svg);
    o.bagFill=mk('rect',{x:6,y:452,width:40,height:0,rx:4,fill:URINE},svg);label(52,444,'bag');
    o.cath=mk('path',{d:o.path.getAttribute('d'),fill:'none',stroke:'#e7c08a','stroke-width':5,'stroke-linecap':'round'},svg);
    o.tipC=mk('line',{stroke:'#e7c08a','stroke-width':5,'stroke-linecap':'round'},svg);
    o.balloon=mk('circle',{r:0,fill:'#dbeafe',stroke:'#60a5fa','stroke-width':2},svg);
    o.blood=[0,1,2].map(i=>mk('circle',{r:3.4,fill:'#b91c1c',style:'display:none'},svg));
    o.sph=nearestLen(o.path,205,320);o.neck=nearestLen(o.path,220,268);o.lobeS=nearestLen(o.path,218,282);
    o.urine=flow(mk('path',{d:'M222,240 L220,268 C214,286 208,302 205,320 C204,332 202,344 192,352 C176,364 164,344 138,342 L40,342 L16,342 L16,420',fill:'none',stroke:'none'},svg),10,URINE,2.4);},
  frame(o,v,i,p,dt){if(o.female)return femaleFrame(o,v,i,p,dt);const L=o.L;
    const bph=v==='bph'||v==='coude';o.lobe.style.display=bph?'':'none';set(o.prostate,{rx:bph?32:24,ry:bph?27:21});
    // gel fills up to the sphincter during step 0
    const gel=i===0?ease(p)*o.sph:o.sph;set(o.gel,{'stroke-dasharray':`${gel} ${L*2}`});
    // catheter length by step
    let len=0,bal=0,returning=false,stopAt=null,inUrethra=false;
    const hub=L, seat=o.neck+12;
    if(i===0)len=0;
    else if(i===1)len=ease(p)*o.sph;
    else if(v==='early'){len=o.sph+ (o.neck-14-o.sph)*(i===2?ease(Math.min(1,p*2)):1);bal=i===2?ease(clamp(p*2-1))*9:9*(1-ease(p));inUrethra=true;}
    else if(v==='bph'){len=i===2?lerp(o.sph,o.lobeS-10,ease(p)):o.lobeS-10;stopAt=len;}
    else{ if(i===2)len=lerp(o.sph,hub,ease(p));else if(i===3){len=hub;bal=9*ease(p);}else{len=lerp(hub,seat,ease(p));bal=9;}
      returning=len>o.neck+4;}
    set(o.cath,{'stroke-dasharray':`${len} ${L*2}`});o.ext.style.display=len>0?'':'none';
    const tip=o.path.getPointAtLength(Math.max(len,0.1)),back=o.path.getPointAtLength(Math.max(len-6,0));
    // Coudé: short bend toward the belly (anterior = up-left)
    if(v==='coude'&&len>0){const dx=tip.x-back.x,dy=tip.y-back.y,n=Math.hypot(dx,dy)||1,a=-0.9;
      const rx=(dx*Math.cos(a)-dy*Math.sin(a))/n,ry=(dx*Math.sin(a)+dy*Math.cos(a))/n;set(o.tipC,{x1:tip.x,y1:tip.y,x2:tip.x+rx*9,y2:tip.y+ry*9,opacity:1});}
    else set(o.tipC,{opacity:0});
    const bp=o.path.getPointAtLength(Math.max(len-7,0));
    set(o.balloon,{cx:bp.x,cy:bp.y,r:bal,fill:inUrethra?'#fecaca':'#dbeafe',stroke:inUrethra?'#dc2626':'#60a5fa'});
    o.blood.forEach((b,k)=>{const on=v==='early'&&(i===3||(i===2&&p>.6));b.style.display=on?'':'none';set(b,{cx:34-k*7,cy:346+k*8});});
    o.urine.step(dt,-1.6,returning);
    const fillH=returning?Math.min(40,(o._bag=(o._bag||0)+dt*6)):(o._bag=0);set(o.bagFill,{y:452-fillH,height:fillH});
    coBegin();
    if(i===0)co('c','lidocaine jelly · 2 min','#2563eb',30,300);
    if(i===1&&p>.55)co('c','resistance: sphincter → slow breath','#7c3aed',150,410);
    if(v==='bph'&&i>=2)co('c','stuck at the prostate','#b45309',236,250);
    if(v==='coude'&&i===2)co('c','tip at 12 o\'clock','#b45309',236,250);
    if(returning&&i===2&&p>.7)co('c','urine returns ✓','#15803d',236,180);
    if(i===3&&v!=='early'&&v!=='bph')co('c','10 mL sterile water','#2563eb',236,180);
    if(i===4)co('c','balloon at the bladder neck','#15803d',236,180);
    if(v==='early'&&i>=2&&p>.5||v==='early'&&i===3)co('c','in the urethra: STOP','#b91c1c',236,250);
    coEnd();}
};

// ---------- 2. Suprapubic tap ----------
const SPA={label:'Suprapubic tap',title:'Suprapubic bladder aspiration',
  vars:[['full','Full bladder'],['empty','Bladder not full',1]],
  steps(v){return[[v==='full'?'Confirm the volume on bladder scan: ≥300 mL gives you a target.':'Bladder scan shows only a small volume. This is a reason not to tap.',v==='empty'?1:0],
    ['Insertion point: 2 fingerbreadths above the pubic bone, midline.'],
    ['Local anaesthetic through the planned tract.'],
    ['18G spinal needle perpendicular to the skin, aspirating as you go.',v==='empty'?1:0],
    [v==='full'?'Urine return confirms you are in the bladder: sample, or bridge with a suprapubic catheter kit.':'Brown fluid: bowel. Withdraw, broad-spectrum antibiotics, call surgery.',v==='empty'?1:0]];},
  note(v){return v==='empty'?['stop','With a small bladder, bowel can lie in front of it. Confirm volume first. "Stool or cloudy non-urine fluid" means bowel injury until proven otherwise.']:null;},
  rule:'No urine return: don\'t redirect blindly. Re-scan; you may be too superficial or the bladder isn\'t where you thought.',
  build(o){pelvis(o);o.gel.style.display='none';
    o.beam=mk('path',{fill:'rgba(37,99,235,.12)',stroke:'rgba(37,99,235,.4)','stroke-width':1},svg);
    o.probe=mk('rect',{x:92,y:186,width:18,height:30,rx:5,fill:'#475569'},svg);
    o.f1=mk('ellipse',{cx:104,cy:224,rx:8,ry:6,fill:'#f1d9cc',stroke:'#a8a29e'},svg);o.f2=mk('ellipse',{cx:104,cy:212,rx:8,ry:6,fill:'#f1d9cc',stroke:'#a8a29e'},svg);
    o.mark=mk('path',{d:'M106,196 l8,8 M114,196 l-8,8',stroke:'#b91c1c','stroke-width':2.5},svg);
    o.local=mk('ellipse',{cx:120,cy:200,rx:0,ry:6,fill:'rgba(147,197,253,.6)'},svg);
    o.needle=mk('line',{x1:62,y1:200,x2:62,y2:200,stroke:'#64748b','stroke-width':2},svg);
    o.syr=mk('rect',{x:14,y:192,width:48,height:16,rx:3,fill:'#fff',stroke:'#64748b','stroke-width':1.5},svg);
    o.syrFill=mk('rect',{x:16,y:194,width:0,height:12,rx:2,fill:URINE},svg);label(14,186,'syringe');},
  frame(o,v,i,p){const full=v==='full';
    // bladder size: full rises above the pubic bone and pushes bowel up; small sits low behind it
    const ry=full?84:26,cy=270-ry;set(o.bladder,{rx:full?70:44,ry,cy});
    o.bowel.forEach((b,k)=>{const base=[[170,64],[214,52],[258,66],[292,100],[200,104],[248,112]][k];
      if(!full&&k===4)set(b,{cx:168,cy:200});else if(!full&&k===5)set(b,{cx:212,cy:178});else set(b,{cx:base[0],cy:full?base[1]-6:base[1]});});
    const sh=(e,on)=>e.style.display=on?'':'none';
    sh(o.beam,i===0);sh(o.probe,i===0);
    if(i===0){const a=ease(p);set(o.beam,{d:`M110,200 L${110+180*a},${200-70*a} L${110+180*a},${200+70*a} Z`});}
    sh(o.f1,i===1);sh(o.f2,i===1);sh(o.mark,i>=1);
    set(o.local,{rx:i===2?16*ease(p):i>2?16:0});
    const x2=i<3?62:i===3?lerp(62,full?190:178,ease(p)):(full?190:178);set(o.needle,{x2});
    sh(o.needle,i>=3);sh(o.syr,i>=3);sh(o.syrFill,i>=3);
    const inside=i>=3&&x2>(full?154:160);set(o.syrFill,{width:inside?(i===4?40*ease(p)+4:6):0,fill:full?URINE:'#7c5a2a'});
    coBegin();
    if(i===0)co('c',full?'~450 mL on scan':'only ~80 mL','#2563eb',150,full?120:250);
    if(i===1)co('c','2 fingerbreadths above the bone','#b45309',120,150);
    if(i===2)co('c','lidocaine','#2563eb',130,232);
    if(i>=3&&inside)co('c',full?'urine ✓':'bowel: STOP','#'+(full?'15803d':'b91c1c'),200,full?160:150);
    coEnd();}
};

// ---------- 3. Continuous bladder irrigation ----------
const CBI={label:'Bladder irrigation',title:'Continuous bladder irrigation (CBI)',
  vars:[['run','Running well'],['clot','Clot blocks the outflow',1]],
  steps(v){return v==='run'?[['Manual clot evacuation first: Toomey syringe, 60 mL in and out, until the return is pink.'],
      ['Hang the saline and prime. Inflow to the third port of the 3-way Foley, outflow to the bag.'],
      ['Titrate the rate to keep the effluent pink, not red.'],
      ['Track in and out. Out should exceed in: flow is forward.']]
    :[['Running normally.'],['Clot plugs the catheter eyelets: no outflow, the bladder distends.',1],['Stop the inflow. Evacuate clots manually.',1],['Restart only when the catheter is draining again.']];},
  note(v){return v==='clot'?['stop','Pain and a tense, full lower belly on CBI means distension. Stop the irrigation now and assume clot until proven otherwise: you can rupture a bladder this way.']:null;},
  rule:'CBI is maintenance after the bladder is clear, not a substitute for clot evacuation. Evacuate, then irrigate.',
  build(o){
    o.bladder=mk('ellipse',{cx:220,cy:190,rx:110,ry:88,fill:'#f9a8a8',stroke:'#c97a6a','stroke-width':5},svg);
    o.clots=[[180,215],[250,220],[215,240],[160,180]].map(([x,y])=>mk('ellipse',{cx:x,cy:y,rx:12,ry:9,fill:'#7f1d1d'},svg));
    mk('rect',{x:211,y:276,width:18,height:170,rx:6,fill:'#e7c08a',stroke:'#c9a06a'},svg);
    o.bal=mk('ellipse',{cx:220,cy:280,rx:16,ry:10,fill:'#dbeafe',stroke:'#60a5fa','stroke-width':2},svg);
    mk('rect',{x:211,y:236,width:18,height:44,rx:8,fill:'#e7c08a',stroke:'#c9a06a'},svg);
    o.eye=mk('circle',{cx:220,cy:250,r:5,fill:'#fff',stroke:'#c9a06a'},svg);
    // saline bag + inflow line, drainage bag + outflow line
    mk('rect',{x:20,y:20,width:60,height:76,rx:10,fill:'#eff6ff',stroke:'#93c5fd','stroke-width':2},svg);label(26,112,'saline 3 L');
    const inD='M50,96 L50,420 Q50,440 120,440 L206,440 L216,438 L216,250';
    mk('path',{d:inD,fill:'none',stroke:'#bfdbfe','stroke-width':4},svg);
    const outD='M224,252 L224,440 L300,440 Q380,440 380,420 L380,400';
    o.outLine=mk('path',{d:outD,fill:'none',stroke:'#fecaca','stroke-width':4},svg);
    o.bag=mk('rect',{x:346,y:322,width:64,height:80,rx:10,fill:'#fff',stroke:'#a8a29e','stroke-width':1.5},svg);
    o.bagFill=mk('rect',{x:348,y:400,width:60,height:0,rx:8,fill:'#f9a8a8'},svg);label(350,316,'drainage');
    o.fin=flow(mk('path',{d:inD,fill:'none',stroke:'none'},svg),12,'#60a5fa',2.6);
    o.fout=flow(mk('path',{d:outD,fill:'none',stroke:'none'},svg),12,'#f87171',2.6);
    o.io=mk('text',{x:20,y:150,'font-size':12,fill:'#1c1917','font-weight':600},svg);
    o.io2=mk('text',{x:20,y:168,'font-size':12,fill:'#78716c'},svg);
    o.toomey=mk('g',{style:'display:none'},svg);mk('rect',{x:236,y:380,width:90,height:22,rx:4,fill:'#fff',stroke:'#64748b','stroke-width':1.5},o.toomey);
    const tt=mk('text',{x:244,y:395,'font-size':11,fill:'#64748b'},o.toomey);tt.textContent='Toomey 60 mL';
    o.IN=0;o.OUT=0;label(150,96,'bladder');},
  frame(o,v,i,p,dt){
    const rate=v==='run'?(i===0?0:i===1?.3:+RATE.value/100):(i===0||i===3?.5:i===1?.5:0);
    const blocked=v==='clot'&&(i===1||(i===2&&p<.6));
    const evac=(v==='run'&&i===0)||(v==='clot'&&i===2);
    // redness of the bladder contents: bleeding vs dilution by the irrigation
    const bleed=.32,k=rate>0?bleed/(bleed+rate):1;
    const red=evac?lerp(.95,.45,ease(p)):k;
    const col=red>.62?'#b91c1c':red>.45?'#e25555':red>.28?'#f4a3a3':'#fde2e2';
    const swell=v==='clot'?(i===1?ease(p):i===2?1-ease(p):0):0;
    set(o.bladder,{fill:col,rx:110+18*swell,ry:88+16*swell,cy:190-14*swell});
    // clots: present until evacuated
    const clotLeft=v==='run'?(i===0?1-ease(p):0):(i===2?1-ease(p):i===3?0:1);
    o.clots.forEach((c,n)=>{c.style.display=clotLeft>.05?'':'none';set(c,{opacity:clotLeft});
      if(v==='clot'&&n===2)set(c,{cx:i>=1?220:215,cy:i>=1?250:240});});
    o.toomey.style.display=evac?'':'none';
    o.fin.step(dt,rate*2.2,rate>0&&!evac);
    const outRate=blocked||evac?0:rate+.08;
    o.fout.step(dt,outRate*2.2,outRate>0,col==='#fde2e2'?'#f9a8a8':col);
    o.outLine.setAttribute('stroke',blocked?'#e7e5e4':'#fecaca');
    o.IN+=rate*dt*40;o.OUT+=outRate*dt*40;
    if(i===0&&p<.05){o.IN=0;o.OUT=0;}
    o.io.textContent=`In ${Math.round(o.IN)} mL · Out ${Math.round(o.OUT)} mL`;
    const net=o.OUT-o.IN;o.io2.textContent=`Net ${net>=0?'+':''}${Math.round(net)} mL ${net<0?'· out < in: stop':''}`;o.io2.setAttribute('fill',net<0?'#b91c1c':'#15803d');
    const fh=Math.min(74,(o.OUT%600)/600*74);set(o.bagFill,{y:400-fh,height:fh,fill:col==='#fde2e2'?'#f9c5c5':col});
    cur.rateTxt.textContent=k>.62?'red: speed up':k>.28?'pink: on target':'clear: can slow down';
    coBegin();
    if(blocked)co('c','clot in the eyelets: no outflow','#b91c1c',236,232);
    if(evac)co('c','evacuate clots first','#b45309',236,360);
    if(v==='run'&&i===2)co('c',k>.62?'red: bleeding outpacing you':k>.28?'pink, not red ✓':'clear: titrate down','#'+(k>.62?'b91c1c':k>.28?'15803d':'2563eb'),120,60);
    coEnd();}
};

// ---------- 4. Stoma check ----------
const STOMA={label:'Stoma check',title:'Ileal conduit stoma: the 30-second exam',
  vars:[['healthy','Healthy'],['pale','Pale'],['dusky','Dusky',1],['black','Black',1],['retracted','Retracted'],['prolapse','Prolapsed']],
  steps(){return[['Colour: beefy pink to red is healthy.'],['Moisture: it should glisten.'],['Height: flush or below the skin is retraction; several cm out is prolapse.'],['Output: urine with mucus strands, 1–2 L a day.']];},
  note(v){return{dusky:['stop','Dusky purple is ischaemia: a vascular emergency. The operating team needs to know within minutes. Don\'t wait for it to "pink up".'],
    black:['stop','Black is necrosis. Call now.'],pale:['warn','Pale pink is okay. Keep watching the colour.'],
    retracted:['warn','Retraction prompts urology review. Usually not an emergency.'],prolapse:['warn','Prolapse prompts urology review. Usually not an emergency.']}[v]||null;},
  rule:'An ileal conduit is not a bladder. It doesn\'t store; it drains. No output for 4–6 hours with a viable stoma is a workup: gently irrigate, then call.',
  build(o){
    mk('path',{d:'M0,60 C120,40 300,40 420,60 L420,460 L0,460 Z',fill:'#f1d9cc',stroke:'#d6b8a6','stroke-width':2},svg);
    label(20,90,'abdominal skin');
    o.ring=mk('ellipse',{cx:210,cy:220,rx:70,ry:70,fill:'none',stroke:'#cbd5e1','stroke-width':10,opacity:.8},svg);label(282,150,'appliance flange');
    o.stalk=mk('rect',{x:180,y:220,width:60,height:0,rx:26,fill:'#e0526b'},svg);
    o.stoma=mk('ellipse',{cx:210,cy:220,rx:34,ry:30,fill:'#e0526b',stroke:'#9f1239','stroke-width':2},svg);
    o.hole=mk('ellipse',{cx:210,cy:222,rx:6,ry:5,fill:'#7f1d1d'},svg);
    o.shine=mk('ellipse',{cx:198,cy:208,rx:12,ry:6,fill:'#fff',opacity:.55},svg);
    o.drops=flow(mk('path',{d:'M210,226 L210,430',fill:'none',stroke:'none'},svg),6,URINE,3);
    o.side=mk('g',{},svg);mk('rect',{x:282,y:338,width:130,height:110,rx:10,fill:'#fff',stroke:'#e7e5e4'},o.side);
    const st=mk('text',{x:292,y:356,'font-size':11,fill:'#78716c'},o.side);st.textContent='side view';
    mk('path',{d:'M290,412 L404,412 L404,440 L290,440 Z',fill:'#f1d9cc'},o.side);mk('line',{x1:290,y1:412,x2:404,y2:412,stroke:'#d6b8a6','stroke-width':2},o.side);
    o.sideSt=mk('path',{fill:'#e0526b',stroke:'#9f1239','stroke-width':1.5},o.side);
    o.mucus=mk('path',{d:'M212,232 q8,30 -2,60 q-8,30 4,60',fill:'none',stroke:'#f5f5f4','stroke-width':3,'stroke-linecap':'round',opacity:.9},svg);},
  frame(o,v,i,p,dt){
    const C={healthy:'#e0526b',pale:'#f2a7b3',dusky:'#6b2f5e',black:'#1c1917',retracted:'#e0526b',prolapse:'#e0526b'}[v];
    const h=v==='prolapse'?90:0;
    set(o.stoma,{fill:C,stroke:v==='black'?'#000':'#9f1239',cy:220+h,rx:v==='retracted'?28:34,ry:v==='retracted'?20:30});
    set(o.stalk,{fill:C,height:h});set(o.hole,{cy:222+h});
    set(o.shine,{cy:208+h,opacity:(v==='dusky'||v==='black')?.12:.55});
    o.ring.setAttribute('stroke-width',v==='retracted'?14:10);
    // side view: a healthy spout stands proud of the skin; retraction sits at or below it; prolapse is several cm out
    const sh2={retracted:-6,prolapse:56}[v]??18;
    set(o.sideSt,{fill:C,d:sh2>0?`M334,412 L334,${412-sh2+6} Q347,${412-sh2-6} 360,${412-sh2+6} L360,412 Z`:`M332,412 Q347,${412-sh2*-1+8} 362,412 Z`});
    const viable=!(v==='dusky'||v==='black');
    o.drops.step(dt,1.4,i===3&&viable);o.mucus.style.display=i===3&&viable?'':'none';
    coBegin();
    const verdict={healthy:['beefy pink ✓','#15803d'],pale:['pale pink: okay','#b45309'],dusky:['dusky: ischaemia · call now','#b91c1c'],black:['black: necrosis · call now','#b91c1c'],retracted:['flush with skin: retraction','#b45309'],prolapse:['several cm out: prolapse','#b45309']}[v];
    if(i===0||i===2)co('c',verdict[0],verdict[1],260,i===2?300:200);
    if(i===1)co('c',viable?'glistening ✓':'dull, dry','#'+(viable?'15803d':'b91c1c'),260,200);
    if(i===3)co('c',viable?'urine + mucus strands ✓':'check viability first','#'+(viable?'15803d':'b91c1c'),230,380);
    coEnd();}
};


// ---------- female catheterisation (sagittal, facing left) ----------
function femaleBuild(o){o.female=true;
  mk('path',{d:'M112,30 L112,236 C112,270 128,306 156,326 C172,338 186,352 204,362 C240,380 290,372 318,352 L340,250 C350,190 352,120 346,30',fill:'#f8ede6',stroke:'#d6b8a6','stroke-width':2},svg);
  mk('path',{d:'M352,60 C372,140 372,220 346,300',fill:'none',stroke:'#e0d6c8','stroke-width':14,'stroke-linecap':'round'},svg);
  mk('path',{d:'M308,170 C322,226 316,290 296,344 L290,368',fill:'none',stroke:'#d9b8a8','stroke-width':16,'stroke-linecap':'round',opacity:.9},svg);
  [[170,64],[214,52],[258,66],[292,100],[200,104]].forEach(([x,y])=>mk('circle',{cx:x,cy:y,r:20,fill:'#f3d7c9',stroke:'#d4a593','stroke-width':1.5},svg));
  mk('path',{d:'M262,170 C250,140 300,128 306,160 C312,190 296,226 274,252 L262,248 C266,226 270,200 262,170 Z',fill:'#f3d9de',stroke:'#d7a3ad','stroke-width':1.5},svg);
  o.bladder=mk('ellipse',{cx:220,cy:208,rx:58,ry:48,fill:'#f2d675',stroke:'#c97a6a','stroke-width':5},svg);
  mk('ellipse',{cx:150,cy:266,rx:13,ry:32,fill:'#ece4d4',stroke:'#bfb39c','stroke-width':1.5},svg);
  // vagina: from the introitus up and back to the cervix
  const vd='M200,354 C220,328 244,296 268,256';
  mk('path',{d:vd,fill:'none',stroke:'#f0c3cc','stroke-width':12,'stroke-linecap':'round'},svg);
  o.vpath=mk('path',{d:vd,fill:'none',stroke:'none'},svg);
  // urethra: short, meatus to bladder neck, then into the bladder
  const ud='M180,336 C192,312 204,288 214,258 L220,224';
  mk('path',{d:'M180,336 C192,312 204,288 214,258',fill:'none',stroke:'#efe3c2','stroke-width':8,'stroke-linecap':'round'},svg);
  o.path=mk('path',{d:ud,fill:'none',stroke:'none'},svg);o.L=o.path.getTotalLength();o.neck=nearestLen(o.path,214,258);
  mk('circle',{cx:168,cy:326,r:4,fill:'#e8a7b2'},svg);
  o.ring=mk('circle',{cx:180,cy:336,r:10,fill:'none',stroke:'#2563eb','stroke-width':2,'stroke-dasharray':'3 3'},svg);
  label(136,246,'pubic bone','end');label(250,200,'bladder');label(300,150,'uterus');label(254,322,'vagina');label(318,190,'rectum');
  label(122,322,'clitoris','end');label(124,344,'meatus','end');label(176,378,'introitus','end');label(124,24,'abdominal wall');
  o.ext=mk('path',{d:'M180,336 C150,360 60,372 26,404',fill:'none',stroke:'#e7c08a','stroke-width':5,'stroke-linecap':'round',style:'display:none'},svg);
  o.bag=mk('rect',{x:4,y:404,width:44,height:50,rx:6,fill:'#fff',stroke:'#a8a29e','stroke-width':1.5},svg);
  o.bagFill=mk('rect',{x:6,y:452,width:40,height:0,rx:4,fill:URINE},svg);label(52,444,'bag');
  o.vcath=mk('path',{d:vd,fill:'none',stroke:'#e7c08a','stroke-width':5,'stroke-linecap':'round'},svg);o.VL=o.vpath.getTotalLength();
  o.cath=mk('path',{d:ud,fill:'none',stroke:'#e7c08a','stroke-width':5,'stroke-linecap':'round'},svg);
  o.balloon=mk('circle',{r:0,fill:'#dbeafe',stroke:'#60a5fa','stroke-width':2},svg);
  o.urine=flow(mk('path',{d:'M220,232 L214,258 C204,288 192,312 180,336 C150,360 60,372 26,404',fill:'none',stroke:'none'},svg),9,URINE,2.4);}
function femaleFrame(o,v,i,p,dt){const L=o.L,mis=v==='vagina';
  o.ring.style.display=i===0?'':'none';
  // the misplaced catheter: in the vagina from step 1, removed in the last step
  const vlen=mis&&i>=1?(i===1?ease(p)*o.VL*.8:i===3?o.VL*.8*(1-ease(clamp(p*2-1))):o.VL*.8):0;
  set(o.vcath,{'stroke-dasharray':`${vlen} ${o.VL*2}`});
  let len=0,bal=0;
  if(!mis){if(i===1)len=ease(p)*L;else if(i===2){len=L;bal=9*ease(p);}else if(i===3){len=lerp(L,o.neck+12,ease(p));bal=9;}}
  else{if(i===2)len=ease(p)*L;else if(i===3)len=L;}
  set(o.cath,{'stroke-dasharray':`${len} ${L*2}`});o.ext.style.display=len>0?'':'none';
  const bp=o.path.getPointAtLength(Math.max(len-7,0));set(o.balloon,{cx:bp.x,cy:bp.y,r:bal});
  const returning=len>o.neck+4;o.urine.step(dt,-1.6,returning);
  const fillH=returning?Math.min(40,(o._bag=(o._bag||0)+dt*6)):(o._bag=0);set(o.bagFill,{y:452-fillH,height:fillH});
  coBegin();
  if(i===0)co('c','meatus: above the introitus','#2563eb',196,380);
  if(mis&&i===1&&p>.5)co('c','in the vagina: no urine','#b91c1c',236,300);
  if(mis&&i===2)co('c','marker stays · second catheter above','#b45309',196,390);
  if(returning&&(i===1||i===3&&mis))co('c','urine returns ✓','#15803d',236,150);
  if(!mis&&i===2)co('c','10 mL sterile water','#2563eb',236,150);
  if(!mis&&i===3)co('c','balloon at the bladder neck','#15803d',236,150);
  coEnd();}

// ---------- urine collection for culture ----------
const CULTURE={label:'Urine culture',title:'Urine collection for culture',
  vars:[['midstream','Clean-catch midstream'],['firstvoid','First part into the cup',1],['port','From the catheter port'],['bag','From the bag',1]],
  steps(v){return{
    midstream:[['Start voiding into the toilet: the first part washes out urethral and skin bacteria.'],['Move the cup into the stream and collect the middle part.'],['Finish in the toilet and cap the cup.'],['A single organism (or no growth) is believable. Match it to the patient.']],
    firstvoid:[['The cup goes under the very first part of the stream.',1],['Urethral and skin bacteria wash straight into the cup.',1],['Mixed flora, two or three organisms: a contaminated sample. Recollect with better technique.',1]],
    port:[['Patient with an indwelling Foley: sample from the port on the catheter.'],['That urine has just come from the bladder: believable.']],
    bag:[['Urine is taken from the drainage bag.',1],['Bag urine is colonised within hours, whatever the patient has.',1],['Growth tells you about the bag, not the bladder. Resample from the port.']]}[v];},
  note(v){return v==='firstvoid'||v==='bag'?['stop','A culture you can\'t trust is worse than no culture: it gets treated. Most failures are technique failures, not biology.']:null;},
  rule:'',
  build(o,v){o.v=v;const cath=v==='port'||v==='bag';
    if(!cath){
      o.toilet=mk('path',{d:'M90,370 C90,440 330,440 330,370 Z',fill:'#f1f5f9',stroke:'#94a3b8','stroke-width':2},svg);
      mk('ellipse',{cx:210,cy:370,rx:120,ry:16,fill:'#e2e8f0',stroke:'#94a3b8','stroke-width':2},svg);label(300,452,'toilet');
      mk('path',{d:'M150,30 C170,70 250,70 270,30',fill:'none',stroke:'#d6b8a6','stroke-width':3},svg);label(282,34,'urethra opens here');
      o.stream=mk('path',{d:'M210,60 L210,368',fill:'none',stroke:'none'},svg);
      o.drops=flow(o.stream,16,URINE,3);
      o.bugs=[0,1,2,3,4,5].map(()=>mk('rect',{width:7,height:3,rx:1.5,fill:'#15803d'},svg));
      o.cup=mk('g',{},svg);mk('path',{d:'M-24,-30 L-20,30 L20,30 L24,-30 Z',fill:'rgba(255,255,255,.85)',stroke:'#64748b','stroke-width':2},o.cup);
      o.cupFill=mk('rect',{x:-20,y:30,width:40,height:0,fill:URINE,opacity:.8},o.cup);
      o.cupBugs=[0,1,2,3].map(k=>mk('rect',{x:-14+k*8,y:18,width:6,height:3,rx:1.5,fill:'#15803d',style:'display:none'},o.cup));
      o.lid=mk('rect',{x:-26,y:-36,width:52,height:7,rx:2,fill:'#64748b',style:'display:none'},o.cup);
    }else{
      mk('ellipse',{cx:210,cy:40,rx:110,ry:34,fill:'#f2d675',stroke:'#c97a6a','stroke-width':5},svg);label(330,40,'bladder');
      mk('path',{d:'M210,70 L210,330 Q210,350 240,350 L320,350',fill:'none',stroke:'#e7c08a','stroke-width':8,'stroke-linecap':'round'},svg);
      o.tube=mk('path',{d:'M210,70 L210,330 Q210,350 240,350 L330,350 L330,370',fill:'none',stroke:'none'},svg);
      o.flowT=flow(o.tube,10,URINE,2.6);
      mk('rect',{x:200,y:170,width:20,height:24,rx:4,fill:'#cbd5e1',stroke:'#64748b'},svg);label(172,186,'sampling port','end');
      o.bagR=mk('rect',{x:300,y:370,width:90,height:80,rx:10,fill:'#fff',stroke:'#a8a29e','stroke-width':1.5},svg);label(306,364,'drainage bag');
      mk('rect',{x:302,y:410,width:86,height:38,rx:8,fill:URINE,opacity:.6},svg);
      o.bagBugs=Array.from({length:14},(_,k)=>mk('rect',{x:308+(k*23)%76,y:414+(k*7)%30,width:7,height:3,rx:1.5,fill:'#15803d'},svg));
      o.syr=mk('g',{},svg);mk('rect',{x:0,y:-8,width:70,height:16,rx:3,fill:'#fff',stroke:'#64748b','stroke-width':1.5},o.syr);
      mk('line',{x1:-14,y1:0,x2:0,y2:0,stroke:'#64748b','stroke-width':2},o.syr);
      o.syrFill=mk('rect',{x:2,y:-6,width:0,height:12,fill:URINE},o.syr);
      o.syrBugs=[0,1,2].map(k=>mk('rect',{x:10+k*16,y:-2,width:7,height:3,rx:1.5,fill:'#15803d',style:'display:none'},o.syr));
    }},
  frame(o,v,i,p,dt){coBegin();o.T=(o.T||0)+dt; // engine time: stops when paused or off screen
    if(v==='midstream'||v==='firstvoid'){const first=v==='firstvoid';
      // stream runs the whole time; bacteria ride the first part
      o.drops.step(dt,3,!(v==='midstream'&&i===3));
      const flush=(i===0)||(first&&i<=1);
      o.bugs.forEach((b,k)=>{const show=flush&&!(v==='midstream'&&i>0);b.style.display=show?'':'none';
        const t=((o.T*0.9)+k/6)%1;set(b,{x:206+((k%2)?6:-8),y:60+t*300});});
      // cup position: under the stream only when collecting
      const inStream=first?1:(i===1?ease(p):i===2?1-ease(p)*.0:0);
      const cx=first?210:(i===0?340:i===1?lerp(340,210,ease(p)):i===2?lerp(210,340,ease(p)):340),cy=first?300:300;
      o.cup.setAttribute('transform',`translate(${cx},${cy})`);
      const fill=first?Math.min(52,(o._f=(o._f||0)+dt*14)):(i===1?52*ease(p):i>=2?52:0);set(o.cupFill,{y:30-fill,height:fill});
      o.cupBugs.forEach(b=>b.style.display=first&&(i>=1||p>.4)?'':'none');
      o.lid.style.display=(v==='midstream'&&i>=2&&p>.6)||(v==='midstream'&&i===3)?'':'none';
      if(v==='midstream'&&i===0)co('c','first part: to the toilet','#b45309',230,200);
      if(v==='midstream'&&i===1)co('c','midstream: into the cup','#15803d',100,230);
      if(v==='midstream'&&i===3)co('c','one organism: believable ✓','#15803d',120,200);
      if(first&&i>=1)co('c','mixed flora: recollect','#b91c1c',250,240);
    }else{
      o.flowT.step(dt,1.2,true);
      const port=v==='port',sx=port?160:250,sy=port?182:330;o.syr.setAttribute('transform',`translate(${port?222:392},${sy}) scale(${port?1:-1},1)`);
      const sf=i===0?60*ease(p):60;set(o.syrFill,{width:i===0&&p<.2?0:sf});
      o.syrBugs.forEach(b=>b.style.display=!port&&i>=0&&p>.4?'':'none');
      o.bagBugs.forEach((b,k)=>b.style.display=port&&k%2?'none':'');
      if(port&&i>=0)co('c','fresh bladder urine ✓','#15803d',230,140);
      if(!port&&i>=1)co('c','colonised within hours','#b91c1c',196,300);
      if(!port&&i===2)co('c','resample from the port','#15803d',230,140);
    }
    coEnd();}
};

const PROCS={foley:FOLEY,spa:SPA,cbi:CBI,stoma:STOMA,culture:CULTURE};
const STEP_S=2.4,players=[];
function use(pl){cur=pl;svg=pl.svg;RATE=pl.rate;}

const CSS=`
.pm{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px;padding:14px 20px 4px;border-bottom:1px solid var(--border)}
.pm-fig{background:var(--bg);border:1px solid var(--border);border-radius:12px;padding:6px}
.pm-fig svg{display:block;width:100%;height:auto}
.pm-ctrl{display:flex;gap:6px;align-items:center;flex-wrap:wrap;padding:6px 2px 2px}
.pm-ctrl button,.pm-vars button{font-family:var(--font);font-size:12px;border:1px solid var(--border);background:#fff;color:var(--text);border-radius:7px;padding:3px 9px;cursor:pointer;line-height:1.5}
.pm-count{margin-left:auto;font-size:11.5px;color:var(--muted)}
.pm-side{display:flex;flex-direction:column;gap:10px;min-width:0;font-size:14px;line-height:1.55}
.pm-vars{display:flex;flex-wrap:wrap;gap:6px}
.pm-vars button{border-radius:999px}
.pm-vars button[aria-pressed="true"]{background:var(--text);color:#fff;border-color:var(--text)}
.pm-vars button.bad[aria-pressed="true"]{background:var(--red);border-color:var(--red)}
.pm-steps{margin:0;padding-left:1.3em;display:flex;flex-direction:column;gap:4px}
.pm-steps li{cursor:pointer;color:var(--muted);padding:2px 5px;border-radius:6px;margin:0}
.pm-steps li.on{color:var(--text);background:var(--accent-light)}
.pm-steps li.done{color:var(--text)}
.pm-steps li.bad.on{background:var(--red-light)}
.pm-note{font-size:13px;border-left:3px solid var(--orange);background:var(--orange-light);padding:7px 10px;border-radius:0 8px 8px 0}
.pm-note.stop{border-color:var(--red);background:var(--red-light)}
.pm-note:empty{display:none}
.pm-rate{display:flex;gap:8px;align-items:center;font-size:12.5px}
.pm-rate input{flex:1;min-width:0}
.pm-rate[hidden]{display:none}
@media(max-width:640px){.pm{grid-template-columns:1fr;padding:12px 14px 4px}}
`;

function mount(host){const id=host.dataset.proc,P=PROCS[id];if(!P)return;
  host.classList.add('pm');
  host.innerHTML=`<div class="pm-fig"><svg viewBox="0 0 420 460" role="img" aria-label="Animated: ${P.title}"></svg>
    <div class="pm-ctrl"><button data-a="prev">◀ Back</button><button data-a="play">Play</button><button data-a="next">Next ▶</button><button data-a="restart">Restart</button><span class="pm-count"></span></div></div>
    <div class="pm-side"><div class="pm-vars" role="group" aria-label="What happens if"></div><ol class="pm-steps"></ol>
    <div class="pm-rate" hidden><span>Irrigation rate</span><input type="range" min="0" max="100" value="45" aria-label="Irrigation rate"><span class="pm-ratetxt"></span></div>
    <div class="pm-note" aria-live="polite"></div></div>`;
  const q=s=>host.querySelector(s);
  const pl={P,host,svg:q('svg'),C:null,rate:q('input'),rateTxt:q('.pm-ratetxt'),v:P.vars[0][0],idx:0,prog:0,playing:false,hold:0,obj:{},visible:true};
  pl.build=()=>{pl.svg.innerHTML='';pl.C=callouts(pl.svg,{maxX:416,raise:true});use(pl);pl.obj={};P.build(pl.obj,pl.v);};
  pl.side=()=>{const vb=q('.pm-vars');vb.innerHTML='';
    P.vars.forEach(([vid,lab,bad])=>{const b=document.createElement('button');b.textContent=lab;if(bad)b.className='bad';b.setAttribute('aria-pressed',String(vid===pl.v));b.onclick=()=>{pl.v=vid;pl.build();pl.side();pl.go(0);};vb.appendChild(b);});
    const n=P.note(pl.v),ne=q('.pm-note');ne.className='pm-note'+(n&&n[0]==='stop'?' stop':'');ne.textContent=n?n[1]:'';
    q('.pm-rate').hidden=!(P===CBI&&pl.v==='run');
    const ol=q('.pm-steps');ol.innerHTML='';P.steps(pl.v).forEach(([t,bad],k)=>{const li=document.createElement('li');li.textContent=t;if(bad)li.dataset.bad='1';li.onclick=()=>{pl.setPlaying(false);pl.go(k);};ol.appendChild(li);});};
  pl.go=k=>{const n=P.steps(pl.v).length;pl.idx=clamp(k,0,n-1);pl.prog=REDUCE?1:0;pl.hold=0;
    [...q('.pm-steps').children].forEach((li,j)=>{li.className=(li.dataset.bad?'bad ':'')+(j===pl.idx?'on':j<pl.idx?'done':'');});
    q('.pm-count').textContent=`Step ${pl.idx+1} of ${n}`;};
  pl.setPlaying=on=>{pl.playing=on;q('[data-a="play"]').textContent=on?'Pause':'Play';};
  host.querySelectorAll('.pm-ctrl button').forEach(b=>b.onclick=()=>{const a=b.dataset.a;
    if(a==='prev'){pl.setPlaying(false);pl.go(pl.idx-1);}
    else if(a==='next'){pl.setPlaying(false);pl.go(pl.idx+1);}
    else if(a==='restart'){pl.go(0);pl.setPlaying(!REDUCE);}
    else{if(!pl.playing&&pl.idx===P.steps(pl.v).length-1&&pl.prog>=1)pl.go(0);pl.setPlaying(!pl.playing);}});
  pl.build();pl.side();pl.go(0);
  players.push(pl);return pl;}

function start(){injectCSS('procedure-player',CSS);
  document.querySelectorAll('[data-proc]').forEach(mount);
  // only animate players on screen
  players.forEach(p=>onVisible(p.host,v=>{p.visible=v;}));
  onFrame(dt=>{
    for(const pl of players){if(!pl.visible)continue;use(pl);
      if(pl.prog<1)pl.prog=Math.min(1,pl.prog+dt/STEP_S);
      else if(pl.playing){pl.hold+=dt;if(pl.hold>1.1){const n=pl.P.steps(pl.v).length;if(pl.idx<n-1)pl.go(pl.idx+1);else pl.setPlaying(false);}}
      pl.P.frame(pl.obj,pl.v,pl.idx,pl.prog,dt);}});
  // test hook: ?m=<proc>-<variant>-<step> jumps that player to the end of that step
  const h=testHook();
  if(h){const pl=players.find(p=>p.host.dataset.proc===h.key);if(pl){const[v,k]=h.args;if(pl.P.vars.some(x=>x[0]===v)){pl.v=v;pl.build();pl.side();}pl.go(+k||0);pl.prog=1;if(!h.noscroll)pl.host.scrollIntoView();}}
}
start();
