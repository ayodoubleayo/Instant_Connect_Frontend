import { api } from "@/lib/api";

export function useMessageStatus(matchId?: string) {
  const markSeen = async () => {
    if (!matchId) return;
    await api(`/chat/${matchId}/seen`, { method: "POST" });
  };

  const deleteMessage = async (id: string) => {
    await api(`/chat/message/${id}`, { method: "DELETE" });
  };

  return { markSeen, deleteMessage };
}
