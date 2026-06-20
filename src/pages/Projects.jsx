import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      "Job Portal",
    ],
    href: "https://github.com/buddherohit/MSBTE-Diploma-Job-Portal",
    demoUrl: "https://msbte-diploma-job-portal.vercel.app/",
    slug: "msbte-job-portal"
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
    slug: "touchless-computer-control"
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
    slug: "credex-ai-audit"
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
    slug: "women-safety-system"
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
    slug: "student-platform"
  },

  {
    image: null,
    category: "Generative AI & LLMs",
    title: "DiplomaGPT",
    description:
      "An advanced AI tutoring chatbot designed specifically for MSBTE curriculum. Providing syllabus mapping, solved model answers, and interactive query resolution using RAG (Retrieval-Augmented Generation).",
    tags: [
      "React",
      "Node.js",
      "Python",
      "LangChain",
      "Gemini API",
      "Pinecone DB",
    ],
    href: "https://github.com/buddherohit/DiplomaGPT",
    demoUrl: "https://diplomagpt-ai.vercel.app/",
    slug: "diplomagpt"
  }
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTabs = useMemo(() => [
    { label: "All", value: "all", count: projectsData.length },
    { label: "AI & GenAI", value: "ai", count: projectsData.filter(p => ["AI & Computer Vision", "Generative AI & LLMs"].includes(p.category)).length },
    { label: "Web & Full Stack", value: "web", count: projectsData.filter(p => ["EdTech & Career", "AI & FinTech", "EdTech Platform"].includes(p.category)).length },
    { label: "Mobile / Java", value: "mobile", count: projectsData.filter(p => p.category === "Safety & Emergency").length }
  ], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectsData;
    if (activeFilter === "ai") return projectsData.filter(p => ["AI & Computer Vision", "Generative AI & LLMs"].includes(p.category));
    if (activeFilter === "web") return projectsData.filter(p => ["EdTech & Career", "AI & FinTech", "EdTech Platform"].includes(p.category));
    if (activeFilter === "mobile") return projectsData.filter(p => p.category === "Safety & Emergency");
    return projectsData;
  }, [activeFilter]);

  return (
    <motion.section
      id="projects"
      className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 py-16 sm:py-20 overflow-hidden"
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
        <motion.div className="mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 dark:bg-red-950/20 rounded-full border border-red-100 dark:border-red-950">
            Portfolio • Work • Projects
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 tracking-tight mb-4">
            My Projects
          </h2>

          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl">
            Here are some of my projects showcasing my skills in AI,
            Computer Vision, Full Stack Development, Problem Solving,
            and Real-World Software Applications.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.value
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white/80 dark:bg-slate-900/60 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-slate-800"
              }`}
            >
              {tab.label} <span className="ml-1.5 text-xs opacity-75">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Timeline Grid */}
        <motion.div className="space-y-12" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard
                  index={index}
                  {...project}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}