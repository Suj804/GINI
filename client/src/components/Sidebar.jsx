
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <aside
      className={`z-40 flex w-60 shrink-0 flex-col items-center justify-between border-r border-purple-100 bg-gradient-to-b from-white via-[#fcf9ff] to-[#fff7fb] transition-all duration-300 ease-in-out max-sm:absolute max-sm:bottom-0 max-sm:top-14 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      }`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt="Profile"
          className="h-14 w-14 rounded-full border-2 border-purple-200 object-cover shadow-sm mx-auto"
        />

        <h1 className="mt-2 px-3 text-center font-semibold text-slate-800">
          {user?.fullName}
        </h1>

        <div className="mt-6 space-y-1 px-3 text-sm font-medium text-gray-600">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md shadow-purple-500/20"
                    : "hover:bg-purple-50 hover:text-purple-700"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      isActive ? "text-white" : ""
                    }`}
                  />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-2 border-t border-purple-100 bg-white/60 p-4">
        <button
          type="button"
          onClick={openUserProfile}
          className="flex min-w-0 items-center gap-2 rounded-xl p-1 text-left transition hover:bg-purple-50"
        >
          <img
            src={user?.imageUrl}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
            alt="Profile"
          />

          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-slate-800">
              {user?.fullName}
            </span>

            <span className="block text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>{" "}
              Plan
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => signOut()}
          aria-label="Sign out"
          className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-pink-50 hover:text-pink-600"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
