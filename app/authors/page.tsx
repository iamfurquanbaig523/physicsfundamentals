import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { getAuthors } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Authors | Physics Fundamentals",
  description: "Meet the Physics Fundamentals authors, reviewers, educators, and technical contributors.",
};

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <main>
      <PageShell>
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            <span className="tag">Authors</span>
            <h1
              className="mt-5 text-[#1A1B4B] leading-tight"
              style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 800 }}
            >
              People behind<br />
              <span className="text-stroke">the library.</span>
            </h1>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid gap-5 md:grid-cols-2">
              {authors.map((author) => {
                const avatarRaw = author.avatar_url || author.avatar;
                const avatar = avatarRaw && !avatarRaw.startsWith("http") && !avatarRaw.startsWith("/") ? `/${avatarRaw}` : avatarRaw;
                return (
                  <Link
                    key={author.slug}
                    href={`/authors/${author.slug}`}
                    className="group rounded-lg border border-[#E0E5F0] p-5 transition-colors hover:border-[#00B4D8]/45 hover:bg-[#F1F4FB]"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="flex gap-4">
                      <div
                        className="flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{
                          width: 80,
                          height: 80,
                          background: avatar ? "#F1F4FB" : "linear-gradient(135deg, #00B4D820, #00B4D860)",
                          border: "1px solid #00B4D840",
                          overflow: "hidden",
                        }}
                      >
                        {avatar ? (
                          <img
                            src={avatar}
                            alt={author.name}
                            loading="lazy"
                            decoding="async"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ color: "#00B4D8", fontFamily: "var(--font-syne)", fontSize: "1.25rem", fontWeight: 700 }}>
                            {author.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg font-bold text-[#1A1B4B] group-hover:text-[#00B4D8]" style={{ fontFamily: "var(--font-syne)" }}>
                          {author.name}
                        </h2>
                        {author.role && <p className="mt-1 text-xs text-[#6C757D]">{author.role}</p>}
                        {author.bio && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#6C757D]">{author.bio}</p>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </PageShell>
    </main>
  );
}
