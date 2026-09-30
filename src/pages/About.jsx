import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpeg";
import {
  Code,
  Brain,
  Database,
  Globe,
  Cpu,
  Layers,
  Terminal,
  Sparkles,
} from "lucide-react";

export default function About() {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const pillars = [
    {
      title: "Java Development",
      icon: Code,
      accent: "#f59e0b",
      category: "Core Backend",
      copy: "Building scalable applications using Java, object-oriented programming principles and clean architecture.",
    },
    {
      title: "Data Structures & Algorithms",
      icon: Brain,
      accent: "#8b5cf6",
      category: "Problem Solving",
      copy: "Strong problem-solving skills using optimized algorithms and efficient data structures.",
    },
    {
      title: "Software Development",
      icon: Layers,
      accent: "#0891B2",
      category: "Full Systems",
      copy: "Developing real-world applications including VibeCode Editor, MSBTE Diploma Job Portal and AI Touchless Computer Control.",
    },
    {
      title: "Web Development",
      icon: Globe,
      accent: "#0284c7",
      category: "Modern Web",
      copy: "Creating responsive and modern web applications using latest technologies.",
    },
    {
      title: "Database Management",
      icon: Database,
      accent: "#10b981",
      category: "Data & Storage",
      copy: "Working with databases and managing data efficiently.",
    },
    {
      title: "AI & Problem Solving",
      icon: Cpu,
      accent: "#ec4899",
      category: "Applied AI",
      copy: "Exploring AI concepts and solving real-world technical problems.",
    },
  ];

  return (
    <motion.section
      id="about"
      className="relative isolate bg-gradient-to-b from-gray-50 via-white to-white dark:from-transparent dark:via-transparent dark:to-transparent py-16 sm:py-20 overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={heroVariants}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-[#0891B2] dark:text-[#22D3EE] uppercase bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-500/20 rounded-full font-mono">
            About Me
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#F5F7FA] mt-4 font-display tracking-tight">
            Building scalable solutions with{" "}
            <span className="text-[#0891B2] dark:text-[#22D3EE]">passion</span>{" "}
            and{" "}
            <span className="text-[#7C3AED] dark:text-[#A78BFA]">precision</span>
          </h2>

          <p className="text-base sm:text-lg text-[#6B7280] dark:text-[#94A3B8] mt-3 sm:mt-4 leading-relaxed font-sans">
            Passionate about software development and building impactful applications
          </p>
        </motion.div>

        {/* Bio & Profile Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left: Bio Text */}
          <motion.div
            variants={heroVariants}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display tracking-tight">
                Hi, I'm Rohit Buddhe 👋
              </h3>

              <p className="text-sm sm:text-base leading-relaxed text-[#6B7280] dark:text-[#94A3B8]">
                <span className="font-semibold text-[#111827] dark:text-[#F5F7FA]">
                  Computer Engineering student at Yeshwantrao Chavan College of Engineering
                </span>
                , Nagpur, passionate about building scalable software applications.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[#6B7280] dark:text-[#94A3B8]">
                Skilled in Java, Python and Data Structures &amp; Algorithms. I enjoy solving real-world 
                problems and building impactful software solutions.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[#6B7280] dark:text-[#94A3B8]">
                Currently working as Software Development Intern at Cognifyz Technologies Pvt Ltd 
                and building projects like VibeCode Editor, MSBTE Diploma Job Portal and 
                DiplomaGPT.
              </p>
            </div>

            {/* Quick Meta Highlights to balance vertical space */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-mono uppercase text-[#0891B2] dark:text-[#22D3EE] font-semibold tracking-wider">
                  Degree
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F5F7FA] font-display mt-0.5">
                  B.Tech CSE
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 backdrop-blur-sm">
                <p className="text-[10px] font-mono uppercase text-[#0891B2] dark:text-[#22D3EE] font-semibold tracking-wider">
                  Experience
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F5F7FA] font-display mt-0.5">
                  Intern &amp; Hackathons
                </p>
              </div>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 backdrop-blur-sm col-span-2 sm:col-span-1">
                <p className="text-[10px] font-mono uppercase text-[#0891B2] dark:text-[#22D3EE] font-semibold tracking-wider">
                  Status
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#111827] dark:text-[#F5F7FA] font-display mt-0.5">
                  Open for Roles
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Profile Image Card */}
          <motion.div
            variants={heroVariants}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="relative w-full max-w-md">
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-200/30 dark:bg-red-500/10 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-200/30 dark:bg-cyan-500/10 rounded-full blur-3xl opacity-20 animate-pulse" />

              <motion.div
                className="relative flex flex-col items-center text-center bg-white/70 dark:bg-white/[0.04] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-gray-200/80 dark:border-white/10 shadow-sm hover:border-gray-300 dark:hover:border-white/20 transition duration-300"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Profile Image */}
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-300 rounded-3xl blur-xl opacity-20 dark:opacity-10 animate-pulse" />

                  <motion.div
                    className="absolute inset-0 border-2 border-red-400 dark:border-red-500 rounded-3xl"
                    animate={typeof window !== "undefined" && window.innerWidth >= 768 ? { rotate: 360 } : undefined}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  <img
                    src={profileImg}
                    alt="Rohit Buddhe"
                    loading="lazy"
                    decoding="async"
                    className="relative w-full h-full object-cover rounded-3xl shadow-lg"
                  />
                </div>

                {/* Name */}
                <motion.h3 
                  className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-display mb-1 tracking-tight"
                  whileHover={{ scale: 1.03 }}
                >
                  Rohit Buddhe
                </motion.h3>

                {/* Title */}
                <p className="text-gray-500 dark:text-gray-400 font-medium mb-5 text-xs sm:text-sm">
                  Software Developer
                </p>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-3.5 w-full">
                  <motion.div
                    className="p-3 sm:p-3.5 rounded-2xl bg-gray-50/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 backdrop-blur-sm hover:border-gray-300 dark:hover:border-white/20 transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[10px] uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider mb-0.5 font-mono">
                      Focus
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-display">
                      Java + DSA
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-3 sm:p-3.5 rounded-2xl bg-gray-50/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 backdrop-blur-sm hover:border-gray-300 dark:hover:border-white/20 transition"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[10px] uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider mb-0.5 font-mono">
                      Location
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-display">
                      Nagpur
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* About Ke Niche: Horizontal Movement Cards (Marquee like Tech Stack) */}
        <div className="mt-14 sm:mt-18 pt-8 sm:pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#0891B2] dark:text-[#22D3EE] font-semibold">
                Core Domains
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#111827] dark:text-[#F5F7FA] mt-0.5 tracking-tight">
                Engineering Capabilities &amp; Focus
              </h3>
            </div>
            <span className="text-[11px] sm:text-xs font-mono text-[#6B7280] dark:text-[#94A3B8]">
              Java • DSA • Web • Database • AI
            </span>
          </div>

          {/* Infinite Horizontal Marquee Ticker */}
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="overflow-hidden py-2 marquee-row">
              <div className="animate-marquee-left flex gap-3.5 sm:gap-4">
                {[...pillars, ...pillars].map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none backdrop-blur-md overflow-hidden bg-white/75 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 hover:border-cyan-500/40 dark:hover:border-cyan-400/40 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_8px_24px_-10px_rgba(34,211,238,0.2)]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[#0891B2] dark:text-[#22D3EE] group-hover:scale-105 group-hover:border-cyan-500/40 transition-all duration-300">
                            <Icon className="w-5 h-5" />
                          </span>
                          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400">
                            {pillar.category}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold font-display tracking-tight text-[#111827] dark:text-[#F5F7FA] group-hover:text-[#0891B2] dark:group-hover:text-[#22D3EE] transition-colors duration-200 mb-1.5">
                          {pillar.title}
                        </h4>

                        <p className="text-xs sm:text-[13px] leading-relaxed text-[#6B7280] dark:text-[#94A3B8]">
                          {pillar.copy}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                        <span>Specialization</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Minimal Footer Hint */}
          <div className="mt-4 text-center text-xs text-[#94A3B8] dark:text-[#64748B] flex items-center justify-center gap-2 font-mono">
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            <span>Hover over any card to pause</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}