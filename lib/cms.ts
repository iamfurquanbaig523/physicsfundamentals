export type Author = {
  id: number;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatar?: string;
  avatar_url?: string;
  website_url?: string;
  social_links?: Record<string, string>;
  blogs_count?: number;
  articles?: BlogSummary[];
  status?: boolean;
};

export type BlogSummary = {
  id?: number;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  slug: string;
  readTime: string;
  date: string;
  updatedOn?: string | null;
  accent: string;
  featured?: boolean;
  isFeatured?: boolean;
  image?: string | null;
  categoryId?: number | null;
  categorySlug?: string | null;
  categoryTitle?: string | null;
  attributes?: ArticleAttribute[];
  previewHeadings?: string[];
};

export type ArticleAttribute = {
  label: string;
  color: string;
};

export type ArticleFaq = {
  id?: number;
  question: string;
  answer: string;
  sortOrder?: number;
  includeInSchema?: boolean;
  schemaQuestion?: string | null;
  schemaAnswer?: string | null;
  options?: Record<string, unknown>;
};

export type BlogArticle = BlogSummary & {
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  author?: Author;
  updatedBy?: Author | null;
  additionalAuthors?: Author[];
  reviewers?: Author[];
  editors?: Author[];
  toc?: { id: string; text: string; level: number }[];
  relatedPosts?: Array<{ title: string; href: string; tag: string; tagColor: string; isCurrent?: boolean }>;
  seriesArticles?: ArticleSummary[];
  faqs?: ArticleFaq[];
  shareLinks?: ShareLinks;
};

export type SharePlatform = "facebook" | "instagram" | "tiktok" | "whatsapp" | "link";

export type ShareLinks = Partial<Record<SharePlatform, {
  shortUrl: string;
  targetUrl: string;
}>>;

export type SiteSettings = {
  brand_name?: string;
  domain?: string;
  site_url?: string;
  contact_email?: string;
  google_site_verification?: string;
  gtm_container_id?: string;
  default_thumbnail?: string | null;
  home_main_article_markdown?: string | null;
};

export type CompanyPage = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
};

type CmsResponse<T> = {
  error?: boolean;
  message?: string;
  data?: T;
  related?: BlogSummary[];
  seriesArticles?: ArticleSummary[];
};

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

function articleHref(slug: string, categorySlug?: string | null): string {
  return categorySlug ? `/${categorySlug}/${slug}` : `/${slug}`;
}

