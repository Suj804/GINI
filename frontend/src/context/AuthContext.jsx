import{createContext,useContext,useState,useEffect,useCallback}from'react';import api from'../api.js';
const Ctx=createContext();export const useAuth=()=>useContext(Ctx);
export function AuthProvider({children}){const[user,setUser]=useState(null),[loading,setLoading]=useState(true),[wsList,setWsList]=useState([]),[ws,setWs]=useState('');
  const reloadWs=useCallback(()=>api('/workspaces').then(setWsList).catch(()=>{}),[]);
  useEffect(()=>{localStorage.getItem('token')?api('/me').then(setUser).catch(()=>localStorage.removeItem('token')).finally(()=>setLoading(false)):setLoading(false)},[]);
  useEffect(()=>{if(user?.id)reloadWs()},[user?.id,reloadWs]);
  const login=(token,u)=>{localStorage.setItem('token',token);setUser(u)};
  const logout=()=>{localStorage.removeItem('token');setUser(null);setWsList([]);setWs('')};
  return<Ctx.Provider value={{user,setUser,loading,login,logout,wsList,ws,setWs,reloadWs}}>{children}</Ctx.Provider>}
