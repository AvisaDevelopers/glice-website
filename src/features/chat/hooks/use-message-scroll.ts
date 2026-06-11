"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMessageStore } from "../stores/message-store";
import type { ChatMessage } from "../types";

const NEAR_BOTTOM_THRESHOLD = 120;
const PROGRAMMATIC_SCROLL_GUARD_MS = 200;

type UseMessageScrollOptions = {
  roomId: string;
  messages: ChatMessage[];
  userId?: string;
  typing?: boolean;
  isLoading?: boolean;
};

export function useMessageScroll({
  roomId,
  messages,
  userId,
  typing = false,
  isLoading = false,
}: UseMessageScrollOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevLengthRef = useRef(0);
  const prevScrollHeightRef = useRef(0);
  const scrollEventRef = useRef(useMessageStore.getState().scrollEvent);
  const stickToBottomRef = useRef(true);
  const initialScrollDoneRef = useRef(false);
  const resizeHeightRef = useRef(0);
  const scrollRafRef = useRef<number | null>(null);
  const lastProgrammaticScrollRef = useRef(0);

  const messageCount = messages.length;
  const lastSender = messages[messageCount - 1]?.sender;

  const isNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    return (
      el.scrollHeight - el.scrollTop - el.clientHeight < NEAR_BOTTOM_THRESHOLD
    );
  }, []);

  const scrollToEnd = useCallback((behavior: ScrollBehavior = "auto") => {
    const el = scrollRef.current;
    if (!el) return;

    if (scrollRafRef.current !== null) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = null;
      el.scrollTo({ top: el.scrollHeight, behavior });
      resizeHeightRef.current = el.scrollHeight;
      lastProgrammaticScrollRef.current = Date.now();
    });
  }, []);

  useEffect(() => {
    const unsub = useMessageStore.subscribe((state) => {
      if (state.activeRoomId === roomId) {
        scrollEventRef.current = state.scrollEvent;
      }
    });
    return unsub;
  }, [roomId]);

  useEffect(() => {
    stickToBottomRef.current = true;
    prevLengthRef.current = 0;
    prevScrollHeightRef.current = 0;
    resizeHeightRef.current = 0;
    initialScrollDoneRef.current = false;
    lastProgrammaticScrollRef.current = 0;
  }, [roomId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      stickToBottomRef.current = isNearBottom();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [roomId, isNearBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (!stickToBottomRef.current) return;
      if (
        Date.now() - lastProgrammaticScrollRef.current <
        PROGRAMMATIC_SCROLL_GUARD_MS
      ) {
        return;
      }
      const nextHeight = el.scrollHeight;
      if (nextHeight <= resizeHeightRef.current + 1) return;
      resizeHeightRef.current = nextHeight;
      scrollToEnd("auto");
    });

    resizeHeightRef.current = el.scrollHeight;
    ro.observe(el);
    return () => ro.disconnect();
  }, [roomId, scrollToEnd]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollEvent = scrollEventRef.current;
    const prevLen = prevLengthRef.current;
    const newLen = messageCount;
    const grew = newLen > prevLen;
    const prepended = grew && scrollEvent === "none" && prevLen > 0;

    if (prepended && prevScrollHeightRef.current > 0) {
      const delta = el.scrollHeight - prevScrollHeightRef.current;
      el.scrollTop += delta;
      resizeHeightRef.current = el.scrollHeight;
    } else if (grew) {
      const ownMessage = lastSender === userId;
      const nearBottom = isNearBottom();

      if (
        scrollEvent === "jump" &&
        (!initialScrollDoneRef.current || stickToBottomRef.current)
      ) {
        stickToBottomRef.current = true;
        scrollToEnd("auto");
        initialScrollDoneRef.current = true;
      } else if (scrollEvent === "animate" && (nearBottom || ownMessage)) {
        stickToBottomRef.current = true;
        scrollToEnd("auto");
      } else if (
        prevLen === 0 &&
        newLen > 0 &&
        !initialScrollDoneRef.current &&
        scrollEvent !== "jump"
      ) {
        stickToBottomRef.current = true;
        scrollToEnd("auto");
        initialScrollDoneRef.current = true;
      }
    }

    prevLengthRef.current = newLen;
    prevScrollHeightRef.current = el.scrollHeight;

    if (scrollEvent !== "none") {
      useMessageStore.getState().clearScrollEvent();
    }
  }, [messageCount, lastSender, userId, isNearBottom, scrollToEnd]);

  useEffect(() => {
    if (!typing || isLoading) return;
    if (stickToBottomRef.current || isNearBottom()) {
      scrollToEnd("auto");
    }
  }, [typing, isLoading, isNearBottom, scrollToEnd]);

  useEffect(() => {
    return () => {
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  const beforeLoadMore = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      prevScrollHeightRef.current = el.scrollHeight;
      stickToBottomRef.current = false;
    }
  }, []);

  return {
    scrollRef,
    isNearBottom,
    scrollToBottom: scrollToEnd,
    beforeLoadMore,
  };
}
