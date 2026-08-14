export default function LandingPageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-bg-hero font-lexend select-none">
      {/* ANIMATED SPINNER CONTAINER */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Spinning Ring */}
        <div className="absolute inset-0 rounded-full border-[3px] border-white/10 border-t-white animate-spin" />

        {/* Inner Counter-Spinning Ring */}
        <div className="absolute inset-2 rounded-full border-2 border-white/5 border-b-white/60 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />

        {/* Glowing Center Core */}
        <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
      </div>

      {/* TYPOGRAPHY OVERLAY */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <span className="text-xs uppercase tracking-[0.35em] text-white/80 font-medium animate-pulse">
          Preparing your path...
        </span>

        {/* Ambient Loading Bar Decorator */}
        <div className="h-px w-12 bg-linear-to-r from-transparent via-white/40 to-transparent mt-1" />
      </div>
    </div>
  );
}
