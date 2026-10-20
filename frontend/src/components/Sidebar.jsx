import { useClerk, useUser } from "@clerk/clerk-react";
import {
  AlignLeft,
  Eraser,
  FileText,
  Folder,
  Gem,
  Hash,
  Heart,
  History,
  House,
  Image,
  Languages,
  LogOut,
  RefreshCw,
  Scissors,
  SquarePen,
  User,
  Users,
  Workflow,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCredits } from "../context/CreditsContext";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Resume & ATS", Icon: FileText },
  { to: "/ai/rewrite", label: "Rewrite Content", Icon: RefreshCw },
  { to: "/ai/summarize", label: "Summarize", Icon: AlignLeft },
  { to: "/ai/tone", label: "Tone Conversion", Icon: Languages },
  { to: "/ai/idea-to-content", label: "Idea to Content", Icon: Workflow },
  { to: "/ai/workspaces", label: "Workspaces", Icon: Folder },
  { to: "/ai/favourites", label: "Favourites", Icon: Heart },
  { to: "/ai/history", label: "History", Icon: History },
  { to: "/ai/community", label: "Community", Icon: Users },
  { to: "/ai/profile", label: "My Profile", Icon: User },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { credits } = useCredits();
  const navigate = useNavigate();

  return (
    <div
      className={`w-60 shrink-0 bg-white/80 backdrop-blur border-r border-violet-100 flex flex-col justify-between items-center max-sm:absolute max-sm:z-20 top-14 bottom-0 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="w-full flex-1 min-h-0 overflow-y-auto py-5">
        <img src={user.imageUrl} alt="" className="w-13 rounded-full mx-auto" />
        <h1 className="mt-1 text-center">{user.fullName}</h1>

        <div className="px-6 mt-5 text-sm text-gray-600 font-medium space-y-0.5">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? "btn-gradient"
                    : "hover:bg-primary/10"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-violet-100 p-4 px-7 flex items-center justify-between">
        <div
          onClick={() => {
            navigate("/ai/profile");
            setSidebar(false);
          }}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={user.imageUrl} className="w-8 rounded-full" alt="" />
          <div>
            <h1 className="text-sm font-medium">{user.firstName || user.fullName}</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Gem className="w-3 h-3" />
              {credits ?? "—"} credits left
            </p>
          </div>
        </div>
        <LogOut
          onClick={() => signOut()}
          className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
