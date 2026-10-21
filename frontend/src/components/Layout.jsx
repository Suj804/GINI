import{NavLink,Outlet,useNavigate}from'react-router-dom';import{useAuth}from'../context/AuthContext.jsx';import{useToast}from'../context/ToastContext.jsx';import Logo from'./Logo.jsx';
export default function Layout(){const{user,logout,wsList,ws,setWs}=useAuth(),nav=useNavigate(),toast=useToast();
  const link=({isActive})=>'px-4 py-1.5 rounded-full text-sm transition border '+(isActive?'bg-gradient-to-r from-cyan-500/40 to-fuchsia-500/40 border-white/50 font-semibold shadow-lg':'bg-white/5 border-white/15 hover:bg-white/15');
  return<div className="max-w-6xl mx-auto p-4 space-y-4"><header className="glass px-5 py-3 flex flex-wrap items-center gap-3">
    <NavLink to="/" className="flex items-center gap-2 flex-1 no-underline"><Logo size={42}/><span className="brand text-2xl">GINI</span><span className="hidden sm:block text-xs text-white/50 ml-1">your AI genie</span></NavLink>
    <select value={ws} onChange={e=>{setWs(e.target.value);toast.info(e.target.value?'New outputs will be saved to this workspace':'Workspace cleared')}} title="Save new outputs to"><option value="">No workspace</option>{wsList.map(w=><option key={w.id} value={w.id}>{w.name}</option>)}</select>
    <span className="gem px-3 py-1 rounded-full text-sm font-semibold">💎 {user.credits} credits</span>
    <button className="text-sm bg-white/10 border border-white/25 rounded-full px-4 py-1 hover:bg-white/25 transition" onClick={()=>{logout();toast.info('Logged out');nav('/login')}}>Logout</button></header>
    <nav className="flex flex-wrap gap-2"><NavLink to="/" end className={link}>🏠 Dashboard</NavLink><NavLink to="/library" className={link}>📚 Library</NavLink><NavLink to="/profile" className={link}>👤 Profile</NavLink>
      {user.role==='admin'&&<NavLink to="/admin" className={link}>🛡️ Admin</NavLink>}</nav><Outlet/></div>}