const fallbackArticles: BlogSummary[] = [
  {
    id: 1,
    tag: "Mechanics",
    title: "Newton's Laws Explained: The Rules Behind Everyday Motion",
    excerpt:
      "A first-principles guide to force, mass, acceleration, inertia, and why Newton's three laws still explain most motion around us.",
    href: "/classical-mechanics/newtons-laws",
    slug: "newtons-laws",
    readTime: "8 min",
    date: "Mar 16, 2026",
    accent: "#00B4D8",
    featured: true,
    isFeatured: true,
    categoryId: 1,
    categorySlug: "classical-mechanics",
    categoryTitle: "Classical Mechanics",
    attributes: [
      { label: "Beginner", color: "#00B4D8" },
      { label: "First Principles", color: "#4361EE" },
    ],
    previewHeadings: ["Inertia", "Force and acceleration", "Action and reaction"],
  },
  {
    id: 2,
    tag: "Energy",
    title: "Conservation of Energy: Why Nature Keeps the Books Balanced",
    excerpt: "Energy changes form constantly, but the total stays fixed. Learn the idea that connects falling objects, heat, light, and atoms.",
    href: "/classical-mechanics/conservation-of-energy",
    slug: "conservation-of-energy",
    readTime: "12 min",
    date: "Mar 13, 2026",
    accent: "#4361EE",
    categoryId: 1,
    categorySlug: "classical-mechanics",
    categoryTitle: "Classical Mechanics",
    attributes: [{ label: "Core Idea", color: "#4361EE" }],
    previewHeadings: ["What energy means", "Potential and kinetic energy", "Why conservation matters"],
  },
  {
    id: 3,
    tag: "Fields",
    title: "Maxwell's Equations: The Four Lines That Explain Light",
    excerpt: "Electricity, magnetism, and light are one connected story. Maxwell's equations show how fields create and move through space.",
    href: "/electromagnetism/maxwells-equations",
    slug: "maxwells-equations",
    readTime: "10 min",
    date: "Mar 13, 2026",
    accent: "#7209B7",
    categoryId: 2,
    categorySlug: "electromagnetism",
    categoryTitle: "Electromagnetism",
    attributes: [{ label: "Fields", color: "#7209B7" }],
    previewHeadings: ["Electric fields", "Magnetic fields", "Light as a wave"],
  },
  {
    id: 4,
    tag: "Thermodynamics",
    title: "Entropy Explained: Why Disorder Is Really About Possibility",
    excerpt: "Entropy is not just messiness. It is a precise way to count how many microscopic arrangements can produce the same visible state.",
    href: "/thermodynamics/entropy-explained",
    slug: "entropy-explained",
    readTime: "9 min",
    date: "Feb 25, 2026",
    accent: "#F4A300",
    categoryId: 3,
    categorySlug: "thermodynamics",
    categoryTitle: "Thermodynamics",
    attributes: [{ label: "Conceptual", color: "#F4A300" }],
    previewHeadings: ["Microstates", "The arrow of time", "Heat and probability"],
  },
  {
    id: 5,
    tag: "Relativity",
    title: "Time Dilation: Why Moving Clocks Really Run Slow",
    excerpt: "Special relativity is not science fiction. It follows from one strange fact: everyone measures the same speed of light.",
    href: "/relativity/time-dilation",
    slug: "time-dilation",
    readTime: "6 min",
    date: "Feb 22, 2026",
    accent: "#4361EE",
    categoryId: 4,
    categorySlug: "relativity",
    categoryTitle: "Relativity",
    attributes: [{ label: "Spacetime", color: "#4361EE" }],
    previewHeadings: ["Light speed", "Moving clocks", "Real measurements"],
  },
  {
    id: 6,
    tag: "Quantum",
    title: "Wave-Particle Duality: Why Matter Behaves Like Both",
    excerpt: "The double-slit experiment shows that particles can spread like waves, arrive like dots, and force us to rethink what reality means.",
    href: "/quantum-mechanics/wave-particle-duality",
    slug: "wave-particle-duality",
    readTime: "7 min",
    date: "Feb 21, 2026",
    accent: "#00B4D8",
    categoryId: 5,
    categorySlug: "quantum-mechanics",
    categoryTitle: "Quantum Mechanics",
    attributes: [{ label: "Quantum", color: "#00B4D8" }],
    previewHeadings: ["The double slit", "Waves of probability", "Measurement"],
  },
  {
    id: 7,
    tag: "Quantum",
    title: "The Schrodinger Equation: A Map for Quantum Possibility",
    excerpt: "The central equation of quantum mechanics predicts how probability waves change over time.",
    href: "/quantum-mechanics/schrodinger-equation",
    slug: "schrodinger-equation",
    readTime: "11 min",
    date: "Feb 19, 2026",
    accent: "#7209B7",
    categoryId: 5,
    categorySlug: "quantum-mechanics",
    categoryTitle: "Quantum Mechanics",
    attributes: [{ label: "Equation", color: "#7209B7" }],
    previewHeadings: ["Wavefunctions", "Energy operators", "What the equation predicts"],
  },
];

