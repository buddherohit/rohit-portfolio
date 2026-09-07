import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Calendar, MapPin, Award, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Education() {
  // Memoized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  }), []);

  // Memoized data
  const EDUCATION_DATA = useMemo(() => [
    {
      year: "2025 - Present",
      degree: "Bachelor of Technology",
      major: "Computer Science and Engineering",
      institution: "Yeshwantrao Chavan College of Engineering",
      shortInst: "YCCE",
      location: "Nagpur, Maharashtra",
      description: "Pursuing B.Tech through Direct Second Year (DSY). Focusing on advanced engineering concepts, system architecture, and emerging tech.",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      progress: 50,
      status: "In Progress"
    },
    {
      year: "2022 - 2025",
      degree: "Diploma in Engineering",
      major: "Computer Science and Engineering",
      institution: "C.S.Institute of Technology Deori",
      shortInst: "CSIT",
      location: "Deori, Maharashtra",
      description: "Completed comprehensive diploma program covering computer fundamentals, programming, networking, and database management.",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-500",
      progress: 100,
      status: "Completed"
    }
  ], []);

  return (
    <div className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white dark:from-transparent dark:via-transparent dark:to-transparent py-16 sm:py-20 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-50/30 dark:bg-blue-950/5 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-emerald-50/30 dark:bg-emerald-950/5 rounded-full blur-3xl -translate-x-1/3" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-[#0891B2] to-cyan-600 dark:from-[#22D3EE] dark:to-[#0891B2] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20 mb-4">
          <GraduationCap className="w-7 h-7 text-white dark:text-slate-950" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#111827] dark:text-[#F5F7FA] font-display">
          Education Journey
        </h2>

        <div className="mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-[#0891B2] dark:via-[#22D3EE] to-transparent rounded-full mb-4" />

        <p className="text-sm sm:text-base text-[#6B7280] dark:text-[#94A3B8] max-w-2xl mx-auto">
          My academic path and qualifications
        </p>
      </div>

      {/* Timeline */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05, margin: "0px 0px -100px 0px" }}
      >
        {/* Vertical Line */}
        <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-800" />

        <div className="space-y-8 sm:space-y-12">
          {EDUCATION_DATA.map((edu, index) => {
            const Icon = edu.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-12 sm:pl-24"
              >
                {/* Timeline Dot */}
                <div className="absolute left-1.5 sm:left-[26px] top-6 z-20">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white dark:bg-slate-950 border-4 border-[#0891B2] dark:border-[#22D3EE] rounded-full shadow-md timeline-dot" />
                </div>

                {/* Content Card */}
                <div
                  className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 sm:p-7 shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 border border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] hover:-translate-y-1"
                  style={{ willChange: "transform" }}
                >
                  <div className="relative z-10">
                    {/* Top Row: Icon + Title */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display transition-colors">
                            {edu.degree}
                          </h3>
                          <span className="px-3 py-1 text-xs font-semibold text-[#0891B2] dark:text-[#22D3EE] bg-cyan-50 dark:bg-cyan-950/30 rounded-full border border-cyan-200/70 dark:border-cyan-500/20">
                            {edu.year}
                          </span>
                        </div>
                        <div className="text-sm sm:text-base font-medium text-[#374151] dark:text-[#CBD5E1] mb-1">
                          {edu.major}
                        </div>
                        <div className="text-sm text-[#6B7280] dark:text-[#94A3B8] flex items-center gap-1.5">
                          <span className="font-semibold text-[#111827] dark:text-[#F5F7FA]">{edu.shortInst}</span>
                          <span className="w-1 h-1 bg-gray-300 dark:bg-slate-700 rounded-full" />
                          <span className="hidden sm:inline">{edu.institution}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location & Description */}
                    <div className="mb-5 pl-0 sm:pl-[72px]">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#6B7280] dark:text-[#94A3B8] mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#0891B2] dark:text-[#22D3EE]" />
                        {edu.location}
                      </div>
                      <p className="text-sm text-[#374151] dark:text-[#CBD5E1] leading-relaxed mb-4">
                        {edu.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-3 border border-slate-200/80 dark:border-slate-800">
                        <div className="flex items-center justify-between text-xs font-medium text-[#6B7280] dark:text-[#94A3B8] mb-2">
                          <span className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-[#0891B2] dark:text-[#22D3EE]" />
                            Status: <span className={edu.progress === 100 ? "text-[#65A30D] dark:text-[#A3E635] font-semibold" : "text-[#0891B2] dark:text-[#22D3EE] font-semibold"}>{edu.status}</span>
                          </span>
                          <span className="font-mono">{edu.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden progress-bar-track">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r progress-bar-fill ${edu.color}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${edu.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
