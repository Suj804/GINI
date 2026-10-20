import { useNavigate } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import Logo from "./Logo";

const links = [
  { label: "Tools", href: "#tools" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-10">
      <div className="glass rounded-full max-w-6xl mx-auto flex items-center justify-between px-5 py-2.5">
        <Logo onClick={() => navigate("/")} />

        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-700">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition">
              {l.label}
            </a>
          ))}
        </nav>

        {user ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/ai")}
              className="text-sm text-slate-700 hover:text-primary transition cursor-pointer"
            >
              Dashboard
            </button>
            <UserButton />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => openSignIn()}
              className="px-5 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={() => openSignUp()}
              className="btn-gradient px-5 py-2 rounded-full cursor-pointer max-sm:hidden"
            >
              Start free
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
