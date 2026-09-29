import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import DecryptText from "../components/DecryptText";
import LocationTimeCard from "../components/LocationTimeCard";

// ============================================================================
// Official Tech Stack SVG Icons
// ============================================================================

const JavaIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M8.85 17.82c1.78.22 3.84.18 5.6-.1 1.76-.28 3.52-.84 3.52-.84s-.98.7-2.6 1.15c-2.3.64-5.22.68-7.52.12-.92-.22-1.3-.43-1.3-.43s.52-.12 2.3.1zm-.58-2.68c1.32.18 2.82.16 4.14-.07 1.3-.23 2.58-.69 2.58-.69s-.72.58-1.92.95c-1.7.53-3.88.56-5.58.1-.68-.19-.96-.36-.96-.36s.38-.1 1.74.07zm9.64-3.12s.98.78.02 1.54c-1.16.92-3.32 1.48-5.74 1.7-2.42.22-4.9-.06-6.62-.64-1.36-.46-1.52-.88-1.52-.88s.46.22 1.66.46c2.04.4 4.54.48 6.94.2 2.4-.28 4.36-.94 4.88-1.54.42-.5-.12-.84-.12-.84s.34.02.5.06zm-6.2-7.82c.4 1.34-.38 2.68-1.12 3.66-.74.98-1.54 1.88-1.78 3.12-.28 1.44.22 2.92.86 4.2.14.28-.24.5-.4.24-.74-1.18-1.1-2.62-.9-4.04.2-1.42 1.04-2.52 1.8-3.64.76-1.12 1.28-2.28 1.18-3.58-.02-.28.32-.22.36.04zm4.4 3.12c.32 1.06-.3 2.12-.9 2.9-.6.78-1.22 1.5-1.42 2.48-.22 1.14.18 2.32.68 3.34.12.22-.2.4-.32.2-.6-1-.88-2.1-.72-3.22.16-1.14.82-2.02 1.44-2.9.6-.9 1.02-1.82.94-2.86-.02-.22.26-.18.3.06z"
      fill="#EA2D2E"
    />
    <path
      d="M14.6 21.4c4.32-.4 7.4-2.2 7.4-4.4 0-1.82-2.1-3.38-5.32-4.1-.38-.08-.72.2-.7.6.02.38.34.66.72.74 2.64.6 4.3 1.8 4.3 2.76 0 1.46-2.58 2.82-6.4 3.16-1.92.18-3.92.08-5.74-.26-1.82-.34-3.4-.94-4.32-1.74-.9-1.04-.3-2.12 1.18-2.94.34-.18.44-.62.24-.96-.18-.34-.62-.44-.96-.24-2.02 1.14-2.8 2.78-1.56 4.22 1.18 1.04 3.08 1.76 5.24 2.16 2.06.38 4.14.48 6.12.36z"
      fill="#007396"
    />
  </svg>
);

const PythonIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path
      d="M11.91 2c-5.26 0-4.94 2.28-4.94 2.28l.01 2.36h5.03v.71H4.95S2 7.02 2 12.31c0 5.28 2.58 5.12 2.58 5.12h1.54v-2.15s-.08-2.58 2.53-2.58h4.35s2.45.04 2.45-2.42V4.42S15.86 2 11.91 2zm-1.42 1.48a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9z"
      fill="#3776AB"
    />
    <path
      d="M12.09 22c5.26 0 4.94-2.28 4.94-2.28l-.01-2.36h-5.03v-.71h7.06s2.95.33 2.95-4.96c0-5.28-2.58-5.12-2.58-5.12h-1.54v2.15s.08 2.58-2.53 2.58h-4.35s-2.45-.04-2.45 2.42v8.16S8.14 22 12.09 22zm1.42-1.48a.95.95 0 1 1 0-1.9.95.95 0 0 1 0 1.9z"
      fill="#FFD438"
    />
  </svg>
);

const ReactIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <ellipse
      cx="12"
      cy="12"
      rx="4.2"
      ry="10"
      transform="rotate(30 12 12)"
      stroke="#61DAFB"
      strokeWidth="1.5"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="4.2"
      ry="10"
      transform="rotate(90 12 12)"
      stroke="#61DAFB"
      strokeWidth="1.5"
    />
    <ellipse
      cx="12"
      cy="12"
      rx="4.2"
      ry="10"
      transform="rotate(150 12 12)"
      stroke="#61DAFB"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
  </svg>
);

const NextjsIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <circle cx="12" cy="12" r="11" fill="currentColor" className="text-slate-900 dark:text-white" />
    <path
      d="M17.2 17.5L9.2 7.2H7.6V16.8H9.1V9.5L16.2 17.5h1z"
      fill="white"
      className="dark:fill-slate-950"
    />
    <path
      d="M15 7.2h1.5v5.5H15z"
      fill="white"
      className="dark:fill-slate-950"
    />
  </svg>
);

const NodejsIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z"
      fill="#339933"
    />
    <path
      d="M12 4.3L5.34 8.15v7.7L12 19.7l6.66-3.85v-7.7L12 4.3z"
      fill="#5FA04E"
    />
    <path
      d="M12 8.5a3.5 3.5 0 00-3.5 3.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5c0-1.93-1.57-3.5-3.5-3.5zm0 5.5a2 2 0 110-4 2 2 0 010 4z"
      fill="white"
    />
  </svg>
);

const GitIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M21.7 10.74L13.26 2.3a1.8 1.8 0 00-2.54 0L8.8 4.22l3.22 3.22a2.13 2.13 0 012.7 2.7l3.1 3.1a2.13 2.13 0 11-1.28 1.25l-2.9-2.9v4.36a2.14 2.14 0 11-1.8 0V11.4a2.13 2.13 0 01-1.16-2.8L7.52 5.5.3 12.72a1.8 1.8 0 000 2.54l8.44 8.44a1.8 1.8 0 002.54 0l10.42-10.42a1.8 1.8 0 000-2.54z"
      fill="#F05032"
    />
  </svg>
);

const DockerIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M13.98 11.08h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm7.2-2.4h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm-2.4 0h1.8v1.8h-1.8zm4.8-2.4h1.8v1.8h-1.8zm4.8 4.8c.24-.96.96-1.56 1.8-1.68.72-.12 1.56.12 2.04.6.12.12.12.36 0 .48-.84.84-1.2 1.92-.96 3.12.24 1.2 1.08 2.04 2.16 2.4.24.12.36.36.24.6-.96 1.8-2.64 3-4.56 3.24-5.04.6-9.72-2.16-11.4-6.6-.24-.6-.36-1.32-.48-1.92h14.88c.36 0 .6-.24.6-.6 0-.24-.24-.48-.6-.48H1.38c-.36 0-.6.24-.6.6 0 1.92.36 3.72 1.08 5.4 1.92 4.44 6.24 7.44 11.16 7.44 2.28 0 4.44-.6 6.36-1.8 1.92-1.2 3.36-3 4.08-5.04.12-.36-.12-.72-.48-.72h-.6c-1.32 0-2.4-.72-2.88-1.92-.36-.96-.24-2.04.36-2.88.12-.24.12-.48 0-.6z"
      fill="#2496ED"
    />
  </svg>
);

const GoIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path
      d="M1.5 12.2c0-1.8.8-3.4 2.2-4.5.3-.2.7-.2 1 .1.2.3.2.7-.1 1-1.1.9-1.7 2.1-1.7 3.5 0 2.5 1.9 4.6 4.4 4.8v-3H5.8c-.4 0-.7-.3-.7-.7s.3-.7.7-.7h2.8c.4 0 .7.3.7.7v4.4c0 .4-.3.7-.7.7-3.3-.2-5.8-2.9-5.8-6.3zm13.1-4.9c-.4 0-.7.3-.7.7v8.2c0 .4.3.7.7.7s.7-.3.7-.7V8c0-.4-.3-.7-.7-.7zm4.7 0c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 8.4c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"
      fill="#00ADD8"
    />
  </svg>
);

// ============================================================================
// Single Revolving Tech Icon (Exact Hynts Specification)
// ============================================================================

