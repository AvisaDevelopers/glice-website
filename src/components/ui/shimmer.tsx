import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type ShimmerProps = {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full" | "none";
  style?: CSSProperties;
};

const roundedMap = {
  none: "",
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-2xl",
  full: "rounded-full",
} as const;

export function Shimmer({
  className,
  rounded = "md",
  style,
}: ShimmerProps) {
  return (
    <div
      className={cn("chat-shimmer", roundedMap[rounded], className)}
      style={style}
      aria-hidden
    />
  );
}
