import { create } from "zustand";

interface UnreadState {
  count: number;
  increment: () => void;
  reset: () => void;
  setCount: (n: number) => void;
}

export const useUnreadStore = create<UnreadState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 }),
  setCount: (n) => set({ count: n }),
}));
