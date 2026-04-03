export const AUTH_SESSION_KEY = "auth-session";

function getSessionStorage(remember) {
  return remember ? window.localStorage : window.sessionStorage;
}

export function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession =
    window.localStorage.getItem(AUTH_SESSION_KEY) ||
    window.sessionStorage.getItem(AUTH_SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawSession);

    if (!parsed?.token || !parsed?.user?.id || !parsed?.user?.email) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function writeStoredSession({ session, remember }) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
  window.sessionStorage.removeItem(AUTH_SESSION_KEY);
  getSessionStorage(remember).setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
  window.sessionStorage.removeItem(AUTH_SESSION_KEY);
}
