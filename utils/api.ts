const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include", // 🔥 SEND COOKIE
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "API request failed");
  }

  return res.json();
}
