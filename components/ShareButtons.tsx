"use client";

import { useState } from "react";
import type { ShareLinks, SharePlatform } from "@/lib/cms";

const platforms: Array<{ id: SharePlatform; label: string }> = [
  { id: "facebook", label: "Facebook" },
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "link", label: "Link" },
];

function shareUrl(platform: SharePlatform, shortUrl: string, title: string) {
  const encodedUrl = encodeURIComponent(shortUrl);
  const encodedText = encodeURIComponent(`${title} ${shortUrl}`);

  if (platform === "facebook") return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  if (platform === "whatsapp") return `https://wa.me/?text=${encodedText}`;
  if (platform === "instagram") return `https://www.instagram.com/?url=${encodedUrl}`;
  if (platform === "tiktok") return `https://www.tiktok.com/share?url=${encodedUrl}`;
  return null;
}

export default function ShareButtons({ links, title }: { links?: ShareLinks; title: string }) {
  const [selectedPlatform, setSelectedPlatform] = useState<SharePlatform | null>(null);
  const [copied, setCopied] = useState(false);

  const available = platforms.filter((platform) => links?.[platform.id]?.shortUrl);
  if (!available.length) return null;

  const currentPlatformInfo = platforms.find((p) => p.id === selectedPlatform);
  const shortUrl = selectedPlatform ? (links?.[selectedPlatform]?.shortUrl || "") : "";
  const proceedUrl = selectedPlatform ? shareUrl(selectedPlatform, shortUrl, title) : null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section className="mt-12 rounded-lg border border-[#E0E5F0] p-5" style={{ background: "var(--surface)", boxShadow: "0 1px 2px rgba(26,27,75,0.04)" }}>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#6C757D]" style={{ fontFamily: "var(--font-dm-mono)" }}>
        Share
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {available.map((platform) => (
          <button
            key={platform.id}
            onClick={() => {
              setSelectedPlatform(platform.id);
              setCopied(false);
            }}
            className="rounded-full border border-[#E0E5F0] bg-white px-4 py-2 text-xs font-semibold text-[#1A1B4B] transition-colors hover:border-[#00B4D8]/60 hover:text-[#00B4D8]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {platform.label}
          </button>
        ))}
      </div>

      {selectedPlatform && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1B4B]/40 backdrop-blur-sm animate-fade-in">
          <div
            className="relative w-full max-w-md rounded-xl border border-[#E0E5F0] bg-white p-6 shadow-2xl animate-scale-up"
            style={{ boxShadow: "0 30px 80px rgba(26,27,75,0.18), 0 0 40px rgba(0, 180, 216, 0.08)" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#1A1B4B]" style={{ fontFamily: "var(--font-syne)" }}>
                  Share via {currentPlatformInfo?.label}
                </h3>
                <p className="mt-1.5 text-xs text-[#6C757D]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Here is your custom database-tracked short link for sharing:
                </p>
              </div>
              <button
                onClick={() => setSelectedPlatform(null)}
                className="text-[#6C757D] hover:text-[#1A1B4B] transition-colors text-lg font-semibold"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            {/* Input and Copy Button */}
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#E0E5F0] bg-[#F1F4FB] p-2">
              <input
                type="text"
                readOnly
                value={shortUrl}
                className="w-full bg-transparent px-2 py-1.5 text-xs text-[#1A1B4B] outline-none select-all"
                style={{ fontFamily: "var(--font-dm-mono)" }}
              />
              <button
                onClick={handleCopy}
                className={`flex-shrink-0 rounded px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  copied
                    ? "bg-[#00B4D8]/15 border border-[#00B4D8]/40 text-[#0093B5]"
                    : "bg-[#00B4D8] text-white hover:bg-[#0093B5]"
                }`}
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Footer / Proceed Actions */}
            {proceedUrl && (
              <div className="mt-5 pt-4 border-t border-[#E0E5F0] flex flex-col gap-2">
                <a
                  href={proceedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-full bg-[#1A1B4B] px-4 py-2.5 text-xs font-bold text-white border border-[#1A1B4B] hover:bg-[#2A2D6B] transition-all"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Proceed to {currentPlatformInfo?.label}
                </a>
              </div>
            )}

            <button
              onClick={() => setSelectedPlatform(null)}
              className="mt-3 flex w-full items-center justify-center rounded-full border border-[#E0E5F0] px-4 py-2 text-xs font-semibold text-[#6C757D] hover:text-[#1A1B4B] hover:border-[#00B4D8]/40 transition-all"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
