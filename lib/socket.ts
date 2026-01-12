import { io, Socket } from "socket.io-client";

declare global {
  var __appSocket: Socket | undefined;
}

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://instant-connect-wnot.onrender.com"
    : "http://localhost:4000";

export function getSocket(): Socket {
  if (globalThis.__appSocket) {
    const s = globalThis.__appSocket;
    if (s.connected && s.id) {
      console.log("♻️ [SOCKET FACTORY] Reusing CONNECTED socket", s.id);
      return s;
    }
    console.warn("🧹 [SOCKET FACTORY] Found STALE socket — destroying", {
      connected: s.connected,
      id: s.id,
    });
    s.removeAllListeners();
    s.disconnect();
    globalThis.__appSocket = undefined;
  }

  console.log("🧠 [SOCKET FACTORY] Creating NEW socket instance");

  const socket = io(SOCKET_URL, {
    withCredentials: true,
    transports: ["websocket", "polling"], // fallback to polling
  });

  socket.on("connect", () => {
    console.log("🟢 [SOCKET] CONNECTED", {
      socketId: socket.id,
      transport: socket.io.engine.transport.name,
    });
  });

  socket.on("connect_error", (err) => {
    console.error("❌ [SOCKET] CONNECT ERROR", { message: err.message });
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 [SOCKET] DISCONNECTED", { socketId: socket.id, reason });
  });

  globalThis.__appSocket = socket;
  return socket;
}
