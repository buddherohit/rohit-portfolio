import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";

export default function Skills() {
  // Row 1: Languages & Core Engineering
  const row1 = useMemo(
    () => [
      {
        name: "Java",
        category: "Language · OOP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
      {
        name: "Python",
        category: "AI · Scripting",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "C++",
        category: "DSA · Systems",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      },
      {
        name: "JavaScript",
        category: "Full Stack",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        category: "Typed JS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "C",
        category: "Low-Level",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      },
      {
        name: "SQL",
        category: "Relational DB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg",
      },
      {
        name: "HTML5",
        category: "Web Markup",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        category: "Modern Styling",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
    ],
    []
  );

  // Row 2: Frameworks, Web & AI
  const row2 = useMemo(
    () => [
      {
        name: "React",
        category: "UI Library",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js 15",
        category: "Full Stack",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      },
      {
        name: "Node.js",
        category: "Runtime",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        category: "Backend API",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "Tailwind CSS",
        category: "CSS Framework",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
      {
        name: "OpenCV",
        category: "Computer Vision",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
      },
      {
        name: "Gemini AI",
        category: "LLM · GenAI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
      },
      {
        name: "MediaPipe",
        category: "Vision & Gesture",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "Monaco Editor",
        category: "Code Engine",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
    ],
    []
  );

  // Row 3: Databases, Cloud & DevOps
  const row3 = useMemo(
    () => [
      {
        name: "Docker",
        category: "Containers",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      },
      {
        name: "PostgreSQL",
        category: "Relational DB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "MongoDB",
        category: "NoSQL DB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "MySQL",
        category: "SQL Database",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "Git",
        category: "Version Control",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        category: "Collaboration",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
      },
      {
        name: "Linux",
        category: "Environment",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      },
      {
        name: "Vite",
        category: "Build Tool",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
      },
      {
        name: "Postman",
        category: "API Testing",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
      {
        name: "Firebase",
        category: "Cloud Backend",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
    ],
    []
  );

  const TechChip = ({ item }) => (
    <div className="inline-flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-white/85 dark:bg-slate-900/75 border border-slate-200/90 dark:border-slate-800/80 backdrop-blur-md shadow-xs hover:shadow-lg dark:hover:shadow-[0_0_22px_rgba(34,211,238,0.18)] hover:border-cyan-500/50 dark:hover:border-cyan-400/50 hover:bg-slate-50/90 dark:hover:bg-slate-800/90 transition-all duration-300 group cursor-default select-none shrink-0 mx-2">
      <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shrink-0">
        <img
          src={item.icon}
          alt={item.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col text-left">
        <span className="text-sm sm:text-base font-semibold text-[#111827] dark:text-[#F5F7FA] tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
          {item.name}
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#6B7280] dark:text-[#94A3B8] leading-tight mt-0.5">
          {item.category}
        </span>
      </div>
    </div>
  );

  return (
    <section className="relative isolate py-10 sm:py-14 overflow-hidden">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-cyan-200/20 dark:bg-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Short, Professional Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-10 pb-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0891B2] dark:text-[#22D3EE] font-semibold">
              Tech Stack
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display mt-1">
              Technologies &amp; Tools
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-mono text-[#6B7280] dark:text-[#94A3B8]">
            Core • Full-Stack • Cloud &amp; AI
          </span>
        </div>

        {/* Multi-Row Infinite Horizontal Marquee Ticker */}
        <div className="space-y-4 sm:space-y-5 relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          {/* Track 1: Languages & Core (Moves Left - Only this row pauses on hover) */}
          <div className="overflow-hidden py-1 marquee-row">
            <div className="animate-marquee-left">
              {[...row1, ...row1].map((item, idx) => (
                <TechChip key={`row1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Track 2: Frameworks & AI (Moves Right - Only this row pauses on hover) */}
          <div className="overflow-hidden py-1 marquee-row">
            <div className="animate-marquee-right">
              {[...row2, ...row2].map((item, idx) => (
                <TechChip key={`row2-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Track 3: DevOps, DBs & Cloud (Moves Left - Only this row pauses on hover) */}
          <div className="overflow-hidden py-1 marquee-row">
            <div className="animate-marquee-left">
              {[...row3, ...row3].map((item, idx) => (
                <TechChip key={`row3-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Footer Hint */}
        <div className="mt-6 text-center text-xs text-[#94A3B8] dark:text-[#64748B] flex items-center justify-center gap-2 font-mono">
          <Terminal className="w-3.5 h-3.5 text-cyan-500" />
          <span>Hover on any row to pause</span>
        </div>
      </div>
    </section>
  );
}
