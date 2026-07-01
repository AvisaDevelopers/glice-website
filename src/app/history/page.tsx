import { CallHistoryView } from "@/components/video/call-history-view";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { History } from "lucide-react";

export const metadata = buildPageMetadata({
  title: "Call History",
  description: "Your recent random and spark video calls on Glice.",
  path: "/history",
  noindex: true,
});

export default function CallHistoryPage() {
  return (
    <main className="call-history-page">
      <div className="call-history-page-inner">
        <header className="call-history-page-head">
          <span className="call-history-page-eyebrow">
            <History className="h-4 w-4" aria-hidden />
            Video calls
          </span>
          <h1>Call history</h1>
          <p>
            Everyone you have matched with on random and spark video — profiles,
            duration, distance, and likes in one place.
          </p>
        </header>

        <CallHistoryView layout="page" />
      </div>
    </main>
  );
}
