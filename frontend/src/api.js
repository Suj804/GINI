export default async function api(path,opts={}){
  const headers={Authorization:'Bearer '+(localStorage.getItem('token')||'')};
  if(opts.body&&!(opts.body instanceof FormData)){headers['Content-Type']='application/json';opts={...opts,body:JSON.stringify(opts.body)}}
  const r=await fetch('/api'+path,{...opts,headers});const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(j.error||'Request failed');return j}
