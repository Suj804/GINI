import{useState}from'react';import{btn,card}from'./ui.js';import Result from'./Result.jsx';import{useAuth}from'../context/AuthContext.jsx';import{useToast}from'../context/ToastContext.jsx';
export default function Runner({title,cost,onRun,children}){const{setUser}=useAuth(),toast=useToast(),[o,setO]=useState(),[busy,setB]=useState(false);
  const go=async()=>{setB(true);try{const r=await onRun();setO(r.output);setUser(u=>({...u,credits:r.credits}));toast.success(`Done! ${cost} credits used · ${r.credits} left`)}catch(x){toast.error(x.message)}setB(false)};
  return<div className={card+' space-y-3'}><h2 className="text-xl font-semibold">{title} <span className="text-sm text-white/60">({cost} credits)</span></h2>{children}
    <button className={btn} disabled={busy} onClick={go}>{busy?'Working… (can take up to a minute)':'Generate'}</button><Result o={o}/></div>}
