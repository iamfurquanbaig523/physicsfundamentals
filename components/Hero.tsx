"use client";

import Link from "next/link";

const equations = [
  "F = ma",
  "E = mc^2",
  "PV = nRT",
  "v = f lambda",
  "F = G m1m2 / r^2",
  "Delta U = Q - W",
  "E = hf",
  "p = mv",
  "V = IR",
  "lambda = h/p",
];

function Orbit() {
  return (
    <div className="orbit" aria-hidden="true">
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <radialGradient id="hero-orbit-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="rgba(90,209,230,0)" />
          </radialGradient>
          <filter id="hero-orbit-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[60, 110, 160].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="0.6"
            strokeDasharray="2 6"
          />
        ))}

        <circle cx="200" cy="200" r="58" fill="url(#hero-orbit-core)" opacity="0.5" />
        <circle cx="200" cy="200" r="11" fill="#fff" filter="url(#hero-orbit-glow)" />

        <g transform="rotate(0 200 200)">
          <g style={{ transformOrigin: "200px 200px", animation: "spinSlow 14s linear infinite" }}>
            <ellipse cx="200" cy="200" rx="170" ry="62" fill="none" stroke="var(--cyan)" strokeWidth="1" opacity="0.55" />
            <circle cx="370" cy="200" r="6" fill="var(--cyan)" filter="url(#hero-orbit-glow)" />
          </g>
        </g>

        <g transform="rotate(60 200 200)">
          <g style={{ transformOrigin: "200px 200px", animation: "spinRev 19s linear infinite" }}>
            <ellipse cx="200" cy="200" rx="170" ry="62" fill="none" stroke="var(--violet)" strokeWidth="1" opacity="0.55" />
            <circle cx="30" cy="200" r="5.5" fill="var(--violet)" filter="url(#hero-orbit-glow)" />
          </g>
        </g>

        <g transform="rotate(120 200 200)">
          <g style={{ transformOrigin: "200px 200px", animation: "spinSlow 24s linear infinite" }}>
            <ellipse cx="200" cy="200" rx="170" ry="62" fill="none" stroke="var(--coral)" strokeWidth="1" opacity="0.55" />
            <circle cx="370" cy="200" r="5" fill="var(--coral)" filter="url(#hero-orbit-glow)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="physics-hero relative min-h-screen overflow-hidden">
      <div className="physics-hero__aura" aria-hidden="true" />
      <div className="physics-hero__grid-bg" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-16 pt-28 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="physics-hero__copy">
            <span className="physics-hero__eyebrow">
              <span className="physics-hero__pulse" />
              Interactive field guide to reality
            </span>

            <h1 className="physics-hero__title">
              <span>Reality</span>
              <span>runs on</span>
              <em>few equations.</em>
            </h1>

            <p className="physics-hero__lede">
              From the swing of a pendulum to the warp of spacetime, learn the
              fundamental laws of physics through clean visuals, plain language,
              and the elegant mathematics underneath.
            </p>

            <div className="physics-hero__cta">
              <Link href="#main-guide" className="btn-lime physics-hero__button">
                Start learning <span aria-hidden="true">-&gt;</span>
              </Link>
              <Link href="/series" className="btn-ghost physics-hero__button">
                Browse series
              </Link>
            </div>

            <div className="physics-hero__chips" aria-label="Site highlights">
              {["Concept-first", "Visual intuition", "Free forever"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="physics-hero__visual">
            <Orbit />
          </div>
        </div>
      </div>

      <div className="physics-hero__ticker" aria-hidden="true">
        <div>
          {[...equations, ...equations].map((equation, index) => (
            <span key={`${equation}-${index}`}>{equation}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
