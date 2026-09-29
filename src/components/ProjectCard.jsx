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
      className="rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md p-4 sm:p-6 lg:p-7 shadow-sm hover:border-gray-300 dark:hover:border-white/25 dark:hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <div className={`grid lg:grid-cols-[1.3fr_1fr] gap-5 sm:gap-6 lg:gap-8 items-center ${!isEven ? 'lg:grid-cols-[1fr_1.3fr]' : ''}`}>

        {/* Content */}
        <motion.div
          className={`space-y-3 sm:space-y-4 ${!isEven ? 'lg:order-2' : ''}`}
          variants={contentVariants}
        >

          {/* Category / Metadata Pill */}
          {category && (
            <span className="inline-block px-2.5 py-0.5 text-[10px] sm:text-xs font-mono font-medium tracking-wider text-gray-600 dark:text-white/70 bg-gray-100/80 dark:bg-white/5 rounded-full border border-gray-200/80 dark:border-white/10 backdrop-blur-sm uppercase">
              {category}
            </span>
          )}

          {/* Title — Clean, proportional */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white font-display tracking-tight">
            {title}
          </h3>

          {/* Description — Soft readable text */}
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>

          {/* Technology tags — Sleek pill tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-mono font-medium bg-gray-100/70 dark:bg-white/5 text-gray-700 dark:text-white/80 rounded-full border border-gray-200/80 dark:border-white/10 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons — Compact, mobile-friendly */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
            {slug && (
              <button
                onClick={() => navigate(`/projects/${slug}`)}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] active:scale-98 shadow-sm cursor-pointer whitespace-nowrap"
              >
                Case Study
              </button>
            )}

            {demoUrl && demoUrl !== "#" && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#0891B2] hover:bg-[#0e7490] text-white dark:bg-[#22D3EE] dark:hover:bg-[#67E8F9] dark:text-slate-950 rounded-full font-semibold text-xs sm:text-sm transition shadow-sm cursor-pointer whitespace-nowrap"
              >
                Live Demo
              </a>
            )}

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 border border-gray-300/80 dark:border-white/15 bg-white/50 dark:bg-white/5 backdrop-blur-md text-gray-800 dark:text-white font-semibold text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition cursor-pointer whitespace-nowrap"
            >
              GitHub
            </a>

          </div>

        </motion.div>

        {/* Image */}
        <motion.div
          className={`relative rounded-xl overflow-hidden border border-gray-200/60 dark:border-white/10 shadow-md ${!isEven ? 'lg:order-1' : ''}`}
          variants={imageVariants}
        >
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-[180px] sm:h-[220px] lg:h-[250px] object-cover hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="h-[180px] sm:h-[220px] lg:h-[250px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/[0.02] flex items-center justify-center">
              <span className="text-5xl">🚀</span>
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
}

export default memo(ProjectCard);