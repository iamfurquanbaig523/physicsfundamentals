"use client";

export default function Loading() {
  return (
    <main data-route-loading="true" className="min-h-screen bg-[#FAFBFD] text-[#1A1B4B]">
      <section className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 grid-bg opacity-100 pointer-events-none" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
          <div>
            <SkeletonBar className="h-6 w-48 rounded-sm" />
            <div className="mt-6 space-y-3">
              <SkeletonBar className="h-12 w-64 sm:h-16 sm:w-80" />
              <SkeletonBar className="h-12 w-72 sm:h-16 sm:w-96" />
              <SkeletonBar className="h-12 w-56 sm:h-16 sm:w-72" />
            </div>
            <div className="mt-7 max-w-md space-y-2">
              <SkeletonBar className="h-4 w-full" />
              <SkeletonBar className="h-4 w-5/6" />
              <SkeletonBar className="h-4 w-2/3" />
            </div>
            <div className="mt-8 flex gap-3">
              <SkeletonBar className="h-12 w-44 rounded-full !bg-[#00B4D8]/30" />
              <SkeletonBar className="h-12 w-36 rounded-full" />
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              <SkeletonBar className="h-7 w-36 rounded-full" />
              <SkeletonBar className="h-7 w-32 rounded-full" />
              <SkeletonBar className="h-7 w-28 rounded-full" />
            </div>
          </div>

          <div className="flex min-h-[420px] items-center justify-center">
            <div className="loading-orbit-skeleton" aria-hidden="true">
              <span className="loading-orbit-glow" />
              <span className="loading-orbit-core" />
              <span className="loading-orbit-ring loading-orbit-ring-a" />
              <span className="loading-orbit-ring loading-orbit-ring-b" />
              <span className="loading-orbit-ring loading-orbit-ring-c" />
              <span className="loading-orbit-particle loading-orbit-particle-a" />
              <span className="loading-orbit-particle loading-orbit-particle-b" />
              <span className="loading-orbit-particle loading-orbit-particle-c" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E0E5F0] py-14">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <SkeletonBar className="h-6 w-20 rounded-sm" />
          <SkeletonBar className="mt-5 h-10 w-full max-w-md" />
          <div className="mt-10 overflow-hidden rounded-lg border border-[#E0E5F0]">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="grid grid-cols-[52px_minmax(0,1fr)] border-b border-[#E0E5F0] last:border-b-0">
                <div className="border-r border-[#E0E5F0] p-4">
                  <SkeletonBar className="h-3 w-5" />
                </div>
                <div className="p-4">
                  <SkeletonBar className="h-5 w-3/4" />
                  <SkeletonBar className="mt-3 h-3 w-full" />
                  <SkeletonBar className="mt-2 h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SkeletonBar({ className = "" }: { className?: string }) {
  return <div className={`skeleton-bar rounded ${className}`} />;
}
