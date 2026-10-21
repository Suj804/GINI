import{useState,useEffect,useCallback}from'react';import api from'../api.js';import{card}from'../components/ui.js';import Result from'../components/Result.jsx';import{useAuth}from'../context/AuthContext.jsx';import{useToast}from'../context/ToastContext.jsx';
export default function Library(){const{wsList,reloadWs}=useAuth(),toast=useToast(),[items,setI]=useState([]),[fav,setFav]=useState(false),[f,setF]=useState('');
  const load=useCallback(()=>api(`/outputs?fav=${fav?1:0}${f?'&workspace='+f:''}`).then(setI).catch(x=>toast.error(x.message)),[fav,f]);useEffect(()=>{load()},[load]);
  const act=async(fn,msg)=>{try{await fn();toast.success(msg);load()}catch(x){toast.error(x.message)}};
  return<div className="space-y-3"><div className={card+' flex gap-3 items-center flex-wrap'}><label><input type="checkbox" checked={fav} onChange={e=>setFav(e.target.checked)}/> ⭐ Favourites only</label>
    <select value={f} onChange={e=>setF(e.target.value)}><option value="">All workspaces</option>{wsList.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select>
    <button className="text-sm underline" onClick={()=>{const n=prompt('Workspace name');if(n)act(()=>api('/workspaces',{method:'POST',body:{name:n}}).then(reloadWs),'Workspace created')}}>+ New workspace</button>
    {f&&<><button className="text-sm underline" onClick={()=>{const n=prompt('Rename workspace');if(n)act(()=>api('/workspaces/'+f,{method:'PUT',body:{name:n}}).then(reloadWs),'Workspace renamed')}}>Rename</button>
    <button className="text-sm underline text-red-300" onClick={()=>{if(confirm('Delete workspace? Outputs are kept.'))act(async()=>{await api('/workspaces/'+f,{method:'DELETE'});setF('');await reloadWs()},'Workspace deleted')}}>Delete</button></>}</div>
    {items.map(o=><div key={o.id} className={card}><div className="flex justify-between flex-wrap gap-2 text-sm text-white/70 mb-2"><span>{o.tool} · {new Date(o.created_at).toLocaleString()}</span>
      <span className="space-x-2"><select value={o.workspace_id||''} onChange={e=>act(()=>api('/outputs/'+o.id,{method:'PUT',body:{workspace_id:+e.target.value}}),'Moved to workspace')}><option value="" disabled>Move to…</option>{wsList.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select>
      <button onClick={()=>act(()=>api('/outputs/'+o.id,{method:'PUT',body:{favourite:!o.favourite}}),o.favourite?'Removed from favourites':'Added to favourites')}>{o.favourite?'★':'☆'}</button>
      <button className="text-red-300" onClick={()=>act(()=>api('/outputs/'+o.id,{method:'DELETE'}),'Deleted')}>Delete</button></span></div><Result o={o}/></div>)}
    {!items.length&&<p className="text-white/70">Nothing here yet.</p>}</div>}