function fallbackArticleHtml(article: BlogSummary): string {
  const topic = article.categoryTitle || article.tag;

  return `
    <p><strong>${article.title}</strong></p>
    <p>${article.excerpt}</p>
    <h2>Start with the physical idea</h2>
    <p>This fallback lesson is available when the CMS is unreachable. It keeps the public site useful while preserving the same article layout and API contract.</p>
    <p>For ${topic}, the goal is to understand the principle before memorizing equations. Once the principle is clear, the math becomes a compact language for the same idea.</p>
    <h2>What to notice</h2>
    <ul>
      <li>Identify the system you are studying.</li>
      <li>Track the quantities that stay constant or change predictably.</li>
      <li>Connect the equation to a real motion, field, wave, or measurement.</li>
    </ul>
    <blockquote>Physics becomes easier when every formula is treated as a compressed explanation.</blockquote>
    <h2>Next step</h2>
    <p>Read the rest of the series in order. Each lesson builds one piece of intuition before moving deeper into the technical details.</p>
  `;
}

const legacySearchCopyPattern = /\b(search engine|googlebot|google|seo|serp|crawling|crawler|indexing|ranking)\b/i;

const fallbackHomeMainArticleMarkdown = `
Physics Fundamentals is a free, structured library for understanding how the universe works from first principles.

Most learners meet physics as a pile of formulas. We take the opposite path: start with the physical idea, build intuition, then let the equation become a compact summary of what you already understand.

## What you can learn here

- How motion, force, energy, and momentum fit together
- Why electric and magnetic fields are two sides of one deeper structure
- What entropy really measures
- How relativity changes space, time, and gravity
- Why quantum mechanics forces matter to behave like waves and particles

## How to read it

Open a series, read in order, and move slowly enough to connect each idea to a real physical situation. Physics rewards careful thinking more than memorization.
`;

function hasLegacySearchCopy(...values: Array<string | null | undefined>): boolean {
  if (process.env.CMS_HIDE_LEGACY_SEARCH_CONTENT !== "1") return false;

  return values.some((value) => Boolean(value && legacySearchCopyPattern.test(value)));
}

function searchFallbackArticles(query: string): BlogSummary[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return fallbackArticles.filter((article) =>
    [article.title, article.excerpt, article.tag, article.categoryTitle, ...(article.previewHeadings || [])]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(normalizedQuery)),
  );
}

function fallbackCompanyPage(slug: string): CompanyPage | null {
  if (slug === "about-us") return null;

  if (slug === "privacy-policy") {
    return {
      title: "Privacy Policy",
      slug,
      excerpt: "How Physics Fundamentals handles reader information.",
      content:
        "<p>Physics Fundamentals is built for open learning. We collect only the information needed to run the site, respond to messages, and improve the reading experience.</p><h2>Information You Provide</h2><p>If you contact us or subscribe to updates, we use the information you submit only for that purpose.</p><h2>Site Analytics</h2><p>We may use privacy-conscious analytics to understand which lessons are useful and where the site needs improvement.</p><h2>Contact</h2><p>For privacy questions, use the contact page.</p>",
    };
  }

  if (slug === "terms-and-conditions") {
    return {
      title: "Terms and Conditions",
      slug,
      excerpt: "The simple terms for using Physics Fundamentals.",
      content:
        "<p>Physics Fundamentals provides educational content for general learning. The site is free to read and should not be treated as professional, academic, or examination-specific advice.</p><h2>Use of Content</h2><p>You may read and share public article links for learning and citation. Do not reproduce full articles without permission.</p><h2>Accuracy</h2><p>We work carefully, but physics is precise. If you notice an error, please contact us so we can review it.</p>",
    };
  }

  return null;
}

function physicsAuthorText(value?: string | null): string | undefined {
  if (!value) return value ?? undefined;

  return value
    .replace(/\bSEO\b/gi, "Physics")
    .replace(/\bsearch engines?\b/gi, "physics")
    .replace(/\bsearch engine\b/gi, "physics")
    .replace(/\bGoogle\b/g, "physics")
    .replace(/\branking\b/gi, "reasoning")
    .replace(/\bindexing\b/gi, "concept mapping")
    .replace(/\bcrawling\b/gi, "exploration");
}

function normalizeAuthor(input: Author): Author {
  return {
    ...input,
    role: physicsAuthorText(input.role),
    bio: physicsAuthorText(input.bio),
  };
}

