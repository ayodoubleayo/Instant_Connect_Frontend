"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useUserStore } from "@/store/user.store";
import { useChatStore } from "@/store/chat.store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function GlobalRealtime() {
  const socketRef = useRef<Socket | null>(null);

  const me = useUserStore((s) => s.me);
  const hydrated = useUserStore((s) => s.hydrated);

  useEffect(() => {
    console.log("🧠 [GlobalRealtime] effect fired", {
      hydrated,
      userId: me?.id,
      hasSocket: !!socketRef.current,
    });

    if (!hydrated || !me) {
      console.log("⏳ [GlobalRealtime] waiting for auth hydration");
      return;
    }

    if (socketRef.current) {
      console.log("♻️ [GlobalRealtime] socket already exists, skipping");
      return;
    }

    console.log("🔌 [GlobalRealtime] creating GLOBAL socket…");

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🟢 [GlobalRealtime] CONNECTED", {
        socketId: socket.id,
        userId: me.id,
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 [GlobalRealtime] DISCONNECTED", {
        socketId: socket.id,
        reason,
      });
    });

socket.on("inbox:update", ({ matchId, message }) => {
  console.log("📥 [GlobalRealtime] inbox:update RECEIVED", {
    matchId,
    messageId: message.id,
  });

  const { activeMatchId, incrementUnread } =
    useChatStore.getState();

  if (activeMatchId !== matchId) {
    console.log("🔔 [GlobalRealtime] unread increment", matchId);
    incrementUnread(matchId);
  } else {
    console.log("💬 [GlobalRealtime] active chat — no unread");
  }
});


    socketRef.current = socket;

    return () => {
      console.log("🧹 [GlobalRealtime] CLEANUP → disconnect socket", {
        socketId: socket.id,
      });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [hydrated, me]);

  return null;
}
