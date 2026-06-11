"use client";

import { formatRelativeTime } from "@/features/chat/lib/format";
import { useEffect, useState } from "react";

type RelativeTimeProps = {
  date: Date;
  className?: string;
};

function tickIntervalMs(date: Date, now: number): number {
  const ageSec = Math.max(0, (now - date.getTime()) / 1000);
  if (ageSec < 60) return 1_000;
  if (ageSec < 3600) return 30_000;
  return 60_000;
}

export function RelativeTime({ date, className }: RelativeTimeProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const schedule = () => {
      const current = Date.now();
      setNow(current);
      timer = setTimeout(schedule, tickIntervalMs(date, current));
    };

    schedule();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [date]);

  const label =
    now === null ? "\u00a0" : formatRelativeTime(date, now);

  return (
    <time
      dateTime={date.toISOString()}
      className={className}
      suppressHydrationWarning
    >
      {label}
    </time>
  );
}
