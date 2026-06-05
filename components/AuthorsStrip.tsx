import Link from "next/link";
import type { Author } from "@/lib/cms";

function avatarFor(author: Author) {
  const url = author.avatar_url || author.avatar || "";
  if (url && !url.startsWith("http") && !url.startsWith("/")) {
    return `/${url}`;
  }
  return url;
}

export default function AuthorsStrip({ authors = [] }: { authors?: Author[] }) {
  const visibleAuthors = authors.filter((author) => author.status !== false).slice(0, 8);
  if (!visibleAuthors.length) return null;

  return (
    <section className="border-t border-[#E0E5F0] py-16" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <span className="tag">Contributors</span>
            <p
              className="mt-4 text-[#1A1B4B] leading-tight"
              style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}
            >
              Reviewed by people<br />
              <span className="text-stroke-white">who understand the physics.</span>
            </p>
          </div>
          <Link href="/authors" className="btn-ghost self-start rounded-full px-5 py-2.5 text-sm sm:self-auto">
            All Authors -&gt;
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {visibleAuthors.map((author) => {
            const avatar = avatarFor(author);
            return (
              <Link
                key={author.slug}
                href={`/authors/${author.slug}`}
                className="group rounded-lg border border-[#E0E5F0] p-4 transition-colors hover:border-[#00B4D8]/55 hover:bg-[#F1F4FB]"
                style={{ background: "var(--surface)", boxShadow: "0 1px 2px rgba(26,27,75,0.04)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      width: 44,
                      height: 44,
                      background: avatar ? undefined : "linear-gradient(135deg, #00B4D820, #00B4D860)",
                      border: "1px solid #00B4D830",
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
                      <span style={{ color: "#0093B5", fontFamily: "var(--font-syne)" }}>
                        {author.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#1A1B4B] group-hover:text-[#00B4D8]" style={{ fontFamily: "var(--font-syne)" }}>
                      {author.name}
                    </p>
                    {author.role && (
                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[#6C757D]">
                        {author.role}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
