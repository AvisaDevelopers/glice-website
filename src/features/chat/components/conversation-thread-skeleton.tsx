"use client";

import { ChatConversation, ChatConversationContent } from "@/components/chat/conversation";
import { Shimmer } from "@/components/ui/shimmer";

type ConversationThreadSkeletonProps = {
  onBack?: () => void;
};

export function ConversationThreadSkeleton({
  onBack,
}: ConversationThreadSkeletonProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-3 border-b border-[var(--hair)] px-4 py-3">
        {onBack && <Shimmer className="h-9 w-9 shrink-0" rounded="full" />}
        <Shimmer className="h-11 w-11 shrink-0" rounded="full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Shimmer className="h-3.5 w-28" rounded="full" />
          <Shimmer className="h-3 w-20" rounded="full" />
        </div>
      </div>

      <ChatConversation className="flex-1">
        <ChatConversationContent className="chat-conversation-scroll px-4 py-5">
          <Shimmer className="mx-auto mb-6 h-3 w-40" rounded="full" />
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`flex ${i % 2 ? "justify-end" : "justify-start"}`}
              >
                <Shimmer
                  className="h-11"
                  rounded="lg"
                  style={{
                    width: `${36 + (i % 4) * 12}%`,
                    maxWidth: 320,
                    animationDelay: `${i * 90}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        </ChatConversationContent>
      </ChatConversation>

      <div className="chat-composer-bar">
        <Shimmer className="h-12 w-full" rounded="full" />
      </div>
    </div>
  );
}
