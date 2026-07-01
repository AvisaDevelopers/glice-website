import { buildPageMetadata } from "@/lib/seo/build-metadata";

export const metadata = buildPageMetadata({
  title: "Onboarding",
  description: "Complete your Glice profile setup.",
  path: "/onboarding",
  noindex: true,
});

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
