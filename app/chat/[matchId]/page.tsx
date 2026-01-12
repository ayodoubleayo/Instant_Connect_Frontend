"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { api } from "@/lib/api";
import { useChat } from "@/hooks/useChat";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";
import { Message } from "@/store/chat.store";

import { ChatHeader } from "@/components/ChatHeader";
import { MessageBubble } from "@/components/MessageBubble";
import { ContactInfo } from "@/components/ContactInfo";

import { useUserStore } from "@/store/user.store";
import { useChatStore } from "@/store/chat.store";
import { containsBannedContentClient } from "@/utils/chatFilter.client";

import { playMessageSound, notifyMessage } from "@/utils/notification";

interface MatchMeta {
  price: number;
}

export default function ChatPage() {
  const { matchId } = useParams<{ matchId: string }>();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { me } = useUserStore();
  const { sendMessage } = useChat();

const {
  setActiveMatch,
  clearUnread,
  incrementUnread,
  addIncomingMessage,
  addOptimisticMessage,
  replaceMessageByClientId,
  markMessageDeleted,
  markMessageSeen, // ✅ add this
  onlineByMatch,
  lastSeenByMatch,
  activeMatchId,
  messagesByMatch,
} = useChatStore();


  const messages = matchId ? messagesByMatch[matchId] ?? [] : [];

  const [text, setText] = useState("");
  const [matchMeta, setMatchMeta] = useState<MatchMeta | null>(null);
  const [blocked, setBlocked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  console.log("🎬 [ChatPage] RENDER", {
    matchId,
    myId: me?.id,
    messagesCount: messages.length,
    activeMatchId,
  });

  /* ================= SOCKET HANDLERS ================= */
const handlers = useMemo(
  () => ({
    onNew: (msg: Message) => {
      const existingMessages = messages;

      const isDuplicate = existingMessages.some(
        (m) => m.id === msg.id || (msg.clientId && m.clientId === msg.clientId)
      );
      if (isDuplicate) return;

      if (msg.senderId === me?.id && msg.clientId) {
        replaceMessageByClientId(matchId, msg.clientId, msg);
        return;
      }

      addIncomingMessage(msg);
      if (activeMatchId !== matchId) incrementUnread(matchId);
    },
    onDelete: ({ messageId }: { messageId: string }) => {
      markMessageDeleted(matchId, messageId);
    },

      onSeen: (payload: { matchId: string; messageId: string }) => {
      console.log("👀 [ChatPage] message:seen payload", payload);
      markMessageSeen(payload.matchId, payload.messageId);
      },
  }),
  [
    messages,
    me?.id,
    matchId,
    activeMatchId,
    addIncomingMessage,
    replaceMessageByClientId,
    incrementUnread,
    markMessageDeleted,
        markMessageSeen

  ]
);


  const { socket } = useRealtimeChat(matchId, handlers);

  /* ================= LOAD MESSAGES ================= */
  useEffect(() => {
    if (!matchId) return;

    console.log("📥 [ChatPage][useEffect] Loading messages for match:", matchId);
    api<any[]>(`/chat/${matchId}`).then((msgs) => {
      console.log("📥 [ChatPage][useEffect] Messages loaded:", {
        count: msgs.length,
        ids: msgs.map((m) => m.id),
      });
      msgs.forEach(addIncomingMessage);
    });
  }, [matchId, addIncomingMessage]);

  /* ================= LOAD MATCH META ================= */
  useEffect(() => {
    if (!matchId) return;

    console.log("📊 [ChatPage][useEffect] Loading match meta");
    api(`/matches/${matchId}`)
      .then((res: any) => {
        setMatchMeta({ price: res.price });
        setUnlocked(!!res.unlocked);
        console.log("📊 [ChatPage][useEffect] Match meta loaded:", {
          price: res.price,
          unlocked: res.unlocked,
        });
      })
      .catch(() => {
        setMatchMeta(null);
        setUnlocked(false);
        console.warn("⚠️ [ChatPage][useEffect] Failed to load match meta");
      });
  }, [matchId]);

  /* ================= ACTIVE MATCH ================= */
  useEffect(() => {
    if (!matchId || !socket.current) return;

    console.log("🔑 [ChatPage][useEffect] Setting active match:", matchId);
    setActiveMatch(matchId);
    clearUnread(matchId);

    socket.current.emit("message:seen", { matchId });
    console.log("🔑 [ChatPage][useEffect] Emitted message:seen");

    return () => {
      setActiveMatch(null);
      console.log("🔑 [ChatPage][useEffect] Cleared active match");
    };
  }, [matchId, socket, setActiveMatch, clearUnread]);

  /* ================= AUTOSCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================= FILTER ================= */
  useEffect(() => {
    if (unlocked || !text.trim()) {
      setBlocked(false);
      return;
    }
    setBlocked(containsBannedContentClient(text));
  }, [text, unlocked]);

  /* ================= SEND ================= */
  async function send() {
    console.log("🚀 [ChatPage][send] START", {
      hasText: !!text.trim(),
      hasMe: !!me,
      blocked,
      unlocked,
    });

    if (!text.trim() || !me || (blocked && !unlocked)) {
      console.warn("⚠️ [ChatPage][send] ABORTED - Validation failed");
      return;
    }
    if (!socket.current) {
      console.error("❌ [ChatPage][send] ABORTED - No socket");
      return;
    }

    const clientId = crypto.randomUUID();
    const content = text.trim();

    console.log("💡 [ChatPage][send] Creating optimistic message:", {
      clientId,
      matchId,
      senderId: me.id,
      content: content.substring(0, 20),
    });

    // 1️⃣ Optimistic UI
    const optimistic = {
      clientId,
      matchId,
      content,
      senderId: me.id,
      createdAt: new Date().toISOString(),
    };

    addOptimisticMessage(optimistic);
    console.log("✅ [ChatPage][send] Optimistic message added to store");

    setText(""); // Clear input immediately

    // 2️⃣ Socket emit
    console.log("📡 [ChatPage][send] Emitting via socket");
    socket.current.emit("message:send", {
      matchId,
      content,
      clientId,
    });
    console.log("📡 [ChatPage][send] Socket emit completed");

    // 3️⃣ REST fallback
    try {
      console.log("💾 [ChatPage][send] Calling sendMessage (REST fallback)");
      const res = await sendMessage(matchId, { content, clientId });
      console.log("✅ [ChatPage][send] sendMessage completed:", res);
    } catch (err) {
      console.error("❌ [ChatPage][send] sendMessage failed:", err);
      setText(content); // Restore on error
    }

    console.log("🏁 [ChatPage][send] END");
  }

  return (
    <div className="max-w-2xl mx-auto h-[100dvh] flex flex-col bg-gray-100">
      <ChatHeader
        online={!!onlineByMatch[matchId]}
        lastSeen={lastSeenByMatch[matchId] ?? null}
      />

      {matchMeta && (
        <ContactInfo
          matchId={matchId}
          price={matchMeta.price}
          highlight={blocked && !unlocked}
        />
      )}

      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3">
        {messages
          .filter((m) => m.content !== null)
          .map((m) => {
            const uniqueKey = m.id || `${m.clientId}-${m.createdAt || Date.now()}`;
            
            return (
              <MessageBubble
                key={uniqueKey}
                message={m}
                isMine={m.senderId === me?.id}
                socket={socket.current}
              />
            );
          })}
        <div ref={bottomRef} />
      </div>

      {blocked && !unlocked && (
        <div className="px-4 py-2 text-sm bg-red-50 text-red-600 border-t">
          ⚠️ Premium content detected. Unlock chat to continue.
        </div>
      )}

      <div className="sticky bottom-0 bg-white border-t px-3 py-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message…"
          className={`flex-1 border rounded-full px-4 py-2 ${
            blocked && !unlocked ? "border-red-400 bg-red-50" : ""
          }`}
        />
        <button
          onClick={send}
          disabled={blocked && !unlocked}
          className={`px-5 py-2 rounded-full text-white ${
            blocked && !unlocked ? "bg-gray-400" : "bg-black"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}