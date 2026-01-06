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
     INITIAL FETCH + HYDRATE
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

        if (isUnread) {
          incrementUnread(c.matchId);
        }
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Messages</h1>
        <p className="text-sm text-gray-400">
          Your recent conversations
        </p>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 && (
        <div className="text-center py-24 text-gray-400 text-sm">
          No conversations yet
        </div>
      )}

      {/* LIST */}
      <div className="space-y-3">
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
              className={`flex items-center gap-4 px-5 py-4 rounded-3xl transition
                ${
                  isUnread
                    ? "bg-white shadow-md"
                    : "bg-gray-50 hover:bg-gray-100"
                }
                active:scale-[0.98]
              `}
            >
              {/* AVATAR */}
              <div className="relative shrink-0">
                <img
                  src={c.user.profilePhoto || "/avatar.png"}
                  className={`w-14 h-14 rounded-full object-cover
                    ${isUnread ? "ring-2 ring-black" : ""}
                  `}
                />

                {isUnread && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p
                    className={`text-base truncate ${
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
                  className={`text-sm truncate mt-1 ${
                    isUnread
                      ? "text-gray-900 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {c.lastMessage?.content ||
                    "No messages yet"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
