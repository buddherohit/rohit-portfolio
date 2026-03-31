import React, { useRef, useCallback } from "react";

export default function FloatingShape({
  size = 56,
  className = "",
  logoText = "RB",
  logoSrc,
}) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 16;
    const rotateX = (0.5 - y) * 16;

    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg)";
  }, []);

  const px = typeof size === "number" ? `${size}px` : String(size);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ width: px, height: px }}
      className={`group relative rounded-xl bg-[#0B1220]/90 overflow-hidden flex items-center justify-center animate-float shadow-[0_8px_30px_rgba(34,211,238,0.10)] hover:shadow-[0_10px_36px_rgba(56,189,248,0.18)] backdrop-blur-sm border border-cyan-400/15 transition-all duration-300 ${className}`}
      aria-label="Floating logo"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.25),rgba(13,17,23,0)_60%)] animate-glow" />

      {/* Highlight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/6 via-transparent to-transparent opacity-70" />

      {/* Rotating Ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute w-[115%] h-[115%] animate-spin-slower"
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67E8F9" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#ring)"
          strokeWidth="2"
          opacity="0.9"
        />

        <circle
          cx="50"
          cy="50"
          r="32"
          fill="none"
          stroke="#0B1220"
          strokeWidth="10"
          opacity="0.5"
        />
      </svg>

      {/* Orbit Dot */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-[82%] h-[82%] animate-spin-slower">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.8)] opacity-90" />
        </div>
      </div>

      {/* Inner Gradient */}
      <div className="absolute inset-2 rounded-[10px] bg-gradient-to-br from-cyan-500/10 via-sky-400/5 to-transparent" />

      {/* Logo */}
      {logoSrc ? (
        <img
          src={logoSrc}
          alt="logo"
          className="relative z-[1] w-2/3 h-2/3 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.35)]"
        />
      ) : (
        <span className="relative z-[1] text-[#E2E8F0] text-base md:text-sm font-semibold tracking-wider">
          <span className="bg-gradient-to-br from-[#E0F2FE] to-[#67E8F9] bg-clip-text text-transparent">
            {logoText}
          </span>
        </span>
      )}
    </div>
  );
}