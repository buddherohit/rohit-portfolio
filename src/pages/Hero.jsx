import React from "react";
import { motion } from "framer-motion";
import DecryptText from "../components/DecryptText";
import GooeyCursor from "../components/GooeyCursor";

function Hero() {

  return (
    <motion.section
      id="hero"
      className="relative min-h-screen bg-gradient-to-b from-white via-white to-gray-50/30 flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 overflow-hidden pt-20 pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <GooeyCursor />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-100/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-32 left-10 w-96 h-96 bg-yellow-100/20 rounded-full blur-3xl -z-10 animate-float" />

      {/* Smooth transition wave to About section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50/50 -z-5" />

      {/* Social Media Icons - Left Edge (removed, will use SideElements component) */}

      {/* Main Content - Left Side */}
      <motion.div
        className="flex-1 max-w-2xl z-10"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Greeting */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Hello, I'm <span className="font-semibold">Rohit Buddhe</span>
        </motion.h1>

        {/* Role - Red Color with DecryptText Animation */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-red-600 mb-4 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem]"
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
          className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
Computer Engineering student at Yeshwantrao Chavan College of Engineering, Nagpur, with a strong passion for software development and problem solving. Skilled in Java, and Data Structures & Algorithms, I focus on building scalable and efficient applications. I have developed projects including Women Safety System, Student Learning Platform, and Smart Hostel Management System. I am continuously learning modern technologies and seeking opportunities to contribute to impactful software solutions.        </motion.p>

        {/* Contact Button - Red */}
        <motion.div
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
              }
            }}
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
          >
            Contact me!
          </button>
        </motion.div>
      </motion.div>


      {/* Mobile Social Icons and Contact Button (handled by SideElements) */}
    </motion.section>
  );
}

export default Hero;
