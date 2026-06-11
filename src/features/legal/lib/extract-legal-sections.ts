export type LegalSection = {
  id: string;
  title: string;
};

/** Parses `<section id="…"><h2>…title</h2>` blocks from legal HTML fragments. */
export function extractLegalSections(html: string): LegalSection[] {
  const sections: LegalSection[] = [];
  const pattern =
    /<section\s+id="([^"]+)"[^>]*>[\s\S]*?<h2>(?:[\s\S]*?<\/span>\s*)?([^<]+?)<\/h2>/gi;

  let match = pattern.exec(html);
  while (match) {
    const title = match[2].replace(/\s+/g, " ").trim();
    if (title) {
      sections.push({ id: match[1], title });
    }
    match = pattern.exec(html);
  }

  return sections;
}
