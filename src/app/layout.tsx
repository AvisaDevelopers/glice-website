import { SiteChrome } from "@/components/layout/site-chrome";
import { JsonLd } from "@/components/seo/json-ld";
import { getServerSessionUser } from "@/features/auth/lib/get-server-session";
import { buildRootMetadataDefaults } from "@/lib/seo/build-metadata";
import { buildHomeSchemas } from "@/lib/seo/structured-data";
import { Providers } from "@/providers";
import "./globals.css";

export const metadata = buildRootMetadataDefaults();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialUser = await getServerSessionUser();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={buildHomeSchemas()} />
        <Providers initialUser={initialUser}>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
