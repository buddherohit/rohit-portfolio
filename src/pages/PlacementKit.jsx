// src/pages/PlacementKit.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Binary,
  Laptop,
  FileText,
  MessageSquareText,
  Building2,
  Database,
  Brain,
  Compass,
  ArrowRight,
  ArrowDown,
  BookOpen
} from "lucide-react";
import { placementCategories } from "../data/placementData";
import SEO from "../components/SEO";

// Icon Map helper to resolve string names to Lucide icons
const IconMap = {
  Binary,
  Laptop,
  FileText,
  MessageSquareText,
  Building2,
  Database,
  Brain,
  Compass
};

export default function PlacementKit() {
  const navigate = useNavigate();

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), []);

  // Smooth scroll to the grid container
  const handleScrollToGrid = () => {
    const element = document.getElementById("resources-grid");
    if (element && window.lenis) {
      window.lenis.scrollTo(element, {
        offset: -85,
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Navigate to landing page and scroll to Experience section
  const handleNavigateToJourney = () => {
    navigate("/", { state: { scrollTo: "experience" } });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200 relative overflow-hidden">
      <SEO 
        title="Placement Success Kit" 
        description="A curated collection of resources, roadmaps, and interview preparation materials for Software Engineering placements." 
      />

      {/* Ambient background glows for tech branding */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-red-500/5 dark:bg-red-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* 1. Premium Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold tracking-widest text-red-600 dark:text-red-400 uppercase bg-red-50 dark:bg-red-950/20 rounded-full border border-red-200 dark:border-red-900/40">
              🚀 Success Kit • Phase 1 Foundation
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Placement Success Kit
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-slate-650 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A curated collection of the exact resources, roadmaps, interview preparation materials, and learning guides I'm using on my journey to becoming a Software Engineer.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={handleScrollToGrid}
              className="w-full sm:w-auto px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg shadow-red-900/25 hover:shadow-red-900/35 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Explore Resources
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={handleNavigateToJourney}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold border border-slate-200 dark:border-slate-800 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              My Placement Journey
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* 2. Quick Access Grid Section */}
        <div id="resources-grid" className="space-y-8 scroll-mt-24">
          <div className="border-b border-slate-200 dark:border-slate-900 pb-5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Quick Access Hub
            </h2>
            <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
              Select a resource hub below to explore specific topic guides.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {placementCategories.map((category) => {
              const IconComp = IconMap[category.iconName] || BookOpen;

              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  className="group rounded-3xl border border-slate-200 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/70 dark:hover:bg-slate-900/30 p-6 flex flex-col justify-between h-full shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Glassmorphic backdrop glow */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.colorClass} opacity-[0.03] dark:opacity-[0.05] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                  <div className="space-y-5">
                    {/* Header: Icon and Resource Count */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.colorClass} flex items-center justify-center text-white shadow-md shadow-slate-900/10`}>
                        <IconComp size={22} />
                      </div>
                      <span className="text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2.5 py-0.5 rounded-full border border-red-100 dark:border-red-900/30">
                        {category.resourceCount} items
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                        {category.description}
                      </p>
                    </div>

                    {/* Placeholder Items List for UI excellence */}
                    <div className="pt-3 border-t border-slate-200/50 dark:border-slate-850/60 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Featured Topics</p>
                      <ul className="space-y-1">
                        {category.items.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="truncate pr-2">• {item.name}</span>
                            <span className="text-[9px] bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 px-1.5 py-0.2 rounded font-mono flex-shrink-0">
                              {item.type}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Explore button in card footer */}
                  <div className="pt-5 flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-red-650 dark:text-amber-400 group-hover:text-red-750 dark:group-hover:text-amber-300 flex items-center gap-1.5 cursor-pointer">
                      Explore Resources
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-350" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
