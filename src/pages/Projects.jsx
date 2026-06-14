import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

// Import project images
import msbteJobPortalImg from "../assets/projects/msbteJobPortal.png";
import touchlessComputerImg from "../assets/projects/touchlessComputer.png";
import credexAuditImg from "../assets/projects/credexAudit.png";
import womenSafetyImg from "../assets/projects/womenSafety.png";
import studentPlatformImg from "../assets/projects/studentPlatform.png";

const projectsData = [
  {
    image: msbteJobPortalImg,
    category: "EdTech & Career",
    title: "MSBTE Diploma Job Portal",
    description:
      "A specialized career platform connecting Maharashtra diploma students from Mechanical, Civil, Electrical, and Computer/IT branches with verified industrial job opportunities. Features direct academic record verification and simplified applications.",
    tags: [
      "React",
      "Tailwind CSS",
      "Vite",
      "Vercel",
      "Material Symbols",
      "Job Portal",
    ],
    href: "https://github.com/buddherohit/MSBTE-Diploma-Job-Portal",
    demoUrl: "https://msbte-diploma-job-portal.vercel.app/",
  },

  {
    image: touchlessComputerImg,
    category: "AI & Computer Vision",
    title: "AI-Powered Touchless Computer Control System",
    description:
      "A computer vision based system that enables users to control their computer using hand gestures. Features include cursor movement, clicking, scrolling, volume control, and media navigation through real-time gesture recognition.",
    tags: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "Computer Vision",
      "AI",
    ],
    href: "https://github.com/buddherohit/AI-Powered-Touchless-Computer-Control-System",
    demoUrl: "https://ai-powered-touchless-computer-contr.vercel.app/",
  },

  {
    image: credexAuditImg,
    category: "AI & FinTech",
    title: "Credex AI Audit Platform",
    description:
      "An AI-powered financial audit platform that analyzes financial records, detects anomalies, identifies risks, and generates intelligent audit insights through automated analysis and interactive dashboards.",
    tags: [
      "React",
      "JavaScript",
      "AI",
      "FinTech",
      "Vercel",
    ],
    href: "https://github.com/buddherohit",
    demoUrl: "https://credex-ai-audit-v2.vercel.app/",
  },

  {
    image: womenSafetyImg,
    category: "Safety & Emergency",
    title: "Women Safety System",
    description:
      "A smart women safety application designed to enhance personal security with SOS alerts, live location sharing, emergency notifications, and real-time tracking for trusted contacts.",
    tags: [
      "Java",
      "Android",
      "GPS",
      "Firebase",
      "Location Tracking",
    ],
    href: "https://github.com/buddherohit",
    demoUrl: "#",
  },

  {
    image: studentPlatformImg,
    category: "EdTech Platform",
    title: "Student Learning Platform",
    description:
      "A digital learning platform providing study materials, tutorials, learning modules, progress tracking, and interactive educational resources for students.",
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "EdTech",
    ],
    href: "https://github.com/buddherohit",
    demoUrl: "#",
  },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 rounded-full border border-red-100">
            Portfolio • Work • Projects
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            My Projects
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl">
            Here are some of my projects showcasing my skills in AI,
            Computer Vision, Full Stack Development, Problem Solving,
            and Real-World Software Applications.
          </p>
        </motion.div>

        <div className="space-y-12">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              {...project}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}