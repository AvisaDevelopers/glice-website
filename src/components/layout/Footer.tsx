import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer hairline-t px-6 pt-16 pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="footer-grid mb-12">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <Image
                src="/icons/transparent_icon.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-xl font-bold tracking-tight">Glice</span>
            </Link>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-textMuted">
              Live random video chat and social discovery — built for consent,
              safety, and real connection.
            </p>
            <div className="flex gap-2">
              <a href="#" aria-label="Twitter" className="footer-social">
                <i className="ri-twitter-x-line" />
              </a>
              <a href="#" aria-label="Instagram" className="footer-social">
                <i className="ri-instagram-line" />
              </a>
              <a href="#" aria-label="GitHub" className="footer-social">
                <i className="ri-github-line" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-textMain">Product</h4>
            <Link href="/features" className="footer-link">
              Features
            </Link>
            <Link href="/#downloads" className="footer-link">
              Download
            </Link>
            <Link href="/about" className="footer-link">
              About
            </Link>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-textMain">
              Community
            </h4>
            <Link href="/community-guidelines" className="footer-link">
              Guidelines
            </Link>
            <Link href="/safety-tips" className="footer-link">
              Safety Tips
            </Link>
            <Link href="/safety-child-protection" className="footer-link">
              Child Safety
            </Link>
            <Link href="/contact" className="footer-link">
              Contact
            </Link>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-textMain">Legal</h4>
            <Link href="/privacy-policy" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="footer-link">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>

        <div className="hairline-t flex flex-col items-center justify-between gap-3 pt-6 md:flex-row">
          <p className="text-xs text-textMuted">
            © 2026 Glice. All rights reserved.
          </p>
          <p className="text-xs text-textMuted">Made for real connections.</p>
        </div>
      </div>
    </footer>
  );
}
