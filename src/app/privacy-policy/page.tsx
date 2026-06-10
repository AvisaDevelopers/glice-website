import { LegalDocument } from "@/components/legal/legal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Glice collects, uses, and safeguards your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy."
      description="How we collect, use, and safeguard your information when you use Glice."
      chips={[
        { icon: "ri-time-line", label: "Updated February 17, 2026" },
        { icon: "ri-shield-check-line", label: "12 sections" },
      ]}
      contentFile="privacy-policy.html"
    />
  );
}
