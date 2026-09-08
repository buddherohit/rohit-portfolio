import React from "react";
import { motion } from "framer-motion";
import DecryptText from "../components/DecryptText";
import LocationTimeCard from "../components/LocationTimeCard";

function Hero() {

  return (
    <motion.section
      id="hero"
      className="relative min-h-screen bg-gradient-to-b from-white via-white to-gray-50/30 dark:from-transparent dark:via-transparent dark:to-transparent flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 overflow-hidden pt-20 pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-100/30 dark:bg-cyan-500/[0.08] rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-32 left-10 w-96 h-96 bg-yellow-100/20 dark:bg-purple-500/[0.08] rounded-full blur-3xl -z-10 animate-float" />

      {/* Smooth transition wave to About section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-transparent -z-5" />

      {/* Main Content - Left Side */}
      <motion.div
        className="flex-1 max-w-2xl z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Greeting Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200/70 dark:border-cyan-500/25 text-[#0891B2] dark:text-[#22D3EE] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="animate-bounce">👋</span> Hello, I&apos;m
        </motion.div>

        {/* Main Title (Name) */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display text-[#111827] dark:text-[#F5F7FA] mb-4 leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Rohit <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent dark:from-[#22D3EE] dark:via-[#A78BFA] dark:to-[#67E8F9]">Buddhe</span>
        </motion.h1>

        {/* Role - Controlled Accent with DecryptText Animation */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#0891B2] dark:text-[#22D3EE] mb-6 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <DecryptText
            values={[
              'A Full Stack Developer',
              'A Software Engineer',
              'I build things for the web',
              'A Problem Solver',
            ]}
            delay={3000}
          />
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-[#374151] dark:text-[#CBD5E1] mb-6 leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Computer Engineering student at Yeshwantrao Chavan College of Engineering, Nagpur, with a strong passion for software development and problem solving. Skilled in Java, and Data Structures &amp; Algorithms, I focus on building scalable and efficient applications. I have developed projects including Women Safety System, Student Learning Platform, and Smart Hostel Management System. I am continuously learning modern technologies and seeking opportunities to contribute to impactful software solutions.
        </motion.p>

        {/* CTA Row — Contact Button + Live Location Card */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element && window.lenis) {
                window.lenis.scrollTo(element, {
                  offset: -80,
                  duration: 0.8,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
              } else if (element) {
                const yOffset = -80;
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
              }
            }}
            className="inline-block px-6 py-3 bg-[#0891B2] hover:bg-[#0e7490] text-white dark:bg-[#22D3EE] dark:hover:bg-[#67E8F9] dark:text-slate-950 dark:font-semibold rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg dark:shadow-[0_0_20px_rgba(34,211,238,0.25)] cursor-pointer contact-btn"
          >
            Contact me!
          </button>

          {/* 📍 Live Location & Time — compact inline */}
          <LocationTimeCard compact />
        </motion.div>
      </motion.div>

    </motion.section>
  );
}

export default Hero;
