export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://tradar-be.onrender.com";
// export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8800";

export const apiUrl = (path: string) => {
  if (!path.startsWith("/")) return `${API_BASE}/${path}`;
  return `${API_BASE}${path}`;
};

// Lightweight fetch helper that handles base URL, JSON bodies, and auth token
export async function apiFetch(
  path: string,
  options: RequestInit & { auth?: boolean; json?: any } = {}
) {
  const { auth = false, json, headers, ...rest } = options as any;
  const finalHeaders: Record<string, string> = { ...(headers || {}) };

  if (json !== undefined) {
    finalHeaders["Content-Type"] = finalHeaders["Content-Type"] || "application/json";
    (rest as any).body = JSON.stringify(json);
  }

  if (auth && typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  return fetch(apiUrl(path), { ...rest, headers: finalHeaders });
}