function decodeHtmlText(input: string): string {
  return input
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueHeadingId(text: string, usedIds: Set<string>): string {
  const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "section";
  let id = base;
  let suffix = 2;

  while (usedIds.has(id)) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }

  usedIds.add(id);
  return id;
}

function parseHtmlWithToc(html: string): { content: string; toc: { id: string; text: string; level: number }[] } {
  if (!html) return { content: "", toc: [] };
  const toc: { id: string; text: string; level: number }[] = [];
  const usedIds = new Set<string>();
  const content = html.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (match, attributes, innerText) => {
    const plainText = decodeHtmlText(innerText.replace(/<[^>]*>?/gm, ""));
    const id = uniqueHeadingId(plainText, usedIds);
    const cleanedAttributes = attributes.replace(/\s+id=(["']).*?\1/i, "");

    toc.push({ id, text: plainText, level: 2 });

    return `<h2${cleanedAttributes} id="${id}">${innerText}</h2>`;
  });
  return { content, toc };
}

function cmsBases(): string[] {
  const bases = new Set<string>();
  const localBase = "http://localhost/physicspanel/public/api";
  const configuredBases = [process.env.CMS_API_URL, process.env.NEXT_PUBLIC_CMS_API_URL]
    .filter((base): base is string => Boolean(base?.trim()))
    .map((base) => base.replace(/\/$/, ""));

  const addBase = (base: string) => {
    if (!base) return;
    bases.add(base);

    if (process.env.CMS_ALLOW_HTTP_FALLBACK !== "0" && base.startsWith("https://")) {
      bases.add(`http://${base.slice("https://".length)}`);
    }
  };

  configuredBases.forEach(addBase);

  if (!bases.size || process.env.CMS_INCLUDE_LOCAL_FALLBACKS === "1") {
    addBase(localBase);
    addBase("http://127.0.0.1:8000/api");
  }

  return Array.from(bases);
}

function cmsTimeoutMs(): number {
  const timeout = Number(process.env.CMS_FETCH_TIMEOUT_MS);
  return Number.isFinite(timeout) && timeout > 0 ? timeout : 8000;
}

function cmsHeaders(input?: HeadersInit, hasBody: boolean = false): Headers {
  const headers = new Headers(input);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (hasBody && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  if (!headers.has("User-Agent")) headers.set("User-Agent", "physicsfundamentals-website/1.0");
  return headers;
}

const cmsWarnings = new Set<string>();

function cmsDebugEnabled(): boolean {
  return process.env.CMS_DEBUG === "1" || process.env.CMS_FETCH_WARNINGS === "1";
}

function describeCmsError(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === "AbortError") return `timed out after ${cmsTimeoutMs()}ms`;
    return error.message || error.name;
  }
  return String(error);
}

function warnCms(url: string, detail: string) {
  if (!cmsDebugEnabled()) return;

  const key = `${url}:${detail}`;
  if (cmsWarnings.has(key)) return;
  cmsWarnings.add(key);
  console.warn(`[CMS] ${url} unavailable (${detail}); using fallback content when available.`);
}

async function cmsFetch(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), cmsTimeoutMs());
  const method = (init?.method || "GET").toUpperCase();
  const requestInit: NextFetchInit = {
    ...init,
    method,
    headers: cmsHeaders(init?.headers, Boolean(init?.body)),
    signal: controller.signal,
  };

  if (method === "GET") {
    requestInit.cache = "no-store";
  }

  try {
    return await fetch(url, requestInit);
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchCms<T>(path: string, init?: RequestInit): Promise<CmsResponse<T> | null> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  for (const base of cmsBases()) {
    const url = `${base}${normalizedPath}`;
    try {
      const response = await cmsFetch(url, init);

      if (!response.ok) {
        warnCms(url, `HTTP ${response.status}`);
        continue;
      }

      return (await response.json()) as CmsResponse<T>;
    } catch (err) {
      warnCms(url, describeCmsError(err));
    }
  }

  return null;
}

