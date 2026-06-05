"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export type NavSeries = {
  title: string;
  slug: string;
  icon?: string;
  header_nav_order?: number;
  mobile_nav_order?: number;
};

// Blog is always shown as the last static link
const blogLink = {
  label: "Blog",
  href: "/blog",
  iconHtml: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
};

// Fallback icon for series that don't have one set in the DB — atom orbit
const fallbackSeriesIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-60 12 12)"/></svg>';

function buildNavLinks(series: NavSeries[]) {
  const seriesLinks = series.map((s) => ({
    label: s.title,
    href: `/${s.slug}`,
    iconHtml: s.icon || fallbackSeriesIcon,
  }));
  return [...seriesLinks, blogLink];
}

export default function Navbar({ series = [] }: { series?: NavSeries[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = buildNavLinks(series);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ${
        scrolled || menuOpen ? "shadow-[0_16px_44px_rgba(0,0,0,0.22)]" : ""
      }`}
      style={{
        background: scrolled || menuOpen ? "rgba(3, 0, 20, 0.88)" : "rgba(3, 0, 20, 0.42)",
        borderColor: scrolled || menuOpen ? "rgba(103, 232, 249, 0.22)" : "rgba(148, 163, 184, 0.10)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 relative flex items-center justify-center rounded border border-[#67E8F9]/35 bg-[#07111F] shadow-[0_0_24px_rgba(6,182,212,0.18)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00B4D8" strokeWidth="1.4"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00B4D8" strokeWidth="1.4" transform="rotate(60 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#00B4D8" strokeWidth="1.4" transform="rotate(-60 12 12)"/>
              <circle cx="12" cy="12" r="1.8" fill="#00B4D8"/>
            </svg>
          </div>
          <div className="leading-none">
            <span className="text-sm font-bold tracking-tight text-[#F8FBFF] block" style={{ fontFamily: "var(--font-syne)" }}>
              Physics<span className="text-[#67E8F9]">Fundamentals</span>
            </span>
            <span className="hidden sm:inline text-[10px] font-medium text-[#AEBAD0] mt-0.5 tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
              learn the universe
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/blog" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-colors duration-200 ${
                  isActive ? "text-[#67E8F9]" : "text-[#C8D5EA] hover:text-[#FFFFFF]"
                }`}
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                <span
                  className="flex items-center [&>svg]:w-[15px] [&>svg]:h-[15px]"
                  dangerouslySetInnerHTML={{ __html: link.iconHtml }}
                />
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <form
            onSubmit={handleSearch}
            className={`relative flex items-center justify-end transition-all duration-300 overflow-hidden rounded-full ${
              searchOpen ? "w-56 bg-[#07111F]/90 border border-[#67E8F9]/30 shadow-[0_0_24px_rgba(6,182,212,0.12)]" : "w-9 bg-transparent border border-transparent"
            }`}
          >
            <input
              type="text"
              placeholder="Search physics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
              className={`w-full h-9 bg-transparent text-sm text-[#F8FBFF] placeholder-[#AEBAD0] pl-10 pr-4 focus:outline-none transition-opacity duration-300 ${
                searchOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <button
              type={searchOpen ? "submit" : "button"}
              onClick={() => { if (!searchOpen) setSearchOpen(true); }}
              className="absolute left-0 w-9 h-9 flex items-center justify-center text-[#AEBAD0] hover:text-[#67E8F9] transition-colors"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <Link href="/#main-guide" className="btn-lime physics-hero__button whitespace-nowrap">
            Start Learning {"->"}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-1">
          <form
            onSubmit={handleSearch}
            className={`relative flex items-center justify-end transition-all duration-300 overflow-hidden rounded-full ${
              searchOpen ? "w-44 bg-[#07111F]/90 border border-[#67E8F9]/30 shadow-[0_0_24px_rgba(6,182,212,0.12)]" : "w-9 bg-transparent border border-transparent"
            }`}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
              className={`w-full h-9 bg-transparent text-sm text-[#F8FBFF] placeholder-[#AEBAD0] pl-9 pr-3 focus:outline-none transition-opacity duration-300 ${
                searchOpen ? "opacity-100" : "opacity-0"
              }`}
            />
            <button
              type={searchOpen ? "submit" : "button"}
              onClick={() => { if (!searchOpen) setSearchOpen(true); }}
              className="absolute left-0 w-9 h-9 flex items-center justify-center text-[#AEBAD0] hover:text-[#67E8F9] transition-colors"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`block w-5 h-0.5 bg-[#F8FBFF] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#F8FBFF] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-[#F8FBFF] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden border-t border-[#67E8F9]/20 bg-[#030014]/95 backdrop-blur-xl transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/blog" && pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 text-sm transition-colors ${
                  isActive ? "text-[#67E8F9]" : "text-[#C8D5EA] hover:text-[#FFFFFF]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/#main-guide" className="btn-lime physics-hero__button text-center mt-2" onClick={() => setMenuOpen(false)}>
            Start Learning {"->"}
          </Link>
        </div>
      </div>
    </header>
  );
}
