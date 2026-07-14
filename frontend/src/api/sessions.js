const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function request(path, token, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.detail || "Unable to complete request");
  return data;
}

export function createSession(sessionType, token) {
  return request("/sessions", token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_type: sessionType }),
  });
}

export function getSessions(token) {
  return request("/sessions", token);
}
