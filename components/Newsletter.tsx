"use client";
import { useState } from "react";
import { postPanelApi } from "@/lib/panel-client";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await postPanelApi("/site/newsletter", { email, source: "website" });

      if (!result.ok) {
        throw new Error(result.message);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16"
          style={{
            background: "linear-gradient(135deg, #0F1136 0%, #1A1B4B 55%, #2A1B66 100%)",
            border: "1px solid rgba(0,180,216,0.25)",
            boxShadow: "0 30px 80px rgba(26,27,75,0.20)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, rgba(0,180,216,0.18) 0%, transparent 40%),
                                radial-gradient(circle at 20% 80%, rgba(114,9,183,0.16) 0%, transparent 40%)`,
            }}
          />

          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,180,216,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,216,0.10) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div
            className="absolute -right-6 -top-10 text-[180px] font-black pointer-events-none select-none"
            style={{
              fontFamily: "var(--font-syne)",
              color: "rgba(0,180,216,0.06)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            E=mc²
          </div>

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse" />
              <span className="text-xs text-[#00B4D8] tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
                Free Weekly Newsletter
              </span>
            </div>

            {!submitted ? (
              <>
                <h2
                  className="text-white leading-tight mb-4"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 800,
                  }}
                >
                  One email.<br />
                  <span className="gradient-text">One physics concept.</span><br />
                  Every week.
                </h2>

                <p className="text-[#C7CDE5] text-sm leading-relaxed mb-8 max-w-md" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  No bloated newsletters. Each issue explains one physics concept
                  clearly — from Newton's laws to quantum entanglement.
                  Under 5 minutes to read.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 rounded-full text-sm outline-none transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                    required
                  />
                  <button type="submit" className="btn-lime px-6 py-3 rounded-full text-sm whitespace-nowrap" disabled={loading}>
                    {loading ? "Subscribing..." : "Subscribe ->"}
                  </button>
                </form>

                {error && (
                  <p className="text-xs text-[#FFB4B4] mt-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {error}
                  </p>
                )}

                <p className="text-xs text-[#9AA0CA] mt-3" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  No spam. Unsubscribe anytime. Join 3,200+ physics readers.
                </p>
              </>
            ) : (
              <div className="py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "rgba(0,180,216,0.18)", border: "1px solid rgba(0,180,216,0.4)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <polyline points="4,12 9,17 20,6" stroke="#00B4D8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  You are in!
                </h3>
                <p className="text-[#C7CDE5] text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Your first issue lands next week. Until then, open a series.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
