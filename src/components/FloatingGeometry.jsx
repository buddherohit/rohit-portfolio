import React from "react";

export default function FloatingGeometry() {
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none block md:hidden"
        aria-hidden="true"
        style={{ opacity: 0.10 }}
      >
        {/* Lightweight Mobile Orbital Ring (Pure GPU CSS transform, zero JS overhead) */}
        <div className="absolute top-[14%] right-[-8%] w-44 h-44 pointer-events-none">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full animate-spin-slower text-cyan-400/40"
            style={{ animationDuration: "70s" }}
          >
            {/* Delicate Tilted Orbital Ellipse */}
            <ellipse
              cx="100"
              cy="100"
              rx="76"
              ry="32"
              transform="rotate(-22 100 100)"
              className="stroke-cyan-400/50 fill-none"
              strokeWidth="0.9"
              strokeDasharray="4 6"
            />
            {/* Concentric Subtle Inner Ring */}
            <circle
              cx="100"
              cy="100"
              r="44"
              className="stroke-purple-400/40 fill-none"
              strokeWidth="0.7"
              strokeDasharray="2 5"
            />
            {/* 2 Subtle Orbital Nodes */}
            <circle cx="100" cy="24" r="2.2" className="fill-cyan-300" />
            <circle cx="152" cy="122" r="1.8" className="fill-purple-300" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none hidden md:block"
      aria-hidden="true"
      style={{ opacity: 0.16 }}
    >
      {/* ── Top-Right Complex Orbital Geometry ────────────────────── */}
      <div className="absolute top-[8%] right-[5%] sm:right-[12%] w-72 h-72 sm:w-96 sm:h-96 pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-spin-slower text-cyan-400/40"
          style={{ animationDuration: "60s" }}
        >
          {/* Central Subtle Core Glow */}
          <circle
            cx="200"
            cy="200"
            r="8"
            className="fill-cyan-400/60 blur-[2px]"
          />
          <circle cx="200" cy="200" r="3" className="fill-white" />

          {/* Primary Outer Tilted Orbital Ellipse */}
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="60"
            transform="rotate(-25 200 200)"
            className="stroke-cyan-400/50 fill-none"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />

          {/* Secondary Counter-Tilted Orbital Ellipse */}
          <ellipse
            cx="200"
            cy="200"
            rx="130"
            ry="45"
            transform="rotate(35 200 200)"
            className="stroke-purple-400/50 fill-none"
            strokeWidth="1"
            strokeDasharray="3 6"
          />

          {/* Concentric Wireframe Rings */}
          <circle
            cx="200"
            cy="200"
            r="90"
            className="stroke-cyan-300/30 fill-none"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          <circle
            cx="200"
            cy="200"
            r="170"
            className="stroke-purple-300/20 fill-none"
            strokeWidth="0.6"
          />

          {/* Orbiting Geometric Vertex Nodes */}
          <circle cx="200" cy="40" r="3" className="fill-cyan-300 shadow-sm" />
          <circle cx="200" cy="360" r="2.5" className="fill-purple-300" />
          <circle cx="40" cy="200" r="2" className="fill-teal-300" />
          <circle cx="360" cy="200" r="2.5" className="fill-cyan-300" />
          <circle cx="310" cy="120" r="2" className="fill-purple-300" />
          <circle cx="90" cy="280" r="2" className="fill-cyan-400" />
        </svg>
      </div>

      {/* ── Bottom-Left Orbital Rings & Radar Mesh ────────────────── */}
      <div className="absolute bottom-[10%] left-[2%] sm:left-[6%] w-80 h-80 sm:w-[440px] sm:h-[440px] pointer-events-none">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full animate-spin-slower text-purple-400/30"
          style={{ animationDuration: "85s", animationDirection: "reverse" }}
        >
          {/* Outer Ring */}
          <circle
            cx="200"
            cy="200"
            r="180"
            className="stroke-purple-400/30 fill-none"
            strokeWidth="0.8"
            strokeDasharray="4 8"
          />

          {/* Inner Hexagon Wireframe */}
          <polygon
            points="200,60 320,130 320,270 200,340 80,270 80,130"
            className="stroke-cyan-400/25 fill-none"
            strokeWidth="0.8"
            strokeDasharray="2 6"
          />

          {/* 3D Tilted Wireframe Ellipse */}
          <ellipse
            cx="200"
            cy="200"
            rx="170"
            ry="70"
            transform="rotate(60 200 200)"
            className="stroke-blue-400/35 fill-none"
            strokeWidth="1"
            strokeDasharray="8 6"
          />

          {/* Coordinate Crosshairs */}
          <line
            x1="200"
            y1="20"
            x2="200"
            y2="380"
            className="stroke-purple-400/20"
            strokeWidth="0.5"
            strokeDasharray="4 6"
          />
          <line
            x1="20"
            y1="200"
            x2="380"
            y2="200"
            className="stroke-cyan-400/20"
            strokeWidth="0.5"
            strokeDasharray="4 6"
          />

          {/* Glowing Constellation Nodes */}
          <circle cx="200" cy="60" r="3" className="fill-purple-300" />
          <circle cx="320" cy="130" r="2.5" className="fill-cyan-300" />
          <circle cx="320" cy="270" r="2.5" className="fill-purple-300" />
          <circle cx="200" cy="340" r="3" className="fill-blue-300" />
          <circle cx="80" cy="270" r="2.5" className="fill-cyan-300" />
          <circle cx="80" cy="130" r="2.5" className="fill-purple-300" />
        </svg>
      </div>

      {/* ── Mid-Screen Subtle Floating Coordinate Accents ──────────── */}
      <div className="absolute top-[45%] right-[2%] hidden lg:block pointer-events-none opacity-40">
        <svg viewBox="0 0 120 120" className="w-28 h-28 text-cyan-400/40">
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
