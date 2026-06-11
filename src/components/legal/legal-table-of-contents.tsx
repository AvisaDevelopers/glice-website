"use client";

import type { LegalSection } from "@/features/legal/lib/extract-legal-sections";
import { useEffect, useState } from "react";

type LegalTableOfContentsProps = {
  sections: LegalSection[];
};

export function LegalTableOfContents({ sections }: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top,
          );

        const nextId = visible[0]?.target.id;
        if (nextId) setActiveId(nextId);
      },
      {
        rootMargin: "-15% 0px -62% 0px",
        threshold: 0,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 2) return null;

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveId(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <nav className="toc toc--desktop" aria-label="On this page">
        <p className="toc-title">On this page</p>
        <ul className="toc-list">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`toc-link${activeId === section.id ? " is-active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(section.id);
                }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="toc toc--mobile" aria-label="On this page">
        <p className="toc-title">On this page</p>
        <ul className="toc-list toc-list--mobile">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`toc-link${activeId === section.id ? " is-active" : ""}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollTo(section.id);
                }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
