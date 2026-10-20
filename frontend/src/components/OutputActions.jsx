import { useEffect, useState } from "react";
import { Copy, Download, Heart, Save } from "lucide-react";
import toast from "react-hot-toast";
import useApi from "../hooks/useApi";
import { getErrorMessage } from "../lib/api";
import { downloadContent } from "../lib/download";

const btn =
  "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

// Copy / Download / Favourite / Save-to-workspace for a freshly generated result
const OutputActions = ({ content, type = "article", prompt = "" }) => {
  const { request } = useApi();
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceId, setWorkspaceId] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    request("get", "/api/user/workspaces")
      .then((res) => {
        if (active && res.success) setWorkspaces(res.workspaces || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [request]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Could not copy. Select the text and copy it manually.");
    }
  };

  const send = async (url, body, okMessage) => {
    try {
      setBusy(true);
      const res = await request("post", url, body);
      if (res.success) toast.success(okMessage);
      else toast.error(res.message || "Something went wrong");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 pb-3 border-b border-gray-100 flex flex-wrap items-center gap-2">
      {type !== "image" && (
        <button type="button" onClick={copy} className={btn}>
          <Copy className="w-3.5 h-3.5" /> Copy
        </button>
      )}
      <button type="button" onClick={() => downloadContent(content, type)} className={btn}>
        <Download className="w-3.5 h-3.5" /> Download
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() =>
          send("/api/user/favourites", { content, type, prompt }, "Added to favourites")
        }
        className={btn}
      >
        <Heart className="w-3.5 h-3.5" /> Favourite
      </button>
      {workspaces.length > 0 && (
        <select
          value={workspaceId}
          onChange={(e) => setWorkspaceId(e.target.value)}
          className="px-2 py-1.5 text-xs rounded-md border border-gray-300 text-gray-600"
        >
          <option value="">No workspace</option>
          {workspaces.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      )}
      <button
        type="button"
        disabled={busy}
        onClick={() =>
          send(
            "/api/user/outputs",
            { content, type, prompt, workspace_id: workspaceId || null },
            workspaceId ? "Saved to workspace" : "Output saved"
          )
        }
        className={btn}
      >
        <Save className="w-3.5 h-3.5" /> Save
      </button>
    </div>
  );
};

export default OutputActions;
