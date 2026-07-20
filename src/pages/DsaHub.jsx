// src/pages/DsaHub.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Video,
  Award,
  Layers,
  GraduationCap,
  Star
} from "lucide-react";
import { dsaTopics } from "../data/dsaData";
import { useEffect } from "react";
import DsaTopicModal from "../components/DsaTopicModal";
import SEO from "../components/SEO";

export default function DsaHub() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Modal states
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        { id: "dsa", title: "DSA Mastery Hub", path: "/placement-kit/dsa" },
        ...list.filter(item => item.id !== "dsa")
      ].slice(0, 4);
      localStorage.setItem("placement_recent_resources", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (topicId, topicTitle, e) => {
    e.stopPropagation(); // prevent card click
    const isBookmarked = bookmarks.some(b => b.id === topicId);
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter(b => b.id !== topicId);
    } else {
      updated = [...bookmarks, { id: topicId, title: topicTitle, type: "DSA Topic", path: "/placement-kit/dsa" }];
    }
    localStorage.setItem("placement_bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  // Dynamic statistics calculations
  const stats = useMemo(() => {
    const total = dsaTopics.length;
    const completed = dsaTopics.filter(t => t.progress === 100).length;
    const avgProgress = Math.round(
      dsaTopics.reduce((acc, t) => acc + t.progress, 0) / total
    );
    const solvedProblems = dsaTopics.reduce(
      (acc, t) => acc + t.problems.filter(p => p.solved).length,
      0
    );

    return { total, completed, avgProgress, solvedProblems };
  }, []);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return dsaTopics.filter((topic) => {
      const matchesSearch =
        topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        difficultyFilter === "All" || topic.difficulty === difficultyFilter;

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Completed" && topic.progress === 100) ||
        (statusFilter === "InProgress" && topic.progress > 0 && topic.progress < 100) ||
        (statusFilter === "NotStarted" && topic.progress === 0);

      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }, [searchQuery, difficultyFilter, statusFilter]);

  const difficultyBadgeColors = {
    Easy: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40",
    Medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40",
    Hard: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40"
  };

  const handleCardClick = (topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200 relative overflow-hidden">
      <SEO
        title="DSA Preparation Hub"
        description="DSA Learning Hub. Track progress across 13 core structures and algorithms topics, and access coding templates, roadmaps, and practice files."
      />

      {/* Decorative Blur Blobs */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-red-650/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Back navigation */}
        <div>
          <button
            onClick={() => navigate("/placement-kit")}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Success Kit
          </button>
        </div>

        {/* Dashboard Title & Introduction */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-wider text-red-600 dark:text-red-400 uppercase bg-red-100 dark:bg-red-950/20 rounded-full border border-red-300 dark:border-red-900/50">
            Phase 2 • Java-focused Learning Tracker
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            DSA Preparation Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 max-w-3xl leading-relaxed">
            Track my mastery levels across 13 essential software engineering structures, paradigms, and algorithm topics. Click any topic to access cheatsheets, notes, video paths, and solve curated problems.
          </p>
        </div>

        {/* 3. Statistics Panel Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Overall Progress", value: `${stats.avgProgress}%`, icon: GraduationCap, color: "from-red-500 to-rose-500" },
            { label: "Topics Completed", value: `${stats.completed} / ${stats.total}`, icon: Layers, color: "from-amber-500 to-orange-500" },
            { label: "Problems Solved", value: stats.solvedProblems, icon: CheckCircle, color: "from-emerald-500 to-green-500" },
            { label: "Preparation Status", value: stats.avgProgress > 75 ? "Excellent" : "On Track", icon: Award, color: "from-blue-500 to-indigo-500" }
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

        {/* 4. Search and Filters Row */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search topics, patterns, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 dark:bg-slate-900/60 border border-slate-250 dark:border-slate-800 rounded-xl focus:border-red-500/50 focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm transition-all shadow-sm"
              />
            </div>

            <div className="text-[11px] font-bold text-slate-450 uppercase">
              Found {filteredTopics.length} topic{filteredTopics.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Filters List */}
          <div className="flex flex-wrap gap-4 border-b border-slate-200 dark:border-slate-900 pb-4">
            {/* Status Filter Tab Group */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1.5">Status:</span>
              {[
                { name: "All", id: "All" },
                { name: "Completed", id: "Completed" },
                { name: "In Progress", id: "InProgress" },
                { name: "Not Started", id: "NotStarted" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id)}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer border ${
                    statusFilter === filter.id
                      ? "bg-red-600 border-red-650 text-white shadow-sm"
                      : "bg-slate-50 dark:bg-slate-900/40 text-slate-650 dark:text-slate-400 border-slate-250 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900/70"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>

            {/* Difficulty Filter Tab Group */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1.5">Difficulty:</span>
              {[
                { name: "All", id: "All" },
                { name: "Easy", id: "Easy" },
                { name: "Medium", id: "Medium" },
                { name: "Hard", id: "Hard" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setDifficultyFilter(filter.id)}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-colors cursor-pointer border ${
                    difficultyFilter === filter.id
                      ? "bg-red-650 dark:bg-amber-400 border-red-700 dark:border-amber-500 text-white dark:text-slate-950 shadow-sm"
                      : "bg-slate-50 dark:bg-slate-900/40 text-slate-650 dark:text-slate-400 border-slate-250 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900/70"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Topic Cards Grid Layout */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filteredTopics.map((topic) => {
              const totalProblems = topic.problems.length;
              const solvedProblems = topic.problems.filter(p => p.solved).length;

              return (
                <motion.div
                  key={topic.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleCardClick(topic)}
                  className="group cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/60 dark:hover:bg-slate-900/30 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle corner glow in card */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-600/[0.02] dark:bg-amber-400/[0.03] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                  <div className="space-y-4">
                    {/* Header: Title + Difficulty Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => toggleBookmark(topic.id, topic.title, e)}
                          className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label={`Bookmark ${topic.title}`}
                        >
                          <Star
                            size={14}
                            className={bookmarks.some(b => b.id === topic.id) ? "fill-amber-500 text-amber-500" : "text-slate-400 dark:text-slate-500"}
                          />
                        </button>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${difficultyBadgeColors[topic.difficulty] || difficultyBadgeColors.Easy}`}>
                          {topic.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {topic.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-450 dark:text-slate-500">Progress</span>
                        <span>{topic.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-red-600 dark:bg-amber-450 h-full rounded-full transition-all duration-500"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer: resources summary and solve triggers */}
                  <div className="pt-4 border-t border-slate-250/50 dark:border-slate-850/50 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-semibold">
                        <BookOpen size={13} className="text-red-500" />
                        {topic.resources.length} resources
                      </span>
                      <span className="flex items-center gap-1 font-semibold">
                        <CheckCircle size={13} className="text-emerald-500" />
                        {solvedProblems}/{totalProblems} solved
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-red-650 dark:text-amber-400 group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* No results state */}
          {filteredTopics.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center flex flex-col items-center justify-center text-slate-500 space-y-3"
            >
              <HelpCircle size={36} className="text-slate-400" />
              <p className="text-base font-semibold">No topics match your search/filter filters.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDifficultyFilter("All");
                  setStatusFilter("All");
                }}
                className="text-xs font-bold text-red-600 dark:text-amber-500 underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* 6. DSA Topic Detailed Modal */}
        <DsaTopicModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          topic={selectedTopic}
        />

      </div>
    </div>
  );
}
