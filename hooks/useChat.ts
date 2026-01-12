// ✅ FIXED useChat.ts
"use client";

import { api } from "@/lib/api";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "@/store/chat.store";
import { useUserStore } from "@/store/user.store";
import { v4 as uuid } from "uuid";

interface SendPayload {
  content: string;
  clientId?: string;
}

interface ApiMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  clientId?: string;
  deliveredAt?: string | null;
  seenAt?: string | null;
}

export function useChat() {
  const socket = getSocket();
  const { me } = useUserStore();
  const replaceMessageByClientId = useChatStore(
    (s) => s.replaceMessageByClientId
  );

  const sendMessage = async (
    matchId: string,
    payload: SendPayload
  ): Promise<ApiMessage | void> => {
    if (!me?.id) {
      console.error("❌ [useChat] Cannot send: No user logged in");
      return;
    }

    const clientId = payload.clientId ?? uuid();

    console.log("📡 [useChat] Sending message via socket:", {
      matchId,
      clientId,
      senderId: me.id,
    });

    // ❌ REMOVED: No more optimistic message here!
    // ChatPage already handles this

    return new Promise((resolve, reject) => {
      socket.emit(
        "message:send",
        { matchId, content: payload.content, clientId },
        async (ack: { ok: boolean; message?: ApiMessage }) => {
          console.log("🔵 [useChat] Socket ack:", ack);

          if (ack?.ok && ack.message) {
            console.log("✅ [useChat] Socket confirmed:", ack.message);

            // ✅ Replace the optimistic message ChatPage created
            replaceMessageByClientId(matchId, clientId, {
              ...ack.message,
              matchId,
              clientId,
              status: "sent",
            });
            resolve(ack.message);
          } else {
            console.warn("⚠️ [useChat] Socket failed, using REST fallback");

            try {
              const res = await api<ApiMessage>(`/chat/${matchId}`, {
                method: "POST",
                body: JSON.stringify({ content: payload.content, clientId }),
              });
              
              console.log("💾 [useChat] REST response:", res);

              replaceMessageByClientId(matchId, clientId, {
                ...res,
                matchId,
                clientId: res.clientId ?? clientId,
                status: "sent",
              });
              resolve(res);
            } catch (err: any) {
              console.error("❌ [useChat] REST failed:", err);
              reject(err);
            }
          }
        }
      );
    });
  };

  return { sendMessage };
}