// src/components/DsaTopicModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, BookOpen, CheckCircle, HelpCircle, Video, FileText, LayoutList } from "lucide-react";

export default function DsaTopicModal({ isOpen, onClose, topic }) {
  const [activeTab, setActiveTab] = useState("notes");

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!topic) return null;

  const difficultyColors = {
    Easy: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40",
    Medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40",
    Hard: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40"
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-250/60 dark:border-slate-800/80 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {topic.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded border ${difficultyColors[topic.difficulty] || difficultyColors.Easy}`}>
                      {topic.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Category Dashboard & Study Materials
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title="Close details"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Progress Summary */}
              <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950/40 p-3 rounded-xl border border-slate-200/50 dark:border-slate-850/50">
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Mastery Progress</span>
                    <span className="text-slate-700 dark:text-slate-350">{topic.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-red-600 dark:bg-amber-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Status</p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {topic.progress === 100 ? "Completed" : topic.progress > 0 ? "In Progress" : "Not Started"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 px-6">
              {[
                { id: "notes", label: "Notes & Summary", icon: FileText },
                { id: "resources", label: "Resources", icon: Video },
                { id: "problems", label: "Practice Problems", icon: LayoutList }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isTabActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                      isTabActive
                        ? "border-red-600 dark:border-amber-400 text-red-600 dark:text-amber-400"
                        : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <TabIcon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Body Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar min-h-[250px]">
              
              {/* 1. NOTES TAB */}
              {activeTab === "notes" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Concept Overview</h4>
                    <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950/10 p-4 rounded-xl border border-slate-200/40 dark:border-slate-850/40">
                      {topic.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Study Materials & Notes</h4>
                    {topic.notes && topic.notes.length > 0 ? (
                      <div className="space-y-3">
                        {topic.notes.map((note, idx) => (
                          <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0">
                              <BookOpen size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-bold text-slate-850 dark:text-slate-200">{note.title}</h5>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{note.description}</p>
                            </div>
                            <a
                              href={note.url}
                              className="text-xs font-bold text-red-650 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0 self-center"
                            >
                              Open <ExternalLink size={12} />
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No notes uploaded for this topic yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* 2. RESOURCES TAB */}
              {activeTab === "resources" && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Curated Learning Materials</h4>
                  {topic.resources && topic.resources.length > 0 ? (
                    <div className="space-y-3">
                      {topic.resources.map((resource, idx) => (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3.5">
                            <span className="text-slate-450 dark:text-slate-500">
                              {resource.type === "video" ? <Video size={18} /> : <FileText size={18} />}
                            </span>
                            <div className="text-left">
                              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                                {resource.name}
                              </p>
                              <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 font-mono tracking-wider">
                                {resource.type}
                              </span>
                            </div>
                          </div>
                          <ExternalLink size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-550 italic">No learning resources linked yet.</p>
                  )}
                </div>
              )}

              {/* 3. PROBLEMS TAB */}
              {activeTab === "problems" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Target Practice Questions</h4>
                    <span className="text-[10px] text-slate-500 font-bold bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-850">
                      {topic.problems.filter(p => p.solved).length} / {topic.problems.length} Solved
                    </span>
                  </div>

                  {topic.problems && topic.problems.length > 0 ? (
                    <div className="space-y-2.5">
                      {topic.problems.map((problem, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {problem.solved ? (
                              <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                            ) : (
                              <HelpCircle size={18} className="text-slate-450 dark:text-slate-600 flex-shrink-0" />
                            )}
                            <div className="text-left">
                              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                                {problem.name}
                              </p>
                              <div className="flex gap-2 items-center mt-0.5">
                                <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider font-mono">
                                  {problem.platform}
                                </span>
                                <span className="text-[9px] text-slate-400">•</span>
                                <span className={`text-[9px] font-bold uppercase ${
                                  problem.difficulty === "Easy" ? "text-emerald-500" :
                                  problem.difficulty === "Medium" ? "text-amber-500" : "text-rose-500"
                                }`}>
                                  {problem.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>

                          <a
                            href={problem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-xs font-bold text-red-650 dark:text-amber-400 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            Solve <ExternalLink size={12} />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-550 italic">No practice problems loaded yet.</p>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
