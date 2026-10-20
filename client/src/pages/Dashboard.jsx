import { Gem, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import CreationItem from "../components/CreationItem";
import useFetchList from "../hooks/useFetchList";
import { useCredits } from "../context/CreditsContext";

const Dashboard = () => {
  const { items: creations, loading } = useFetchList("/api/user/get-user-creations", "creations");
  const { credits } = useCredits();

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-violet-100">
          <div className="text-slate-600">
            <p className="text-sm">Total creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-violet-100">
          <div className="text-slate-600">
            <p className="text-sm">Credits remaining</p>
            <h2 className="text-xl font-semibold">{credits ?? "—"}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <span className="w-11 h-11 rounded-full border-3 border-purple-500 border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="mt-6 mb-4 flex items-center justify-between max-w-5xl">
            <p>Recent creations</p>
            <Link to="/ai/history" className="text-sm text-primary hover:underline">
              View all history
            </Link>
          </div>
          {creations.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nothing here yet. Pick a tool from the sidebar to create your first output.
            </p>
          ) : (
            creations.slice(0, 5).map((item) => <CreationItem key={item.id} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
