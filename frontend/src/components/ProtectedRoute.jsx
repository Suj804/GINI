import{Navigate}from'react-router-dom';import{useAuth}from'../context/AuthContext.jsx';
export default function ProtectedRoute({children,admin}){const{user,loading}=useAuth();
  if(loading)return<p className="p-8">Loading…</p>;if(!user)return<Navigate to="/login"/>;if(admin&&user.role!=='admin')return<Navigate to="/"/>;return children}
