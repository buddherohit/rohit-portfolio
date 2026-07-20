// src/pages/DevelopmentHub.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  BookOpen,
  FolderGit,
  Video,
  FileText,
  ChevronDown,
  ChevronUp,
  Award,
  Monitor,
  Database,
  ExternalLink,
  Laptop,
  Star
} from "lucide-react";
import { developmentTracks } from "../data/developmentData";
import { useEffect } from "react";
import SEO from "../components/SEO";

export default function DevelopmentHub() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Track currently expanded card ID
  const [expandedId, setExpandedId] = useState(null);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("placement_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Track page visit on mount
  useEffect(() => {
    try {
      const recent = localStorage.getItem("placement_recent_resources");
      const list = recent ? JSON.parse(recent) : [];
      const updated = [
        { id: "development", title: "Development Hub", path: "/placement-kit/development" },
        ...list.filter(item => item.id !== "development")
      ].slice(0, 4);
      localStorage.setItem("placement_recent_resources", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (trackId, trackTitle, e) => {
    e.stopPropagation(); // prevent card click
    const isBookmarked = bookmarks.some(b => b.id === trackId);
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter(b => b.id !== trackId);
    } else {
      updated = [...bookmarks, { id: trackId, title: trackTitle, type: "Dev Track", path: "/placement-kit/development" }];
    }
    localStorage.setItem("placement_bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  // Stats calculators
  const stats = useMemo(() => {
    const totalTracks = developmentTracks.length;
    const totalProjects = developmentTracks.reduce(
      (acc, t) => acc + t.recommendedProjects.length,
      0
    );
    const totalResources = developmentTracks.reduce(
      (acc, t) => acc + t.resources.length,
      0
    );
    return { totalTracks, totalProjects, totalResources };
  }, []);

  // Filtered tracks
  const filteredTracks = useMemo(() => {
    return developmentTracks.filter((track) => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        categoryFilter === "All" || track.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const categoryBadgeColors = {
    "Client Side": "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40",
    "Server Side": "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40",
    "Database & System": "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40",
    "Projects & Ops": "text-red-650 dark:text-red-400 bg-red-55/10 dark:bg-red-950/20 border-red-200 dark:border-red-900/40"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200 relative overflow-hidden">
      <SEO
        title="Development Preparation Hub"
        description="Development Hub. Master frontend, backend, database architectures, system design, recommended projects, and deployment guides."
      />

      {/* Ambient background glows */}
      <div className="absolute top-20 right-1/4 w-80 h-80 bg-red-650/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Back link */}
        <div>
          <button
            onClick={() => navigate("/placement-kit")}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Success Kit
          </button>
        </div>

        {/* Introduction */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-red-600 dark:text-red-400 uppercase bg-red-100 dark:bg-red-950/20 rounded-full border border-red-300 dark:border-red-900/50">
            Phase 3 • Full-Stack Engineering Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Development Prep Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 max-w-3xl leading-relaxed">
            Master the engineering tracks, technologies, frameworks, and deployment practices needed for full-stack software engineer placements. Click on any track below to expand its learning roadmap and project checklist.
          </p>
        </div>

        {/* Statistics Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Learning Paths", value: stats.totalTracks, icon: Layers, color: "from-red-500 to-rose-500" },
            { label: "Recommended Projects", value: stats.totalProjects, icon: FolderGit, color: "from-amber-500 to-orange-500" },
            { label: "Curated Reference Sheets", value: stats.totalResources, icon: BookOpen, color: "from-emerald-500 to-green-500" }
          ].map((widget, i) => {
            const WidgetIcon = widget.icon;
            return (
              <div
                key={i}
                className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850 p-4 sm:p-5 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-500">
                    {widget.label}
                  </span>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {widget.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${widget.color} flex items-center justify-center text-white flex-shrink-0 shadow-sm`}>
                  <WidgetIcon size={18} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tools, databases, roadmaps, systems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 dark:bg-slate-900/60 border border-slate-250 dark:border-slate-800 rounded-xl focus:border-red-500/50 focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm transition-all shadow-sm"
              />
            </div>

            <div className="text-[11px] font-bold text-slate-450 uppercase">
              Found {filteredTracks.length} path{filteredTracks.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-900 pb-4">
            {[
              { name: "All Tracks", id: "All" },
              { name: "Client Side", id: "Client Side" },
              { name: "Server Side", id: "Server Side" },
              { name: "Database & System", id: "Database & System" },
              { name: "Projects & Ops", id: "Projects & Ops" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`px-4 py-2 text-[10px] font-bold rounded-lg transition-colors cursor-pointer border ${
                  categoryFilter === tab.id
                    ? "bg-red-600 border-red-650 text-white shadow-sm"
                    : "bg-slate-50 dark:bg-slate-900/40 text-slate-650 dark:text-slate-400 border-slate-250 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900/70"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Expandable Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTracks.map((track) => {
            const isExpanded = expandedId === track.id;

            return (
              <motion.div
                key={track.id}
                layout="position"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`rounded-3xl border border-slate-250 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/50 dark:hover:bg-slate-900/20 p-6 flex flex-col justify-between shadow-sm transition-all duration-300 relative overflow-hidden ${
                  isExpanded ? "border-slate-350 dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-800" : ""
                }`}
              >
                {/* Header Toggle Clickable Area */}
                <div
                  onClick={() => toggleExpand(track.id)}
                  className="cursor-pointer space-y-4 select-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${categoryBadgeColors[track.category] || categoryBadgeColors["Client Side"]}`}>
                        {track.category}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(track.id, track.title, e)}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400 hover:text-amber-500"
                        aria-label={`Bookmark ${track.title}`}
                      >
                        <Star
                          size={13}
                          className={bookmarks.some(b => b.id === track.id) ? "fill-amber-500 text-amber-500" : "text-slate-450"}
                        />
                      </button>
                    </div>
                    <span className="text-slate-400 hover:text-slate-600 transition-colors">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  {/* Summary indicators */}
                  {!isExpanded && (
                    <div className="flex items-center gap-4 text-[10px] text-slate-450 dark:text-slate-500 font-semibold pt-2">
                      <span className="flex items-center gap-1">
                        <Layers size={12} /> {track.roadmap.length} steps
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={12} /> {track.resources.length} resources
                      </span>
                      <span className="flex items-center gap-1">
                        <FolderGit size={12} /> {track.recommendedProjects.length} projects
                      </span>
                    </div>
                  )}
                </div>

                {/* Expanded Details Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-slate-200/60 dark:border-slate-850/60 pt-6 mt-6 space-y-6 text-left"
                    >
                      {/* 1. Roadmap Timeline */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Learning Roadmap</h4>
                        <div className="relative pl-6 space-y-4">
                          {/* Timeline Line */}
                          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />

                          {track.roadmap.map((step, idx) => (
                            <div key={idx} className="relative flex items-start gap-3">
                              {/* Step dot */}
                              <div className="absolute -left-[23px] top-1 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-red-650 dark:border-amber-400 rounded-full flex items-center justify-center text-[8px] font-bold">
                                {idx + 1}
                              </div>
                              <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. Curated Reference Links */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Learning Resources</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {track.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850/60 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/80 transition-colors flex items-center justify-between cursor-pointer group"
                            >
                              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-amber-500 dark:group-hover:text-amber-400 truncate pr-2">
                                • {resource.name}
                              </span>
                              <ExternalLink size={12} className="text-slate-400 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* 3. Revision Notes */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Key Interview Notes</h4>
                        <div className="space-y-2">
                          {track.notes.map((note, idx) => (
                            <div
                              key={idx}
                              className="p-3 bg-slate-100/30 dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-850/40 rounded-xl space-y-1"
                            >
                              <h5 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                <FileText size={12} className="text-red-500" />
                                {note.title}
                              </h5>
                              <p className="text-[11px] text-slate-550 dark:text-slate-450 leading-relaxed pl-4">
                                {note.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 4. Recommended Projects */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Recommended Projects</h4>
                        <div className="space-y-3">
                          {track.recommendedProjects.map((project, idx) => (
                            <div
                              key={idx}
                              className="p-4 bg-white dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 rounded-2xl space-y-2.5 relative overflow-hidden"
                            >
                              <div className="flex justify-between items-start gap-2">
                                <h5 className="text-xs font-bold text-slate-900 dark:text-slate-150">
                                  {project.name}
                                </h5>
                                <div className="flex flex-wrap gap-1">
                                  {project.tech.map((t, idx2) => (
                                    <span
                                      key={idx2}
                                      className="text-[8px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 px-1.5 py-0.2 rounded"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-[11px] text-slate-550 dark:text-slate-450 leading-relaxed">
                                {project.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredTracks.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center justify-center text-slate-500 space-y-3">
            <Laptop size={36} className="text-slate-400" />
            <p className="text-base font-semibold">No tracks match your query.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("All");
              }}
              className="text-xs font-bold text-red-650 dark:text-amber-500 underline cursor-pointer"
            >
              Reset Search Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
