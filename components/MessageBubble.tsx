"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

export function MessageBubble({ message, isMine, socket }: any) {
  const deliveredOnce = useRef(false);

  const isDeleted = !!message.deletedAt;

  // Debug (keep this while testing)
  console.log("🧩 [MessageBubble] render", {
    id: message.id,
    senderId: message.senderId,
    isMine,
    isDeleted,
    content: message.content,
    createdAt: message.createdAt,
    deliveredAt: message.deliveredAt,
    seenAt: message.seenAt,
  });

  /* ================= DELIVERED ================= */
  useEffect(() => {
    if (!socket?.connected) return;
    if (isMine) return;                 // ❗ never deliver your own message
    if (isDeleted) return;
    if (!message.id) return;            // optimistic message
    if (message.deliveredAt) return;
    if (deliveredOnce.current) return;

    deliveredOnce.current = true;

    socket.emit("message:delivered", {
      id: message.id,
    });
  }, [
    socket,
    isMine,
    isDeleted,
    message.id,
    message.deliveredAt,
  ]);

  useEffect(() => {
    deliveredOnce.current = false;
  }, [message.id]);

  /* ================= SEEN ================= */
  useEffect(() => {
    if (!socket?.connected) return;
    if (isMine) return;                 // skip own messages
    if (isDeleted) return;
    if (!message.id) return;             // optimistic message
    if (message.seenAt) return;          // already seen

    socket.emit("message:seen", {
      matchId: message.matchId,
      messageId: message.id,
    });
  }, [
    socket,
    isMine,
    isDeleted,
    message.id,
    message.seenAt,
    message.matchId,
  ]);

  /* ================= DELETE ================= */
  function handleDelete() {
    if (!socket?.connected) return;
    if (!message.id) return;

    socket.emit("message:delete", {
      messageId: message.id,
    });
  }

  const isSending = isMine && !message.id;
  const isSent = isMine && message.id && !message.deliveredAt;

  /* ================= TIME (SAFE) ================= */
  const timeLabel = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  /* ================= UI ================= */
  return (
    <div
      className={clsx(
        "max-w-[75%] px-4 py-2 rounded-xl text-sm relative",
        isMine
          ? "bg-black text-white ml-auto"
          : "bg-blue-600 text-white mr-auto"
      )}
    >
      {/* CONTENT */}
      {isDeleted ? (
        <p className="italic opacity-60">Message deleted</p>
      ) : (
        message.content && <p>{message.content}</p>
      )}

      {/* DELETE BUTTON (ONLY YOUR MESSAGE) */}
      {isMine && message.id && !isDeleted && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 text-xs bg-red-700 text-white rounded-full px-2"
        >
          delete
        </button>
      )}

      {/* TIME */}
      <div className="text-[10px] opacity-70 mt-0.5 text-right">
        {timeLabel}
      </div>

      {/* STATUS (ONLY YOUR MESSAGES) */}
      {isMine && !isDeleted && (
        <div className="text-[10px] text-right opacity-70 mt-0.5">
          {message.seenAt
            ? "✔✔ Seen"
            : message.deliveredAt
            ? "✔ Delivered"
            : isSending
            ? "Sending…"
            : isSent
            ? "✔ Sent"
            : null}
        </div>
      )}
    </div>
  );
}
