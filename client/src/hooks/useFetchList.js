import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useApi from "./useApi";
import { getErrorMessage } from "../lib/api";

// const { items, setItems, loading, reload } = useFetchList("/api/user/favourites", "favourites")
// Pass url = null to skip fetching.
export default function useFetchList(url, key) {
  const { request } = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(Boolean(url));

  const load = useCallback(
    async (silent = false) => {
      if (!url) {
        setItems([]);
        setLoading(false);
        return;
      }
      if (!silent) setLoading(true);
      try {
        const res = await request("get", url);
        if (res.success) setItems(res[key] || []);
        else toast.error(res.message || "Could not load data");
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [request, url, key]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { items, setItems, loading, reload: load };
}
