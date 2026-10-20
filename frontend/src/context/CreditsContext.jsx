import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import api from "../lib/api";

const CreditsContext = createContext({
  credits: null,
  setCredits: () => {},
  refreshCredits: async () => {},
});

export const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();
  const userId = user?.id;

  const getTokenRef = useRef(getToken);
  getTokenRef.current = getToken;

  const refreshCredits = useCallback(async () => {
    try {
      const token = await getTokenRef.current();
      console.log("Clerk token available:", Boolean(token));
      const { data } = await api.get("/api/user/credits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success && typeof data.credits === "number") setCredits(data.credits);
    } catch {
      // Backend endpoint not ready yet: keep the balance unknown (shown as "—")
    }
  }, []);

  useEffect(() => {
    if (userId) refreshCredits();
    else setCredits(null);
  }, [userId, refreshCredits]);

  const value = useMemo(
    () => ({ credits, setCredits, refreshCredits }),
    [credits, refreshCredits]
  );

  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
};

export const useCredits = () => useContext(CreditsContext);
