import{useState}from'react';import Runner from'./Runner.jsx';import{inp}from'./ui.js';import api from'../api.js';import{useAuth}from'../context/AuthContext.jsx';
export default function FileTool({endpoint,title,cost,fields,job}){const{ws}=useAuth(),[fs,setF]=useState({}),[j,setJ]=useState('');
  return<Runner title={title} cost={cost} onRun={()=>{const d=new FormData();Object.entries(fs).forEach(([k,v])=>d.append(k,v));if(j)d.append('job',j);if(ws)d.append('workspace_id',ws);return api('/ai/'+endpoint,{method:'POST',body:d})}}>
    {fields.map(([k,l,acc])=><label key={k} className="block text-sm">{l}<input type="file" accept={acc} className={inp} onChange={e=>setF({...fs,[k]:e.target.files[0]})}/></label>)}
    {job&&<textarea className={inp} rows={3} placeholder="Target job description (optional)" onChange={e=>setJ(e.target.value)}/>}</Runner>}
