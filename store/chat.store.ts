"use client";

import { create } from "zustand";

export interface Message {
  id?: string;
  clientId: string;
  matchId: string;
  content: string | null;
  senderId: string;
  createdAt?: string;
  deletedAt?: string | null;
  status?: "sending" | "sent" | "delivered" | "seen";

  deliveredAt?: string | null; // ✅ allow null
  seenAt?: string | null;      // ✅ allow null
}



interface ChatState {
  activeMatchId: string | null;
  unreadByMatch: Record<string, number>;
  messagesByMatch: Record<string, Message[]>;
    markMessageSeen: (matchId: string, messageId: string) => void; // ✅ ADD THIS


  /* =========================
     PRESENCE (NEW)
  ========================= */
  onlineByMatch: Record<string, boolean>;
  lastSeenByMatch: Record<string, string | null>;

  setActiveMatch: (id: string | null) => void;

  addOptimisticMessage: (msg: Message) => void;
  replaceMessageByClientId: (
    matchId: string,
    clientId: string,
    serverMsg: Message
  ) => void;

  addIncomingMessage: (msg: Message) => void;

  markMessageDeleted: (matchId: string, messageId: string) => void;

  incrementUnread: (matchId: string) => void;
  clearUnread: (matchId: string) => void;

  /* =========================
     PRESENCE ACTIONS (NEW)
  ========================= */
  setOnlineStatus: (matchId: string, online: boolean) => void;
  setLastSeen: (matchId: string, lastSeen: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeMatchId: null,
  unreadByMatch: {},
  messagesByMatch: {},

  /* =========================
     PRESENCE STATE (NEW)
  ========================= */
  onlineByMatch: {},
  lastSeenByMatch: {},

  setActiveMatch: (id) => {
    console.log("🟣 [ChatStore] setActiveMatch →", id);
    set({ activeMatchId: id });
  },

  /* =========================
     OPTIMISTIC SEND
  ========================= */
  addOptimisticMessage: (msg) => {
    console.log("🟡 [ChatStore] addOptimisticMessage", msg);

    set((state) => ({
      messagesByMatch: {
        ...state.messagesByMatch,
        [msg.matchId]: [
          ...(state.messagesByMatch[msg.matchId] ?? []),
          { ...msg, status: "sending" },
        ],
      },
    }));
  },

  /* =========================
     SERVER CONFIRM
  ========================= */
// Replace message by clientId

replaceMessageByClientId: (matchId, clientId, serverMsg) => {
  set((state) => {
    const before = state.messagesByMatch[matchId] ?? [];
    const after: Message[] = before.map((m) =>
      m.clientId === clientId
        ? {
            ...m,
            ...serverMsg,
            status: serverMsg.seenAt
              ? "seen"
              : serverMsg.deliveredAt
              ? "delivered"
              : "sent",
          }
        : m
    );

    return {
      messagesByMatch: {
        ...state.messagesByMatch,
        [matchId]: after,
      },
    };
  });
},

  /* =========================
     REALTIME RECEIVE
  ========================= */
 addIncomingMessage: (msg) => {
  console.log("🔵 [ChatStore] addIncomingMessage", msg);

  set((state) => {
    const existing = state.messagesByMatch[msg.matchId]?.some(
      (m) =>
        m.id === msg.id ||
        (msg.clientId && m.clientId === msg.clientId)
    );

    if (existing) return state;

    return {
      messagesByMatch: {
        ...state.messagesByMatch,
        [msg.matchId]: [
          ...(state.messagesByMatch[msg.matchId] ?? []),
          { ...msg, status: "delivered" },
        ],
      },
    };
  });
},

  /* =========================
     DELETE
  ========================= */
  markMessageDeleted: (matchId, messageId) => {
    console.log("🗑️ [ChatStore] markMessageDeleted", {
      matchId,
      messageId,
    });

    set((state) => {
      const before = state.messagesByMatch[matchId] ?? [];

      const after: Message[] = before.map((m) =>
        m.id === messageId
          ? {
              ...m,
              content: null,
              deletedAt: new Date().toISOString(),
            }
          : m
      );

      return {
        messagesByMatch: {
          ...state.messagesByMatch,
          [matchId]: after,
        },
      };
    });
  },

  /* =========================
     UNREAD
  ========================= */
  incrementUnread: (matchId) =>
    set((s) => ({
      unreadByMatch: {
        ...s.unreadByMatch,
        [matchId]: (s.unreadByMatch[matchId] ?? 0) + 1,
      },
    })),

  clearUnread: (matchId) =>
    set((s) => {
      const copy = { ...s.unreadByMatch };
      delete copy[matchId];
      return { unreadByMatch: copy };
    }),

 markMessageSeen: (matchId: string, messageId: string) => {
  set((state) => {
    const messages = state.messagesByMatch[matchId] ?? [];

    const updated: Message[] = messages.map((m) =>
      m.id === messageId
        ? {
            ...m,
            status: "seen",
            seenAt: new Date().toISOString(),
          }
        : m
    );

    return {
      messagesByMatch: {
        ...state.messagesByMatch,
        [matchId]: updated,
      },
    } as Partial<ChatState>; // ✅ cast as Partial
  });
},


  /* =========================
     PRESENCE ACTIONS (NEW)
  ========================= */
  setOnlineStatus: (matchId, online) => {
    console.log("🟢 [ChatStore] setOnlineStatus", { matchId, online });

    set((state) => ({
      onlineByMatch: {
        ...state.onlineByMatch,
        [matchId]: online,
      },
    }));
  },

  setLastSeen: (matchId, lastSeen) => {
    console.log("🕒 [ChatStore] setLastSeen", { matchId, lastSeen });

    set((state) => ({
      lastSeenByMatch: {
        ...state.lastSeenByMatch,
        [matchId]: lastSeen,
      },
    }));
  },
}));
