import { LegalDocument } from "@/components/legal/legal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines",
  description: "Community standards for respectful behavior on Glice.",
};

export default function CommunityGuidelinesPage() {
  return (
    <LegalDocument
      title="Community Guidelines."
      description="How we keep Glice respectful, safe, and consent-first for everyone."
      chips={[
        { icon: "ri-group-line", label: "Community standards" },
        { icon: "ri-shield-check-line", label: "Safety first" },
      ]}
      contentFile="community-guidelines.html"
    />
  );
}
