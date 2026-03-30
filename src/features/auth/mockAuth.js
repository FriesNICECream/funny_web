export const MOCK_USER = {
  email: "admin@gmail.com",
  password: "admin",
  name: "Admin",
};

export const MOCK_SESSION_KEY = "mock-auth-session";

export function authenticateMockUser(email, password) {
  return email === MOCK_USER.email && password === MOCK_USER.password;
}

export function readMockSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const session =
    window.localStorage.getItem(MOCK_SESSION_KEY) ||
    window.sessionStorage.getItem(MOCK_SESSION_KEY);

  return session ? JSON.parse(session) : null;
}

export function writeMockSession(remember) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = JSON.stringify({
    email: MOCK_USER.email,
    name: MOCK_USER.name,
  });

  window.localStorage.removeItem(MOCK_SESSION_KEY);
  window.sessionStorage.removeItem(MOCK_SESSION_KEY);

  // 勾选保持登录时使用 localStorage，否则仅保留当前会话。
  const storage = remember ? window.localStorage : window.sessionStorage;
  storage.setItem(MOCK_SESSION_KEY, payload);
}

export function clearMockSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(MOCK_SESSION_KEY);
  window.sessionStorage.removeItem(MOCK_SESSION_KEY);
}
