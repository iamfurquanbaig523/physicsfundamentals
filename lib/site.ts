export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://physicsfundamental.org").replace(/\/$/, "");
export const SITE_DOMAIN = new URL(SITE_URL).hostname.replace(/^www\./, "");

export function absoluteSiteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
}
