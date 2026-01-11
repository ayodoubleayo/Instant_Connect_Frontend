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
  const [matchMeta, setMatchMeta] = useState<MatchMeta | null>(null);

  const [blocked, setBlocked] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

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

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!matchId) return;
    api<any[]>(`/chat/${matchId}`).then(setMessages);
  }, [matchId]);

  useEffect(() => {
    if (!matchId) return;
    api(`/matches/${matchId}`)
      .then((res: any) => {
        setMatchMeta({ price: res.price });
        setUnlocked(!!res.unlocked);
      })
      .catch(() => {
        setMatchMeta(null);
        setUnlocked(false);
      });
  }, [matchId]);

  useEffect(() => {
    if (!matchId) return;
    setActiveMatch(matchId);
    clearUnread(matchId);
    socket.current.emit("message:seen", { matchId });
    return () => setActiveMatch(null);
  }, [matchId]);

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

    await sendMessage(matchId, {
      content: optimistic.content,
      clientId,
    });
  }

  return (
    <div className="max-w-2xl mx-auto h-[100dvh] flex flex-col bg-gray-100">
      {/* HEADER */}
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

      {/* ================= MESSAGE LIST ================= */}
      <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3">
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

      {/* ================= WARNING ================= */}
      {blocked && !unlocked && (
        <div className="px-4 py-2 text-sm bg-red-50 text-red-600 border-t">
          ⚠️ Premium content detected. Unlock chat to continue.
        </div>
      )}

      {/* ================= INPUT BAR (STICKY, NOT FIXED) ================= */}
      <div
        className="
          sticky bottom-0
          bg-white border-t
          px-3 py-3
          flex gap-2
          items-center
          pb-[env(safe-area-inset-bottom)]
        "
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message…"
          className={`
            flex-1
            border rounded-full
            px-4 py-2
            focus:outline-none
            focus:ring-2 focus:ring-red-400
            ${blocked && !unlocked ? "border-red-400 bg-red-50" : ""}
          `}
        />
        <button
          onClick={send}
          disabled={blocked && !unlocked}
          className={`
            px-5 py-2
            rounded-full
            text-white font-medium
            transition
            ${
              blocked && !unlocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black active:scale-95"
            }
          `}
        >
          Send
        </button>
      </div>
    </div>
  );
}
