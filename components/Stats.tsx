import { getSeries } from "@/lib/cms";

export default async function Stats() {
  const allSeries = await getSeries();
  const totalArticles = allSeries.reduce((acc, s) => acc + s.articles.length, 0);
  const displayArticles = totalArticles > 0 ? `${totalArticles}+` : "26+";
  const displaySeries = allSeries.length > 0 ? `${allSeries.length}+` : "6+";

  const stats = [
    { value: displayArticles, label: "Free Articles", sub: "and growing" },
    { value: displaySeries, label: "Topic Series", sub: "concept-driven" },
    { value: "0", label: "Accounts Needed", sub: "open reading" },
    { value: "100%", label: "Free Forever", sub: "no paywalls" },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,180,216,0.05) 0%, transparent 50%, rgba(114,9,183,0.05) 100%)",
        }}
      />
      <div className="section-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#E0E5F0]">
          {stats.map((s, i) => (
            <div key={i} className="text-center lg:px-10">
              <div
                className="stat-number"
                style={{
                  fontFamily: "var(--font-syne)",
                  background: i === 3 ? "linear-gradient(135deg, #00B4D8, #7209B7)" : undefined,
                  WebkitBackgroundClip: i === 3 ? "text" : undefined,
                  WebkitTextFillColor: i === 3 ? "transparent" : undefined,
                }}
              >
                {s.value}
              </div>
              <p
                className="mt-2 text-sm font-semibold text-[#1A1B4B]"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {s.label}
              </p>
              <p
                className="text-xs text-[#6C757D] mt-0.5"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-line" />
    </section>
  );
}
