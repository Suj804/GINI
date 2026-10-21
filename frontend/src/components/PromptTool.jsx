import{useState}from'react';import Runner from'./Runner.jsx';import{inp}from'./ui.js';import api from'../api.js';import{useAuth}from'../context/AuthContext.jsx';
export default function PromptTool({endpoint,title,cost,placeholder,extra,extraOptions,rows=5}){const{ws}=useAuth(),[text,setT]=useState(''),[x,setX]=useState(extraOptions?extraOptions[0]:'');
  return<Runner title={title} cost={cost} onRun={()=>api('/ai/'+endpoint,{method:'POST',body:{text,extra:x,workspace_id:ws||null}})}>
    <textarea className={inp} rows={rows} placeholder={placeholder} value={text} onChange={e=>setT(e.target.value)}/>
    {extraOptions?<select className={inp} value={x} onChange={e=>setX(e.target.value)}>{extraOptions.map(o=><option key={o}>{o}</option>)}</select>:extra&&<input className={inp} placeholder={extra} onChange={e=>setX(e.target.value)}/>}</Runner>}
