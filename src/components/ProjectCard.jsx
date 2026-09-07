import React, { memo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProjectCard({
  title = "Project",
  description = "",
  href = "#",
  tags = [],
  image = null,
  demoUrl = null,
  category = "",
  index = 0,
  slug = null
}) {
  const navigate = useNavigate();
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -40 : 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="rounded-3xl border border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 backdrop-blur-md p-8 shadow-sm hover:shadow-xl dark:shadow-none dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] transition-all duration-300 hover:-translate-y-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <div className={`grid lg:grid-cols-[1.3fr_1fr] gap-8 items-center ${!isEven ? 'lg:grid-cols-[1fr_1.3fr]' : ''}`}>

        {/* Content */}
        <motion.div
          className={`space-y-6 ${!isEven ? 'lg:order-2' : ''}`}
          variants={contentVariants}
        >

          {/* Category / Metadata — Muted gray */}
          {category && (
            <span className="inline-block text-xs font-semibold tracking-wider text-[#6B7280] dark:text-[#94A3B8] uppercase">
              {category}
            </span>
          )}

          {/* Title — Strong, high contrast */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] dark:text-[#F5F7FA] font-display">
            {title}
          </h3>

          {/* Description — Soft readable gray */}
          <p className="text-[#374151] dark:text-[#CBD5E1] leading-relaxed text-sm sm:text-base">
            {description}
          </p>

          {/* Technology tags — Small accent colors */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-cyan-950/30 text-[#0891B2] dark:text-[#22D3EE] rounded-md border border-slate-200/80 dark:border-cyan-500/25 transition"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons — CTA: Primary cyan/blue accent */}
          <div className="flex flex-wrap gap-3 pt-2">
            {slug && (
              <button
                onClick={() => navigate(`/projects/${slug}`)}
                className="px-4 py-2 bg-[#0891B2] hover:bg-[#0e7490] text-white dark:bg-[#22D3EE] dark:hover:bg-[#67E8F9] dark:text-slate-950 rounded-lg transition-all duration-300 shadow-sm cursor-pointer font-semibold text-sm"
              >
                Case Study
              </button>
            )}

            {demoUrl && demoUrl !== "#" && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0891B2] hover:bg-[#0e7490] text-white dark:bg-[#22D3EE] dark:hover:bg-[#67E8F9] dark:text-slate-950 rounded-lg transition shadow-sm cursor-pointer text-sm font-semibold"
              >
                Live Demo
              </a>
            )}

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 dark:border-slate-700 text-[#374151] dark:text-[#CBD5E1] rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer text-sm font-medium"
            >
              GitHub
            </a>

          </div>

        </motion.div>

        {/* Image */}
        <motion.div
          className={`relative rounded-2xl overflow-hidden shadow-lg ${!isEven ? 'lg:order-1' : ''}`}
          variants={imageVariants}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-[280px] object-cover hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="h-[280px] bg-gradient-to-br from-red-100 to-gray-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center">
              <span className="text-6xl">🚀</span>
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
}

export default memo(ProjectCard);