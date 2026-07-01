import { OmeglePage } from "@/components/omegle/omegle-page";
import { JsonLd } from "@/components/seo/json-ld";
import { seoMetadata } from "@/content/seo/metadata";
import { omeglePageSeoContent } from "@/content/seo/omegle-page-content";
import { omeglePage } from "@/content/seo/pages";
import { buildSeoLandingSchemas } from "@/lib/seo/structured-data";

export const metadata = seoMetadata(omeglePage);

const omegleSchemas = buildSeoLandingSchemas({
  ...omeglePage,
  faq: omeglePageSeoContent.faq,
});

export default function OmeglePageRoute() {
  return (
    <>
      <JsonLd data={omegleSchemas} />
      <OmeglePage />
    </>
  );
}
