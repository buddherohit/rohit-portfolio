import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal, Star } from "lucide-react";

export default function Achievements() {

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  }), []);

  const ACHIEVEMENTS_DATA = [
    {
      title: "Software Development Intern",
      organization: "Cognifyz Technologies Pvt Ltd",
      location: "Nagpur, Maharashtra",
      description: "Currently working as Software Development Intern gaining real-world development experience.",
      icon: Trophy,
      color: "from-red-500 to-pink-500",
      highlights: [
        "Worked on real-world development projects",
        "Improved coding & problem solving skills",
        "Learned industry best practices"
      ],
      skills: ["Java", "Web Development", "Git"]
    },
    {
      title: "GeeksforGeeks Java Certification",
      organization: "GeeksforGeeks",
      location: "Online",
      description: "Completed Java Programming Certification from GeeksforGeeks.",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      highlights: [
        "Core Java Concepts",
        "OOP Concepts",
        "Collections Framework",
        "Problem Solving"
      ],
      skills: ["Java", "OOP", "DSA"]
    },
    {
      title: "Oracle AI Foundation Certification",
      organization: "Oracle",
      location: "Online",
      description: "Completed Oracle AI Foundation certification covering AI fundamentals.",
      icon: Medal,
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "AI Fundamentals",
        "Machine Learning Basics",
        "AI Applications",
        "Data & Models"
      ],
      skills: ["AI", "Machine Learning", "Oracle"]
    },
    {
      title: "Hackathon Participant",
      organization: "JPMorgan Chase Hackathon",
      location: "India",
      description: "Participated in hackathon and built innovative solutions.",
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
      highlights: [
        "Team collaboration",
        "Built prototype solution",
        "Improved problem solving"
      ],
      skills: ["Teamwork", "Java", "Problem Solving"]
    },
    {
      title: "Project Development",
      organization: "Academic Projects",
      location: "Nagpur",
      description: "Developed multiple real-world applications.",
      icon: Award,
      color: "from-orange-500 to-red-500",
      highlights: [
        "Women Safety System",
        "Student Learning Platform",
        "Smart Hostel Management"
      ],
      skills: ["Java", "Python", "DSA"]
    },
    {
      title: "DSA & Problem Solving",
      organization: "Practice & Learning",
      location: "Online",
      description: "Continuously improving problem solving skills.",
      icon: Medal,
      color: "from-indigo-500 to-purple-500",
      highlights: [
        "Practicing coding problems",
        "Improving algorithms",
        "Learning advanced concepts"
      ],
      skills: ["DSA", "Java", "Algorithms"]
    }
  ];

  return (
    <section
      id="achievements"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-transparent dark:via-transparent dark:to-transparent py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-14 h-14 bg-gradient-to-br from-[#0891B2] to-cyan-600 dark:from-[#22D3EE] dark:to-[#0891B2] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
            <Trophy className="w-7 h-7 text-white dark:text-slate-950" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display">
            Achievements
          </h2>
          <p className="text-[#6B7280] dark:text-[#94A3B8] mt-2 text-sm sm:text-base">
            Milestones and accomplishments in my journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200 dark:bg-slate-800 hidden sm:block" />

          {ACHIEVEMENTS_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-[20px] top-6 w-3 h-3 bg-[#0891B2] dark:bg-[#22D3EE] rounded-full ring-4 ring-white dark:ring-slate-950 shadow transition-all duration-300 hidden sm:block" />

                {/* Card */}
                <div className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-6 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-none border border-slate-200/90 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#0891B2] dark:text-[#22D3EE] font-medium text-sm mb-1">
                        {item.organization}
                      </p>
                      <p className="text-[#6B7280] dark:text-[#94A3B8] text-xs mb-3">
                        {item.location}
                      </p>
                      <p className="text-[#374151] dark:text-[#CBD5E1] mb-4 leading-relaxed text-sm">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                        {item.highlights.map((point, idx) => (
                          <li key={idx} className="text-sm text-[#374151] dark:text-[#CBD5E1] flex items-start gap-2">
                            <span className="text-[#0891B2] dark:text-[#22D3EE] mt-0.5">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-medium text-[#0891B2] dark:text-[#22D3EE] rounded-md shadow-xs"
                          >
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
      </div>
    </section>
  );
}
