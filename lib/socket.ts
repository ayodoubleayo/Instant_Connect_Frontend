import { io, Socket } from "socket.io-client";

declare global {
  // eslint-disable-next-line no-var
  var __appSocket: Socket | undefined;
}

export function getSocket(): Socket {
  /**
   * --------------------------------------------------
   * REUSE ONLY IF CONNECTED (CRITICAL FIX)
   * --------------------------------------------------
   */
  if (globalThis.__appSocket) {
    const s = globalThis.__appSocket;

    if (s.connected && s.id) {
      console.log(
        "♻️ [SOCKET FACTORY] Reusing CONNECTED socket",
        s.id
      );
      return s;
    }

    console.warn(
      "🧹 [SOCKET FACTORY] Found STALE socket — destroying",
      {
        connected: s.connected,
        id: s.id,
      }
    );

    s.removeAllListeners();
    s.disconnect();
    globalThis.__appSocket = undefined;
  }

  /**
   * --------------------------------------------------
   * CREATE NEW SOCKET
   * --------------------------------------------------
   */
  console.log("🧠 [SOCKET FACTORY] Creating NEW socket instance");

  // ❗ DO NOT read httpOnly cookies
  // Auth comes from cookies automatically via withCredentials
  const socket = io("http://localhost:4000", {
    withCredentials: true,
    transports: ["websocket"],
  });

  /**
   * --------------------------------------------------
   * LIFECYCLE LOGS
   * --------------------------------------------------
   */
  socket.on("connect", () => {
    console.log("🟢 [SOCKET] CONNECTED", {
      socketId: socket.id,
      transport: socket.io.engine.transport.name,
    });
  });

  socket.on("connect_error", (err) => {
    console.error("❌ [SOCKET] CONNECT ERROR", {
      message: err.message,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 [SOCKET] DISCONNECTED", {
      socketId: socket.id,
      reason,
    });
  });

  /**
   * --------------------------------------------------
   * STORE GLOBALLY
   * --------------------------------------------------
   */
  globalThis.__appSocket = socket;
  return socket;
}
