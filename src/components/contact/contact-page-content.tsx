"use client";

import Link from "next/link";
import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "How does random live video chat work on Glice?",
    answer:
      "You can start a live random video session directly from the app and get connected to another available user in real time. After each session, you can choose Like, Super Like, or Skip. The flow is built for quick discovery without swipe-heavy interaction.",
  },
  {
    question: "When does chat become available between two users?",
    answer:
      "Chat unlocks only after a mutual match. That means both users must show interest before messaging is enabled. This consent-first model helps reduce spam and unwanted outreach.",
  },
  {
    question: "What is the difference between Like, Super Like, and Skip?",
    answer:
      "Like indicates interest after a call or profile interaction. Super Like is a stronger signal that highlights higher interest. Skip simply moves you forward without opening any connection with that user.",
  },
  {
    question: "How does Nearby discovery use location data?",
    answer: (
      <>
        Nearby uses in-app location data to show users around your selected area. The
        feature is designed to support local discovery while keeping location
        handling controlled within the app experience. For full details, review our{" "}
        <Link href="/privacy-policy" className="link-accent underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
  {
    question: "How do I report or block a user?",
    answer:
      "Open the user profile or chat actions and use the block/report options. Reports are reviewed by our moderation workflow, and confirmed violations can lead to restrictions or account removal. If there is immediate risk, contact local authorities first.",
  },
  {
    question: "Can I delete my account and personal data?",
    answer:
      "Yes. You can request account deletion from app settings or by contacting support. Once processed, access is removed and data handling follows our legal and privacy retention requirements.",
  },
];

export function ContactPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowSuccess(true);
    event.currentTarget.reset();
    window.setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      <section className="hero px-6 pt-36 pb-12 text-center">
        <div className="reveal relative z-10 mx-auto max-w-3xl">
          <h1 className="display-1 balance mt-5 mb-6">Get in touch.</h1>
          <p className="lede balance mx-auto max-w-xl">
            Questions, feedback, or partnership ideas? Reach out and we&apos;ll get
            back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="section pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            <div className="reveal space-y-4">
              <a href="mailto:support@glicelabs.com" className="contact-card">
                <div className="icon">
                  <i className="ri-mail-line" />
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-[0.2em] text-textMuted uppercase">
                    Email
                  </p>
                  <p className="mb-1 font-semibold text-textMain">
                    support@glicelabs.com
                  </p>
                  <p className="text-sm text-textMuted">
                    For general inquiries and support.
                  </p>
                </div>
              </a>
              <div className="contact-card">
                <div className="icon">
                  <i className="ri-building-line" />
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-[0.2em] text-textMuted uppercase">
                    Office
                  </p>
                  <p className="mb-1 font-semibold text-textMain">
                    Glice Headquarters
                  </p>
                  <p className="text-sm text-textMuted">
                    321-323 High Road, Romford, UK
                  </p>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-[0.2em] text-textMuted uppercase">
                    Social
                  </p>
                  <p className="mb-1 font-semibold text-textMain">
                    Follow us for updates
                  </p>
                  <div className="mt-2 flex gap-3 text-sm">
                    <a href="#" className="link-accent">
                      Twitter
                    </a>
                    <span className="text-textMuted">•</span>
                    <a href="#" className="link-accent">
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-card">
                <div className="icon">
                  <i className="ri-shield-check-line" />
                </div>
                <div>
                  <p className="mb-1 text-xs tracking-[0.2em] text-textMuted uppercase">
                    Safety
                  </p>
                  <p className="mb-1 font-semibold text-textMain">
                    Child safety reports
                  </p>
                  <a
                    href="mailto:childsafety@glice.app"
                    className="link-accent text-sm"
                  >
                    childsafety@glice.app
                  </a>
                </div>
              </div>
            </div>

            <div className="panel reveal p-8 md:p-10">
              <h2 className="display-3 balance mb-2">Send us a message</h2>
              <p className="mb-8 text-sm text-textMuted">
                We typically respond within 24–48 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="field">
                    <input type="text" name="firstName" required placeholder=" " />
                    <label>First name *</label>
                  </div>
                  <div className="field">
                    <input type="text" name="lastName" required placeholder=" " />
                    <label>Last name *</label>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="field">
                    <input type="email" name="email" required placeholder=" " />
                    <label>Email *</label>
                  </div>
                  <div className="field">
                    <input type="tel" name="phone" placeholder=" " />
                    <label>Phone</label>
                  </div>
                </div>

                <div className="field has-value">
                  <select name="subject" required defaultValue="">
                    <option value="">Select a subject…</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback &amp; Suggestions</option>
                    <option value="report">Report an Issue</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="safety">Safety Concern</option>
                    <option value="media">Media &amp; Press Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                  <label>Subject *</label>
                </div>

                <div className="field">
                  <textarea name="message" rows={6} required placeholder=" " />
                  <label>Message *</label>
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-textMuted">
                  <input
                    type="checkbox"
                    name="privacy"
                    required
                    className="accent-primary mt-1 h-4 w-4 cursor-pointer"
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      href="/privacy-policy"
                      className="link-accent underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="link-accent underline underline-offset-2"
                    >
                      Terms &amp; Conditions
                    </Link>
                    .
                  </span>
                </label>

                <button type="submit" className="btn-primary">
                  <span>Send message</span>
                  <i className="ri-send-plane-2-line" />
                </button>
              </form>

              {showSuccess && (
                <div
                  className="mt-6 flex items-center gap-3 rounded-xl p-4"
                  style={{
                    background: "rgba(50,230,161,0.08)",
                    border: "1px solid rgba(50,230,161,0.35)",
                  }}
                >
                  <i className="ri-checkbox-circle-line text-xl text-textMuted" />
                  <p className="text-sm text-textMain">
                    Your message has been sent successfully. We&apos;ll get back to
                    you soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="mx-auto max-w-3xl">
          <div className="reveal mb-10 text-center">
            <h2 className="display-2 balance mt-4">
              Frequently asked questions.
            </h2>
          </div>

          <div className="reveal space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={item.question}
                  className={`faq-item${isOpen ? " is-open" : ""}`}
                >
                  <button
                    className="faq-trigger"
                    type="button"
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
    </>
  );
}
