import PageShell from "@/components/PageShell";
import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import { getBlogSummaries } from "@/lib/cms";

export default async function BlogPage() {
  const allPosts = await getBlogSummaries();
  const categories = ["All", ...Array.from(new Set(allPosts.map((post) => post.tag))).filter(Boolean)];

  return (
    <main>
      <PageShell>

      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: "40%",
            width: "500px",
            height: "300px",
            background: "radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <span className="tag">All Articles</span>
          <h1
            className="mt-5 text-[#1A1B4B]"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
            }}
          >
            THE<br />
            <span className="text-stroke">KNOWLEDGE</span><br />
            BASE.
          </h1>
          <p
            className="mt-5 text-[#6C757D] max-w-md text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Every article in one place. Structured guides covering motion,
            fields, thermodynamics, relativity, quantum theory, and everything in
            between.
          </p>
        </div>
      </section>

      <div
        className="border-y border-[#67E8F9]/20 sticky top-16 z-40"
        style={{
          background: "rgba(3, 0, 20, 0.78)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow: "0 16px 42px rgba(0,0,0,0.18), inset 0 1px 0 rgba(103,232,249,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`whitespace-nowrap px-4 py-1.5 text-xs transition-all duration-200 ${
                i === 0
                  ? "border border-[#67E8F9]/60 bg-[#06B6D4]/18 text-[#E9FEFF] shadow-[0_0_20px_rgba(6,182,212,0.22)] font-bold"
                  : "border border-[#67E8F9]/20 bg-[#07111F]/55 text-[#AEBAD0] hover:text-[#F8FBFF] hover:border-[#67E8F9]/55 hover:bg-[#0D1A33]"
              }`}
              style={{ borderRadius: 4, fontFamily: "var(--font-syne)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.href}
                className="card-hover group overflow-hidden rounded-2xl border border-[#E0E5F0] flex flex-col justify-between"
                style={{ background: "var(--card)", minHeight: "280px" }}
              >
                {post.image && (
                  <div className="aspect-[16/8] overflow-hidden border-b border-[#E0E5F0] bg-[#F1F4FB]">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{
                        background: `${post.accent}15`,
                        border: `1px solid ${post.accent}30`,
                        color: post.accent,
                        fontFamily: "var(--font-dm-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "2px 8px",
                        borderRadius: "3px",
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs text-[#6C757D]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <ArticlePeekCard
                    title={post.title}
                    excerpt={post.excerpt}
                    attributes={post.attributes}
                    previewHeadings={post.previewHeadings}
                    titleClassName="text-base font-bold text-[#1A1B4B] leading-snug group-hover:text-[#00B4D8] transition-colors duration-300"
                    excerptClassName="mt-2 text-xs text-[#6C757D] leading-relaxed line-clamp-3"
                    titleTag="h2"
                  />
                </div>
                <div className="flex items-center justify-between mt-0 p-6 pt-4 border-t border-[#E0E5F0]">
                  <span className="text-xs text-[#6C757D]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    {post.date}
                  </span>
                  <span
                    className="text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200"
                    style={{ color: post.accent, fontFamily: "var(--font-syne)" }}
                  >
                    Read {"->"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      </PageShell>
    </main>
  );
}
