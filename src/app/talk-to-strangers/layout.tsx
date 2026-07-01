import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "%s",
    template: "%s",
  },
};

export default function TalkToStrangersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
