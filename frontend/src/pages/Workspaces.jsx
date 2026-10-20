import { useState } from "react";
import { Folder, Pencil, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import CreationItem from "../components/CreationItem";
import useFetchList from "../hooks/useFetchList";
import useApi from "../hooks/useApi";
import { getErrorMessage } from "../lib/api";
import { fieldClass } from "../lib/config";

const iconBtn =
  "p-1.5 rounded-md text-gray-500 hover:bg-gray-100 transition cursor-pointer";

const Workspaces = () => {
  const { request } = useApi();
  const { items: workspaces, loading, reload } = useFetchList("/api/user/workspaces", "workspaces");

  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const outputsUrl = selected ? `/api/user/workspaces/${selected.id}/outputs` : null;
  const {
    items: outputs,
    setItems: setOutputs,
    loading: outputsLoading,
  } = useFetchList(outputsUrl, "outputs");

  // Shared wrapper: run an API call, toast the result, then refresh the list
  const act = async (fn, okMessage) => {
    try {
      const res = await fn();
      if (res.success) {
        toast.success(okMessage);
        await reload(true);
        return true;
      }
      toast.error(res.message || "Something went wrong");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
    return false;
  };

  const create = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    const ok = await act(
      () => request("post", "/api/user/workspaces", { name: name.trim() }),
      "Workspace created"
    );
    if (ok) setName("");
    setCreating(false);
  };

  const rename = async (w) => {
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    const ok = await act(
      () => request("put", `/api/user/workspaces/${w.id}`, { name: editName.trim() }),
      "Workspace renamed"
    );
    if (ok) {
      setEditingId(null);
      if (selected?.id === w.id) setSelected({ ...w, name: editName.trim() });
    }
  };

  const remove = async (w) => {
    if (!window.confirm(`Delete workspace "${w.name}"?`)) return;
    const ok = await act(() => request("delete", `/api/user/workspaces/${w.id}`), "Workspace deleted");
    if (ok && selected?.id === w.id) setSelected(null);
  };

  const removeOutput = async (item) => {
    if (!window.confirm("Delete this output?")) return;
    try {
      const res = await request("delete", `/api/user/outputs/${item.id}`);
      if (res.success) {
        setOutputs((prev) => prev.filter((o) => o.id !== item.id));
        toast.success("Output deleted");
      } else {
        toast.error(res.message || "Could not delete");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-6 text-slate-700">
      {/* Workspace list */}
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-semibold">Workspaces</h1>

        <form onSubmit={create} className="mt-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="New workspace name"
            className={`${fieldClass} !mt-0 bg-white`}
          />
          <button
            type="submit"
            disabled={creating}
            className="px-3 rounded-md bg-primary text-white cursor-pointer disabled:opacity-60"
            aria-label="Create workspace"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>

        {loading ? (
          <p className="mt-4 text-sm text-gray-500">Loading...</p>
        ) : workspaces.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">
            No workspaces yet. Create one to organize your outputs by project.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {workspaces.map((w) => (
              <li
                key={w.id}
                className={`p-3 rounded-lg border bg-white flex items-center gap-2 ${
                  selected?.id === w.id ? "border-primary" : "border-violet-100"
                }`}
              >
                {editingId === w.id ? (
                  <>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 min-w-0 p-1.5 px-2 text-sm rounded-md border border-gray-300 outline-none"
                      autoFocus
                    />
                    <button type="button" onClick={() => rename(w)} className="text-xs text-primary cursor-pointer">
                      Save
                    </button>
                    <button type="button" onClick={() => setEditingId(null)} className="text-xs text-gray-500 cursor-pointer">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelected(w)}
                      className="flex-1 min-w-0 flex items-center gap-2 text-left text-sm cursor-pointer"
                    >
                      <Folder className="w-4 h-4 shrink-0 text-primary" />
                      <span className="truncate">{w.name}</span>
                      {typeof w.output_count === "number" && (
                        <span className="text-xs text-gray-400">({w.output_count})</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className={iconBtn}
                      aria-label="Rename workspace"
                      onClick={() => {
                        setEditingId(w.id);
                        setEditName(w.name);
                      }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      className={`${iconBtn} hover:text-red-600`}
                      aria-label="Delete workspace"
                      onClick={() => remove(w)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected workspace outputs */}
      <div className="flex-1 min-w-72">
        {!selected ? (
          <p className="text-sm text-gray-500 mt-2">Select a workspace to see its outputs.</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold">{selected.name}</h2>
            {outputsLoading ? (
              <p className="mt-4 text-sm text-gray-500">Loading...</p>
            ) : outputs.length === 0 ? (
              <p className="mt-4 text-sm text-gray-500">
                Empty workspace. Use Save on any tool result and choose this workspace.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                {outputs.map((item) => (
                  <CreationItem key={item.id} item={item} onDelete={removeOutput} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Workspaces;
