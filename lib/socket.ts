import { io, Socket } from "socket.io-client";

/**
 * ======================================================
 * GLOBAL SOCKET SINGLETON (BROWSER-LIFETIME DURABLE)
 *
 * WHY:
 * - Prevent multiple socket connections per user
 * - Survive Next.js re-renders, route changes, hot reloads
 * - Guarantee ONE socket per browser tab
 *
 * This is production-grade best practice.
 * ======================================================
 */

declare global {
  // eslint-disable-next-line no-var
  var __appSocket: Socket | undefined;
}

export function getSocket(): Socket {
  /**
   * --------------------------------------------------
   * REUSE EXISTING SOCKET (if already created)
   * --------------------------------------------------
   */
  if (globalThis.__appSocket) {
    console.log(
      "♻️ [SOCKET FACTORY] Reusing EXISTING socket",
      globalThis.__appSocket.id
    );
    return globalThis.__appSocket;
  }

  /**
   * --------------------------------------------------
   * CREATE SOCKET (ONLY ONCE PER BROWSER)
   * --------------------------------------------------
   */
  console.log("🧠 [SOCKET FACTORY] Creating NEW socket instance");

  const socket = io("http://localhost:4000", {
    withCredentials: true,
    transports: ["websocket"], // force stable transport
  });

  /**
   * --------------------------------------------------
   * LIFECYCLE LOGGING
   * (Readable even years later)
   * --------------------------------------------------
   */
  socket.on("connect", () => {
    console.log("🟢 [SOCKET] CONNECTED", {
      socketId: socket.id,
      transport: socket.io.engine.transport.name,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 [SOCKET] DISCONNECTED", {
      socketId: socket.id,
      reason,
    });
  });

  socket.on("connect_error", (err) => {
    console.error("❌ [SOCKET] CONNECT ERROR", err.message);
  });

  /**
   * --------------------------------------------------
   * STORE GLOBALLY (THE KEY FIX)
   * --------------------------------------------------
   */
  globalThis.__appSocket = socket;

  return socket;
}