function normalizeBlog(input: Partial<BlogSummary> & { isFeatured?: boolean }): BlogSummary {
  const slug = input.slug || input.href?.replace(/^\//, "") || "";
  const categorySlug = input.categorySlug;
  return {
    id: input.id,
    tag: input.tag || "Physics",
    title: input.title || "Untitled article",
    excerpt: decodeHtmlText(input.excerpt || ""),
    href: articleHref(slug, categorySlug),
    slug,
    readTime: input.readTime || "5 min",
    date: input.date || "",
    updatedOn: typeof input.updatedOn === "string" ? input.updatedOn : null,
    accent: input.accent || "#00B4D8",
    featured: input.featured ?? input.isFeatured ?? false,
    isFeatured: input.isFeatured ?? input.featured ?? false,
    image: input.image,
    categoryId: input.categoryId,
    categorySlug,
    categoryTitle: input.categoryTitle,
    attributes: normalizeAttributes(input.attributes),
    previewHeadings: Array.isArray(input.previewHeadings) ? input.previewHeadings : [],
  };
}

function normalizeAttributes(input: unknown): ArticleAttribute[] {
  if (!Array.isArray(input)) return [];

  return input
    .map((attribute) => {
      if (!attribute || typeof attribute !== "object") return null;
      const value = attribute as Partial<ArticleAttribute>;
      const label = typeof value.label === "string" ? value.label.trim() : "";
      if (!label) return null;

      return {
        label,
        color: typeof value.color === "string" && /^#[0-9a-fA-F]{6}$/.test(value.color) ? value.color : "#00B4D8",
      };
    })
    .filter((attribute): attribute is ArticleAttribute => Boolean(attribute));
}

function normalizeFaqs(input: unknown): ArticleFaq[] {
  if (!Array.isArray(input)) return [];

  const faqs: ArticleFaq[] = [];

  for (const faq of input) {
    if (!faq || typeof faq !== "object") continue;
    const value = faq as Partial<ArticleFaq>;
    const question = typeof value.question === "string" ? value.question.trim() : "";
    const answer = typeof value.answer === "string" ? value.answer.trim() : "";
    if (!question || !answer) continue;

    faqs.push({
      id: value.id,
      question,
      answer,
      sortOrder: typeof value.sortOrder === "number" ? value.sortOrder : 0,
      includeInSchema: value.includeInSchema !== false,
      schemaQuestion: typeof value.schemaQuestion === "string" ? value.schemaQuestion : null,
      schemaAnswer: typeof value.schemaAnswer === "string" ? value.schemaAnswer : null,
      options: value.options && typeof value.options === "object" ? value.options : {},
    });
  }

  return faqs.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function normalizeArticleSummary(input: Partial<ArticleSummary>): ArticleSummary {
  const slug = input.slug || input.href?.replace(/^\//, "") || "";
  const categorySlug = input.categorySlug;
  return {
    id: input.id ?? 0,
    title: input.title || "Untitled article",
    slug,
    href: articleHref(slug, categorySlug),
    readTime: input.readTime || "5 min",
    sort_order: input.sort_order ?? 0,
    excerpt: decodeHtmlText(input.excerpt || ""),
    date: input.date || "",
    accent: input.accent || "#00B4D8",
    attributes: normalizeAttributes(input.attributes),
    previewHeadings: Array.isArray(input.previewHeadings) ? input.previewHeadings : [],
    isCurrent: Boolean(input.isCurrent),
    categorySlug,
    categoryTitle: input.categoryTitle,
    image: input.image,
  };
}

export async function getBlogSummaries(limit?: number): Promise<BlogSummary[]> {
  const response = await fetchCms<{ data?: BlogSummary[] } | BlogSummary[]>(`/site/blogs?per_page=${limit ?? 12}`);
  const payload = response?.data;
  const cmsBlogs = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  const normalized = cmsBlogs.map(normalizeBlog);
  const cmsLooksLegacy = normalized.some((article) =>
    hasLegacySearchCopy(article.tag, article.title, article.excerpt, article.categoryTitle),
  );
  const articles = normalized.length > 0 && !cmsLooksLegacy ? normalized : fallbackArticles;

  return typeof limit === "number" ? articles.slice(0, limit) : articles;
}

export async function getFeaturedArticles(): Promise<BlogSummary[]> {
  const [featuredResponse, recentArticles] = await Promise.all([
    fetchCms<{ data?: BlogSummary[] } | BlogSummary[]>(`/site/blogs?featured=1&per_page=1`),
    getBlogSummaries(6),
  ]);
  const featuredPayload = featuredResponse?.data;
  const featuredBlogs = Array.isArray(featuredPayload)
    ? featuredPayload
    : Array.isArray(featuredPayload?.data)
      ? featuredPayload.data
      : [];
  const cmsFeatured = featuredBlogs.map(normalizeBlog)[0];
  const featured = cmsFeatured && !hasLegacySearchCopy(cmsFeatured.tag, cmsFeatured.title, cmsFeatured.excerpt, cmsFeatured.categoryTitle)
    ? cmsFeatured
    : recentArticles.find((article) => article.featured || article.isFeatured);

  if (!featured) {
    return recentArticles.slice(0, 5);
  }

  return [featured, ...recentArticles.filter((article) => article.slug !== featured.slug)].slice(0, 5);
}

export async function getBlogArticle(slug: string): Promise<BlogArticle | null> {
  // Use any to bypass TS compilation errors if the backend response type is incomplete
  const response = await fetchCms<any>(`/site/blogs/${slug}`);
  if (response?.data) {
    const article = normalizeBlog(response.data);
    const rawContent = response.data.content || `<p>${article.excerpt}</p>`;
    if (hasLegacySearchCopy(article.tag, article.title, article.excerpt, article.categoryTitle, rawContent)) {
      return null;
    }

    const { content, toc } = parseHtmlWithToc(rawContent);

    return {
      ...article,
      content,
      toc,
      author: response.data.author,
      updatedBy: response.data.updatedBy,
      additionalAuthors: response.data.additionalAuthors,
      reviewers: response.data.reviewers,
      editors: response.data.editors,
      metaTitle: response.data.metaTitle,
      metaDescription: response.data.metaDescription,
      shareLinks: response.data.shareLinks,
      faqs: normalizeFaqs(response.data.faqs),
      relatedPosts: (response.seriesArticles || response.related)?.map((post: any) => {
        const postSlug = post.slug || post.href?.replace(/^\//, "") || "";
        return {
          title: post.title,
          href: articleHref(postSlug, post.categorySlug || article.categorySlug),
          tag: post.tag || article.tag,
          tagColor: post.accent || article.accent || "#00B4D8",
          isCurrent: Boolean(post.isCurrent),
        };
      }),
      seriesArticles: Array.isArray(response.seriesArticles)
        ? response.seriesArticles.map((post: any) => normalizeArticleSummary({
            ...post,
            categorySlug: post.categorySlug || article.categorySlug,
          }))
        : [],
    };
  }

  const fallback = fallbackArticles.find((article) => article.slug === slug);
  if (fallback) {
    const { content, toc } = parseHtmlWithToc(fallbackArticleHtml(fallback));
    const seriesArticles = fallback.categorySlug
      ? fallbackArticles
          .filter((article) => article.categorySlug === fallback.categorySlug)
          .map((article, index) => normalizeArticleSummary({ ...article, sort_order: index + 1 }))
      : [];

    return {
      ...fallback,
      content,
      toc,
      metaTitle: fallback.title,
      metaDescription: fallback.excerpt,
      relatedPosts: fallbackArticles
        .filter((article) => article.slug !== fallback.slug)
        .slice(0, 4)
        .map((article) => ({
          title: article.title,
          href: article.href,
          tag: article.tag,
          tagColor: article.accent,
        })),
      seriesArticles,
      faqs: [],
    };
  }

  return null;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const response = await fetchCms<SiteSettings>(`/site/settings`);
  const settings = response?.data ?? {};
  const markdown = settings.home_main_article_markdown;

  return {
    ...settings,
    brand_name: "Physics Fundamentals",
    domain: "physicsfundamentals.io",
    site_url: "https://physicsfundamentals.io",
    home_main_article_markdown: hasLegacySearchCopy(markdown)
      ? fallbackHomeMainArticleMarkdown
      : markdown || fallbackHomeMainArticleMarkdown,
  };
}

export async function getAuthors(): Promise<Author[]> {
  const response = await fetchCms<Author[]>(`/site/authors`);
  return Array.isArray(response?.data) ? response.data.map(normalizeAuthor) : [];
}

export async function getAuthor(slug: string): Promise<Author | null> {
  const response = await fetchCms<Author>(`/site/authors/${slug}`);
  if (!response?.data) return null;
  const author = normalizeAuthor(response.data);

  return {
    ...author,
    articles: Array.isArray(author.articles)
      ? author.articles.map(normalizeBlog).filter((article) =>
          !hasLegacySearchCopy(article.tag, article.title, article.excerpt, article.categoryTitle),
        )
      : [],
  };
}

export async function resolveShareLink(code: string): Promise<string | null> {
  const response = await fetchCms<{ targetUrl?: string }>(`/site/share-links/${code}`);
  return response?.data?.targetUrl || null;
}

export async function getCompanyPage(slug: string): Promise<CompanyPage | null> {
  const response = await fetchCms<CompanyPage>(`/site/company-pages/${slug}`);
  if (
    response?.data &&
    !hasLegacySearchCopy(response.data.title, response.data.excerpt, response.data.content, response.data.meta_title, response.data.meta_description)
  ) {
    return response.data;
  }

  return fallbackCompanyPage(slug);
}

export type ArticleSummary = {
  id: number;
  title: string;
  slug: string;
  href: string;
  readTime: string;
  sort_order: number;
  excerpt?: string;
  date?: string;
  accent?: string;
  attributes?: ArticleAttribute[];
  previewHeadings?: string[];
  isCurrent?: boolean;
  categorySlug?: string | null;
  categoryTitle?: string | null;
  image?: string | null;
};

export type Series = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  icon?: string;
  accent?: string;
  show_in_nav?: boolean;
  nav_order?: number;
  show_in_header_nav?: boolean;
  header_nav_order?: number;
  show_in_mobile_nav?: boolean;
  mobile_nav_order?: number;
  meta_title?: string;
  meta_description?: string;
  isComingSoon?: boolean;
  is_coming_soon?: boolean;
  articles: ArticleSummary[];
};

const fallbackSeries: Series[] = [
  {
    id: 1,
    title: "Classical Mechanics",
    slug: "classical-mechanics",
    description: "Motion, forces, energy, and the first principles behind the physics you can see and measure.",
    accent: "#00B4D8",
    show_in_nav: true,
    show_in_header_nav: true,
    show_in_mobile_nav: true,
    articles: fallbackArticles
      .filter((article) => article.categorySlug === "classical-mechanics")
      .map((article, index) => normalizeArticleSummary({ ...article, sort_order: index + 1 })),
  },
  {
    id: 2,
    title: "Electromagnetism",
    slug: "electromagnetism",
    description: "Electric fields, magnetic fields, circuits, waves, and the unification that explains light.",
    accent: "#7209B7",
    show_in_nav: true,
    show_in_header_nav: true,
    show_in_mobile_nav: true,
    articles: fallbackArticles
      .filter((article) => article.categorySlug === "electromagnetism")
      .map((article, index) => normalizeArticleSummary({ ...article, sort_order: index + 1 })),
  },
  {
    id: 3,
    title: "Thermodynamics",
    slug: "thermodynamics",
    description: "Heat, work, entropy, probability, and the physics of systems with many moving parts.",
    accent: "#F4A300",
    show_in_nav: true,
    show_in_header_nav: true,
    show_in_mobile_nav: true,
    articles: fallbackArticles
      .filter((article) => article.categorySlug === "thermodynamics")
      .map((article, index) => normalizeArticleSummary({ ...article, sort_order: index + 1 })),
  },
  {
    id: 4,
    title: "Relativity",
    slug: "relativity",
    description: "Space, time, gravity, and why measurements depend on motion and curvature.",
    accent: "#4361EE",
    show_in_nav: true,
    show_in_header_nav: true,
    show_in_mobile_nav: true,
    articles: fallbackArticles
      .filter((article) => article.categorySlug === "relativity")
      .map((article, index) => normalizeArticleSummary({ ...article, sort_order: index + 1 })),
  },
  {
    id: 5,
    title: "Quantum Mechanics",
    slug: "quantum-mechanics",
    description: "Wavefunctions, uncertainty, measurement, and the rules that govern matter at small scales.",
    accent: "#00B4D8",
    show_in_nav: true,
    show_in_header_nav: true,
    show_in_mobile_nav: true,
    articles: fallbackArticles
      .filter((article) => article.categorySlug === "quantum-mechanics")
      .map((article, index) => normalizeArticleSummary({ ...article, sort_order: index + 1 })),
  },
];

export async function getSeries(): Promise<Series[]> {
  const response = await fetchCms<Series[]>(`/site/categories`);
  if (response?.data && Array.isArray(response.data)) {
    const normalizedSeries = response.data.map((series) => ({
      ...series,
      accent: series.accent || "#00B4D8",
      isComingSoon: Boolean(series.isComingSoon ?? series.is_coming_soon),
      articles: Array.isArray(series.articles)
        ? series.articles.map((article) => normalizeArticleSummary({ ...article, categorySlug: series.slug }))
        : [],
    }));

    if (
      normalizedSeries.length > 0 &&
      !normalizedSeries.some((series) =>
        hasLegacySearchCopy(series.title, series.slug, series.description, series.content),
      )
    ) {
      return normalizedSeries;
    }
  }
  return fallbackSeries;
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  const response = await fetchCms<Series>(`/site/categories/${slug}`);
  if (response?.data) {
    const normalizedSeries = {
      ...response.data,
      accent: response.data.accent || "#00B4D8",
      isComingSoon: Boolean(response.data.isComingSoon ?? response.data.is_coming_soon),
      articles: Array.isArray(response.data.articles)
        ? response.data.articles.map((article) => normalizeArticleSummary({ ...article, categorySlug: response.data!.slug }))
        : [],
    };

    if (!hasLegacySearchCopy(normalizedSeries.title, normalizedSeries.slug, normalizedSeries.description, normalizedSeries.content)) {
      return normalizedSeries;
    }
  }
  return fallbackSeries.find((series) => series.slug === slug) ?? null;
}

export async function getSearchResults(query: string): Promise<BlogSummary[]> {
  const response = await fetchCms<{ data?: BlogSummary[] } | BlogSummary[]>(`/site/search?q=${encodeURIComponent(query)}&per_page=50`);
  if (!response) {
    return searchFallbackArticles(query);
  }

  const payload = response?.data;
  const rawResults = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : [];

  const normalized = rawResults.map(normalizeBlog);
  if (
    normalized.length === 0 ||
    normalized.some((article) => hasLegacySearchCopy(article.tag, article.title, article.excerpt, article.categoryTitle))
  ) {
    return searchFallbackArticles(query);
  }

  return normalized;
}

export async function recordSearchQuery(query: string, resultsCount: number, path: string = "/search", source: string = "website") {
  for (const base of cmsBases()) {
    try {
      await cmsFetch(`${base}/site/search-query`, {
        method: "POST",
        body: JSON.stringify({ query, page: path, source, results_count: resultsCount }),
      });
      break;
    } catch {
      // Try next base
    }
  }
}

export { fallbackArticles };
