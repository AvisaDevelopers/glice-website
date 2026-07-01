"use client";

import { useState } from "react";
import type { SeoFaqItem } from "@/content/seo/types";

type SeoFaqSectionProps = {
  items: SeoFaqItem[];
  variant?: "dark" | "light";
};

export function SeoFaqSection({ items, variant = "dark" }: SeoFaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const isLight = variant === "light";

  return (
    <section className="section pt-0">
      <div className="page-container">
        <div className="reveal mb-10 text-center">
          <h2
            className={`display-2 balance mt-4${isLight ? " text-neutral-900" : ""}`}
          >
            Frequently asked questions.
          </h2>
        </div>

        <div className="reveal mx-auto max-w-3xl space-y-3">
          {items.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={item.question}
                className={`faq-item${isOpen ? " is-open" : ""}${
                  isLight ? " seo-faq-item--light" : ""
                }`}
              >
                <button
                  className="faq-trigger"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="plus">
                    <i className="ri-add-line" />
                  </span>
                </button>
                <div
                  className="faq-content"
                  style={{ maxHeight: isOpen ? "500px" : "0px" }}
                >
                  <div>{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
