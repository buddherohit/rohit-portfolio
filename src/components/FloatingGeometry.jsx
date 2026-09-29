import React from "react";

export default function FloatingGeometry() {
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

  if (isMobile) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none hidden md:block"
      aria-hidden="true"
      style={{ opacity: 0.12 }}
    >
      {/* ── Mid-Screen Subtle Floating Coordinate Accents ──────────── */}
      <div className="absolute top-[55%] right-[2%] hidden lg:block pointer-events-none opacity-30">
        <svg viewBox="0 0 120 120" className="w-24 h-24 text-cyan-400/40">
          <circle
            cx="60"
            cy="60"
            r="50"
            className="stroke-cyan-400/30 fill-none"
            strokeWidth="0.8"
            strokeDasharray="3 5"
          />
          <circle
            cx="60"
            cy="60"
            r="30"
            className="stroke-purple-400/30 fill-none"
            strokeWidth="0.8"
          />
          <circle cx="60" cy="10" r="2" className="fill-cyan-300" />
          <circle cx="110" cy="60" r="2" className="fill-purple-300" />
        </svg>
      </div>
    </div>
  );
}
