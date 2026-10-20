import { useState } from "react";
import Markdown from "react-markdown";
import { Copy, Download, Heart, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useApi from "../hooks/useApi";
import { getErrorMessage } from "../lib/api";
import { downloadContent } from "../lib/download";

const btn =
  "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition cursor-pointer disabled:opacity-50";

// One saved output. Expand to view; edit, favourite, download, delete.
const CreationItem = ({
  item,
  onDelete,
  deleteLabel = "Delete",
  showFavourite = true,
}) => {
  const { request } = useApi();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(item.content);
  const [draft, setDraft] = useState(item.content);
  const [saving, setSaving] = useState(false);

  const isImage = item.type === "image";
  const created = item.created_at ? new Date(item.created_at) : null;
  const dateText = created && !isNaN(created) ? created.toLocaleDateString() : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Could not copy");
    }
  };

  const favourite = async () => {
    try {
      const res = await request("post", "/api/user/favourites", { creation_id: item.id });
      if (res.success) toast.success("Added to favourites");
      else toast.error(res.message || "Could not add to favourites");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const saveEdit = async () => {
    if (!draft.trim()) {
      toast.error("Content cannot be empty");
      return;
    }
    try {
      setSaving(true);
      const res = await request("put", `/api/user/outputs/${item.id}`, { content: draft });
      if (res.success) {
        setContent(draft);
        setEditing(false);
        toast.success("Output updated");
      } else {
        toast.error(res.message || "Could not update output");
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl text-sm bg-white border border-violet-100 rounded-xl">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex justify-between items-center gap-4 cursor-pointer"
      >
        <div className="min-w-0">
          <h2 className="truncate">{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type}
            {dateText && ` - ${dateText}`}
          </p>
        </div>
        <span className="bg-primary/10 border border-primary/30 text-primary px-4 py-1 rounded-full shrink-0">
          {item.type}
        </span>
      </div>

      {expanded && (
        <div className="mt-3">
          <div className="flex flex-wrap gap-2 pb-3 border-b border-gray-100">
            {!isImage && (
              <button type="button" onClick={copy} className={btn}>
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            )}
            <button type="button" onClick={() => downloadContent(content, item.type)} className={btn}>
              <Download className="w-3.5 h-3.5" /> Download
            </button>
            {showFavourite && (
              <button type="button" onClick={favourite} className={btn}>
                <Heart className="w-3.5 h-3.5" /> Favourite
              </button>
            )}
            {!isImage && !editing && (
              <button
                type="button"
                onClick={() => {
                  setDraft(content);
                  setEditing(true);
                }}
                className={btn}
              >
                <Pencil className="w-3.5 h-3.5" /> Edit
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(item)}
                className={`${btn} text-red-600 border-red-200 hover:bg-red-50`}
              >
                <Trash2 className="w-3.5 h-3.5" /> {deleteLabel}
              </button>
            )}
          </div>

          {isImage ? (
            <img src={content} alt="Saved output" className="mt-3 w-full max-w-md rounded-lg" />
          ) : editing ? (
            <div className="mt-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={12}
                className="w-full p-2 px-3 outline-none text-sm rounded-md border border-gray-300"
              />
              <div className="mt-2 flex gap-2">
                <button type="button" disabled={saving} onClick={saveEdit} className={btn}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
                <button type="button" onClick={() => setEditing(false)} className={btn}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-3 max-h-96 overflow-y-auto text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
