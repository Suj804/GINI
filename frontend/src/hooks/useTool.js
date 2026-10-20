import { useState } from "react";
import toast from "react-hot-toast";
import useApi from "./useApi";
import { useCredits } from "../context/CreditsContext";
import { getErrorMessage } from "../lib/api";

// Handles loading state, credit check, errors and the result for one AI tool.
export default function useTool(cost = 0) {
  const { request } = useApi();
  const { credits } = useCredits();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const run = async (method, url, data, label = "") => {
    if (cost > 0 && credits !== null && credits < cost) {
      toast.error(`Not enough credits. This tool needs ${cost} and you have ${credits}.`);
      return null;
    }
    setLoading(true);
    try {
      const res = await request(method, url, data);
      if (res.success) {
        setResult({ ...res, label });
        return res;
      }
      toast.error(res.message || "Something went wrong");
      return null;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, setResult, run };
}
