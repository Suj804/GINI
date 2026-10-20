import toast from "react-hot-toast";
import CreationItem from "../components/CreationItem";
import useFetchList from "../hooks/useFetchList";
import useApi from "../hooks/useApi";
import { getErrorMessage } from "../lib/api";

const Favourites = () => {
  const { request } = useApi();
  const { items, setItems, loading } = useFetchList("/api/user/favourites", "favourites");

  const remove = async (item) => {
    try {
      const res = await request("delete", `/api/user/favourites/${item.id}`);
      if (res.success) {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        toast.success("Removed from favourites");
      } else {
        toast.error(res.message || "Could not remove");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6">
      <h1 className="text-xl font-semibold text-slate-700">Favourites</h1>

      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <span className="w-10 h-10 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
        </div>
      ) : items.length === 0 ? (
        <p className="mt-5 text-sm text-gray-500">
          No favourites yet. Use the Favourite button on any output to keep it here.
        </p>
      ) : (
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <CreationItem
              key={item.id}
              item={item}
              showFavourite={false}
              onDelete={remove}
              deleteLabel="Remove"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
