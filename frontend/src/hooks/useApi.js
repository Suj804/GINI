import { useCallback, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/api";
import { useCredits } from "../context/CreditsContext";

// request("post", "/api/ai/rewrite", { ... })  ->  response body
// Automatically adds the Clerk token and updates the credit balance
// when the backend returns { credits: <number> } in the response.
export default function useApi() {
  const { getToken } = useAuth();
  const { setCredits } = useCredits();

  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  const request = useCallback(
    async (method, url, data, config = {}) => {
      const token = await getTokenRef.current();
      const res = await api.request({
        method,
        url,
        data,
        ...config,
        headers: { ...(config.headers || {}), Authorization: `Bearer ${token}` },
      });
      const body = res.data;
      if (typeof body?.credits === "number") setCredits(body.credits);
      return body;
    },
    [setCredits]
  );

  return { request };
}
