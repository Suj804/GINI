import{useRef,useState}from'react';import api from'../api.js';import{btn,card}from'../components/ui.js';import Result from'../components/Result.jsx';
import{inpaint}from'../utils/inpaint.js';import{useAuth}from'../context/AuthContext.jsx';import{useToast}from'../context/ToastContext.jsx';
const MAX=800;
export default function ObjectRemoval(){const toast=useToast(),{ws,setUser}=useAuth(),base=useRef(),mask=useRef(),[name,setName]=useState(''),[size,setSize]=useState(24),[ready,setReady]=useState(false),[busy,setBusy]=useState(false),[e,setE]=useState(''),[out,setOut]=useState(),drawing=useRef(false);
  const load=f=>{if(!f)return;setName(f.name);setOut(null);setE('');const img=new Image();img.onload=()=>{const s=Math.min(1,MAX/Math.max(img.width,img.height)),w=Math.round(img.width*s),h=Math.round(img.height*s);
    for(const c of[base.current,mask.current]){c.width=w;c.height=h}base.current.getContext('2d').drawImage(img,0,0,w,h);mask.current.getContext('2d').clearRect(0,0,w,h);setReady(true)};img.src=URL.createObjectURL(f)};
  const paint=ev=>{const c=mask.current,r=c.getBoundingClientRect(),x=(ev.clientX-r.left)*c.width/r.width,y=(ev.clientY-r.top)*c.height/r.height,g=c.getContext('2d');
    g.fillStyle='rgba(255,0,0,0.6)';g.beginPath();g.arc(x,y,size*c.width/r.width/2,0,7);g.fill()};
  const down=ev=>{drawing.current=true;paint(ev)},move=ev=>drawing.current&&paint(ev),up=()=>drawing.current=false;
  const run=async()=>{setBusy(true);setE('');try{
    const b=base.current,w=b.width,h=b.height,bg=b.getContext('2d'),id=bg.getImageData(0,0,w,h),md=mask.current.getContext('2d').getImageData(0,0,w,h).data,m=new Uint8Array(w*h);
    let n=0;for(let i=0;i<w*h;i++)if(md[i*4+3]>20){m[i]=1;n++}if(!n)throw new Error('Paint over the object you want to remove first');
    inpaint(id.data,m,w,h);bg.putImageData(id,0,0);mask.current.getContext('2d').clearRect(0,0,w,h);
    const r=await api('/ai/objremove',{method:'POST',body:{image:b.toDataURL('image/jpeg',0.9),name,workspace_id:ws||null}}); // charges credits + saves to library
    setOut(r.output);setUser(u=>({...u,credits:r.credits}));toast.success('Object removed! 3 credits used · '+r.credits+' left')}catch(x){toast.error(x.message)}setBusy(false)};
  const clear=()=>{const c=mask.current;c.getContext('2d').clearRect(0,0,c.width,c.height)};
  return<div className={card+' space-y-3'}><h2 className="text-xl font-semibold">Object Removal <span className="text-sm text-white/60">(3 credits)</span></h2>
    <input type="file" accept="image/*" onChange={ev=>load(ev.target.files[0])}/>
    {ready&&<><p className="text-sm text-white/70">Paint over the object to remove it, then click Remove. Works best on small objects over simple or textured backgrounds.</p>
      <div className="text-sm flex items-center gap-2">Brush size <input type="range" min="6" max="80" value={size} onChange={ev=>setSize(+ev.target.value)}/></div></>}
    <div className={(ready?'':'hidden ')+'relative inline-block max-w-full touch-none'}>
      <canvas ref={base} className="block max-w-full rounded border"/>
      <canvas ref={mask} className="absolute inset-0 w-full h-full cursor-crosshair" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}/></div>
    <div><button className={btn} disabled={!ready||busy} onClick={run}>{busy?'Working…':'Remove painted object'}</button>{ready&&<button className="ml-3 text-sm text-white/70" onClick={clear}>Clear brush</button>}</div>
    {e&&<p className="text-red-300 text-sm">{e}</p>}<Result o={out}/></div>}
