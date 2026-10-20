import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useUser, SignIn } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="w-10 h-10 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
      </div>
    );
  }

  return user ? (
    <div className="flex flex-col items-start justify-start h-screen">
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-violet-100">
        <Logo onClick={() => navigate("/")} />
        {sidebar ? (
          <X onClick={() => setSidebar(false)} className="w-6 h-6 text-gray-600 sm:hidden" />
        ) : (
          <Menu onClick={() => setSidebar(true)} className="w-6 h-6 text-gray-600 sm:hidden" />
        )}
      </nav>
      <div className="flex-1 w-full flex min-h-0">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 min-w-0 theme-bg">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
