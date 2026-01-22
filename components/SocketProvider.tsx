"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useUserStore } from "@/store/user.store";
import { useChatStore } from "@/store/chat.store";

export function SocketProvider() {
  const me = useUserStore((s) => s.me);
  const hydrated = useUserStore((s) => s.hydrated);

  useEffect(() => {
    // ✅ ADDED — recovery mode guard
    if (typeof window !== "undefined") {
      const path = window.location.pathname; // ✅
      const hash = window.location.hash;     // ✅

      if (
        path.startsWith("/reset-password") || // ✅
        hash.includes("type=recovery")        // ✅
      ) {
        console.log(
          "[SocketProvider] recovery mode → sockets disabled"
        );
        return; // ✅ HARD STOP
      }
    }

    if (!hydrated || !me) {
      console.log("[SocketProvider] waiting for user");
      return;
    }

    const socket = getSocket();

    console.log("[SocketProvider] socket ready for user", me.id);

    socket.on("message:new", (msg) => {
      console.log("[SocketProvider] message:new", msg);

      const { activeMatchId, incrementUnread } =
        useChatStore.getState();

      if (activeMatchId !== msg.matchId) {
        console.log(
          "[SocketProvider] increment unread",
          msg.matchId
        );
        incrementUnread(msg.matchId);
      }
    });

    return () => {
      console.log("[SocketProvider] cleanup listeners");
      socket.off("message:new");
    };
  }, [hydrated, me]);

  return null;
}
