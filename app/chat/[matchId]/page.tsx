"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { api } from "@/lib/api";
import { useChat } from "@/hooks/useChat";
import { useRealtimeChat } from "@/hooks/useRealtimeChat";

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
    activeMatchId,
    onlineByMatch,
    lastSeenByMatch,
  } = useChatStore();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [matchMeta, setMatchMeta] = useState<MatchMeta | null>(null);

  const [blocked, setBlocked] = useState(false);
  const [unlocked, setUnlocked] = useState(false); // 🔐 SOURCE OF TRUTH

  /* ================= PAGE MOUNT ================= */
  useEffect(() => {
    console.log("[ChatPage] Mounted", { matchId });
  }, []);

  /* ================= SOCKET HANDLERS ================= */
  const handlers = useMemo(
    () => ({
      onNew: (msg: any) => {
        setMessages((prev) => {
          const exists = prev.find(
            (m) => m.clientId && m.clientId === msg.clientId
          );

          return exists
            ? prev.map((m) =>
                m.clientId === msg.clientId ? msg : m
              )
            : [...prev, msg];
        });

        if (activeMatchId !== matchId) {
          incrementUnread(matchId);
          playMessageSound();
          notifyMessage("New message", msg.content ?? "📎 Media");
        }
      },

      onDelivered: ({ id, clientId, deliveredAt }: any) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id || m.clientId === clientId
              ? { ...m, deliveredAt }
              : m
          )
        );
      },

      onSeen: () => {
        setMessages((prev) =>
          prev.map((m) =>
            m.senderId === me?.id && !m.seenAt
              ? { ...m, seenAt: new Date().toISOString() }
              : m
          )
        );
      },

      onDelete: ({ messageId }: any) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  deletedAt: new Date().toISOString(),
                  content: null,
                }
              : m
          )
        );
      },
    }),
    [me?.id, matchId, activeMatchId]
  );

  const { socket } = useRealtimeChat(matchId, handlers);

  /* ================= LOAD MESSAGES ================= */
  useEffect(() => {
    if (!matchId) return;

    api<any[]>(`/chat/${matchId}`).then(setMessages);
  }, [matchId]);

  /* ================= LOAD MATCH META ================= */
  useEffect(() => {
    if (!matchId) return;

    api(`/matches/${matchId}`)
      .then((res: any) => {
        setMatchMeta({ price: res.price });
        setUnlocked(!!res.unlocked); // 🔐 IMPORTANT
      })
      .catch(() => {
        setMatchMeta(null);
        setUnlocked(false);
      });
  }, [matchId]);

  /* ================= ACTIVATE MATCH ================= */
  useEffect(() => {
    if (!matchId) return;

    setActiveMatch(matchId);
    clearUnread(matchId);
    socket.current.emit("message:seen", { matchId });

    return () => {
      setActiveMatch(null);
    };
  }, [matchId]);

  /* ================= AUTOSCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ================= PREMIUM FILTER ================= */
  useEffect(() => {
    // 🔓 PAID = NO RESTRICTIONS
    if (unlocked) {
      setBlocked(false);
      return;
    }

    if (!text.trim()) {
      setBlocked(false);
      return;
    }

    const blockedNow = containsBannedContentClient(text);
    setBlocked(blockedNow);
  }, [text, unlocked]);

  /* ================= SEND MESSAGE ================= */
  async function send() {
    if (!text.trim() || !me || (blocked && !unlocked)) return;

    const clientId = crypto.randomUUID();

    const optimistic = {
      id: clientId,
      clientId,
      matchId,
      content: text,
      senderId: me.id,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimistic]);
    setText("");
    socket.current.emit("typing:stop", { matchId });

    await sendMessage(matchId, {
      content: optimistic.content,
      clientId,
    });
  }

  return (
  <div className="relative max-w-2xl mx-auto min-h-[100dvh] flex flex-col bg-gray-100">
    {/* Header */}
    <ChatHeader
      online={!!onlineByMatch[matchId]}
      lastSeen={lastSeenByMatch[matchId] ?? null}
    />

    {/* 🔥 PAYMENT ENTRY POINT */}
    {matchMeta && (
      <ContactInfo
        matchId={matchId}
        price={matchMeta.price}
        highlight={blocked && !unlocked}
      />
    )}

    {/* ================= MESSAGES (SCROLL AREA) ================= */}
    <div className="flex-1 overflow-y-auto px-2 pb-28">
      {messages.map((m) => (
        <MessageBubble
          key={m.id}
          message={m}
          isMine={m.senderId === me?.id}
          socket={socket.current}
        />
      ))}
      <div ref={bottomRef} />
    </div>

    {/* ================= BLOCKED WARNING ================= */}
    {blocked && !unlocked && (
      <div className="px-4 py-2 text-sm bg-red-50 text-red-600 border-t">
        ⚠️ Premium content detected.
        <span className="ml-1 font-medium">
          Unlock chat by paying for yourself or your partner.
        </span>
      </div>
    )}

    {/* ================= FIXED INPUT BAR ================= */}
    <div
      className="
        fixed bottom-0 left-0 right-0
        bg-white border-t
        p-3 flex gap-2
        max-w-2xl mx-auto
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`flex-1 border rounded-full px-4 py-2 ${
          blocked && !unlocked ? "border-red-400 bg-red-50" : ""
        }`}
        placeholder="Type message…"
      />
      <button
        onClick={send}
        disabled={blocked && !unlocked}
        className={`px-4 rounded-full text-white ${
          blocked && !unlocked
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black"
        }`}
      >
        Send
      </button>
    </div>
  </div>
);}
