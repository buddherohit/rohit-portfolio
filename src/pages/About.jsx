import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpeg";
import { Code, Brain, Database, Globe, Cpu, Layers } from "lucide-react";

export default function About() {
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const pillars = [
    {
      title: "Java Development",
      icon: Code,
      copy: "Building scalable applications using Java, object-oriented programming principles and clean architecture."
    },
    {
      title: "Data Structures & Algorithms",
      icon: Brain,
      copy: "Strong problem-solving skills using optimized algorithms and efficient data structures."
    },
    {
      title: "Software Development",
      icon: Layers,
      copy: "Developing real-world applications including VibeCode Editor, MSBTE Diploma Job Portal and AI Touchless Computer Control."
    },
    {
      title: "Web Development",
      icon: Globe,
      copy: "Creating responsive and modern web applications using latest technologies."
    },
    {
      title: "Database Management",
      icon: Database,
      copy: "Working with databases and managing data efficiently."
    },
    {
      title: "AI & Problem Solving",
      icon: Cpu,
      copy: "Exploring AI concepts and solving real-world technical problems."
    },
  ];

  return (
    <motion.section
      id="about"
      className="relative isolate bg-gradient-to-b from-gray-50 via-white to-white dark:from-transparent dark:via-transparent dark:to-transparent py-20 sm:py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          variants={heroVariants}
          className="max-w-3xl mx-auto text-center mb-16"
        >

          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest text-[#0891B2] dark:text-[#22D3EE] uppercase bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-500/20 rounded-full">
            About Me
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#F5F7FA] mt-4 font-display">
            Building scalable solutions with 
            <span className="text-[#0891B2] dark:text-[#22D3EE]"> passion </span>
            and 
            <span className="text-[#7C3AED] dark:text-[#A78BFA]"> precision</span>
          </h2>

          <p className="text-lg text-[#6B7280] dark:text-[#94A3B8] mt-4">
            Passionate about software development and building impactful applications
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left */}
          <motion.div
            variants={heroVariants}
            className="lg:col-span-7 space-y-8"
          >

            <div className="space-y-5 text-[#374151] dark:text-[#CBD5E1]">

              <h3 className="text-2xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display">
                Hi, I'm Rohit Buddhe 👋
              </h3>

              <p>
                Computer Engineering student at Yeshwantrao Chavan College of Engineering, Nagpur,
                passionate about building scalable software applications.
              </p>

              <p>
                Skilled in Java, Python and Data Structures &amp; Algorithms. I enjoy solving real-world 
                problems and building impactful software solutions.
              </p>

              <p>
                Currently working as Software Development Intern at Cognifyz Technologies Pvt Ltd 
                and building projects like VibeCode Editor, MSBTE Diploma Job Portal and 
                DiplomaGPT.
              </p>

            </div>

            {/* Skills Timeline */}
            <div className="relative border-l-2 border-gray-200 dark:border-white/10 space-y-6 sm:space-y-8 pl-6 sm:pl-8">

              {pillars.map((pillar, index) => (

                <motion.div
                  key={pillar.title}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >

                  {/* Timeline Dot (Sleek & refined) */}
                  <div className="absolute -left-[32px] sm:-left-[40px] top-5 sm:top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-white dark:bg-black border-2 border-[#0891B2] dark:border-[#22D3EE] rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)] timeline-dot" />

                  {/* Card (Matching 'Available for Opportunities' Glass Style) */}
                  <motion.div
                    className="bg-white/70 dark:bg-white/[0.04] backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-white/10 shadow-sm hover:border-gray-300 dark:hover:border-white/25 dark:hover:bg-white/[0.07] transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -4, scale: 1.01 }}
                  >

                    {/* Heading - Clean, proportional */}
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#0891B2] dark:group-hover:text-[#22D3EE] transition duration-300 mb-1.5 font-display tracking-tight">
                      {pillar.title}
                    </h4>

                    {/* Description - Soft readable text */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm">
                      {pillar.copy}
                    </p>

                  </motion.div>

                </motion.div>

              ))}

            </div>

          </motion.div>

          {/* Right */}
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

                  {/* Red Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-300 rounded-3xl blur-xl opacity-20 dark:opacity-10 animate-pulse" />

                  {/* Floating Ring - Animated on desktop, static accent on mobile */}
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
                  className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-display mb-1"
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
                    <p className="text-[10px] uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider mb-0.5">
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
                    <p className="text-[10px] uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wider mb-0.5">
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
      </div>
    </motion.section>
  );
}