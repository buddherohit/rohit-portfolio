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
      copy: "Developing real-world applications including Women Safety System, Student Learning Platform and Smart Hostel Management."
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
                and building projects like Women Safety System, Student Learning Platform and 
                Smart Hostel Management System.
              </p>

            </div>

            {/* Skills Timeline */}
            <div className="relative border-l-2 border-gray-200 dark:border-slate-800 space-y-10 pl-8">

              {pillars.map((pillar, index) => (

                <motion.div
                  key={pillar.title}
                  className="relative group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >

                  {/* Timeline Dot */}
                  <div className="absolute -left-[38px] top-8 w-6 h-6 bg-white dark:bg-slate-950 border-4 border-[#0891B2] dark:border-[#22D3EE] rounded-full shadow-md timeline-dot" />

                  {/* Card */}
                  <motion.div
                    className="bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 rounded-2xl border border-slate-200/90 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-none hover:border-slate-300 dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_25px_rgba(34,211,238,0.12)] transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -6, scale: 1.01 }}
                  >

                    {/* Heading - Strong, high contrast */}
                    <h4 className="text-xl sm:text-2xl font-bold text-[#111827] dark:text-[#F5F7FA] group-hover:text-[#0891B2] dark:group-hover:text-[#22D3EE] transition duration-300 mb-3 font-display">
                      {pillar.title}
                    </h4>

                    {/* Description - Soft readable gray */}
                    <p className="text-[#374151] dark:text-[#CBD5E1] leading-relaxed text-base">
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

              {/* Floating Red Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-200 dark:bg-red-950/20 rounded-full blur-3xl opacity-40 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 dark:bg-blue-950/15 rounded-full blur-3xl opacity-30 animate-pulse" />

              <motion.div
                className="relative flex flex-col items-center text-center bg-white dark:bg-slate-900/70 backdrop-blur-md rounded-3xl p-10 border border-slate-200/90 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:border-cyan-500/30 transition duration-300"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >

                {/* Profile Image */}
                <div className="relative w-48 h-48 mb-6">

                  {/* Red Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-300 rounded-3xl blur-xl opacity-20 dark:opacity-10 animate-pulse" />

                  {/* Floating Ring */}
                  <motion.div
                    className="absolute inset-0 border-2 border-red-400 dark:border-red-500 rounded-3xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />

                  <img
                    src={profileImg}
                    alt="Rohit Buddhe"
                    className="relative w-full h-full object-cover rounded-3xl shadow-lg"
                  />

                </div>

                {/* Name */}
                <motion.h3 
                  className="text-2xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display mb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  Rohit Buddhe
                </motion.h3>

                {/* Title */}
                <p className="text-[#6B7280] dark:text-[#94A3B8] font-medium mb-6 text-sm">
                  Software Developer
                </p>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 w-full">

                  <motion.div
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-xs uppercase text-[#6B7280] dark:text-[#94A3B8] font-semibold">
                      Focus
                    </p>

                    <p className="text-base sm:text-lg font-bold text-[#111827] dark:text-[#F5F7FA]">
                      Java + DSA
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 hover:shadow-md transition"
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-xs uppercase text-[#6B7280] dark:text-[#94A3B8] font-semibold">
                      Location
                    </p>

                    <p className="text-base sm:text-lg font-bold text-[#111827] dark:text-[#F5F7FA]">
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