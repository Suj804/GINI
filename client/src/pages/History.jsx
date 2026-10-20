import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import CreationItem from "../components/CreationItem";
import useFetchList from "../hooks/useFetchList";
import useApi from "../hooks/useApi";
import { getErrorMessage } from "../lib/api";
import { fieldClass } from "../lib/config";

const GenerationHistory = () => {
  const { request } = useApi();
  const { items, setItems, loading } = useFetchList("/api/user/get-user-creations", "creations");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [date, setDate] = useState("");

  const types = useMemo(() => ["all", ...new Set(items.map((i) => i.type))], [items]);

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        if (type !== "all" && item.type !== type) return false;
        if (search && !(item.prompt || "").toLowerCase().includes(search.toLowerCase())) return false;
        if (date) {
          const d = item.created_at ? new Date(item.created_at) : null;
          if (!d || isNaN(d)) return false;
          const local = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
            d.getDate()
          ).padStart(2, "0")}`;
          if (local !== date) return false;
        }
        return true;
      }),
    [items, search, type, date]
  );

  const remove = async (item) => {
    if (!window.confirm("Delete this item from your history?")) return;
    try {
      const res = await request("delete", `/api/user/delete-creation/${item.id}`);
      if (res.success) {
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        toast.success("Deleted");
      } else {
        toast.error(res.message || "Could not delete");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6">
      <h1 className="text-xl font-semibold text-slate-700">Generation history</h1>

      <div className="mt-4 flex flex-wrap gap-3 max-w-5xl">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by prompt"
          className={`${fieldClass} !mt-0 flex-1 min-w-48 bg-white`}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 px-3 text-sm rounded-md border border-gray-300 bg-white"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 px-3 text-sm rounded-md border border-gray-300 bg-white"
        />
        {(search || type !== "all" || date) && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setType("all");
              setDate("");
            }}
            className="text-sm text-primary cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <span className="w-10 h-10 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          <p className="text-sm text-gray-500">
            {filtered.length} of {items.length} items
          </p>
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500">
              {items.length === 0
                ? "No history yet. Generate something with any tool to see it here."
                : "No items match these filters."}
            </p>
          ) : (
            filtered.map((item) => <CreationItem key={item.id} item={item} onDelete={remove} />)
          )}
        </div>
      )}
    </div>
  );
};

export default GenerationHistory;
