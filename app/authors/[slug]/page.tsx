import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ArticlePeekCard from "@/components/ArticlePeekCard";
import PageShell from "@/components/PageShell";
import { getAuthor } from "@/lib/cms";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = await getAuthor(params.slug);
  if (!author) return {};

  return {
    title: `${author.name} | Physics Fundamentals`,
    description: author.bio || author.role || `Read articles by ${author.name} on Physics Fundamentals.`,
    openGraph: {
      title: `${author.name} | Physics Fundamentals`,
      description: author.bio || author.role || `Read articles by ${author.name}.`,
      images: [{ url: author.avatar_url || author.avatar || "/Thumbnail.png" }],
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const author = await getAuthor(params.slug);
  if (!author) notFound();

  const avatarRaw = author.avatar_url || author.avatar;
  const avatar = avatarRaw && !avatarRaw.startsWith("http") && !avatarRaw.startsWith("/") ? `/${avatarRaw}` : avatarRaw;

  return (
    <main>
      <PageShell>
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
            <Link href="/authors" className="text-xs text-[#6C757D] hover:text-[#00B4D8]" style={{ fontFamily: "var(--font-dm-mono)" }}>
              {"<-"} Authors
            </Link>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div
                className="flex-shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: 112,
                  height: 112,
                  background: avatar ? "#F1F4FB" : "linear-gradient(135deg, #00B4D820, #00B4D860)",
                  border: "1px solid #00B4D840",
                  overflow: "hidden",
                }}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={author.name}
                    fetchPriority="high"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ color: "#00B4D8", fontFamily: "var(--font-syne)", fontSize: "1.875rem", fontWeight: 700 }}>
                    {author.name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <span className="tag">Contributor</span>
                <h1 className="mt-4 text-[#1A1B4B] leading-tight" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800 }}>
                  {author.name}
                </h1>
                {author.role && <p className="mt-2 text-sm text-[#6C757D]">{author.role}</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {author.bio && (
              <div className="prose-custom rounded-lg border border-[#E0E5F0] p-6" style={{ background: "var(--card)" }}>
                <p>{author.bio}</p>
                {author.website_url && (
                  <p>
                    <a href={author.website_url} target="_blank" rel="noopener noreferrer">Profile link</a>
                  </p>
                )}
              </div>
            )}

            {author.articles && author.articles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-[#1A1B4B]" style={{ fontFamily: "var(--font-syne)" }}>
                  Articles
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {author.articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={article.href}
                      className="group rounded-lg border border-[#E0E5F0] p-5 transition-colors hover:border-[#00B4D8]/45 hover:bg-[#F1F4FB]"
                      style={{ background: "var(--card)" }}
                    >
                        {article.image && (
                          <div className="mb-4 aspect-[16/8] overflow-hidden rounded-md border border-[#E0E5F0] bg-[#F1F4FB]">
                          <img
                            src={article.image}
                            alt={article.title}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                          </div>
                        )}
                      <ArticlePeekCard
                        title={article.title}
                        excerpt={article.excerpt}
                        attributes={article.attributes}
                        previewHeadings={article.previewHeadings}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </PageShell>
    </main>
  );
}
