"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

export function MessageBubble({ message, isMine, socket }: any) {
  const deliveredOnce = useRef(false);

  const isDeleted = !!message.deletedAt;

  console.log("🧩 [MessageBubble] render", {
    id: message.id,
    isMine,
    isDeleted,
    content: message.content,
    deliveredAt: message.deliveredAt,
    seenAt: message.seenAt,
  });

  /* ================= DELIVERED ================= */
  useEffect(() => {
    if (!socket) return;
    if (!socket.connected) return;
    if (isMine) return;
    if (isDeleted) return;
    if (!message.id) return;
    if (message.deliveredAt) return;
    if (deliveredOnce.current) return;

    deliveredOnce.current = true;

    socket.emit("message:delivered", {
      id: message.id,
    });
  }, [socket, isMine, isDeleted, message.id, message.deliveredAt]);

  useEffect(() => {
    deliveredOnce.current = false;
  }, [message.id]);

  /* ================= DELETE ================= */
  function handleDelete() {
    if (!socket || !socket.connected) return;
    if (!message.id) return;

    socket.emit("message:delete", {
      messageId: message.id,
    });
  }

  const isSending = isMine && !message.id;
  const isSent = isMine && message.id && !message.deliveredAt;

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
      {/* DELETED PLACEHOLDER */}
      {isDeleted ? (
        <p className="italic opacity-60">Message deleted</p>
      ) : (
        message.content && <p>{message.content}</p>
      )}

      {/* DELETE BUTTON */}
      {isMine && message.id && !isDeleted && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 text-xs bg-red-700 text-white rounded-full px-2"
        >
          
        </button>
      )}

      {/* TIME */}
      <div className="text-[10px] opacity-70 mt-0.5 text-right">
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
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
