import { LegalDocument } from "@/components/legal/legal-document";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Glice terms and conditions for using the website and mobile app.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions."
      description="The rules and guidelines for using Glice services."
      chips={[
        { icon: "ri-time-line", label: "Updated February 17, 2026" },
        { icon: "ri-file-list-3-line", label: "Legal agreement" },
      ]}
      contentFile="terms-and-conditions.html"
    />
  );
}
