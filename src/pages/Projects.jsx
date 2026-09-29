import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

// Import project images
import vibeCodeEditorImg from "../assets/projects/vibeCodeEditor.png";
import msbteJobPortalImg from "../assets/projects/msbteJobPortal.png";
import touchlessComputerImg from "../assets/projects/touchlessComputer.png";
import credexAuditImg from "../assets/projects/credexAudit.png";
import womenSafetyImg from "../assets/projects/womenSafety.png";
import diplomaGPTImg from "../assets/projects/diplomaGPT.png";

const projectsData = [
  {
    image: vibeCodeEditorImg,
    category: "Cloud IDE & AI",
    title: "VibeCode Editor",
    description:
      "A next-generation in-browser Full-Stack Cloud IDE and AI coding playground powered by Next.js 15, WebContainers, Monaco Editor, and Google Gemini AI. Scaffold, edit, run full Node.js servers, and debug with real-time AI assistance.",
    tags: [
      "Next.js 15",
      "WebContainers",
      "Monaco Editor",
      "Gemini AI",
      "TypeScript",
      "Tailwind CSS",
    ],
    href: "https://github.com/buddherohit/VibeCodeEditor",
    demoUrl: "https://vibe-code-editor-vert.vercel.app/",
    slug: "vibecode-editor"
  },

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
    image: diplomaGPTImg,
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
    { label: "AI & GenAI", value: "ai", count: projectsData.filter(p => ["Cloud IDE & AI", "AI & Computer Vision", "Generative AI & LLMs"].includes(p.category)).length },
    { label: "Web & Full Stack", value: "web", count: projectsData.filter(p => ["Cloud IDE & AI", "EdTech & Career", "AI & FinTech"].includes(p.category)).length },
    { label: "Mobile / Java", value: "mobile", count: projectsData.filter(p => p.category === "Safety & Emergency").length }
  ], []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projectsData;
    if (activeFilter === "ai") return projectsData.filter(p => ["Cloud IDE & AI", "AI & Computer Vision", "Generative AI & LLMs"].includes(p.category));
    if (activeFilter === "web") return projectsData.filter(p => ["Cloud IDE & AI", "EdTech & Career", "AI & FinTech"].includes(p.category));
    if (activeFilter === "mobile") return projectsData.filter(p => p.category === "Safety & Emergency");
    return projectsData;
  }, [activeFilter]);

  return (
    <motion.section
      id="projects"
      className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white dark:from-transparent dark:via-transparent dark:to-transparent py-16 sm:py-20 overflow-hidden"
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
        <motion.div className="mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-[11px] font-mono tracking-wider text-gray-700 dark:text-white/80 uppercase bg-gray-50/50 dark:bg-white/5 rounded-full border border-gray-200/80 dark:border-white/10 backdrop-blur-sm">
            Portfolio • Work • Projects
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display tracking-tight mb-2.5">
            My Projects
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            Here are some of my projects showcasing my skills in AI,
            Computer Vision, Full Stack Development, Problem Solving,
            and Real-World Software Applications.
          </p>
        </motion.div>

        {/* Filter Tabs (Compact & Sleek) */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-8 sm:mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-3.5 py-1.5 sm:px-4.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === tab.value
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                  : "bg-white/70 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-100/60 dark:hover:bg-white/10 backdrop-blur-sm"
              }`}
            >
              {tab.label} <span className="ml-1 text-[11px] opacity-75 font-mono">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid (Compact Mobile Spacing) */}
        <motion.div className="space-y-5 sm:space-y-7" layout>
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