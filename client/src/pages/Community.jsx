import { useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import useFetchList from "../hooks/useFetchList";
import useApi from "../hooks/useApi";
import { getErrorMessage } from "../lib/api";

const Community = () => {
  const { user } = useUser();
  const { request } = useApi();
  const { items: creations, loading, reload } = useFetchList(
    "/api/user/get-published-creations",
    "creations"
  );

  const toggleLike = async (id) => {
    try {
      const res = await request("post", "/api/user/toggle-like-creation", { id });
      if (res.success) {
        toast.success(res.message);
        reload(true);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold text-slate-700">Community creations</h1>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {creations.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">
            No public creations yet. Turn on "Make this image public" when generating an image.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-3">
            {creations.map((creation) => {
              const likes = creation.likes || [];
              return (
                <div key={creation.id} className="relative group">
                  <img
                    src={creation.content}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                    <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
                    <div className="flex gap-1 items-center">
                      <p>{likes.length}</p>
                      <Heart
                        onClick={() => toggleLike(creation.id)}
                        className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                          likes.includes(user.id) ? "fill-red-500 text-red-600" : "text-white"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
