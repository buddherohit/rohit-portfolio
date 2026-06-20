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
      className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md p-8 shadow-md hover:shadow-2xl transition-all duration-500"
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

          {/* Category */}
          {category && (
            <span className="inline-block text-xs font-semibold tracking-widest text-red-600 dark:text-red-400 uppercase">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-100">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-slate-350 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-slate-950 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 dark:hover:text-red-400 border border-transparent dark:border-slate-800 transition"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {slug && (
              <button
                onClick={() => navigate(`/projects/${slug}`)}
                className="px-5 py-2 bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer font-semibold text-sm"
              >
                Case Study
              </button>
            )}

            {demoUrl && demoUrl !== "#" && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg cursor-pointer text-sm font-semibold"
              >
                Live Demo
              </a>
            )}

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-350 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer text-sm font-semibold"
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