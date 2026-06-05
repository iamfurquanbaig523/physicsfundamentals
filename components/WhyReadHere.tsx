const reasons = [
  {
    icon: "01",
    title: "Structured, not scattered",
    desc: "Articles are grouped into clear series so each topic has a natural next read instead of becoming a random archive.",
  },
  {
    icon: "02",
    title: "Plain English, real depth",
    desc: "Explanations stay readable while still showing the mechanics behind motion, fields, relativity, and quantum behavior.",
  },
  {
    icon: "03",
    title: "Always up to date",
    desc: "The panel controls categories, ordering, attributes, and article placement, so the public site stays fast and current.",
  },
  {
    icon: "04",
    title: "Free. Genuinely.",
    desc: "No premium tier and no gated reading. The full library of physics fundamentals stays open.",
  },
];

const topicRows = [
  { label: "Classical Mechanics", pct: 100, color: "#00B4D8" },
  { label: "Electromagnetism", pct: 86, color: "#4361EE" },
  { label: "Thermodynamics", pct: 72, color: "#F4A300" },
  { label: "Quantum & Relativity", pct: 58, color: "#7209B7" },
];

export default function WhyReadHere() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,180,216,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="tag">Why This Library</span>
            <h2
              className="mt-5 leading-tight text-[#1A1B4B]"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
              }}
            >
              Built for learners
              <br />
              <span className="gradient-text">who want the system.</span>
            </h2>
            <p className="mt-5 text-[#4A5068] leading-relaxed text-sm max-w-md" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Most physics content gives isolated formulas. This library shows the underlying ideas so each article fits into the bigger picture.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason) => (
                <div key={reason.title} className="group">
                  <div className="text-xs mb-3 text-[#00B4D8]" style={{ fontFamily: "var(--font-dm-mono)" }}>
                    {reason.icon}
                  </div>
                  <h3 className="text-sm font-bold text-[#1A1B4B] mb-1.5" style={{ fontFamily: "var(--font-syne)" }}>
                    {reason.title}
                  </h3>
                  <p className="text-xs text-[#4A5068] leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#E0E5F0] p-6" style={{ background: "var(--surface)", boxShadow: "0 1px 2px rgba(26,27,75,0.04)" }}>
            <p className="text-xs font-semibold text-[#6C757D] mb-5 tracking-wider uppercase" style={{ fontFamily: "var(--font-dm-mono)" }}>
              Topic Coverage
            </p>
            {topicRows.map((item) => (
              <div key={item.label} className="mb-5 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#1A1B4B]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    {item.label}
                  </span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-dm-mono)", color: item.color }}>
                    {item.pct}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#E0E5F0] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${item.pct}%`,
                      background: item.color,
                      opacity: 0.92,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
