import { useEffect, useState } from "react";
import { clearMockSession, readMockSession, writeMockSession } from "../features/auth/mockAuth";

function useMockSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(readMockSession());
  }, []);

  const login = ({ remember }) => {
    writeMockSession(remember);
    setSession(readMockSession());
  };

  const logout = () => {
    clearMockSession();
    setSession(null);
  };

  return {
    session,
    isAuthenticated: Boolean(session),
    login,
    logout,
  };
}

export default useMockSession;
