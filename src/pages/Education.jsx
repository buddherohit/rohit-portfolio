import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Calendar,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function Education() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.05 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    []
  );

  const EDUCATION_DATA = useMemo(
    () => [
      {
        id: "btech-ycce",
        icon: GraduationCap,
        category: "Undergraduate Degree",
        degree: "Bachelor of Technology",
        major: "Computer Science and Engineering",
        institution: "Yeshwantrao Chavan College of Engineering",
        shortInst: "YCCE",
        location: "Nagpur, Maharashtra",
        year: "2025 - Present",
        duration: "In Progress",
        badge: "Autonomous Institute • Direct Second Year (DSY)",
        status: "In Progress",
        progress: 60,
        summary:
          "Pursuing B.Tech through Direct Second Year (DSY). Focusing on advanced software engineering, distributed systems, and emerging technologies.",
        details:
          "Comprehensive engineering curriculum covering advanced data structures, system architecture, operating systems, database management, and enterprise application design.",
        highlights: [
          "Direct Second Year (DSY) merit admission in CSE",
          "Advanced Algorithms, Software Architecture & Distributed Systems",
          "Active participant in national hackathons & technical design sprints",
          "Building production-ready software alongside academic curriculum",
        ],
        tags: [
          "Java",
          "DSA",
          "System Architecture",
          "Operating Systems",
          "DBMS",
          "AI/ML",
        ],
        accent: "#0891B2", // Cyan / Electric Blue
        linkLabel: "View Institution",
        linkHref: "https://www.ycce.edu",
      },
      {
        id: "diploma-csit",
        icon: BookOpen,
        category: "Technical Diploma",
        degree: "Diploma in Computer Engineering",
        major: "Computer Science and Engineering",
        institution: "C.S. Institute of Technology",
        shortInst: "CSIT (MSBTE)",
        location: "Deori, Maharashtra",
        year: "2022 - 2025",
        duration: "Completed",
        badge: "MSBTE Board • Graduated with Distinction",
        status: "Completed",
        progress: 100,
        summary:
          "Completed comprehensive 3-year technical diploma program covering computer fundamentals, programming, networking, and database management.",
        details:
          "Built a rigorous foundation in Object-Oriented Programming with Java & C++, relational databases with SQL, web development fundamentals, and network architectures.",
        highlights: [
          "Graduated with Distinction under Maharashtra State Board (MSBTE)",
          "Core foundation in C, C++, Java, OOP & Algorithmic Logic",
          "Built multiple practical academic projects and software prototypes",
          "Lead peer technical discussions and collaborative coding sessions",
        ],
        tags: [
          "C / C++",
          "Java OOP",
          "SQL & Relational DB",
          "Web Basics",
          "Networking",
        ],
        accent: "#10b981", // Emerald Green
        linkLabel: "Academic Record",
        linkHref: "#education",
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(EDUCATION_DATA[0].id);
  const [interacting, setInteracting] = useState(false);

  // Smooth idle rotation matching Experience & Achievements
  useEffect(() => {
    if (interacting) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const timer = setInterval(() => {
      setActiveId((prev) => {
        const idx = EDUCATION_DATA.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % EDUCATION_DATA.length;
        return EDUCATION_DATA[nextIdx].id;
      });
    }, 4200);

    return () => clearInterval(timer);
  }, [interacting, EDUCATION_DATA]);

  const handleSelect = useCallback((id) => {
    setActiveId(id);
  }, []);

  return (
    <section
      id="education"
      className="relative isolate py-12 sm:py-16 overflow-hidden"
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-200/10 dark:bg-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-emerald-200/10 dark:bg-emerald-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header: clean, compact, proportional matching Experience & Achievements */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-10 sm:mb-12 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#0891B2] dark:text-[#22D3EE] font-semibold">
              Academic Background
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#111827] dark:text-[#F5F7FA] mt-0.5 tracking-tight">
              Education Journey
            </h2>
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-[#6B7280] dark:text-[#94A3B8]">
            Degree • Polytechnic Diploma • Engineering Foundation
          </span>
        </div>

        {/* Vertical Timeline with Experience-Style Cards */}
        <motion.div
          className="relative z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Vertical Connector Line */}
          <div className="absolute left-4 sm:left-7 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500/40 via-teal-500/30 to-emerald-500/20 dark:from-cyan-400/30 dark:via-teal-400/20 dark:to-emerald-400/10" />

          <div className="space-y-6 sm:space-y-8">
            {EDUCATION_DATA.map((item) => {
              const Icon = item.icon;
              const active = item.id === activeId;

              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative pl-10 sm:pl-18"
                >
                  {/* Timeline Indicator Node with Dynamic Accent Glow */}
                  <div className="absolute left-2 sm:left-[21px] top-6 z-20">
                    <div
                      style={{
                        borderColor: active ? item.accent : undefined,
                        boxShadow: active
                          ? `0 0 12px ${item.accent}`
                          : undefined,
                      }}
                      className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        active
                          ? "bg-white dark:bg-slate-950 scale-110"
                          : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 scale-95"
                      }`}
                    >
                      <div
                        style={{
                          backgroundColor: active ? item.accent : undefined,
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          active
                            ? "scale-100"
                            : "bg-slate-300 dark:bg-slate-700 scale-75"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Professional Experience-Styled Card */}
                  <div
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") {
                        setInteracting(true);
                        handleSelect(item.id);
                      }
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType === "mouse") {
                        setInteracting(false);
                      }
                    }}
                    onClick={() => handleSelect(item.id)}
                    style={{
                      "--card-accent": item.accent,
                    }}
                    className={`group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer backdrop-blur-md overflow-hidden ${
                      active
                        ? "-translate-y-0.5 bg-white/95 dark:bg-slate-900/90 border-[color-mix(in_srgb,var(--card-accent)_45%,transparent)] shadow-[0_14px_32px_-12px_color-mix(in_srgb,var(--card-accent)_30%,transparent)]"
                        : "bg-white/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/70 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/85 dark:hover:bg-slate-900/70"
                    }`}
                  >
                    {/* Luminous Radial Ambient Aura when Active */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out -z-10 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background: `radial-gradient(circle at 90% 12%, color-mix(in srgb, var(--card-accent) 14%, transparent), transparent 60%)`,
                      }}
                    />

                    <div>
                      {/* Top Header Row: Icon, Title & Meta / Badges */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-center gap-3">
                          {/* Accent-Bordered Icon Container */}
                          <span
                            className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border shrink-0 transition-all duration-300 ${
                              active
                                ? "border-[color-mix(in_srgb,var(--card-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--card-accent)_14%,white)] dark:bg-[color-mix(in_srgb,var(--card-accent)_16%,#0a0a0a)] text-[var(--card-accent)] scale-105 shadow-sm"
                                : "border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                          </span>

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`text-base sm:text-lg md:text-xl font-bold font-display tracking-tight leading-snug transition-colors duration-200 ${
                                  active
                                    ? "text-[#111827] dark:text-[#F5F7FA]"
                                    : "text-[#111827]/90 dark:text-[#F5F7FA]/80"
                                }`}
                              >
                                {item.degree}
                              </h3>

                              <span
                                className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border transition-colors duration-200 ${
                                  active
                                    ? "border-[color-mix(in_srgb,var(--card-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--card-accent)_10%,transparent)] text-[var(--card-accent)]"
                                    : "border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400"
                                }`}
                              >
                                {item.category}
                              </span>
                            </div>

                            <p className="mt-0.5 text-xs font-mono font-medium text-[var(--card-accent)]">
                              {item.badge}
                            </p>
                          </div>
                        </div>

                        {/* Year & Status Pill on Right */}
                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium text-slate-700 dark:text-white/85 bg-slate-100/90 dark:bg-white/5 rounded-full border border-slate-200/80 dark:border-white/10 backdrop-blur-sm">
                            <Calendar className="w-3 h-3 text-[var(--card-accent)]" />
                            {item.year}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline-block">
                            ({item.duration})
                          </span>
                        </div>
                      </div>

                      {/* Institution, Major & Location Metadata Line */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-3 pl-0 sm:pl-[52px]">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {item.shortInst}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">
                          •
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {item.major}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">
                          •
                        </span>
                        <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-[#0891B2] dark:text-[#22D3EE]" />
                          {item.location}
                        </span>
                      </div>

                      {/* Description & Technical Highlights */}
                      <div className="mb-3.5 pl-0 sm:pl-[52px]">
                        <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#4B5563] dark:text-[#94A3B8] mb-3">
                          {active ? item.details : item.summary}
                        </p>

                        {/* Key Achievement Highlights Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3.5">
                          {item.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span
                                style={{
                                  backgroundColor: active
                                    ? item.accent
                                    : undefined,
                                }}
                                className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                                  active
                                    ? "shadow-[0_0_6px_var(--card-accent)]"
                                    : "bg-slate-400 dark:bg-slate-600"
                                }`}
                              />
                              <span className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Status & Sleek Progress Bar */}
                        <div className="bg-slate-50/80 dark:bg-white/[0.03] rounded-xl p-3 border border-slate-200/80 dark:border-white/10 backdrop-blur-sm mb-3.5">
                          <div className="flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-2">
                            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                              <TrendingUp className="w-3.5 h-3.5 text-[var(--card-accent)]" />
                              <span>Academic Status:</span>
                              <span
                                style={{ color: item.accent }}
                                className="font-semibold"
                              >
                                {item.status}
                              </span>
                            </span>
                            <span className="font-mono text-[11px] sm:text-xs">
                              {item.progress}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200/80 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              style={{
                                width: `${item.progress}%`,
                                backgroundColor: item.accent,
                              }}
                              className="h-full rounded-full transition-all duration-700 ease-out"
                            />
                          </div>
                        </div>

                        {/* Core Coursework / Skills Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono font-medium bg-[color-mix(in_srgb,var(--card-accent)_10%,transparent)] text-[#111827] dark:text-[#F5F7FA] border border-[color-mix(in_srgb,var(--card-accent)_20%,transparent)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer Row with Link & Pulsing Indicator */}
                    <div className="mt-2 pt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pl-0 sm:pl-[52px]">
                      <a
                        href={item.linkHref}
                        target={
                          item.linkHref.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.linkHref.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1.5 self-start font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${
                          active
                            ? "text-[var(--card-accent)] hover:opacity-80"
                            : "text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                        }`}
                      >
                        <span>{item.linkLabel}</span>
                        <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      {/* Active Indicator Dot */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          active
                            ? "bg-[var(--card-accent)] shadow-[0_0_8px_var(--card-accent)] scale-125"
                            : "bg-slate-300 dark:bg-slate-700 scale-75"
                        }`}
                      />
                    </div>

                    {/* Subtle Bottom Accent Indicator Line */}
                    <div
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-[var(--card-accent)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
