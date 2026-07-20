// src/pages/InterviewHub.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Download,
  CheckCircle,
  HelpCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Terminal,
  FileCode2,
  BookmarkCheck,
  MessageCircle,
  PhoneCall,
  Star
} from "lucide-react";
import { resumeData, interviewData } from "../data/interviewData";
import { useEffect } from "react";
import SEO from "../components/SEO";

export default function InterviewHub() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("resume"); // "resume" or "interview"
  const [selectedTopic, setSelectedTopic] = useState("java"); // "hr", "java", "react", "springBoot", "sql", "behavioral", "communication"
  
  // Collapsed questions states
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState(null);

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
        { id: "interview", title: "Resume & Interview Hub", path: "/placement-kit/interview" },
        ...list.filter(item => item.id !== "interview")
      ].slice(0, 4);
      localStorage.setItem("placement_recent_resources", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (id, title, type, e) => {
    e.stopPropagation();
    const isBookmarked = bookmarks.some(b => b.id === id);
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter(b => b.id !== id);
    } else {
      updated = [...bookmarks, { id, title, type, path: "/placement-kit/interview" }];
    }
    localStorage.setItem("placement_bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  // Interactive Checklist states
  const [checkedList, setCheckedList] = useState(() => {
    const initial = {};
    resumeData.checklist.forEach(item => {
      initial[item.id] = false;
    });
    return initial;
  });

  // Toast Notification state
  const [toast, setToast] = useState(null);

  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleCheckboxToggle = (id) => {
    setCheckedList(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Checklist Progress Percentage
  const checklistProgress = useMemo(() => {
    const checkedCount = Object.values(checkedList).filter(Boolean).length;
    const totalCount = resumeData.checklist.length;
    return Math.round((checkedCount / totalCount) * 100);
  }, [checkedList]);

  // Handle mock downloads
  const handleDownload = (fileName, docName) => {
    triggerToast(`Starting download: ${docName || fileName}...`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200 relative overflow-hidden">
      <SEO
        title="Resume & Interview Prep"
        description="Resume and Interview Preparation Hub. Access LaTeX templates, ATS compliance checklists, and core Java, React, Spring Boot, SQL, and HR question vaults."
      />

      {/* Decorative background glows */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-red-650/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Back Link */}
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
            Phase 4 • Resume & Interview Vault
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Resume & Interview Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 max-w-3xl leading-relaxed">
            Optimize your developer CV for ATS scanners, evaluate your profile completeness using our interactive checklists, and study core coding and behavioral questions compiled from real placements.
          </p>
        </div>

        {/* Primary Categories Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-850/80 bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl p-1.5 max-w-md">
          {[
            { id: "resume", label: "Resume Masterclass", icon: FileText },
            { id: "interview", label: "Interview Prep", icon: MessageCircle }
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedQuestionIdx(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  isTabActive
                    ? "bg-white dark:bg-slate-900 text-red-600 dark:text-amber-400 shadow-sm border border-slate-200/50 dark:border-slate-800"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <TabIcon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content space */}
        <div className="pt-2">
          
          {/* =============================================
             1. RESUME MASTERCLASS TAB
             ============================================= */}
          {activeTab === "resume" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Builder & ATS Guides */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Resume Builder Card */}
                <div className="bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-5 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-850/60 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileCode2 className="text-red-500" />
                      {resumeData.builder.title}
                      <button
                        onClick={(e) => toggleBookmark("resume_builder", resumeData.builder.title, "Resume Tool", e)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400 hover:text-amber-500"
                        aria-label={`Bookmark ${resumeData.builder.title}`}
                      >
                        <Star
                          size={13}
                          className={bookmarks.some(b => b.id === "resume_builder") ? "fill-amber-500 text-amber-500" : "text-slate-450"}
                        />
                      </button>
                    </h3>
                    <span className="text-[10px] font-bold uppercase font-mono bg-red-55/10 dark:bg-red-950/40 text-red-650 dark:text-red-400 px-2 py-0.5 rounded border border-red-200/20 dark:border-red-900/30">
                      {resumeData.builder.fileType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
                    {resumeData.builder.description}
                  </p>
                  
                  {/* Step Instructions */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Builder Guidelines</h4>
                    <ul className="space-y-2">
                      {resumeData.builder.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
                          <span className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => handleDownload(resumeData.builder.downloadUrl, "LaTeX CV Template")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-605 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer group"
                    >
                      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                      Download LaTeX Template
                    </button>
                  </div>
                </div>

                {/* ATS Guide Card */}
                <div className="bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-5 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-850/60 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Terminal className="text-amber-500" />
                      {resumeData.atsGuide.title}
                      <button
                        onClick={(e) => toggleBookmark("ats_guide", resumeData.atsGuide.title, "Resume Guide", e)}
                        className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400 hover:text-amber-500"
                        aria-label={`Bookmark ${resumeData.atsGuide.title}`}
                      >
                        <Star
                          size={13}
                          className={bookmarks.some(b => b.id === "ats_guide") ? "fill-amber-500 text-amber-500" : "text-slate-450"}
                        />
                      </button>
                    </h3>
                    <span className="text-[10px] font-bold uppercase font-mono bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-200/20 dark:border-amber-900/30">
                      {resumeData.atsGuide.fileType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
                    {resumeData.atsGuide.description}
                  </p>

                  {/* Rules Lists */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Compliance Parameters</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {resumeData.atsGuide.rules.map((item, idx) => (
                        <div key={idx} className="p-3.5 bg-white dark:bg-slate-950/40 border border-slate-200/40 dark:border-slate-850/50 rounded-xl space-y-1">
                          <h5 className="text-xs font-bold text-slate-850 dark:text-slate-200">• {item.rule}</h5>
                          <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed pl-2.5">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/40 dark:border-slate-850/40">
                    <button
                      onClick={() => handleDownload(resumeData.atsGuide.downloadUrl, "ATS Compliance Guide")}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-605 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer group"
                    >
                      <Download size={14} className="group-hover:translate-y-0.5 transition-transform" />
                      Download PDF Guide
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Checklist */}
              <div>
                <div className="bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-6 shadow-sm sticky top-28">
                  <div className="border-b border-slate-200/60 dark:border-slate-850/60 pb-3 space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <BookmarkCheck className="text-emerald-500" />
                      Profile Auditor
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
                      Interactive Resume Checklist
                    </p>
                  </div>

                  {/* Checklist Progress Indicator */}
                  <div className="space-y-1.5 bg-white dark:bg-slate-950/40 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-850/50">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Audit Status</span>
                      <span className="text-slate-700 dark:text-slate-350">{checklistProgress}% Verified</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-850 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${checklistProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Checklist Items */}
                  <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1.5 custom-scrollbar">
                    {resumeData.checklist.map((item) => {
                      const isChecked = !!checkedList[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleCheckboxToggle(item.id)}
                          className="flex items-start gap-3 p-3 bg-white dark:bg-slate-950/20 border border-slate-200/50 dark:border-slate-850/40 rounded-xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-800 transition-colors select-none"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}} // Controlled via parent div click
                            className="mt-0.5 accent-emerald-500 cursor-pointer flex-shrink-0"
                          />
                          <div className="space-y-0.5 text-left">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                {item.label}
                              </span>
                              <span className="text-[8px] font-bold uppercase px-1.5 py-0.2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 rounded font-mono shrink-0">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =============================================
             2. INTERVIEW PREPARATION TAB
             ============================================= */}
          {activeTab === "interview" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              
              {/* Left Column: Topics Sidebar selector */}
              <div className="bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-3.5 rounded-2xl space-y-1">
                <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 pl-3 mb-2">Subject Directories</span>
                {[
                  { id: "java", label: "Java Technology", icon: Terminal },
                  { id: "react", label: "React Client", icon: Laptop },
                  { id: "springBoot", label: "Spring Boot Server", icon: Layers },
                  { id: "sql", label: "SQL Database", icon: Database },
                  { id: "hr", label: "HR Interview FAQ", icon: PhoneCall },
                  { id: "behavioral", label: "Behavioral STAR", icon: Award },
                  { id: "communication", label: "Communication Tips", icon: MessageCircle }
                ].map((item) => {
                  const SubIcon = item.icon;
                  const isSelected = selectedTopic === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedTopic(item.id);
                        setExpandedQuestionIdx(null);
                      }}
                      className={`w-full flex items-center gap-3 py-2.5 px-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-left ${
                        isSelected
                          ? "bg-red-600 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm border border-transparent"
                          : "text-slate-650 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60"
                      }`}
                    >
                      <SubIcon size={14} className="shrink-0" />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Q&A Accordion & Details list */}
              <div className="lg:col-span-3 space-y-6">
                
                {selectedTopic !== "communication" ? (
                  // QA Accordions Block
                  <div className="space-y-4">
                    
                    {/* Topic Header & Download */}
                    <div className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-left space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest font-mono">Category Vault</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {interviewData[selectedTopic].title}
                          <button
                            onClick={(e) => toggleBookmark(`interview_${selectedTopic}`, interviewData[selectedTopic].title, "Interview FAQ", e)}
                            className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400 hover:text-amber-500"
                            aria-label={`Bookmark ${interviewData[selectedTopic].title}`}
                          >
                            <Star
                              size={13}
                              className={bookmarks.some(b => b.id === `interview_${selectedTopic}`) ? "fill-amber-500 text-amber-500" : "text-slate-450"}
                            />
                          </button>
                        </h3>
                      </div>
                      
                      <button
                        onClick={() => handleDownload(interviewData[selectedTopic].downloadUrl, `${interviewData[selectedTopic].title} Sheet`)}
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold rounded-xl transition-colors cursor-pointer group shadow-sm shrink-0"
                      >
                        <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
                        Download Reference Guide
                      </button>
                    </div>

                    {/* Collapsible Questions List */}
                    <div className="space-y-3.5">
                      {interviewData[selectedTopic].questions.map((item, idx) => {
                        const isExpanded = expandedQuestionIdx === idx;
                        return (
                          <div
                            key={idx}
                            className={`rounded-2xl border border-slate-200 dark:border-slate-850 bg-slate-50/40 dark:bg-slate-900/10 p-5 space-y-4 transition-all duration-300 ${
                              isExpanded ? "border-slate-300 dark:border-slate-800 ring-1 ring-slate-200 dark:ring-slate-800" : ""
                            }`}
                          >
                            {/* Question Title Bar */}
                            <div
                              onClick={() => setExpandedQuestionIdx(isExpanded ? null : idx)}
                              className="flex items-start justify-between gap-3 cursor-pointer select-none text-left"
                            >
                              <h4 className="text-sm font-bold text-slate-850 dark:text-slate-150 leading-snug">
                                Q: {item.q}
                              </h4>
                              <span className="text-slate-400 mt-0.5 shrink-0">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </span>
                            </div>

                            {/* Answer reveal */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden space-y-3.5 border-t border-slate-200/50 dark:border-slate-850/50 pt-4 mt-2 text-left"
                                >
                                  <div className="space-y-1">
                                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Suggested Answer</h5>
                                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed bg-white dark:bg-slate-950/30 p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-850/45">
                                      {item.a}
                                    </p>
                                  </div>

                                  <div className="p-3 bg-red-50/50 dark:bg-red-950/10 border border-red-200/20 dark:border-red-900/30 rounded-xl space-y-1">
                                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-amber-400 flex items-center gap-1.5">
                                      <Award size={12} />
                                      Rohit's Interview Tip
                                    </h5>
                                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                                      {item.tip}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                ) : (
                  // Communication Tips Cards List
                  <div className="space-y-5">
                    
                    {/* Header */}
                    <div className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-850 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="text-left space-y-0.5">
                        <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest font-mono">Soft Skills Vault</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <MessageCircle className="text-red-500" />
                          {interviewData.communication.title}
                        </h3>
                      </div>
                      
                      <button
                        onClick={() => handleDownload(interviewData.communication.downloadUrl, "Elevator Pitch Sheet")}
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-950 border border-slate-250 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs font-bold rounded-xl transition-colors cursor-pointer group shadow-sm shrink-0"
                      >
                        <Download size={13} className="group-hover:translate-y-0.5 transition-transform" />
                        Download Pitch Template
                      </button>
                    </div>

                    {/* Grid List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {interviewData.communication.tips.map((item, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50/40 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl text-left space-y-2 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/[0.01] dark:bg-amber-400/[0.02] rounded-full blur-xl pointer-events-none" />
                          <h4 className="text-xs sm:text-sm font-bold text-slate-850 dark:text-slate-200 border-b border-slate-200/50 dark:border-slate-850 pb-2">
                            {item.title}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-450 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Toast Notification Container */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[150] px-5 py-3 bg-slate-900/90 dark:bg-white/95 text-white dark:text-slate-900 border border-slate-800 dark:border-slate-200 rounded-xl shadow-2xl backdrop-blur-md text-xs font-bold flex items-center gap-2"
          >
            <span>🚀 {toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
