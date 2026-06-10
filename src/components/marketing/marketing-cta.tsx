import Link from "next/link";

type MarketingCtaProps = {
  title: string;
  description: string;
};

export function MarketingCta({ title, description }: MarketingCtaProps) {
  return (
    <section className="section">
      <div className="relative mx-auto max-w-4xl">
        <div className="panel reveal relative overflow-hidden p-12 text-center md:p-16">
          <h2 className="display-2 balance mt-5 mb-5">{title}</h2>
          <p className="lede balance mx-auto mb-10 max-w-xl">{description}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.glice.app"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-google-play-fill" />
              <span>Get on Google Play</span>
            </a>
            <Link href="/contact" className="btn-ghost">
              <span>Get in touch</span>
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
