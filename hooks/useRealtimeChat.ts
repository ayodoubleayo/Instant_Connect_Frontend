"use client";

import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "@/store/chat.store";

export function useRealtimeChat(
  matchId: string | undefined,
  handlers: any
) {
  const socket = useRef(getSocket());
  const joinedMatchesRef = useRef<Set<string>>(new Set());

  const {
    setOnlineStatus,
    setLastSeen,
  } = useChatStore();

  /* ============================================================
     SOCKET LIFECYCLE
  ============================================================ */
  useEffect(() => {
    const s = socket.current;

    const onConnect = () => {
      console.log("🟢 [SOCKET][CLIENT] connected", s.id);

      joinedMatchesRef.current.forEach((id) => {
        console.log("🔁 [SOCKET][CLIENT] rejoin match", id);
        s.emit("joinMatch", id);
        s.emit("presence:sync", { matchId: id });
      });
    };

    const onDisconnect = () => {
      console.log("🔴 [SOCKET][CLIENT] disconnected");
      joinedMatchesRef.current.clear();
    };

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);

    /* ============================================================
       🔥 PRESENCE EVENTS (REALTIME)
    ============================================================ */
    s.on("user:online", ({ userId }) => {
      console.log("🟢 [PRESENCE][CLIENT] user online", userId);

      if (matchId) {
        setOnlineStatus(matchId, true);
        setLastSeen(matchId, null);
      }
    });

    s.on("user:offline", ({ userId, lastSeenAt }) => {
      console.log("🔴 [PRESENCE][CLIENT] user offline", {
        userId,
        lastSeenAt,
      });

      if (matchId) {
        setOnlineStatus(matchId, false);
        setLastSeen(matchId, lastSeenAt);
      }
    });

    /* ============================================================
       🧠 PRESENCE SYNC (SNAPSHOT)
    ============================================================ */
    s.on("presence:state", ({ matchId: id, online, lastSeenAt }) => {
      console.log("🧠 [PRESENCE][CLIENT] sync result", {
        id,
        online,
        lastSeenAt,
      });

      setOnlineStatus(id, online);
      setLastSeen(id, lastSeenAt ?? null);
    });

    /* ============================================================
       💬 CHAT EVENTS
    ============================================================ */
    s.on("message:new", handlers?.onNew);
    s.on("message:delivered", handlers?.onDelivered);
    s.on("message:seen", handlers?.onSeen);
    s.on("message:delete", handlers?.onDelete);

    /* ============================================================
       🔓 MATCH UNLOCK EVENT (ADMIN → REALTIME)
    ============================================================ */
    s.on("match:unlocked", ({ matchId: unlockedMatchId }) => {
      if (matchId === unlockedMatchId) {
        console.log(
          "🔓 [MATCH][CLIENT] unlocked in realtime",
          unlockedMatchId
        );
        window.location.reload();
      }
    });

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);

      s.off("user:online");
      s.off("user:offline");
      s.off("presence:state");

      s.off("message:new");
      s.off("message:delivered");
      s.off("message:seen");
      s.off("message:delete");

      s.off("match:unlocked");
    };
  }, [matchId, setOnlineStatus, setLastSeen, handlers]);

  /* ============================================================
     ROOM MEMBERSHIP
  ============================================================ */
  useEffect(() => {
    const s = socket.current;
    if (!matchId) return;

    console.log("➡️ [SOCKET][CLIENT] joinMatch", matchId);

    s.emit("joinMatch", matchId, () => {
      joinedMatchesRef.current.add(matchId);
      console.log("✅ [SOCKET][CLIENT] joined match", matchId);

      console.log("🧠 [PRESENCE][CLIENT] requesting sync", matchId);
      s.emit("presence:sync", { matchId });
    });

    return () => {
      console.log("⬅️ [SOCKET][CLIENT] leaveMatch", matchId);
      s.emit("leaveMatch", matchId);
      joinedMatchesRef.current.delete(matchId);
    };
  }, [matchId]);

  return { socket };
}
