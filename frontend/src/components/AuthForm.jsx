import{useState}from'react';import{Link,useNavigate}from'react-router-dom';import api from'../api.js';import{useAuth}from'../context/AuthContext.jsx';import{useToast}from'../context/ToastContext.jsx';import{btn,inp,card}from'./ui.js';import Logo from'./Logo.jsx';
export default function AuthForm({register}){const[f,setF]=useState({}),[busy,setB]=useState(false),{login}=useAuth(),toast=useToast(),nav=useNavigate(),set=k=>x=>setF({...f,[k]:x.target.value});
  const go=async()=>{setB(true);try{const r=await api(register?'/auth/register':'/auth/login',{method:'POST',body:f});login(r.token,r.user);toast.success(register?`Welcome, ${r.user.name}! You have ${r.user.credits} free credits`:`Welcome back, ${r.user.name}!`);nav('/')}catch(x){toast.error(x.message)}setB(false)};
  return<div className="min-h-screen grid place-items-center p-4"><div className={card+' w-[26rem] max-w-full space-y-4 p-8 text-center'}>
    <div className="lamp-float inline-block"><Logo size={90}/></div><h1 className="brand text-4xl">GINI</h1>
    <p className="text-sm text-white/70 -mt-2">Your AI genie: write, create, edit and get hired.<br/>Make a wish.</p>
    <div className="space-y-3 text-left">{register&&<input className={inp} placeholder="Full name" onChange={set('name')}/>}<input className={inp} placeholder="Email" onChange={set('email')}/>
    <input className={inp} type="password" placeholder="Password" onChange={set('password')} onKeyDown={x=>x.key==='Enter'&&go()}/></div>
    <button className={btn+' w-full py-3'} disabled={busy} onClick={go}>{busy?'Please wait…':register?'Create my account ✨':'Rub the lamp · Login'}</button>
    <Link className="text-sm block" to={register?'/login':'/register'}>{register?'Have an account? Login':'New here? Register'}</Link></div></div>}
