import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium cinematic portfolio initialization sequence.
 * Sequence:
 *   0.0s – 0.5s: INITIALIZING PORTFOLIO
 *   0.5s – 1.0s: Countdown 3
 *   1.0s – 1.5s: Countdown 2
 *   1.5s – 2.0s: Countdown 1
 *   2.0s – 2.4s: LAUNCH (ignition)
 *   2.4s – 3.0s: Rocket liftoff with subtle trailing smoke
 *   3.0s – 3.4s: Fade away and reveal portfolio
 */
export default function LoadingScreen({
  portfolioMode = "developer",
  theme = "dark",
  onComplete,
  onReveal,
}) {
  // Store callbacks in mutable refs so changing prop references never re-trigger the timeline
  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onRevealRef.current = onReveal;
    onCompleteRef.current = onComplete;
  });

  // Idempotency guards to guarantee reveal and complete execute exactly once
  const revealedRef = useRef(false);
  const completedRef = useRef(false);

  const triggerReveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    document.body.style.overflow = ""; // Immediately release scroll lock for instant touch response
    if (window.lenis) {
      window.lenis.start();
    }
    onRevealRef.current?.();
  };

  const triggerComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onCompleteRef.current?.();
  };

  // Check prefers-reduced-motion
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Mode flags
  const isCosmic = portfolioMode === "developer" && theme === "dark";
  const isAcademic = portfolioMode === "academic";

  // Phases: 'init' -> 3 -> 2 -> 1 -> 'launch' -> 'flying' -> 'complete'
  const [phase, setPhase] = useState("init");
  const [countdown, setCountdown] = useState(null);

  // Freeze Lenis scrolling while loader is active
  useEffect(() => {
    if (window.lenis) {
      window.lenis.stop();
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, []);

  // Main timeline sequencer runs ONCE per mount lifecycle
  useEffect(() => {
    if (prefersReducedMotion) {
      // Reduced motion: quick init then reveal and complete directly
      const t0 = setTimeout(() => {
        triggerReveal();
      }, 300);
      const t1 = setTimeout(() => {
        setPhase("complete");
        triggerComplete();
      }, 650);
      return () => {
        clearTimeout(t0);
        clearTimeout(t1);
      };
    }

    if (isAcademic) {
      // Academic mode: sleek minimal progress compilation
      const t1 = setTimeout(() => setCountdown("3"), 500);
      const t2 = setTimeout(() => setCountdown("2"), 1000);
      const t3 = setTimeout(() => setCountdown("1"), 1500);
      const t4 = setTimeout(() => setPhase("launch"), 2000);
      const t5 = setTimeout(() => {
        setPhase("complete");
        triggerReveal();
      }, 2400);
      const t6 = setTimeout(() => {
        triggerComplete();
      }, 2950);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        clearTimeout(t5);
        clearTimeout(t6);
      };
    }

    // Developer Mode (Dark & Light) Rocket Launch Sequence (Slightly snappier on mobile)
    const isMobileDevice = typeof window !== "undefined" && window.innerWidth < 768;
    const t1 = setTimeout(() => {
      setPhase("countdown");
      setCountdown(3);
    }, isMobileDevice ? 380 : 500);

    const t2 = setTimeout(() => {
      setCountdown(2);
    }, isMobileDevice ? 760 : 1000);

    const t3 = setTimeout(() => {
      setCountdown(1);
    }, isMobileDevice ? 1140 : 1500);

    const t4 = setTimeout(() => {
      setPhase("launch");
      setCountdown(null);
    }, isMobileDevice ? 1520 : 2000);

    const t5 = setTimeout(() => {
      setPhase("flying");
    }, isMobileDevice ? 1820 : 2400);

    // Overlapping reveal: starts as rocket is ascending into upper screen
    const t6 = setTimeout(() => {
      setPhase("complete");
      triggerReveal();
    }, isMobileDevice ? 2100 : 2750);

    const t7 = setTimeout(() => {
      triggerComplete();
    }, isMobileDevice ? 2600 : 3350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, []); // Run ONCE on mount; guaranteed single execution

  // Subtle background stars for Dark Cosmic Mode (pure lightweight CSS dots)
  const cosmicStars = useMemo(() => {
    if (!isCosmic) return [];
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: `${(i * 37) % 98 + 1}%`,
      y: `${(i * 53) % 96 + 2}%`,
      size: (i % 3) * 0.7 + 1,
      opacity: 0.15 + (i % 4) * 0.08,
      delay: (i % 5) * 0.4,
    }));
  }, [isCosmic]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // Rocket smoke puffs for launch phase (reduced on mobile for buttery smooth liftoff)
  const smokeParticles = useMemo(() => {
    const count = isMobile ? 4 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      xOffset: (i % 2 === 0 ? 1 : -1) * ((i * 4) % 18 + 4),
      delay: i * 0.04,
      scale: 0.6 + (i % 3) * 0.4,
      yDrift: 20 + i * 8,
    }));
  }, [isMobile]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "complete" ? 0 : 1 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden ${
        isAcademic
          ? "bg-[#FAF6EE] text-[#111111]"
          : isCosmic
          ? "bg-[#030712] text-[#F5F7FA]"
          : "bg-slate-50 text-slate-900"
      }`}
      aria-live="polite"
      aria-label="Loading Portfolio"
    >
      {/* ── 1. BACKGROUND LAYERS ───────────────────────── */}
      {isCosmic && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle Deep Space Gradient Wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#040916] to-[#020512]" />

          {/* Delicate Top & Center Nebula Wash */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[90px] pointer-events-none" />

          {/* Lightweight Pinpoint Stars */}
          {cosmicStars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white pointer-events-none animate-pulse"
              style={{
                left: star.x,
                top: star.y,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDuration: `${2.5 + star.delay}s`,
              }}
            />
          ))}

          {/* Subtle Grid Accent */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #22D3EE 1px, transparent 1px), linear-gradient(to bottom, #22D3EE 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      )}

      {/* ── 2. ACADEMIC MODE RENDERER ─────────────────── */}
      {isAcademic ? (
        <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center font-serif">
          <div className="text-xs uppercase tracking-widest text-[#666666] font-mono mb-2">
            Curriculum Vitae &bull; Portfolio
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#111111] mb-1">
            Rohit Buddhe
          </h1>
          <p className="text-xs text-[#555555] italic mb-6">
            Computer Engineering &bull; Software Development
          </p>

          <div className="w-48 h-0.5 bg-[#D1D5DB] rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-[#111111]"
              initial={{ width: "0%" }}
              animate={{ width: phase === "complete" ? "100%" : "85%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </div>

          <div className="text-xs font-mono text-[#666666] tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#111111] animate-ping" />
            {phase === "complete" ? "Ready" : "Initializing Academic Record..."}
          </div>
        </div>
      ) : (
        /* ── 3. DEVELOPER MODE (DARK & LIGHT) RENDERER ──── */
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Top Status Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 dark:border-cyan-500/20 dark:bg-cyan-950/30 text-[11px] font-mono tracking-widest uppercase text-cyan-500 dark:text-[#22D3EE]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            INITIALIZING PORTFOLIO
          </motion.div>

          {/* Central Rocket Container */}
          <div className="relative w-32 h-44 flex items-center justify-center">
            {/* Rocket Ambient Glow (Dark Mode only) */}
            {isCosmic && (
              <motion.div
                animate={{
                  scale: phase === "launch" || phase === "flying" ? [1, 1.3, 1] : [0.9, 1.05, 0.9],
                  opacity: phase === "launch" || phase === "flying" ? 0.7 : 0.35,
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-24 h-32 bg-cyan-500/20 rounded-full blur-xl pointer-events-none"
              />
            )}

            {/* Rocket Motion Wrapper */}
            <motion.div
              className="relative flex flex-col items-center"
              initial={{ y: 0 }}
              animate={
                phase === "flying"
                  ? {
                      y: -window.innerHeight - 150,
                      transition: { duration: 0.65, ease: [0.6, 0.05, 0.9, 0.3] },
                    }
                  : phase === "launch"
                  ? {
                      y: [0, 2, -2, 1, 0],
                      transition: { duration: 0.35, repeat: Infinity },
                    }
                  : {
                      y: [0, -4, 0],
                      transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                    }
              }
            >
              {/* Sleek Minimal Rocket SVG */}
              <svg
                width="56"
                height="80"
                viewBox="0 0 56 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_12px_rgba(34,211,238,0.25)]"
              >
                <defs>
                  <linearGradient id="rocketHull" x1="28" y1="2" x2="28" y2="58" gradientUnits="userSpaceOnUse">
                    <stop stopColor={isCosmic ? "#0f172a" : "#f1f5f9"} />
                    <stop offset="0.5" stopColor={isCosmic ? "#1e293b" : "#e2e8f0"} />
                    <stop offset="1" stopColor={isCosmic ? "#090d16" : "#cbd5e1"} />
                  </linearGradient>

                  <linearGradient id="rocketFin" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#A78BFA" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#22D3EE" stopOpacity="0.8" />
                  </linearGradient>

                  <linearGradient id="rocketFlame" x1="28" y1="58" x2="28" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFFFF" />
                    <stop offset="0.3" stopColor="#22D3EE" />
                    <stop offset="0.7" stopColor="#38BDF8" />
                    <stop offset="1" stopColor="#818CF8" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Left Fin */}
                <path
                  d="M17 40 L6 56 C5 58 7 60 9 60 L17 56 Z"
                  fill="url(#rocketFin)"
                  stroke={isCosmic ? "rgba(167, 139, 250, 0.4)" : "#94a3b8"}
                  strokeWidth="1"
                />

                {/* Right Fin */}
                <path
                  d="M39 40 L50 56 C51 58 49 60 47 60 L39 56 Z"
                  fill="url(#rocketFin)"
                  stroke={isCosmic ? "rgba(167, 139, 250, 0.4)" : "#94a3b8"}
                  strokeWidth="1"
                />

                {/* Main Fuselage */}
                <path
                  d="M28 4 C28 4 41 20 41 50 L15 50 C15 20 28 4 28 4 Z"
                  fill="url(#rocketHull)"
                  stroke={isCosmic ? "#22D3EE" : "#0284c7"}
                  strokeWidth="1.5"
                />

                {/* Cyber Cockpit Viewport */}
                <circle
                  cx="28"
                  cy="26"
                  r="5"
                  fill={isCosmic ? "#22D3EE" : "#0284c7"}
                  className={isCosmic ? "shadow-inner" : ""}
                />
                <circle cx="28" cy="26" r="2.5" fill="#FFFFFF" opacity="0.85" />

                {/* Subtle Hull Center Panel Line */}
                <line
                  x1="28"
                  y1="35"
                  x2="28"
                  y2="47"
                  stroke={isCosmic ? "rgba(34, 211, 238, 0.4)" : "#0284c7"}
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />

                {/* Engine Nozzle */}
                <path
                  d="M22 50 L20 57 C20 58 21 58 22 58 L34 58 C35 58 36 58 36 57 L34 50 Z"
                  fill={isCosmic ? "#334155" : "#64748b"}
                  stroke={isCosmic ? "rgba(255, 255, 255, 0.2)" : "#475569"}
                  strokeWidth="0.8"
                />

                {/* Animated Engine Flame */}
                {(phase === "launch" || phase === "flying" || phase === "countdown" || phase === "init") && (
                  <motion.path
                    d="M22 58 Q28 78 28 78 Q28 78 34 58 Z"
                    fill="url(#rocketFlame)"
                    animate={
                      phase === "flying" || phase === "launch"
                        ? {
                            d: [
                              "M21 58 Q28 80 28 80 Q28 80 35 58 Z",
                              "M22 58 Q28 74 28 74 Q28 74 34 58 Z",
                              "M21 58 Q28 82 28 82 Q28 82 35 58 Z",
                            ],
                            scaleY: [1.2, 1.4, 1.2],
                            opacity: [0.95, 1, 0.95],
                          }
                        : {
                            scaleY: [0.6, 0.8, 0.6],
                            opacity: [0.5, 0.7, 0.5],
                          }
                    }
                    transition={{
                      duration: phase === "flying" || phase === "launch" ? 0.15 : 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ originX: "28px", originY: "58px" }}
                  />
                )}
              </svg>

              {/* Trailing Smoke / Particles during Launch & Liftoff */}
              {(phase === "launch" || phase === "flying") && (
                <div className="absolute top-[68px] left-1/2 -translate-x-1/2 pointer-events-none w-10 flex justify-center">
                  {smokeParticles.map((p) => (
                    <motion.span
                      key={p.id}
                      initial={{ opacity: 0.55, scale: 0.3, y: 0, x: 0 }}
                      animate={{
                        opacity: 0,
                        scale: p.scale * 1.8,
                        y: p.yDrift,
                        x: p.xOffset,
                      }}
                      transition={{
                        duration: 0.55,
                        delay: p.delay,
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatDelay: 0.1,
                      }}
                      className="absolute rounded-full blur-[2px]"
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: isCosmic ? "rgba(34, 211, 238, 0.35)" : "rgba(148, 163, 184, 0.4)",
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Dynamic Status / Countdown Container */}
          <div className="mt-8 h-12 flex items-center justify-center min-w-[200px]">
            <AnimatePresence mode="wait">
              {phase === "init" && (
                <motion.div
                  key="init-status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase flex items-center gap-2"
                >
                  <span>INITIALIZING SYSTEMS</span>
                  <span className="inline-flex">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
                  </span>
                </motion.div>
              )}

              {phase === "countdown" && countdown !== null && (
                <motion.div
                  key={`countdown-${countdown}`}
                  initial={{ opacity: 0, scale: 1.4, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.7, filter: "blur(2px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-cyan-400 dark:text-[#22D3EE]"
                >
                  {countdown}
                </motion.div>
              )}

              {(phase === "launch" || phase === "flying") && (
                <motion.div
                  key="launch-status"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.05 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl sm:text-2xl font-mono font-black tracking-widest uppercase bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent"
                >
                  LAUNCH
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}
