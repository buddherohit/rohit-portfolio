import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, ExternalLink, CheckCircle2 } from "lucide-react";

export default function Experience() {

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

const EXPERIENCE_DATA = useMemo(() => [

{
period: "Jun 2026 - Present",
duration: "Current",
title: "AIML Intern",
company: "Eduskills Academy",
location: "Remote",
description:
"Working as an AIML Intern, gaining practical experience in artificial intelligence, machine learning algorithms, and data analysis.",
highlights: [
"Gaining hands-on experience in AI and Machine Learning technologies",
"Implementing machine learning algorithms and data models",
"Participating in technical training and projects",
"Developing problem-solving capabilities in AI/ML domains"
],
skills: ["Python", "Machine Learning", "AI", "Data Analysis", "Problem Solving"],
icon: Briefcase,
color: "from-green-500 to-emerald-500",
certificateUrl: "",
},

{
period: "Apr 2026 - Jun 2026",
duration: "3 mos",
title: "Software Development Intern",
company: "Cognifyz Technologies Pvt Ltd",
location: "Nagpur, Maharashtra",
description:
"Worked as a Software Development Intern gaining hands-on experience in real-world software development and modern technologies.",
highlights: [
"Working on real-world development projects",
"Improving problem solving skills",
"Learning industry-level development practices",
"Collaborating with development teams"
],
skills: ["Java", "Web Development", "Git", "Problem Solving"],
icon: Briefcase,
color: "from-violet-600 to-indigo-600",
certificateUrl: "",
},

{
period: "Jun 2024 - Jul 2024",
duration: "2 mos",
title: "Web Development Intern",
company: "Optech Pvt Ltd",
location: "Gondia, Maharashtra",
description:
"Gained hands-on experience in full-stack web development, contributing to real-world projects and learning industry best practices.",
highlights: [
"Developed proficiency in React & NodeJS framework",
"Implemented MVT architecture",
"Built responsive UI using Bootstrap",
"Collaborated using Git"
],
skills: ["React", "NodeJS", "HTML/CSS", "Bootstrap", "Git"],
icon: Briefcase,
color: "from-blue-500 to-cyan-500",
certificateUrl: "",
},

{
period: "2025",
duration: "Hackathon",
title: "Hackathon Participant",
company: "JPMorgan Chase Hackathon",
location: "India",
description:
"Participated in hackathon and worked in team environment to build innovative solutions.",
highlights: [
"Worked in team environment",
"Built project prototype",
"Improved problem solving skills",
"Experience with rapid development"
],
skills: ["Java", "Teamwork", "Problem Solving", "Web Development"],
icon: Briefcase,
color: "from-purple-500 to-pink-500",
certificateUrl: "",
},

{
period: "2024 - 2025",
duration: "Projects",
title: "Software Development Projects",
company: "Personal Projects",
location: "Nagpur",
description:
"Developed multiple real-world software projects.",
highlights: [
"VibeCode Editor",
"MSBTE Diploma Job Portal",
"AI Touchless Computer Control",
"Hands-on development experience"
],
skills: ["Java", "Python", "DSA", "Web Development"],
icon: Briefcase,
color: "from-orange-500 to-red-500",
certificateUrl: "",
},

], []);

return (
<div className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white dark:from-transparent dark:via-transparent dark:to-transparent py-16 sm:py-20 overflow-hidden">

<div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

{/* Header */}
<div className="text-center mb-12 relative z-10">

<div className="w-14 h-14 bg-gradient-to-br from-[#0891B2] to-cyan-600 dark:from-[#22D3EE] dark:to-[#0891B2] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20 mb-4">
<Briefcase className="w-7 h-7 text-white dark:text-slate-950" />
</div>

<h2 className="text-3xl sm:text-4xl font-bold mb-3 text-[#111827] dark:text-[#F5F7FA] font-display">
Professional Experience
</h2>

<div className="mx-auto w-16 h-1 bg-gradient-to-r from-transparent via-[#0891B2] dark:via-[#22D3EE] to-transparent rounded-full mb-4" />

<p className="text-sm sm:text-base text-[#6B7280] dark:text-[#94A3B8] max-w-2xl mx-auto">
My professional journey and practical experience in the tech industry
</p>

</div>

{/* Timeline */}
<motion.div
className="relative z-10 w-full max-w-6xl mx-auto"
variants={containerVariants}
initial="hidden"
whileInView="show"
viewport={{ once: true }}
>

        {/* Vertical Line */}
        <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-white/10 timeline-line" />

        <div className="space-y-6 sm:space-y-8">
          {EXPERIENCE_DATA.map((exp, index) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-10 sm:pl-20"
              >
                {/* Timeline Dot (Sleek & refined) */}
                <div className="absolute left-2.5 sm:left-[27px] top-6 z-20">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white dark:bg-black border-2 border-[#0891B2] dark:border-[#22D3EE] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)] timeline-dot" />
                </div>

                {/* Content Card (Matching 'Available for Opportunities' Glass Style) */}
                <div
                  className="group relative bg-white/70 dark:bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-200/80 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/25 dark:hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1"
                  style={{ willChange: "transform" }}
                >
                  <div className="relative z-10">
                    {/* Top Row: Icon + Title */}
                    <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 mb-3.5">
                      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white shadow-md shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-display transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono font-medium text-gray-700 dark:text-white/80 bg-gray-100/80 dark:bg-white/5 rounded-full border border-gray-200/80 dark:border-white/10 backdrop-blur-sm">
                              {exp.period}
                            </span>
                            <span className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium hidden sm:inline-block">
                              ({exp.duration})
                            </span>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5">
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3.5 h-3.5 text-[#0891B2] dark:text-[#22D3EE]" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description & Highlights */}
                    <div className="mb-2 pl-0 sm:pl-[60px]">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                        {exp.description}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-2 mb-3.5">
                        {exp.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0891B2] dark:bg-[#22D3EE] shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs font-mono text-gray-700 dark:text-white/80 bg-gray-100/60 dark:bg-white/5 rounded-full border border-gray-200/80 dark:border-white/10 backdrop-blur-sm transition-all duration-300"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#0891B2] dark:text-[#22D3EE]" />
                            {skill}
                          </span>
                        ))}
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

</div>
);
}