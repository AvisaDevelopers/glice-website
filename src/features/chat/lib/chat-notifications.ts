import { useMessageStore } from "../stores/message-store";
import { useNotificationStore } from "../stores/notification-store";
import { useRoomStore } from "../stores/room-store";

type IncomingNotifyParams = {
  roomId: string;
  senderId: string;
  senderName: string;
  preview: string;
  currentUserId?: string;
};

let audioContext: AudioContext | null = null;
let onMessagesRoute = false;
let activeRoomFromUrl = "";

export function setChatNotificationRoute(
  onMessages: boolean,
  roomIdFromUrl = "",
): void {
  onMessagesRoute = onMessages;
  activeRoomFromUrl = roomIdFromUrl;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }
  return audioContext;
}

/** Resume audio context after a user gesture so alerts are not blocked. */
export function primeChatNotificationAudio(): void {
  try {
    const ctx = getAudioContext();
    if (ctx?.state === "suspended") {
      void ctx.resume();
    }
  } catch {
    /* ignore */
  }
}

/** Two-tone "ton ton" alert — works without external assets. */
export function playChatNotificationSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const run = () => {
      const playTone = (frequency: number, startAt: number, duration = 0.14) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(0.22, startAt + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startAt);
        osc.stop(startAt + duration + 0.02);
      };

      const t = ctx.currentTime;
      playTone(880, t);
      playTone(660, t + 0.2);
    };

    if (ctx.state === "suspended") {
      void ctx.resume().then(run);
      return;
    }
    run();
  } catch {
    /* ignore audio failures (autoplay policy, etc.) */
  }
}

export async function requestChatNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const result = await Notification.requestPermission();
  return result === "granted";
}

function shouldNotifyIncoming({
  roomId,
  senderId,
  currentUserId,
}: IncomingNotifyParams): boolean {
  if (currentUserId && senderId === currentUserId) return false;

  const activeRoomId = useMessageStore.getState().activeRoomId;
  const viewingThisRoom =
    onMessagesRoute &&
    activeRoomId === roomId &&
    activeRoomFromUrl === roomId &&
    !document.hidden;

  return !viewingThisRoom;
}

function showBrowserNotification(title: string, body: string, roomId: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  try {
    const notification = new Notification(title, {
      body,
      tag: `glice-chat-${roomId}`,
      icon: "/icons/logo.png",
      badge: "/icons/logo.png",
      silent: true,
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
      if (window.location.pathname.startsWith("/messages")) {
        window.dispatchEvent(
          new CustomEvent("glice-open-chat-room", { detail: { roomId } }),
        );
        return;
      }
      window.location.href = `/messages?room=${encodeURIComponent(roomId)}`;
    };
  } catch {
    /* ignore */
  }
}

function showInAppToast(params: IncomingNotifyParams): void {
  const preview = params.preview.trim() || "Sent you a message";
  useNotificationStore.getState().push({
    roomId: params.roomId,
    senderName: params.senderName || "New message",
    senderAvatar: resolveSenderAvatar(params.roomId, params.senderId),
    preview,
  });
}

export function notifyIncomingMessage(params: IncomingNotifyParams): void {
  if (!shouldNotifyIncoming(params)) return;

  playChatNotificationSound();
  showInAppToast(params);

  const preview = params.preview.trim() || "Sent you a message";
  const title = params.senderName || "New message";
  showBrowserNotification(title, preview, params.roomId);
}

export function buildMessagePreview(
  text: string,
  attachmentType?: string,
): string {
  const trimmed = text.trim();
  if (trimmed) return trimmed;

  switch (attachmentType) {
    case "image":
      return "Sent a photo 📷";
    case "video":
      return "Sent a video 🎥";
    case "audio":
      return "Sent a voice message 🔉";
    default:
      return "Sent you a message";
  }
}

export function resolveSenderName(roomId: string, senderId: string): string {
  const room = useRoomStore.getState().getRoom(roomId);
  if (!room) return "New message";
  if (room.otherUser.uid === senderId) return room.otherUser.name;
  return room.otherUser.name || "New message";
}

export function resolveSenderAvatar(
  roomId: string,
  senderId: string,
): string | undefined {
  const room = useRoomStore.getState().getRoom(roomId);
  if (!room) return undefined;
  if (room.otherUser.uid === senderId) return room.otherUser.profileUrl;
  return room.otherUser.profileUrl;
}
