import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Brain,
  Globe,
  Trophy,
  Server,
  Terminal,
  MapPin,
  Calendar,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function Experience() {
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
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

  const EXPERIENCE_DATA = useMemo(
    () => [
      {
        id: "eduskills-aiml",
        icon: Brain,
        category: "Artificial Intelligence",
        title: "AIML Intern",
        company: "Eduskills Academy",
        location: "Remote",
        period: "Jun 2026 - Present",
        duration: "Current",
        badge: "AI & Machine Learning • Active",
        summary:
          "Gaining hands-on industry experience in artificial intelligence, machine learning pipelines, and predictive data modeling.",
        details:
          "Developing end-to-end ML workflows, experimenting with neural architectures, evaluating data models, and implementing predictive analytics for real-world domains.",
        highlights: [
          "Supervised & unsupervised ML algorithm implementations",
          "Data preprocessing, model evaluation & hyperparameter tuning",
          "Exploration of modern Generative AI & deep learning pipelines",
          "Practical problem-solving in production-grade AI/ML domains",
        ],
        tags: ["Python", "Machine Learning", "AI", "Data Analysis", "Model Tuning"],
        accent: "#10b981", // Emerald AI Green
        linkLabel: "Active Internship",
        linkHref: "#experience",
      },
      {
        id: "cognifyz-sde",
        icon: Briefcase,
        category: "Software Engineering",
        title: "Software Development Intern",
        company: "Cognifyz Technologies Pvt Ltd",
        location: "Nagpur, Maharashtra",
        period: "Apr 2026 - Jun 2026",
        duration: "3 mos",
        badge: "Java & Full-Stack • Completed",
        summary:
          "Worked as a Software Development Intern gaining production-level experience in real-world application engineering.",
        details:
          "Built and debugged application components, followed industry-standard Git branching practices, and resolved real-world technical bottlenecks.",
        highlights: [
          "Engineered robust software features & modular business logic",
          "Enhanced algorithmic problem-solving & clean OOP patterns",
          "Collaborated in agile team sprints with version control workflows",
          "Applied enterprise-grade debugging & code optimization",
        ],
        tags: ["Java", "Web Development", "Git", "Problem Solving", "Clean Code"],
        accent: "#8b5cf6", // Indigo / Violet
        linkLabel: "Verified Internship",
        linkHref: "#experience",
      },
      {
        id: "optech-web",
        icon: Globe,
        category: "Full-Stack Web",
        title: "Web Development Intern",
        company: "Optech Pvt Ltd",
        location: "Gondia, Maharashtra",
        period: "Jun 2024 - Jul 2024",
        duration: "2 mos",
        badge: "React & Node.js • Completed",
        summary:
          "Contributed to full-stack web applications with responsive user interfaces and scalable Node.js backend services.",
        details:
          "Built responsive client interfaces using React and Bootstrap, implemented MVT/MVC architecture, and collaborated through Git version control.",
        highlights: [
          "Developed dynamic, accessible UIs in React & Bootstrap",
          "Implemented clean backend architecture & REST APIs",
          "Optimized responsive layouts across mobile & desktop viewports",
          "Coordinated version-controlled deployment pipelines with Git",
        ],
        tags: ["React", "NodeJS", "JavaScript", "Bootstrap", "Git", "REST APIs"],
        accent: "#0284c7", // Sky Blue
        linkLabel: "Experience Record",
        linkHref: "#experience",
      },
      {
        id: "jpmorgan-hackathon",
        icon: Trophy,
        category: "Agile Sprint",
        title: "JPMorgan Chase Hackathon",
        company: "JPMorgan Chase & Co.",
        location: "India (National)",
        period: "2025",
        duration: "Hackathon",
        badge: "Sprint Finalist • Prototyping",
        summary:
          "Collaborated in a high-velocity agile sprint building rapid full-stack software prototypes under strict 24-hour sprint deadlines.",
        details:
          "Architected modular micro-services, integrated mock APIs under intense time limits, and pitched working software to industry mentors.",
        highlights: [
          "Delivered full-stack working prototype in 24 hours",
          "Engineered resilient API contracts & modular services",
          "Demonstrated rapid problem-solving & cross-functional leadership",
          "Pitched working solution directly to industry judges",
        ],
        tags: ["Java", "Agile Sprints", "Rapid Prototyping", "Teamwork", "APIs"],
        accent: "#f59e0b", // Amber / Gold
        linkLabel: "View Credentials",
        linkHref: "/certifications/hackNexux.jpg",
      },
      {
        id: "msbte-platform",
        icon: Server,
        category: "Platform Engineering",
        title: "MSBTE Diploma Job Portal",
        company: "Lead Developer & Architect",
        location: "Maharashtra, India",
        period: "2024 - 2025",
        duration: "Production",
        badge: "5,000+ Users • 45+ Recruiters",
        summary:
          "Architected and deployed a specialised career ecosystem serving thousands of diploma graduates across Maharashtra.",
        details:
          "Engineered branch-specific filters, automated bio-data generators, recruiter management dashboards, and high-performance serverless endpoints.",
        highlights: [
          "Served 5,000+ active student users across Maharashtra",
          "Integrated recruiter dashboard handling 12,000+ applications",
          "Designed automated verification & Quick-Apply flow",
          "Zero-downtime production deployment on Vercel",
        ],
        tags: ["React", "NodeJS", "Database", "Authentication", "Vercel"],
        accent: "#14b8a6", // Teal
        linkLabel: "View Platform",
        linkHref: "https://msbte-diploma-job-portal.vercel.app",
      },
      {
        id: "systems-software",
        icon: Terminal,
        category: "Developer Systems",
        title: "VibeCode & AI Touchless Control",
        company: "Personal & Open-Source Systems",
        location: "Nagpur, India",
        period: "2024 - 2025",
        duration: "Applied Tech",
        badge: "Browser IDE & OpenCV Vision",
        summary:
          "Built real-world developer tools including an in-browser code editor and AI-driven hand gesture computer control.",
        details:
          "Engineered VibeCode Editor with syntax highlighting and instant execution, plus an OpenCV gesture tracker for touchless computer control.",
        highlights: [
          "VibeCode Editor: Multi-language in-browser coding environment",
          "AI Touchless: Real-time OpenCV hand landmark tracking",
          "Implemented high-performance algorithms & low latency",
          "Active open-source repositories with clean documentation",
        ],
        tags: ["Java", "Python", "OpenCV", "DSA", "Web Development"],
        accent: "#ea580c", // Vermilion / Orange
        linkLabel: "Explore Projects",
        linkHref: "#projects",
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(EXPERIENCE_DATA[0].id);
  const [interacting, setInteracting] = useState(false);

  // Smooth idle rotation matching Achievements & Credentials
  useEffect(() => {
    if (interacting) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const timer = setInterval(() => {
      setActiveId((prev) => {
        const idx = EXPERIENCE_DATA.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % EXPERIENCE_DATA.length;
        return EXPERIENCE_DATA[nextIdx].id;
      });
    }, 3800);

    return () => clearInterval(timer);
  }, [interacting, EXPERIENCE_DATA]);

  const handleSelect = useCallback((id) => {
    setActiveId(id);
  }, []);

  return (
    <section
      id="experience"
      className="relative isolate py-12 sm:py-16 overflow-hidden"
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-cyan-200/10 dark:bg-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-200/10 dark:bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header: clean, compact, proportional matching Achievements */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-10 sm:mb-12 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#0891B2] dark:text-[#22D3EE] font-semibold">
              Career &amp; Industry
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#111827] dark:text-[#F5F7FA] mt-0.5 tracking-tight">
              Professional Experience
            </h2>
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-[#6B7280] dark:text-[#94A3B8]">
            Internships • Production Systems • Hackathons
          </span>
        </div>

        {/* Vertical Timeline Container with Achievements-Styled Cards */}
        <motion.div
          className="relative z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Vertical Connector Line */}
          <div className="absolute left-4 sm:left-7 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500/40 via-cyan-500/30 via-indigo-500/30 via-amber-500/30 to-orange-500/20 dark:from-emerald-400/30 dark:via-cyan-400/20 dark:via-indigo-400/20 dark:to-orange-400/10" />

          <div className="space-y-6 sm:space-y-8">
            {EXPERIENCE_DATA.map((item) => {
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

                  {/* Achievements & Credentials Styled Card */}
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
                                {item.title}
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

                        {/* Period & Duration Pill on Right */}
                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium text-slate-700 dark:text-white/85 bg-slate-100/90 dark:bg-white/5 rounded-full border border-slate-200/80 dark:border-white/10 backdrop-blur-sm">
                            <Calendar className="w-3 h-3 text-[var(--card-accent)]" />
                            {item.period}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline-block">
                            ({item.duration})
                          </span>
                        </div>
                      </div>

                      {/* Company & Location Metadata Line */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-[13px] font-medium text-slate-700 dark:text-slate-300 mb-3 pl-0 sm:pl-[52px]">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.company}
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

                        {/* Tech Stack Pills (Achievements Accent Style) */}
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
                          item.linkHref.startsWith("http") ||
                          item.linkHref.endsWith(".pdf") ||
                          item.linkHref.endsWith(".jpg")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.linkHref.startsWith("http") ||
                          item.linkHref.endsWith(".pdf") ||
                          item.linkHref.endsWith(".jpg")
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