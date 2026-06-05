import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Physics Fundamentals",
    short_name: "Physics",
    description: "Structured reading series for learning physics from mechanics to quantum theory.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#FAFBFD",
    theme_color: "#00B4D8",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
