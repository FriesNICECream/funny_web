import { useState } from "react";
import { fetchUserById, loginWithPassword, parseJwtPayload } from "../features/auth/authApi";
import { clearStoredSession, readStoredSession, writeStoredSession } from "../features/auth/authSession";

function useAuthSession() {
  const [session, setSession] = useState(readStoredSession);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async ({ email, password, remember }) => {
    setIsSubmitting(true);

    try {
      const loginResult = await loginWithPassword({ email, password });
      const payload = parseJwtPayload(loginResult.access_token);
      const userId = payload?.sub;

      if (!userId) {
        throw new Error("JWT 中未包含用户 ID");
      }

      const user = await fetchUserById({
        userId,
        token: loginResult.access_token,
      });
      const nextSession = {
        token: loginResult.access_token,
        tokenType: loginResult.token_type || "bearer",
        user,
      };

      writeStoredSession({
        session: nextSession,
        remember,
      });
      setSession(nextSession);
      return nextSession;
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = () => {
    clearStoredSession();
    setSession(null);
  };

  return {
    session,
    isAuthenticated: Boolean(session),
    isSubmitting,
    login,
    logout,
  };
}

export default useAuthSession;
