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

  return (
    <>
      <section className="hero px-6 pt-36 pb-12">
        <div className="reveal relative z-10 mx-auto max-w-4xl">
          <h1 className="display-1 balance mt-5 mb-5">{title}</h1>
          <p className="lede balance mb-6 max-w-2xl">{description}</p>
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span key={chip.label} className="chip-meta">
                <i className={chip.icon} />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="doc-shell">
            <article
              className="doc-prose reveal"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
