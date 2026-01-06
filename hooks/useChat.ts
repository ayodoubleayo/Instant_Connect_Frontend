import { api } from "@/lib/api";
import { useChatStore } from "@/store/chat.store";

interface SendPayload {
  content: string;
  clientId: string;
}

/** API response (transport layer) */
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
  const replaceMessageByClientId =
    useChatStore((s) => s.replaceMessageByClientId);

  const sendMessage = async (
    matchId: string,
    payload: SendPayload
  ): Promise<ApiMessage> => {
    try {
      const res = await api<ApiMessage>(`/chat/${matchId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      replaceMessageByClientId(
        matchId,
        payload.clientId,
        {
          ...res,
          matchId,
          clientId: res.clientId ?? payload.clientId,
        }
      );

      return res;
    } catch (err: any) {
      if (err?.code === "CHAT_LOCKED") {
        throw {
          code: "CHAT_LOCKED",
          message: "Unlock chat to share contact details",
        };
      }
      throw err;
    }
  };

  return { sendMessage };
}
