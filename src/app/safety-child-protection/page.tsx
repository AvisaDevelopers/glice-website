import { LegalDocument } from "@/components/legal/legal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Safety",
  description: "Glice child safety and protection policies.",
};

export default function ChildSafetyPage() {
  return (
    <LegalDocument
      title="Child Safety."
      description="How Glice protects minors and responds to child safety concerns."
      chips={[
        { icon: "ri-shield-user-line", label: "Child protection" },
        { icon: "ri-alarm-warning-line", label: "Zero tolerance" },
      ]}
      contentFile="safety-child-protection.html"
    />
  );
}
