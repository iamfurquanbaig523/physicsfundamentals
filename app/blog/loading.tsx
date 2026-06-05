"use client";

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`skeleton-bar rounded ${className}`} />;
}

function SkeletonPill({ className = "" }: { className?: string }) {
  return (
    <div
      className={`skeleton-bar rounded-full ${className}`}
    />
  );
}

function SkeletonCard() {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-[#E0E5F0] flex flex-col justify-between"
      style={{ background: "rgba(11, 18, 39, 0.9)", minHeight: "280px" }}
    >
      {/* Image area */}
      <div className="aspect-[16/8] border-b border-[#E0E5F0] bg-[#F1F4FB]">
        <div className="skeleton-bar h-full w-full" />
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        {/* Tag + read time row */}
        <div className="flex items-center justify-between mb-4">
          <SkeletonBar className="h-[18px] w-16 rounded-[3px]" />
          <SkeletonBar className="h-3 w-14" />
        </div>

        {/* Title */}
        <SkeletonBar className="h-4 w-[85%] mb-2" />
        <SkeletonBar className="h-4 w-[55%] mb-4" />

        {/* Excerpt lines */}
        <SkeletonBar className="h-3 w-full mb-1.5" />
        <SkeletonBar className="h-3 w-[90%] mb-1.5" />
        <SkeletonBar className="h-3 w-[60%]" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-6 pt-4 border-t border-[#E0E5F0]">
        <SkeletonBar className="h-3 w-20" />
        <SkeletonBar className="h-3 w-14" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main data-route-loading="true">
      {/* â”€â”€ Hero header â”€â”€ */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: "40%",
            width: "500px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(0,180,216,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Tag chip */}
          <SkeletonPill className="h-6 w-24" />

          {/* Large multi-line title */}
          <div className="mt-5 space-y-2">
            <SkeletonBar className="h-12 w-32 rounded-md sm:h-16 sm:w-44" />
            <SkeletonBar className="h-12 w-72 rounded-md sm:h-16 sm:w-[26rem]" />
            <SkeletonBar className="h-12 w-28 rounded-md sm:h-16 sm:w-36" />
          </div>

          {/* Subtitle paragraph */}
          <div className="mt-5 max-w-md space-y-2">
            <SkeletonBar className="h-3.5 w-full" />
            <SkeletonBar className="h-3.5 w-[90%]" />
            <SkeletonBar className="h-3.5 w-[65%]" />
          </div>
        </div>
      </section>

      {/* â”€â”€ Sticky category filter bar â”€â”€ */}
      <div
        className="border-y border-[#E0E5F0] sticky top-16 z-40"
        style={{
          background: "rgba(3, 0, 20, 0.78)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 16px 42px rgba(0,0,0,0.18), inset 0 1px 0 rgba(103,232,249,0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {/* Active pill (accent color shimmer) */}
          <SkeletonPill className="h-7 w-12 shrink-0 !bg-[#00B4D8]/20" />
          <SkeletonPill className="h-7 w-[96px] shrink-0 border border-[#E0E5F0]" />
          <SkeletonPill className="h-7 w-[80px] shrink-0 border border-[#E0E5F0]" />
          <SkeletonPill className="h-7 w-[72px] shrink-0 border border-[#E0E5F0]" />
          <SkeletonPill className="h-7 w-[88px] shrink-0 border border-[#E0E5F0]" />
          <SkeletonPill className="h-7 w-[64px] shrink-0 border border-[#E0E5F0]" />
          <SkeletonPill className="h-7 w-[56px] shrink-0 border border-[#E0E5F0]" />
        </div>
      </div>

      {/* â”€â”€ Article cards grid â”€â”€ */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
