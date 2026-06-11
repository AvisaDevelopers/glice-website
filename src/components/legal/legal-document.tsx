import { LegalTableOfContents } from "@/components/legal/legal-table-of-contents";
import { extractLegalSections } from "@/features/legal/lib/extract-legal-sections";
import fs from "node:fs";
import path from "node:path";

type LegalChip = {
  icon: string;
  label: string;
};

type LegalDocumentProps = {
  title: string;
  description: string;
  chips: LegalChip[];
  contentFile: string;
};

export function LegalDocument({
  title,
  description,
  chips,
  contentFile,
}: LegalDocumentProps) {
  const html = fs.readFileSync(
    path.join(process.cwd(), "src/content/legal", contentFile),
    "utf8",
  );
  const sections = extractLegalSections(html);

  return (
    <>
      <section className="hero px-6 pt-36 pb-12">
        <div className="page-container">
          <div className="doc-shell">
            <header className="doc-prose reveal relative z-10">
              <h1 className="display-1 balance mt-5 mb-5">{title}</h1>
              <p className="lede balance mb-6">{description}</p>
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span key={chip.label} className="chip-meta">
                    <i className={chip.icon} />
                    {chip.label}
                  </span>
                ))}
              </div>
            </header>
          </div>
        </div>
      </section>

      <section className="section pt-8 pb-16">
        <div className="page-container">
          <div className="doc-shell">
            <article
              className="doc-prose reveal"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <LegalTableOfContents sections={sections} />
          </div>
        </div>
      </section>
    </>
  );
}
