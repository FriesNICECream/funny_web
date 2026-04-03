const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");

function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

async function parseJsonResponse(response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("后端返回了无法解析的响应内容");
  }
}

export async function loginWithPassword({ email, password }) {
  const response = await fetch(buildApiUrl("/api/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.detail || "登录失败，请稍后重试");
  }

  if (!data?.access_token) {
    throw new Error("登录成功，但后端未返回 access_token");
  }

  return data;
}

export async function registerWithPassword({ email, fullName, password }) {
  const response = await fetch(buildApiUrl("/api/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      full_name: fullName,
      password,
    }),
  });
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.detail || "注册失败，请稍后重试");
  }

  if (!data?.id) {
    throw new Error("注册成功，但后端未返回用户信息");
  }

  return data;
}

export function parseJwtPayload(token) {
  if (!token) {
    throw new Error("缺少访问令牌");
  }

  const segments = token.split(".");

  if (segments.length < 2) {
    throw new Error("JWT 格式不正确");
  }

  const payloadSegment = segments[1].replace(/-/g, "+").replace(/_/g, "/");
  const normalizedPayload = payloadSegment.padEnd(payloadSegment.length + ((4 - (payloadSegment.length % 4)) % 4), "=");

  try {
    return JSON.parse(window.atob(normalizedPayload));
  } catch {
    throw new Error("JWT 载荷解析失败");
  }
}

export async function fetchUserById({ userId, token }) {
  const response = await fetch(buildApiUrl(`/api/users/${userId}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.detail || "获取用户信息失败");
  }

  return data;
}
