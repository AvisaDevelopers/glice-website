import { create } from "zustand";

export type ChatToast = {
  id: string;
  roomId: string;
  senderName: string;
  senderAvatar?: string;
  preview: string;
  createdAt: number;
};

type NotificationStore = {
  toasts: ChatToast[];
  push: (toast: Omit<ChatToast, "id" | "createdAt">) => void;
  dismiss: (id: string) => void;
  clear: () => void;
};

const AUTO_DISMISS_MS = 1500;
const dismissTimers = new Map<string, ReturnType<typeof setTimeout>>();

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  toasts: [],

  push: (toast) => {
    const id = crypto.randomUUID();
    const entry: ChatToast = {
      ...toast,
      id,
      createdAt: Date.now(),
    };

    for (const existing of get().toasts) {
      const timer = dismissTimers.get(existing.id);
      if (timer) clearTimeout(timer);
      dismissTimers.delete(existing.id);
    }

    set({ toasts: [entry] });

    dismissTimers.set(
      id,
      setTimeout(() => {
        dismissTimers.delete(id);
        get().dismiss(id);
      }, AUTO_DISMISS_MS),
    );
  },

  dismiss: (id) => {
    const timer = dismissTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      dismissTimers.delete(id);
    }
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clear: () => {
    dismissTimers.forEach((timer) => clearTimeout(timer));
    dismissTimers.clear();
    set({ toasts: [] });
  },
}));

export const CHAT_TOAST_DURATION_MS = AUTO_DISMISS_MS;
