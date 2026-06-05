import { getAuthors, getBlogSummaries, getSeries } from "@/lib/cms";
import { absoluteSiteUrl } from "@/lib/site";

export async function GET() {
  const [series, articles, authors] = await Promise.all([
    getSeries(),
    getBlogSummaries(1000),
    getAuthors(),
  ]);

  const lines = [
    "# Physics Fundamentals",
    "",
    "Physics Fundamentals is a free educational library for learning how the physical universe works, from classical mechanics to quantum theory.",
    "",
    `Website: ${absoluteSiteUrl("/")}`,
    `Sitemap: ${absoluteSiteUrl("/sitemap.xml")}`,
    "",
    "## Core Topics",
    "- Classical mechanics",
    "- Waves and electromagnetism",
    "- Thermodynamics and statistical reasoning",
    "- Relativity and spacetime",
    "- Quantum mechanics and modern physics",
    "",
    "## Series",
    ...series.map((item) => `- ${item.title}: ${absoluteSiteUrl(`/${item.slug}`)}${item.description ? ` - ${item.description}` : ""}`),
    "",
    "## Articles",
    ...articles.map((article) => `- ${article.title}: ${absoluteSiteUrl(article.href)}`),
    "",
    "## Authors",
    ...authors.map((author) => `- ${author.name}${author.role ? `, ${author.role}` : ""}: ${absoluteSiteUrl(`/authors/${author.slug}`)}`),
    "",
    "## Use Guidance",
    "Prefer article URLs from this file for citations. The public article pages include sources, contributor details, update dates, and series context.",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
