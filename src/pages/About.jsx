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
      className="relative isolate bg-gradient-to-b from-gray-50 via-white to-white py-20 sm:py-24"
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

          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 rounded-full">
            About Me
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            Building scalable solutions with 
            <span className="text-red-600"> passion </span>
            and 
            <span className="text-blue-600"> precision</span>
          </h2>

          <p className="text-lg text-gray-600 mt-4">
            Passionate about software development and building impactful applications
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left */}
          <motion.div
            variants={heroVariants}
            className="lg:col-span-7 space-y-8"
          >

            <div className="space-y-5 text-gray-600">

              <h3 className="text-2xl font-bold text-gray-900">
                Hi, I'm Rohit Buddhe 👋
              </h3>

              <p>
                Computer Engineering student at Yeshwantrao Chavan College of Engineering, Nagpur,
                passionate about building scalable software applications.
              </p>

              <p>
                Skilled in Java, Python and Data Structures & Algorithms. I enjoy solving real-world 
                problems and building impactful software solutions.
              </p>

              <p>
                Currently working as Software Development Intern at Cognifyz Technologies Pvt Ltd 
                and building projects like Women Safety System, Student Learning Platform and 
                Smart Hostel Management System.
              </p>

            </div>

           {/* Skills Timeline */}
<div className="relative border-l-2 border-gray-200 space-y-10 pl-8">

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
<div className="absolute -left-[38px] top-8 w-6 h-6 bg-white border-4 border-red-500 rounded-full shadow-md" />

{/* Card */}
<motion.div
className="bg-white p-8 rounded-2xl border shadow-md hover:shadow-2xl transition duration-300 cursor-pointer"
whileHover={{ y: -6, scale: 1.01 }}
>

{/* Heading */}
<h4 className="text-2xl font-bold text-gray-900 group-hover:text-red-600 transition duration-300 mb-3">
{pillar.title}
</h4>

{/* Description */}
<p className="text-gray-600 leading-relaxed text-base">
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
    <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-40 animate-pulse" />
    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse" />

    <motion.div
      className="relative flex flex-col items-center text-center bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-gray-100 shadow-xl hover:shadow-2xl transition duration-500"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >

      {/* Profile Image */}
      <div className="relative w-48 h-48 mb-6">

        {/* Red Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-300 rounded-3xl blur-xl opacity-20 animate-pulse" />

        {/* Floating Ring */}
        <motion.div
          className="absolute inset-0 border-2 border-red-400 rounded-3xl"
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
        className="text-2xl font-bold text-gray-900 mb-1"
        whileHover={{ scale: 1.05 }}
      >
        Rohit Buddhe
      </motion.h3>

      {/* Title */}
      <p className="text-gray-500 font-medium mb-6">
        Software Developer
      </p>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 w-full">

        <motion.div
          className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-md transition"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs uppercase text-gray-500 font-semibold">
            Focus
          </p>

          <p className="text-lg font-semibold text-gray-900">
            Java + DSA
          </p>
        </motion.div>

        <motion.div
          className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-md transition"
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-xs uppercase text-gray-500 font-semibold">
            Location
          </p>

          <p className="text-lg font-semibold text-gray-900">
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