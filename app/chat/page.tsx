"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";
import { useChatStore } from "@/store/chat.store";

/* =========================
   TYPES
========================= */
interface InboxItem {
  matchId: string;
  user: {
    username: string;
    profilePhoto?: string | null;
  };
  lastMessage?: {
    content?: string | null;
    createdAt: string;
  } | null;
  lastSeen?: string | null;
}

/* =========================
   TIME FORMATTER
========================= */
function formatInboxTime(dateString?: string) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  return date.toLocaleDateString();
}

export default function InboxPage() {
  const [items, setItems] = useState<InboxItem[]>([]);

  /* =========================
     INITIAL FETCH
  ========================= */
  useEffect(() => {
    api<InboxItem[]>("/chat/inbox").then((data) => {
      const { incrementUnread } = useChatStore.getState();

      data.forEach((c) => {
        const isUnread =
          c.lastMessage &&
          (!c.lastSeen ||
            new Date(c.lastMessage.createdAt) >
              new Date(c.lastSeen));

        if (isUnread) incrementUnread(c.matchId);
      });

      setItems(data);
    });
  }, []);

  /* =========================
     LIVE SOCKET UPDATE
  ========================= */
  useEffect(() => {
    const socket = (window as any)?.socket;
    if (!socket) return;

    socket.on("inbox:update", ({ matchId, message }: any) => {
      const { incrementUnread } = useChatStore.getState();

      setItems((prev) =>
        prev.map((c) =>
          c.matchId === matchId
            ? {
                ...c,
                lastMessage: {
                  content: message.content,
                  createdAt: message.createdAt,
                },
              }
            : c
        )
      );

      incrementUnread(matchId);
    });

    return () => socket.off("inbox:update");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-indigo-50">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            💬 Your Messages
          </h1>
          <p className="mt-2 text-gray-500">
            Conversations that could turn into something meaningful
          </p>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 && (
          <div className="mt-24 text-center space-y-4">
            <div className="text-6xl">💌</div>
            <p className="text-lg font-medium text-gray-700">
              No conversations yet
            </p>
            <p className="text-sm text-gray-500">
              Start discovering profiles and make the first move
            </p>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-4">
          {items.map((c) => {
            const isUnread =
              c.lastMessage &&
              (!c.lastSeen ||
                new Date(c.lastMessage.createdAt) >
                  new Date(c.lastSeen));

            return (
              <Link
                key={c.matchId}
                href={`/chat/${c.matchId}`}
                className="
                  group flex items-center gap-5 p-5
                  rounded-3xl bg-white/80 backdrop-blur
                  border border-white/70
                  shadow-md hover:shadow-xl
                  transition-all duration-200
                  hover:-translate-y-0.5
                  active:scale-[0.98]
                "
              >
                {/* AVATAR */}
                <div className="relative shrink-0">
                  <img
                    src={c.user.profilePhoto || "/avatar.png"}
                    className={`
                      w-16 h-16 rounded-full object-cover
                      ${
                        isUnread
                          ? "ring-4 ring-pink-400 shadow-[0_0_25px_rgba(236,72,153,0.6)]"
                          : "ring-2 ring-gray-200"
                      }
                    `}
                  />

                  {isUnread && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white animate-pulse" />
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p
                      className={`truncate text-lg ${
                        isUnread
                          ? "font-semibold text-gray-900"
                          : "font-medium text-gray-700"
                      }`}
                    >
                      {c.user.username}
                    </p>

                    {c.lastMessage?.createdAt && (
                      <span className="text-xs text-gray-400">
                        {formatInboxTime(
                          c.lastMessage.createdAt
                        )}
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-1 truncate text-sm ${
                      isUnread
                        ? "text-gray-900 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {c.lastMessage?.content ||
                      "Start the conversation 💬"}
                  </p>
                </div>

                {/* CHEVRON */}
                <div className="text-gray-300 group-hover:text-gray-500 transition">
                  ➜
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
