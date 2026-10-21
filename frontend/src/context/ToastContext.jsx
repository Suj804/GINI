import{createContext,useContext,useState,useMemo,useCallback}from'react';
const Ctx=createContext();export const useToast=()=>useContext(Ctx);
const icon={success:'✅',error:'⚠️',info:'ℹ️'};
export function ToastProvider({children}){const[list,setList]=useState([]);
  const push=useCallback((type,msg)=>{const id=Date.now()+Math.random();setList(l=>[...l,{id,type,msg}]);setTimeout(()=>setList(l=>l.filter(t=>t.id!==id)),type==='error'?6000:3500)},[]);
  const api=useMemo(()=>({success:m=>push('success',m),error:m=>push('error',m),info:m=>push('info',m)}),[push]);
  return<Ctx.Provider value={api}>{children}
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80 max-w-[90vw]">{list.map(t=><div key={t.id} onClick={()=>setList(l=>l.filter(x=>x.id!==t.id))} className={'glass toast toast-'+t.type+' px-4 py-3 text-sm flex gap-2 cursor-pointer'}><span>{icon[t.type]}</span><span className="flex-1">{t.msg}</span></div>)}</div></Ctx.Provider>}
