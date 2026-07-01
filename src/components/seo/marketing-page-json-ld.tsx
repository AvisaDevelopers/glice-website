import { JsonLd } from "@/components/seo/json-ld";
import { formatBrandedPageTitle } from "@/lib/seo/build-metadata";
import { buildMarketingPageSchemas } from "@/lib/seo/structured-data";

type MarketingPageJsonLdProps = {
  path: string;
  title: string;
  description: string;
  pageName: string;
};

export function MarketingPageJsonLd({
  path,
  title,
  description,
  pageName,
}: MarketingPageJsonLdProps) {
  const brandedTitle = formatBrandedPageTitle(title);

  return (
    <JsonLd
      data={buildMarketingPageSchemas(
        path,
        brandedTitle,
        description,
        pageName,
      )}
    />
  );
}
