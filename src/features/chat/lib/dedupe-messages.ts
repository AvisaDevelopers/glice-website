import type { ChatMessage } from "../types";

export function messageIdentityKey(message: ChatMessage): string {
  if (message.id) return message.id;
  const att = message.attachment?.url || message.attachment?.localPreview || "";
  return `${message.sender}:${message.timestamp.getTime()}:${message.text}:${att}`;
}

/** Keeps chronological order; later entries win when ids collide. */
export function dedupeMessages(messages: ChatMessage[]): ChatMessage[] {
  const order: string[] = [];
  const byKey = new Map<string, ChatMessage>();

  for (const message of messages) {
    const key = messageIdentityKey(message);
    if (!byKey.has(key)) {
      order.push(key);
    }
    byKey.set(key, message);
  }

  return order.map((key) => byKey.get(key)!);
}
