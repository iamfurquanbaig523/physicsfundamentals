import PageShell from "@/components/PageShell";
import Link from "next/link";
import { getAuthors, getBlogSummaries, getCompanyPage, getSeries } from "@/lib/cms";

export default async function AboutPage() {
  const [page, articles, series, authors] = await Promise.all([
    getCompanyPage("about-us"),
    getBlogSummaries(1000),
    getSeries(),
    getAuthors(),
  ]);

  return (
    <main>
      <PageShell>

      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "20%",
            left: "60%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(67, 97, 238,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <span className="tag">About Physics Fundamentals</span>
          <h1
            className="mt-6 text-[#1A1B4B] leading-[0.92]"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 800,
            }}
          >
            We teach the
            <br />
            <span className="text-stroke">machinery</span>
            <br />
            of the universe.
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3">
              {page?.content ? (
                <article className="prose-custom" dangerouslySetInnerHTML={{ __html: page.content }} />
              ) : (
                <div className="space-y-8 prose-custom">
                  <p className="text-lg text-[#1A1B4B] font-semibold">We teach you how the universe actually works — not just the formulas you have to memorize.</p>
                  <p>Most physics content online hands you an equation and tells you to plug numbers in. F = ma. E = mc². The Schrödinger equation. Done.</p>
                  <p>But nobody explains why any of it is true.</p>
                  <p>That's exactly the gap we built this site to fill.</p>

                  <h3 className="text-xl font-bold text-[#1A1B4B] mt-8" style={{ fontFamily: "var(--font-syne)" }}>Who We Are</h3>
                  <p>We are a team of physics teachers, researchers, and lifelong students who got tired of textbooks that skip the intuition. We spent years studying how mechanics, fields, thermodynamics, relativity, and quantum theory actually fit together — and we noticed something: people who understand the underlying ideas never have to memorize formulas. The right equations become obvious.</p>
                  <p>So we built a place where that understanding comes first.</p>

                  <h3 className="text-xl font-bold text-[#1A1B4B] mt-8" style={{ fontFamily: "var(--font-syne)" }}>What We Actually Teach</h3>
                  <p>Every article on this site starts from the ground up. Before we show you the formula for kinetic energy, we explain what energy is and why it gets conserved. Before we talk about quantum superposition, we show you the double-slit experiment and what it really tells us about reality.</p>
                  <p>By the time you finish reading, you will not just know what the equations say — you will know why they exist, which means you can apply the underlying ideas to any problem, any field of physics, any new discovery, without having to relearn from scratch.</p>

                  <h3 className="text-xl font-bold text-[#1A1B4B] mt-8" style={{ fontFamily: "var(--font-syne)" }}>What Makes Us Different</h3>
                  <ul className="space-y-3 list-disc pl-5 text-[#6C757D]">
                    <li><strong>We go foundational.</strong> Every article is built from first principles. No assumed knowledge, no jargon without explanation.</li>
                    <li><strong>We make it visual.</strong> We do not just describe concepts — we show you how particles, waves, and fields actually behave, with diagrams and animations you can interact with.</li>
                    <li><strong>We teach the ideas, not the tricks.</strong> Tricks expire. Ideas compound. Our goal is to turn you into someone who understands physics deeply enough to read a research paper or watch a lecture and follow what's happening.</li>
                    <li><strong>We cover the whys.</strong> Why does light travel at a constant speed? Why does entropy always increase? Why is gravity not really a force? Every lesson answers the question underneath the question.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-[#1A1B4B] mt-8" style={{ fontFamily: "var(--font-syne)" }}>What You Will Walk Away With</h3>
                  <p>After going through our content, you will understand:</p>
                  <ul className="space-y-3 list-disc pl-5 text-[#6C757D]">
                    <li>How Newton's laws emerge from the deeper symmetries of nature</li>
                    <li>Why electric and magnetic fields are really one thing seen from different frames</li>
                    <li>How relativity reshapes our ideas of space, time, and gravity</li>
                    <li>What quantum mechanics actually says about particles, waves, and measurement</li>
                    <li>How to think about any physical situation from a logical, principle-based perspective</li>
                  </ul>
                  <p>You will not just be better at solving physics problems. You will understand physics — and that is something no curriculum update can take away from you.</p>

                  <h3 className="text-xl font-bold text-[#1A1B4B] mt-8" style={{ fontFamily: "var(--font-syne)" }}>Our Promise</h3>
                  <p>We will never publish content that hands you a formula without explaining what it means. If we cover a topic, we cover it properly, from the foundation up, in plain language, with real examples.</p>
                  <p>Because we believe more people deserve to understand how the universe actually works.</p>
                  <p className="font-semibold text-[#00B4D8] mt-6">Welcome. Let's start from the beginning.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-5">
              <div className="rounded-2xl border border-[#E0E5F0] p-7" style={{ background: "var(--card)" }}>
                <p className="text-xs font-semibold text-[#6C757D] tracking-widest uppercase mb-5" style={{ fontFamily: "var(--font-dm-mono)" }}>
                  By the numbers
                </p>
                {[
                  { label: "Articles published", value: `${articles.length}` },
                  { label: "Reading series", value: `${series.length}` },
                  { label: "Contributors", value: `${authors.length}` },
                  { label: "Access cost", value: "Free" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between py-3 border-b border-[#E0E5F0] last:border-0">
                    <span className="text-xs text-[#6C757D]" style={{ fontFamily: "var(--font-dm-sans)" }}>
                      {stat.label}
                    </span>
                    <span className="text-sm font-bold gradient-text" style={{ fontFamily: "var(--font-syne)" }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/contact-us" className="btn-ghost w-full py-3.5 rounded-full text-sm text-center block">
                Get in Touch -&gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-line" />
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-[#1A1B4B]" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}>
            Ready to start reading?
          </h2>
          <p className="mt-3 text-[#6C757D] text-sm max-w-sm mx-auto" style={{ fontFamily: "var(--font-dm-sans)" }}>
            No account needed. Open a series and follow the articles in order.
          </p>
          <Link href="/series" className="btn-lime inline-block mt-7 px-8 py-3.5 rounded-full text-sm">
            Browse Series -&gt;
          </Link>
        </div>
      </section>

      </PageShell>
    </main>
  );
}
