"use client";

import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "@/store/chat.store";
import { Message } from "@/store/chat.store";

interface ChatHandlers {
  onNew?: (msg: Message) => void;
  onDelivered?: (payload: any) => void;
  onSeen?: (payload: any) => void;
  onDelete?: (payload: any) => void;
}

export function useRealtimeChat(
  matchId: string | undefined,
  handlers: ChatHandlers
) {
  const socket = useRef(getSocket());
  const joinedMatchesRef = useRef<Set<string>>(new Set());
  const handlersRef = useRef(handlers);

  const { setOnlineStatus, setLastSeen } = useChatStore();

  // Update handler ref whenever handlers change
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  // Setup socket events
 // Setup socket events
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
  };

// Keep your existing useRealtimeChat.ts - it's already correct!
// Just add this one log in the onMessageNew handler:

const onMessageNew = (msg: any) => {
  if (!msg?.id) {
    console.warn("⚠️ [useRealtimeChat][onMessageNew] Message has no ID, skipping");
    return;
  }
  console.log("📨 [useRealtimeChat][onMessageNew] Received, calling handler:", {
    msgId: msg.id,
    clientId: msg.clientId,
  });
  handlersRef.current?.onNew?.(msg);
  console.log("✅ [useRealtimeChat][onMessageNew] Handler called");
};

  const onMessageDelivered = (payload: any) => {
    console.log("📦 [SOCKET][CLIENT] message:delivered received", payload);
    handlersRef.current?.onDelivered?.(payload);
  };

  const onMessageSeen = (payload: any) => {
    console.log("👀 [SOCKET][CLIENT] message:seen received", payload);
    handlersRef.current?.onSeen?.(payload);
  };

  const onMessageDeleted = (payload: any) => {
    console.log("🗑️ [SOCKET][CLIENT] message:deleted received", payload);
    handlersRef.current?.onDelete?.(payload);
  };

  const onUserOnline = ({ userId, matchId: id }: any) => {
    setOnlineStatus(id, true);
    setLastSeen(id, null);
  };

  const onUserOffline = ({ userId, lastSeenAt, matchId: id }: any) => {
    setOnlineStatus(id, false);
    setLastSeen(id, lastSeenAt ?? null);
  };

  const onPresenceState = ({ matchId: id, online, lastSeenAt }: any) => {
    setOnlineStatus(id, online);
    setLastSeen(id, lastSeenAt ?? null);
  };

  const onMatchUnlocked = ({ matchId: unlockedMatchId }: any) => {
    if (matchId === unlockedMatchId) {
      console.log("🔓 [MATCH][CLIENT] unlocked in realtime", unlockedMatchId);
      window.location.reload();
    }
  };

  s.on("connect", onConnect);
  s.on("disconnect", onDisconnect);
  s.on("user:online", onUserOnline);
  s.on("user:offline", onUserOffline);
  s.on("presence:state", onPresenceState);
  s.on("message:new", onMessageNew);
  s.on("message:delivered", onMessageDelivered);
  s.on("message:seen", onMessageSeen);
  s.on("message:deleted", onMessageDeleted);
  s.on("match:unlocked", onMatchUnlocked);

  return () => {
    s.off("connect", onConnect);
    s.off("disconnect", onDisconnect);
    s.off("user:online", onUserOnline);
    s.off("user:offline", onUserOffline);
    s.off("presence:state", onPresenceState);
    s.off("message:new", onMessageNew);
    s.off("message:delivered", onMessageDelivered);
    s.off("message:seen", onMessageSeen);
    s.off("message:deleted", onMessageDeleted);
    s.off("match:unlocked", onMatchUnlocked);
  };
}, [setOnlineStatus, setLastSeen, matchId]); // ✅ Added matchId

  // Handle joining/leaving current match room
  useEffect(() => {
    if (!matchId) return;
    joinMatchRoom(matchId);

    return () => leaveMatchRoom(matchId);

    function joinMatchRoom(id: string) {
      const s = socket.current;
      if (joinedMatchesRef.current.has(id)) return;

      const doJoin = () => {
        s.emit("joinMatch", id, () => {
          joinedMatchesRef.current.add(id);
          console.log("✅ [SOCKET][CLIENT] joined match", id);
          s.emit("presence:sync", { matchId: id });
        });
      };

      if (s.connected) {
        doJoin();
      } else {
        s.once("connect", doJoin);
      }
    }

    function leaveMatchRoom(id: string) {
      const s = socket.current;
      s.emit("leaveMatch", id);
      joinedMatchesRef.current.delete(id);
      console.log("⬅️ [SOCKET][CLIENT] left match", id);
    }
  }, [matchId]);

  return { socket };
}
