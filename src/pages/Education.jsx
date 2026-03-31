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
    <div className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-50/30 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-emerald-50/30 rounded-full blur-3xl -translate-x-1/3" />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-red-500/20 mb-4">
          <GraduationCap className="w-7 h-7 text-white" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-red-600 to-gray-900">
          Education Journey
        </h2>

        <div className="mx-auto w-20 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full mb-4" />

        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
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
        <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gray-200 via-red-200 to-gray-200" />

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
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border-4 border-red-500 rounded-full shadow-md" />
                </div>

                {/* Content Card */}
                <div
                  className="group relative bg-white rounded-2xl p-5 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-100"
                  style={{ willChange: "transform" }}
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top Row: Icon + Title */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                            {edu.degree}
                          </h3>
                          <span className="px-3 py-1 text-xs font-bold text-red-600 bg-red-50 rounded-full border border-red-100">
                            {edu.year}
                          </span>
                        </div>
                        <div className="text-sm sm:text-base font-medium text-gray-700 mb-1">
                          {edu.major}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1.5">
                          <span className="font-semibold text-gray-900">{edu.shortInst}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full" />
                          <span className="hidden sm:inline">{edu.institution}</span>
                        </div>
                      </div>
                    </div>

                    {/* Location & Description */}
                    <div className="mb-5 pl-0 sm:pl-[72px]">
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {edu.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="flex items-center justify-between text-xs font-medium text-gray-600 mb-2">
                          <span className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                            Status: <span className={edu.progress === 100 ? "text-green-600" : "text-blue-600"}>{edu.status}</span>
                          </span>
                          <span>{edu.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${edu.color}`}
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
