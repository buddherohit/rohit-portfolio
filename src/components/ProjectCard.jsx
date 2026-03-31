import React, { memo } from "react";
import { motion } from "framer-motion";

function ProjectCard({
  title = "Project",
  description = "",
  href = "#",
  tags = [],
  image = null,
  demoUrl = null,
  category = "",
  index = 0
}) {
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
      className="rounded-3xl border border-gray-200 bg-white/80 backdrop-blur-md p-8 shadow-md hover:shadow-2xl transition-all duration-500"
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
            <span className="inline-block text-xs font-semibold tracking-widest text-red-600 uppercase">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
              >
                Live Demo
              </a>
            )}

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
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
            <div className="h-[280px] bg-gradient-to-br from-red-100 to-gray-100 flex items-center justify-center">
              <span className="text-6xl">🚀</span>
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
}

export default memo(ProjectCard);