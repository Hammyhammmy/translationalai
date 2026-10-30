// The animated front-view tract on the Urinary Interactive page: the bladder cycle, urine
// riding the real ureter paths, and each condition's mechanism (scenes in urinary-motion.js).
// The page owns its state (tab, condition, sex, phase lock) and passes it in through ctx;
// this file owns the motion. The loop and reduced motion come from ../shared/motion/.
import { kit, callouts, mk, advance } from '../shared/motion/motion-core.js';
import { GEO, bladderSize, anchors } from '../shared/motion/anatomy.js';
import { targetTags } from '../shared/motion/target-tags.js';
import { TARGETS, CYCLE_TARGETS, isActive } from './targets.js';

const URINE='#d99a1e',BLOODC='#b91c1c',REFLUXC='#ea7a12';

// ctx: { scene(), sex(), moving(), lock(), showTip(), showTargets() } — read fresh on every call
export function createTract(ctx){
const {$:el,parts}=kit('');
const setA=(id,a)=>{const e=el(id);for(const k in a)e.setAttribute(k,a[k]);};
const LA=el('urA').getTotalLength(),LB=el('urB').getTotalLength();
const ptB=t=>{const p=el('urB').getPointAtLength(t*LB);return[p.x,p.y];};
const pA=parts('pA',9,URINE),pB=parts('pB',9,URINE),pU=parts('pU',14,URINE);
const M={};let mFx={cough:false,drip:false};
let scene,moving,lock,sex;
const sync=()=>{scene=ctx.scene();moving=ctx.moving();lock=ctx.lock();sex=ctx.sex();};
// callouts: one pill per key, reused across frames
const C=callouts(el('callouts'),{maxX:396});
const co=C.co;
// receptor tags: the four cycle receptors always, plus whatever the scene is treated through
const tags=targetTags(el('rx'),TARGETS);let shown=null;
function drawTargets(s,m,g,cy,ry,prx){
  if(!moving||!ctx.showTargets()){tags.update({});shown=null;return;}
  const male=sex==='male',focus=new Set(s.targets||[]),A=anchors(sex);
  const ids=[...CYCLE_TARGETS,...(s.targets||[]).filter(id=>!CYCLE_TARGETS.includes(id))].filter(id=>!TARGETS[id].male||male);
  const yb=cy-ry*.38,st={},lit=new Set();
  for(const id of ids){const on=isActive(id,m.phase);if(on)lit.add(id);const b={lit:on,focus:focus.has(id)};
    if(id==='M3')st[id]={...b,x:183,y:yb};
    else if(id==='B3')st[id]={...b,x:217,y:yb};
    else if(id==='A1A')st[id]={...b,x:128,y:g.neck+8,to:[[189,g.neck+1],...(male?[[200-prx*.8,530]]:[])]};
    else if(id==='N')st[id]={...b,x:128,y:g.ext+4,to:[[183-5*m.ext,g.ext+4]]};
    else if(id==='A1D'){const[x,y]=A.distalUreter;/* below the stone callout */st[id]={...b,x:x+84,y:y+30,to:[[x+3,y+2]]};}
    else if(id==='AR5')st[id]={...b,x:272,y:g.neck+2,to:[[200+prx*.8,524]]};}
  tags.update(st);shown={ids:ids.filter(id=>st[id]),lit,focus};}
function mReset(){sync();Object.assign(M,{f:scene.outlet&&scene.outlet.kind==='bph'?.4:.15,phase:'fill',hold:0,c:0,ext:0,dA:0,dB:0,T:0,coughT:0,urgeT:0,dripT:0,div:0});
  [pA,pB,pU].forEach(a=>a.forEach((p,i)=>p.t=i/a.length));}
// static marks that depend only on the scene (ureter block, outlet block)
function mBuild(){sync();const s=scene,ub=el('ublock'),ob=el('oblock');ub.innerHTML='';ob.innerHTML='';const g=GEO[sex];
  if(s.ureter){const[x,y]=ptB(s.ureter.at);
    if(s.ureter.kind==='stone')ub.appendChild(mk('path',{d:`M${x-6},${y-3} l5,-4 l7,3 l1,7 l-6,4 l-7,-3 Z`,fill:'#57534e',stroke:'#292524','stroke-width':1}));
    else if(s.ureter.kind==='stricture')ub.appendChild(mk('path',{d:`M${x-8},${y-4} h16 M${x-8},${y+4} h16`,stroke:'#57534e','stroke-width':3,'stroke-linecap':'round'}));
    else ub.appendChild(mk('ellipse',{cx:x+17,cy:y,rx:12,ry:16,fill:'#a8a29e',opacity:.85}));}
  if(s.outlet){const k=s.outlet.kind;
    const pinch=y=>{ob.appendChild(mk('path',{d:`M191,${y-5} l7,5 l-7,5 Z M209,${y-5} l-7,5 l7,5 Z`,fill:'#57534e'}));};
    if(k==='stricture')pinch((g.ext+g.meatus)/2+6);
    else if(k==='meatus')pinch(g.meatus-6);
    else if(k==='stone')ob.appendChild(mk('path',{d:`M195,${g.ext+20} l5,-4 l6,3 l0,6 l-5,4 l-6,-3 Z`,fill:'#57534e',stroke:'#292524','stroke-width':1}));
    else if(k==='valve')ob.appendChild(mk('path',{d:`M194,${g.neck+10} q6,8 12,0`,fill:'none',stroke:'#292524','stroke-width':2.5}));}}
function mStep(dt){sync();const s=scene,m=M;m.T+=dt;const fill=.15;let cough=false,drip=false;
  if(!moving){m.f+=(.55-m.f)*Math.min(1,dt*4);m.phase='fill';}
  else if(lock==='STORAGE'){m.phase='fill';m.f=Math.min(.75,m.f+fill*dt);}
  else if(lock==='VOIDING'){if(m.phase!=='void'){m.phase='void';m.f=Math.max(m.f,.85);}m.f-=.3*dt;if(m.f<.1)m.f=.85;}
  else if(s.cycle==='stress'){if(m.f<.6)m.f+=fill*dt;m.phase='fill';m.coughT=(m.coughT+dt)%3.2;cough=m.coughT<.6;}
  else if(s.cycle==='oab'){const at=s.urgeAt||.38;
    if(m.phase==='fill'){m.f+=fill*dt;if(m.f>=at){m.phase='urge';m.urgeT=0;}}
    else if(m.phase==='urge'){m.urgeT+=dt;if(m.urgeT>1.4)m.phase='void';}
    else{m.f-=.35*dt;if(m.f<=.08){m.f=.08;m.phase='fill';}}}
  else if(s.cycle==='retention'){m.phase='fill';m.f=Math.min(1.12,m.f+fill*dt);if(m.f>=1.1){m.dripT=(m.dripT+dt)%1.6;drip=m.dripT<.5;}}
  else{const dsd=s.cycle==='dsd',ob=!!s.outlet;
    const floor=dsd?.5:ob?(s.outlet.kind==='valve'?.55:.42):.06,rate=dsd?.09:ob?.13:.38;
    if(m.phase==='fill'){m.f+=fill*dt;if(m.f>=1){m.f=1;m.hold+=dt;if(m.hold>.7){m.hold=0;m.phase='void';}}}
    else{m.f-=rate*dt;if(m.f<=floor){m.f=floor;m.phase='fill';}}}
  const tc=m.phase==='void'?1:m.phase==='urge'?.85:0;m.c+=(tc-m.c)*Math.min(1,dt*5);
  let te=0;if(m.phase==='void')te=(s.cycle==='dsd'&&!lock)?(Math.sin(m.T*5)>.75?.6:0):1;else if(cough)te=.45;else if(drip)te=.3;
  m.ext+=(te-m.ext)*Math.min(1,dt*8);
  const ob=s.outlet,obD=ob?(ob.kind==='valve'?1:ob.kind==='bph'?.55:.4):0;
  const dsdD=s.cycle==='dsd'?(m.phase==='void'?.9:.45):0,retD=s.cycle==='retention'?Math.max(0,(m.f-.9)*4):0;
  const both=moving?Math.max(obD,dsdD,retD):0;
  const tB=moving?Math.max(both,(s.ureter||s.staghorn)?1:0,s.reflux?(m.phase==='void'?1:.2):0):0;
  m.dB+=(tB-m.dB)*Math.min(1,dt*(s.reflux?1.6:.8));m.dA+=(both-m.dA)*Math.min(1,dt*.8);
  if(s.diverticulum)m.div+=((m.phase==='void'?.75:m.f)-m.div)*Math.min(1,dt*(m.phase==='void'?.3:1));
  if(!moving)return{cough:false,drip:false};
  const refl=s.reflux&&m.phase==='void',blk=s.ureter?s.ureter.at:null;
  pA.forEach(p=>advance(p,dt,.16));
  pB.forEach(p=>advance(p,dt,refl?-.32:.16,refl?null:blk));
  const thin=!!ob||s.cycle==='dsd';
  const gate=ob?Math.sin(m.T*3.1)>-.25:s.bladderStone?Math.sin(m.T*1.7)>0:true;
  const stream=m.phase==='void'&&m.ext>.4&&gate;
  pU.forEach(p=>{advance(p,dt,(cough||drip)?.9:thin?.55:1.15);
    p.vis=(stream&&(!thin||p.i%2===0))||((cough||drip)&&p.i%4===0&&p.t>.35);});
  return{cough,drip};}
function mDraw(){sync();const s=scene,m=M,fx=mFx,g=GEO[sex],blood=moving?s.blood:null;
  C.begin();
  let F=Math.min(m.f,1.12),{ry,rx}=bladderSize(F);rx*=1-.07*m.c;ry*=1-.05*m.c;
  if(m.phase==='urge'){const w=Math.sin(m.T*22)*2.2;rx+=w;ry-=w*.6;}
  if(fx.cough){ry-=5;rx+=3;}
  const cy=g.neck-ry,thick=moving&&s.thickWall;
  setA('bladder',{rx,ry,cy,'stroke-width':4+4*m.c+(thick?5:0),fill:blood?'#d9665c':'#f2d675'});
  setA('trab',{rx:Math.max(rx-10,4),ry:Math.max(ry-10,4),cy,opacity:thick?.8:0});
  const sh=(id,on)=>{el(id).style.display=on?'':'none';};
  sh('divert',moving&&s.diverticulum);if(s.diverticulum)setA('divert',{cx:200-rx-6,cy:cy+ry*.15,r:6+10*m.div});
  const tx=200+rx*.72,ty=cy+ry*.45;sh('tumor',moving&&s.mass==='bladder');el('tumor').setAttribute('transform',`translate(${tx},${ty})`);
  sh('bstone',moving&&s.bladderStone);setA('bstone',{cx:200,cy:m.phase==='void'&&Math.sin(m.T*1.7)<=0?g.neck-4:cy+ry-9});
  sh('kmass',moving&&s.mass==='kidney');sh('staghorn',moving&&s.staghorn);sh('pnod',moving&&s.mass==='prostate');
  sh('ublock',moving);sh('oblock',moving);
  setA('pelB',{rx:9+13*m.dB,ry:12+16*m.dB});setA('pelA',{rx:9+13*m.dA,ry:12+16*m.dA});
  setA('dilB',{opacity:m.dB>.05?1:0,'stroke-width':5+6*m.dB,'stroke-dasharray':s.ureter?`${s.ureter.at*LB} ${LB*2}`:`${LB} 0`,stroke:s.reflux?'#f6c27a':'#f2d675'});
  setA('dilA',{opacity:m.dA>.05?1:0,'stroke-width':5+6*m.dA});
  const p=moving&&s.outlet?(s.outlet.kind==='bph'?1:s.outlet.kind==='cancer'?.45:0):0;
  setA('prostate',{rx:20+13*p,ry:15+10*p});const uw=7-3*(p===1?1:0);setA('urethra',{x:200-uw/2,width:uw});
  const gap=5*m.ext;setA('extL',{x:183-gap});setA('extR',{x:200+gap});
  setA('intL',{d:`M${188-4*m.ext},${g.neck} q${6+4*m.ext},${6-6*m.ext} ${12+8*m.ext},0`});
  // scrotum: torsion
  const tor=moving&&s.testis==='torsion';sh('twist',tor);sh('cordB',!tor);el('testB').setAttribute('fill',tor?'#6b2140':'#d9a38a');
  // infection halo (pulses in JS so it works in every browser)
  const inf=moving&&s.inflamed;sh('halo',inf);
  if(inf){const[hx,hy]=s.inflamed.at==='bladder'?[200,cy]:anchors(sex)[s.inflamed.at];setA('halo',{cx:hx,cy:hy,r:(s.inflamed.at==='bladder'?Math.max(rx,ry)+6:24)+3*Math.sin(m.T*3)});}
  // particles
  ['pA','pB','pU'].forEach(id=>sh(id,moving));
  const refl=s.reflux&&m.phase==='void';
  pA.forEach(q=>{const pt=el('urA').getPointAtLength(q.t*LA);setA2(q.el,pt.x,pt.y,blood==='kidneys'?BLOODC:URINE);});
  pB.forEach(q=>{const pt=el('urB').getPointAtLength(q.t*LB);setA2(q.el,pt.x,pt.y,refl?REFLUXC:(blood==='kidney'||blood==='kidneys')?BLOODC:URINE);q.el.style.display=s.staghorn?'none':'';});
  pU.forEach(q=>{setA2(q.el,200,g.neck+q.t*(g.streamEnd-g.neck),blood?BLOODC:URINE);q.el.setAttribute('opacity',q.vis?1:0);q.el.setAttribute('r',p||s.outlet?2.2:3);});
  sh('cough',fx.cough);
  // callouts (conditions only)
  if(moving&&ctx.showTip()&&s.tip){const tip=s.tip;
    const kid=s.staghorn||s.mass==='kidney'||(s.inflamed&&s.inflamed.at==='kidney')||s.blood==='kidney';
    if(s.ureter){const[x,y]=ptB(s.ureter.at),w=tip.length*6.1+14;co('tip',tip,'#44403c',x+14+w>396?x-14-w:x+14,y);}
    else if(kid)co('tip',tip,'#9f1239',290,222);
    else if(s.blood==='kidneys')co('tip',tip,'#9f1239',120,222);
    else if(s.reflux){if(refl)co('tip',tip,'#c2410c',262,300);}
    else if(s.cycle==='stress'){if(fx.cough)co('tip',tip,'#2563eb',214,g.meatus+10);}
    else if(s.cycle==='oab'){if(m.phase==='urge')co('tip',tip,'#7c3aed',200+rx+6,cy-6);}
    else if(s.cycle==='retention')co('tip',tip,'#b45309',224,cy-ry+4);
    else if(s.cycle==='dsd')co('tip',tip,'#7c3aed',224,g.ext-14);
    else if(s.testis||(s.inflamed&&s.inflamed.at==='testis'))co('tip',tip,'#9f1239',256,630);
    else if(s.mass==='prostate'||(s.inflamed&&s.inflamed.at==='prostate'))co('tip',tip,'#9f1239',240,506);
    else if(s.outlet)co('tip',tip,'#b45309',214,g.ext+30);
    else co('tip',tip,s.blood||s.mass?'#9f1239':'#b45309',8,cy-ry-16);
    if(m.dB>.5&&!kid)co('hydro','hydronephrosis','#b45309',290,246);
    if((s.outlet||s.cycle==='dsd')&&m.phase==='fill'&&m.f<.65)co('resid','urine left behind','#b45309',8,cy-ry-16);}
  drawTargets(s,m,g,cy,ry,20+13*p);
  C.end();}
function setA2(e,x,y,fill){e.setAttribute('cx',x);e.setAttribute('cy',y);e.setAttribute('fill',fill);}
// still frame for reduced motion: run the scene forward to its teaching moment
function mPoster(){sync();const n={oab:2.2,stress:.3,retention:8,dsd:9.4}[scene.cycle]||(scene.reflux?8.6:scene.outlet?9.4:4);
  for(let i=0;i<n*30;i++)mFx=mStep(1/30);mDraw();}
return{M,
  reset:mReset,          // new scene: start the cycle again
  build:mBuild,          // draw the scene's fixed marks (ureter / outlet blocks)
  tick(dt){mFx=mStep(dt);mDraw();},
  draw:mDraw,
  shownTargets:()=>shown, // {ids, lit, focus} for the key under the figure, or null
  poster:mPoster};       // reduced motion: jump to the scene's teaching moment
}
