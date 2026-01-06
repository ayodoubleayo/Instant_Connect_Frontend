const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const requestId = crypto.randomUUID();
  const method = options.method ?? "GET";
  const url = `${BASE_URL}${path}`;

  console.log("🌐 [API] START", {
    requestId,
    method,
    url,
    options,
  });

  try {
    const res = await fetch(url, {
      credentials: "include", // ✅ required for cookies
      headers: {
        "Content-Type": "application/json",
        "x-request-id": requestId, // 🔗 trace frontend → backend
        ...options.headers,
      },
      ...options,
    });

    console.log("🌐 [API] RESPONSE", {
      requestId,
      status: res.status,
      ok: res.ok,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => null);

      console.error("❌ [API] ERROR RESPONSE", {
        requestId,
        status: res.status,
        errorBody,
      });

      throw {
        requestId,
        status: res.status,
        code: errorBody?.code,
        message: errorBody?.message || "Request failed",
        hint: errorBody?.hint,
      };
    }

    const data = await res.json();

    console.log("🟢 [API] SUCCESS", {
      requestId,
      path,
    });

    return data as T;
  } catch (err) {
    console.error("🔥 [API] FAILED", {
      requestId,
      path,
      err,
    });
    throw err;
  } finally {
    console.log("🏁 [API] END", {
      requestId,
      path,
    });
  }
}