function HyntsOrbitIcon({
  icon: IconComponent,
  name,
  duration,
  radius,
  angle,
  reverse = false,
}) {
  return (
    <div
      className={`animate-orbit ${reverse ? "[animation-direction:reverse]" : ""} absolute flex w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] items-center justify-center border-none bg-transparent pointer-events-auto cursor-pointer group`}
      style={{
        "--duration": duration,
        "--radius": radius,
        "--angle": angle,
        "--icon-size": "48px",
      }}
    >
      <div className="relative flex items-center justify-center w-full h-full rounded-xl sm:rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_22px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:border-cyan-500/50">
        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
        
        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 px-2.5 py-0.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
          {name}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// Hero Component (Exact Hynts Architecture, Geometry & Proportions)
// ============================================================================

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element && window.lenis) {
      window.lenis.scrollTo(element, {
        offset: -80,
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pb-28 bg-white dark:bg-transparent text-black dark:text-white overflow-hidden min-h-[650px] flex items-center justify-center">
      {/* ── BACKGROUND ORBITS & GLOW (EXACT HYNTS TRANSLATION SPEC) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 translate-y-[280px] md:translate-y-[520px]">
        {/* Violet / Cyan Centre Glow */}
        <div className="absolute w-[350px] h-[350px] md:w-[850px] md:h-[850px] rounded-full bg-gradient-to-r from-violet-600/10 via-fuchsia-600/5 to-cyan-500/10 blur-[90px] md:blur-[150px] opacity-85 dark:opacity-65" />

        {/* Orbit container */}
        <div className="relative w-[1500px] h-[1500px] flex items-center justify-center">
          {/* Visible orbit paths */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            className="pointer-events-none absolute inset-0 w-full h-full"
          >
            <circle
              className="stroke-black/10 stroke-1 dark:stroke-white/10"
              cx="50%"
              cy="50%"
              r="260"
              fill="none"
            />
            <circle
              className="stroke-black/10 stroke-1 dark:stroke-white/10"
              cx="50%"
              cy="50%"
              r="480"
              fill="none"
            />
            <circle
              className="stroke-black/10 stroke-1 dark:stroke-white/10"
              cx="50%"
              cy="50%"
              r="720"
              fill="none"
            />
          </svg>

          {/* ── Inner Ring (radius=260, duration=25s, 4 icons, Horizontal Flow) ── */}
          <HyntsOrbitIcon icon={JavaIcon} name="Java" duration={25} radius={260} angle={0} />
          <HyntsOrbitIcon icon={ReactIcon} name="React" duration={25} radius={260} angle={90} />
          <HyntsOrbitIcon icon={NextjsIcon} name="Next.js" duration={25} radius={260} angle={180} />
          <HyntsOrbitIcon icon={NodejsIcon} name="Node.js" duration={25} radius={260} angle={270} />

          {/* ── Middle Ring (radius=480, duration=35s, 6 icons, Reverse Horizontal Flow) ── */}
          <HyntsOrbitIcon icon={PythonIcon} name="Python" duration={35} radius={480} angle={0} reverse />
          <HyntsOrbitIcon icon={GitIcon} name="Git" duration={35} radius={480} angle={60} reverse />
          <HyntsOrbitIcon icon={DockerIcon} name="Docker" duration={35} radius={480} angle={120} reverse />
          <HyntsOrbitIcon icon={GoIcon} name="Golang" duration={35} radius={480} angle={180} reverse />
          <HyntsOrbitIcon icon={ReactIcon} name="React 19" duration={35} radius={480} angle={240} reverse />
          <HyntsOrbitIcon icon={JavaIcon} name="Core Java" duration={35} radius={480} angle={300} reverse />

          {/* ── Outer Ring (radius=720, duration=45s, 8 icons, Outer Sweeping Flow) ── */}
          <HyntsOrbitIcon icon={NextjsIcon} name="Next.js 15" duration={45} radius={720} angle={0} />
          <HyntsOrbitIcon icon={NodejsIcon} name="Node.js" duration={45} radius={720} angle={45} />
          <HyntsOrbitIcon icon={PythonIcon} name="Python ML" duration={45} radius={720} angle={90} />
          <HyntsOrbitIcon icon={GitIcon} name="Git & GitHub" duration={45} radius={720} angle={135} />
          <HyntsOrbitIcon icon={DockerIcon} name="Containers" duration={45} radius={720} angle={180} />
          <HyntsOrbitIcon icon={JavaIcon} name="Spring / Java" duration={45} radius={720} angle={225} />
          <HyntsOrbitIcon icon={GoIcon} name="Go Microservices" duration={45} radius={720} angle={270} />
          <HyntsOrbitIcon icon={ReactIcon} name="Modern Frontend" duration={45} radius={720} angle={315} />
        </div>
      </div>

      {/* ── HERO CONTENT (EXACT HYNTS PROPORTIONAL TYPOGRAPHY & SPACING) ── */}
      <div className="container mx-auto text-center px-4 mt-5 relative z-10 -translate-y-4 md:-translate-y-[35px]">
        {/* Top Eyebrow Pill */}
        <motion.div
          className="inline-flex items-center gap-1.5 border border-gray-200/80 dark:border-white/10 rounded-full px-3 py-1.5 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm mb-4 select-none"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Sparkles className="w-3 h-3 text-[#0891B2] dark:text-[#22D3EE]" />
          <span className="text-gray-600 dark:text-white/60 text-[10px] md:text-[11px] font-mono">
            Available for Opportunities • Nagpur, India
          </span>
        </motion.div>

        {/* Headline (Hynts proportional: clean, impactful, balanced) */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-display mb-4 max-w-3xl mx-auto leading-tight text-black dark:text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Rohit <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 dark:from-[#22D3EE] dark:via-[#A78BFA] dark:to-[#67E8F9] bg-clip-text text-transparent">Buddhe</span>
          <br />
          <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-gray-100">
            <DecryptText
              values={[
                "A Full Stack Developer",
                "A Software Engineer",
                "Building Scalable Web & AI Systems",
                "A Problem Solver",
              ]}
              delay={3000}
            />
          </span>
        </motion.h1>

        {/* Subheading (Hynts exact scale: text-xs md:text-sm max-w-2xl) */}
        <motion.p
          className="text-xs md:text-sm font-sans text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Computer Engineering student at Yeshwantrao Chavan College of Engineering, Nagpur,
          building production-ready full-stack software, scalable microservices, and AI-driven platforms with clean architecture.
        </motion.p>

        {/* CTA (Mobile-optimized, sleek Hynts buttons) */}
        <motion.div
          className="flex flex-row items-center justify-center gap-2.5 sm:gap-3.5 mb-5 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Primary Button */}
          <button
            onClick={() => scrollToSection("contact")}
            className="group inline-flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white px-4.5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Contact me!</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Secondary Button */}
          <button
            onClick={() => scrollToSection("projects")}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5.5 sm:py-3 rounded-full border border-gray-300/80 dark:border-white/15 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-800 dark:text-white font-semibold text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-white/10 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Explore Projects</span>
          </button>
        </motion.div>

        {/* Live Location & Time */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <LocationTimeCard compact />
        </motion.div>
      </div>
    </section>
  );
}
