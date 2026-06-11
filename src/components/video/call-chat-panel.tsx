"use client";

import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  from: "you" | "partner";
  text: string;
  time: string;
};

const PARTNER_GREETINGS = [
  "Hey! Nice to meet you 👋",
  "Hi there! How's your day going?",
  "Hello! Glad we matched nearby.",
];

const PARTNER_REPLIES = [
  "Haha same here!",
  "That's cool!",
  "Tell me more 😄",
  "Nice!",
  "Where are you from?",
];

function nowLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

type CallChatPanelProps = {
  partnerName: string;
  active: boolean;
};

export function CallChatPanel({ partnerName, active }: CallChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [expanded, setExpanded] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef<string | null>(null);

  useEffect(() => {
    if (!active) {
      seededRef.current = null;
      setMessages([]);
      setDraft("");
      setExpanded(true);
      return;
    }

    if (seededRef.current === partnerName) return;
    seededRef.current = partnerName;

    const greeting =
      PARTNER_GREETINGS[Math.floor(Math.random() * PARTNER_GREETINGS.length)] ??
      "Hey!";

    setMessages([
      {
        id: `greet-${partnerName}`,
        from: "partner",
        text: greeting,
        time: nowLabel(),
      },
    ]);
    setExpanded(true);
  }, [active, partnerName]);

  useEffect(() => {
    if (!expanded || !listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, expanded]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !active) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `you-${Date.now()}`,
        from: "you",
        text,
        time: nowLabel(),
      },
    ]);
    setDraft("");
    setExpanded(true);

    window.setTimeout(() => {
      const reply =
        PARTNER_REPLIES[Math.floor(Math.random() * PARTNER_REPLIES.length)] ??
        "Nice!";
      setMessages((prev) => [
        ...prev,
        {
          id: `partner-${Date.now()}`,
          from: "partner",
          text: reply,
          time: nowLabel(),
        },
      ]);
    }, 900 + Math.random() * 800);
  };

  if (!active) return null;

  const lastMessage = messages[messages.length - 1];

  return (
    <div
      className={`hero-chat-dock${expanded ? " hero-chat-dock--expanded" : ""}`}
      aria-label={`Chat with ${partnerName}`}
    >
      <div className="hero-chat-scrim" aria-hidden />

      {!expanded ? (
        <button
          type="button"
          className="hero-chat-pill"
          onClick={() => setExpanded(true)}
          aria-expanded={false}
        >
          <i className="ri-chat-3-fill" aria-hidden />
          <span className="hero-chat-pill-text">
            {lastMessage
              ? `${lastMessage.from === "you" ? "You" : partnerName}: ${lastMessage.text}`
              : `Chat with ${partnerName}`}
          </span>
          <span className="hero-chat-pill-count">{messages.length}</span>
        </button>
      ) : (
        <div className="hero-chat-float">
          <div className="hero-chat-float-head">
            <div className="hero-chat-float-title">
              <i className="ri-chat-smile-3-line" aria-hidden />
              <span>{partnerName}</span>
            </div>
            <button
              type="button"
              className="hero-chat-float-min"
              onClick={() => setExpanded(false)}
              aria-label="Minimize chat"
            >
              <i className="ri-subtract-line" aria-hidden />
            </button>
          </div>

          <div className="hero-chat-float-messages" ref={listRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`hero-chat-float-bubble hero-chat-float-bubble--${message.from}`}
              >
                <span className="hero-chat-float-bubble-text">
                  {message.text}
                </span>
                <time>{message.time}</time>
              </div>
            ))}
          </div>

          <form
            className="hero-chat-float-input"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Say something…"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={280}
              aria-label="Message"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send"
            >
              <i className="ri-send-plane-2-fill" aria-hidden />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
