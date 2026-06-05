import Link from "next/link";
import type { Author } from "@/lib/cms";
import { SITE_DOMAIN } from "@/lib/site";
import type { NavSeries } from "./Navbar";

const staticFooterLinks = {
  Company: [
    { label: "About Us", href: "/about-us" },
    { label: "Authors", href: "/authors" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact-us" },
    { label: "llms.txt", href: "/llms.txt" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-and-conditions" },
  ],
};

export default function Footer({ series = [], authors = [] }: { series?: NavSeries[]; authors?: Author[] }) {
  const seriesLinks = series.map((s) => ({
    label: s.title,
    href: `/${s.slug}`,
  }));
  const authorLinks = authors.slice(0, 5).map((author) => ({
    label: author.name,
    href: `/authors/${author.slug}`,
  }));

  const footerLinks: Record<string, { label: string; href: string }[]> = {
    Series: seriesLinks.length > 0 ? seriesLinks : [{ label: "All Series", href: "/series" }],
    Authors: authorLinks.length > 0 ? authorLinks : [{ label: "All Authors", href: "/authors" }],
    ...staticFooterLinks,
  };

  return (
    <footer className="border-t border-[#E0E5F0]" style={{ background: "var(--card)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 relative flex items-center justify-center rounded-lg bg-[#1A1B4B]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00B4D8" strokeWidth="1.4"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00B4D8" strokeWidth="1.4" transform="rotate(60 12 12)"/>
                  <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00B4D8" strokeWidth="1.4" transform="rotate(-60 12 12)"/>
                  <circle cx="12" cy="12" r="1.8" fill="#00B4D8"/>
                </svg>
              </div>
              <span className="font-bold text-[#1A1B4B]" style={{ fontFamily: "var(--font-syne)" }}>
                Physics<span className="text-[#00B4D8]">Fundamentals</span>
              </span>
            </Link>

            <p className="text-xs text-[#6C757D] leading-relaxed max-w-[220px]" style={{ fontFamily: "var(--font-dm-sans)" }}>
              The cleanest place to learn how the universe actually works.
              Free forever, with no paywalls.
            </p>

            <div className="flex items-center gap-3 mt-5">
              {["X", "in", "o"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg border border-[#E0E5F0] bg-white flex items-center justify-center text-xs text-[#6C757D] hover:text-[#1A1B4B] hover:border-[#00B4D8] transition-all duration-200"
                  aria-label={`Social link ${i + 1}`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="contents">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="text-xs font-semibold text-[#1A1B4B] tracking-widest uppercase mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="text-xs text-[#4A5068] hover:text-[#00B4D8] transition-colors duration-200" style={{ fontFamily: "var(--font-dm-sans)" }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-[#E0E5F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6C757D]" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Copyright 2026 {SITE_DOMAIN} · All rights reserved.
          </p>
          <p className="text-xs text-[#6C757D]" style={{ fontFamily: "var(--font-dm-mono)" }}>
            Built for learners. Powered by curiosity.
          </p>
        </div>
      </div>
    </footer>
  );
}
