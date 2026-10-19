import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex justify-between items-center py-3 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 bg-white/75 backdrop-blur-2xl border-b border-purple-100/70 shadow-[0_4px_30px_rgba(168,85,247,0.06)]">

      <img
        src={assets.logo}
        alt="GINI-AI logo"
        className="w-28 sm:w-32 h-10 object-contain cursor-pointer"
        onClick={() => navigate("/")}
      />

      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center justify-center gap-2 rounded-full text-xs sm:text-sm cursor-pointer bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 text-white px-5 sm:px-8 py-2.5 shadow-lg shadow-purple-500/20 hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-300"
        >
          Get started
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      )}
    </div>
  );
};

export default Navbar;