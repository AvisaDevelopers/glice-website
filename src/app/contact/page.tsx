import { ContactPageContent } from "@/components/contact/contact-page-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Glice - support, inquiries, and partnership opportunities.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
