import { ChatShell } from "@/features/chat/components/chat-shell";
import { Shimmer } from "@/components/ui/shimmer";
import { Suspense } from "react";

export const metadata = {
  title: "Messages",
};

function ChatFallback() {
  return (
    <div className="chat-layout">
      <aside className="chat-sidebar">
        <div className="chat-sidebar-skeleton p-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="chat-sidebar-skeleton-row"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Shimmer
                className="chat-sidebar-skeleton-avatar"
                rounded="full"
                style={{ animationDelay: `${i * 70}ms` }}
              />
              <div className="chat-sidebar-skeleton-lines">
                <Shimmer
                  className="chat-sidebar-skeleton-line chat-sidebar-skeleton-line--wide"
                  rounded="full"
                  style={{ animationDelay: `${i * 70 + 40}ms` }}
                />
                <Shimmer
                  className="chat-sidebar-skeleton-line"
                  rounded="full"
                  style={{ animationDelay: `${i * 70 + 80}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="chat-main hidden md:flex" />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<ChatFallback />}>
      <ChatShell />
    </Suspense>
  );
}
