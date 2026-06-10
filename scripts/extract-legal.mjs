import fs from "node:fs";
import path from "node:path";

const files = [
  "privacy-policy",
  "terms-and-conditions",
  "community-guidelines",
  "safety-tips",
  "safety-child-protection",
];

const outDir = path.join(process.cwd(), "src/content/legal");
fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  const html = fs.readFileSync(
    path.join(process.cwd(), "..", "Glice-Web", `${file}.html`),
    "utf8",
  );
  const match = html.match(
    /<article class="doc-prose[^"]*"[^>]*>([\s\S]*?)<\/article>/,
  );

  if (!match) {
    console.error(`Missing article in ${file}`);
    continue;
  }

  const content = match[1]
    .trim()
    .replace(/href="([a-z-]+)\.html"/g, 'href="/$1"');
  fs.writeFileSync(path.join(outDir, `${file}.html`), content);
  console.log(`Extracted ${file}`);
}
