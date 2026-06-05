const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://physicsfundamental.org";
const cmsApiUrl =
  process.env.NEXT_PUBLIC_CMS_API_URL ||
  process.env.CMS_API_URL ||
  "https://panel.physicsfundamental.org/api";

function hostnameFromUrl(value) {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

const imageHosts = Array.from(
  new Set([
    hostnameFromUrl(siteUrl),
    "www.physicsfundamental.org",
    hostnameFromUrl(cmsApiUrl),
    "panel.physicsfundamental.org",
    "localhost",
    "127.0.0.1",
  ].filter(Boolean))
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.physicsfundamental.org" }],
        destination: "https://physicsfundamental.org/:path*",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  images: {
    remotePatterns: imageHosts.flatMap((hostname) => [
      { protocol: hostname === "localhost" || hostname === "127.0.0.1" ? "http" : "https", hostname },
    ]),
  },
};

export default nextConfig;
