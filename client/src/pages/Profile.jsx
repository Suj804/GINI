import { UserProfile } from "@clerk/clerk-react";
import { Gem } from "lucide-react";
import { useCredits } from "../context/CreditsContext";
import useFetchList from "../hooks/useFetchList";

// Clerk's UserProfile gives view, update and delete of profile details.
// (Enable "Delete account" in the Clerk dashboard: User & Authentication > Account deletion.)
const Profile = () => {
  const { credits } = useCredits();
  const { items: usage, loading } = useFetchList("/api/user/usage", "usage");

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex flex-wrap gap-4 items-start">
        <div className="flex items-center gap-3 w-72 p-4 px-6 bg-white rounded-xl border border-violet-100">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5" />
          </div>
          <div className="text-slate-600">
            <p className="text-sm">Credits remaining</p>
            <h2 className="text-xl font-semibold">{credits ?? "—"}</h2>
          </div>
        </div>

        <div className="w-full max-w-md p-4 bg-white rounded-xl border border-violet-100">
          <h2 className="text-sm font-semibold text-slate-700">Recent credit usage</h2>
          {loading ? (
            <p className="mt-2 text-xs text-gray-400">Loading...</p>
          ) : usage.length === 0 ? (
            <p className="mt-2 text-xs text-gray-400">No AI usage yet.</p>
          ) : (
            <ul className="mt-2 max-h-40 overflow-y-auto divide-y divide-violet-50 text-xs text-slate-600">
              {usage.slice(0, 10).map((u) => (
                <li key={u.id} className="py-1.5 flex justify-between gap-3">
                  <span className="truncate">{u.action}</span>
                  <span className="shrink-0 text-gray-400">
                    -{u.cost} · {new Date(u.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6">
        <UserProfile routing="hash" />
      </div>
    </div>
  );
};

export default Profile;
