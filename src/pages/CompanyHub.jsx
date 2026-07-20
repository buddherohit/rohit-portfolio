// src/pages/CompanyHub.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  BookOpen,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  HelpCircle,
  Star
} from "lucide-react";
import { companyPrepList } from "../data/companyData";
import SEO from "../components/SEO";

export default function CompanyHub() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal States
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("process"); // "process", "resources", "experiences"

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
        { id: "company", title: "Company Prep Hub", path: "/placement-kit/company" },
        ...list.filter(item => item.id !== "company")
      ].slice(0, 4);
      localStorage.setItem("placement_recent_resources", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (companyId, companyName, e) => {
    e.stopPropagation(); // prevent card click
    const isBookmarked = bookmarks.some(b => b.id === companyId);
    let updated;
    if (isBookmarked) {
      updated = bookmarks.filter(b => b.id !== companyId);
    } else {
      updated = [...bookmarks, { id: companyId, title: companyName, type: "Company Prep", path: "/placement-kit/company" }];
    }
    localStorage.setItem("placement_bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  // Dynamic statistics
  const stats = useMemo(() => {
    const total = companyPrepList.length;
    const products = companyPrepList.filter((c) => c.category === "Product").length;
    const fintech = companyPrepList.filter((c) => c.category === "FinTech").length;
    const services = companyPrepList.filter((c) => c.category === "Services").length;
    return { total, products, fintech, services };
  }, []);

  // Filtered lists
  const filteredCompanies = useMemo(() => {
    return companyPrepList.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.importantTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        categoryFilter === "All" || company.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  // Handle card click
  const handleCardClick = (company) => {
    setSelectedCompany(company);
    setModalTab("process");
    setIsModalOpen(true);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const categoryBadgeColors = {
    Product: "text-red-650 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40",
    FinTech: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40",
    Services: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40"
  };

  const difficultyColors = {
    Easy: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40",
    "Easy-Medium": "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-900/40",
    Medium: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40",
    Hard: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200 relative overflow-hidden">
      <SEO
        title="Company Placement Prep"
        description="Company Preparation Hub. Explore detailed hiring workflows, technical online assessments, interview coding rounds, and resource kits for 8 major companies."
      />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-red-650/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
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
            Phase 5 • Employer Specific Placement Vaults
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Company Preparation Hub
          </h1>
          <p className="text-sm sm:text-base text-slate-650 dark:text-slate-400 max-w-3xl leading-relaxed">
            Targeted preparation directories for top-tier software employers. Review details on hiring pipelines, automated online coding rounds, technical interviews, core tested topics, and past student logs.
          </p>
        </div>

        {/* Statistics Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Target Companies", value: stats.total, icon: Building, color: "from-red-500 to-rose-500" },
            { label: "Product Giants", value: stats.products, icon: Layers, color: "from-amber-500 to-orange-500" },
            { label: "FinTech Firms", value: stats.fintech, icon: Award, color: "from-blue-500 to-indigo-500" },
            { label: "Services Sectors", value: stats.services, icon: Users, color: "from-purple-500 to-pink-500" }
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

        {/* Search & Filters */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employer, core topics, or profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/70 dark:bg-slate-900/60 border border-slate-250 dark:border-slate-800 rounded-xl focus:border-red-500/50 focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm transition-all shadow-sm"
              />
            </div>

            <div className="text-[11px] font-bold text-slate-450 uppercase">
              Showing {filteredCompanies.length} companies
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-900 pb-4">
            {[
              { name: "All Companies", id: "All" },
              { name: "Product Giants", id: "Product" },
              { name: "FinTech Firms", id: "FinTech" },
              { name: "Services", id: "Services" }
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

        {/* Companies Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleCardClick(company)}
                className="group cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/60 dark:hover:bg-slate-900/30 p-6 flex flex-col justify-between h-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent corner blur */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-600/[0.015] dark:bg-amber-400/[0.025] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />

                <div className="space-y-4">
                  {/* Top Row Badges */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase rounded border ${categoryBadgeColors[company.category] || categoryBadgeColors.Product}`}>
                        {company.category}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(company.id, company.name, e)}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400 hover:text-amber-500"
                        aria-label={`Bookmark ${company.name}`}
                      >
                        <Star
                          size={13}
                          className={bookmarks.some(b => b.id === company.id) ? "fill-amber-500 text-amber-500" : "text-slate-455"}
                        />
                      </button>
                    </div>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${difficultyColors[company.difficulty] || difficultyColors.Medium}`}>
                      {company.difficulty}
                    </span>
                  </div>

                  {/* Company Name & Profile */}
                  <div className="space-y-1.5 text-left">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                      {company.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed line-clamp-3">
                      {company.overview}
                    </p>
                  </div>

                  {/* Top tested topics badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {company.importantTopics.slice(0, 3).map((topic, index) => (
                      <span
                        key={index}
                        className="text-[8px] font-bold uppercase tracking-wider bg-white dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850/60 text-slate-500 dark:text-slate-450 px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action */}
                <div className="pt-5 border-t border-slate-200/50 dark:border-slate-850/50 mt-6 flex items-center justify-between text-[11px] text-slate-500 font-bold">
                  <span>Hiring Rounds: {company.hiringProcess.length}</span>
                  <span className="text-[10px] text-red-650 dark:text-amber-400 group-hover:underline flex items-center gap-0.5">
                    Explore Guide <ChevronRight size={13} />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="col-span-full py-16 text-center flex flex-col items-center justify-center text-slate-500 space-y-3">
              <HelpCircle size={36} className="text-slate-400" />
              <p className="text-base font-semibold">No companies match your queries.</p>
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
        </motion.div>

      </div>

      {/* Detailed Guide Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCompany && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-200 dark:border-slate-800 space-y-3 text-left">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedCompany.name}
                      </h3>
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${categoryBadgeColors[selectedCompany.category] || categoryBadgeColors.Product}`}>
                        {selectedCompany.category}
                      </span>
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded border ${difficultyColors[selectedCompany.difficulty] || difficultyColors.Medium}`}>
                        {selectedCompany.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Hiring Workflows & Preparation Playbook
                    </p>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-250/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20 px-6">
                {[
                  { id: "process", label: "Hiring Process", icon: Calendar },
                  { id: "resources", label: "Topics & Resources", icon: BookOpen },
                  { id: "experiences", label: "Interview Logs", icon: Briefcase }
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  const isTabActive = modalTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setModalTab(tab.id)}
                      className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                        isTabActive
                          ? "border-red-650 dark:border-amber-400 text-red-600 dark:text-amber-400"
                          : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      <TabIcon size={14} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-left min-h-[250px]">
                
                {/* 1. HIRING PROCESS TAB */}
                {modalTab === "process" && (
                  <div className="space-y-6">
                    {/* Process timeline */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pipeline Timeline</h4>
                      <div className="relative pl-6 space-y-4">
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
                        {selectedCompany.hiringProcess.map((step, idx) => (
                          <div key={idx} className="relative flex items-start gap-3">
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

                    {/* Online assessment */}
                    <div className="space-y-2 bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-200/55 dark:border-slate-850/55 rounded-2xl">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <Clock size={12} className="text-red-505" />
                        Online Assessment (OA) Specifications
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-305">Assessment Duration:</p>
                          <p className="pl-2 mt-0.5">{selectedCompany.onlineAssessment.duration}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-305">Tested Sub-Topics:</p>
                          <p className="pl-2 mt-0.5">{selectedCompany.onlineAssessment.topics}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="font-bold text-slate-800 dark:text-slate-305">Assessment Pattern:</p>
                          <p className="pl-2 mt-0.5">{selectedCompany.onlineAssessment.pattern}</p>
                        </div>
                      </div>
                    </div>

                    {/* Onsite interview rounds */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Interview Rounds Breakdown</h4>
                      <div className="space-y-2.5">
                        {selectedCompany.interviewRounds.map((round, idx) => (
                          <div key={idx} className="p-3.5 bg-slate-55/10 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-850/60 rounded-xl space-y-1">
                            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">• {round.name}</h5>
                            <p className="text-[11px] text-slate-550 dark:text-slate-450 leading-relaxed pl-2.5">
                              {round.focus}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. TOPICS & RESOURCES TAB */}
                {modalTab === "resources" && (
                  <div className="space-y-6">
                    {/* Tested Topics list */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Frequently Tested Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompany.importantTopics.map((topic, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 font-bold text-slate-700 dark:text-slate-300 rounded-xl shadow-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Resources reference links */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Curated Placement Resources</h4>
                      <div className="space-y-2">
                        {selectedCompany.preparationResources && selectedCompany.preparationResources.length > 0 ? (
                          selectedCompany.preparationResources.map((res, idx) => (
                            <a
                              key={idx}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-900/60 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-red-500 shrink-0">
                                  <BookOpen size={16} />
                                </span>
                                <div className="text-left">
                                  <p className="text-sm font-bold text-slate-850 dark:text-slate-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                                    {res.name}
                                  </p>
                                  <span className="text-[9px] uppercase font-bold text-slate-450 dark:text-slate-500 font-mono tracking-wider">
                                    {res.type}
                                  </span>
                                </div>
                              </div>
                              <ExternalLink size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                          ))
                        ) : (
                          <p className="text-xs text-slate-500 italic">No resources attached yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. EXPERIENCES TAB */}
                {modalTab === "experiences" && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Past Candidate Experiences</h4>
                    <div className="space-y-4">
                      {selectedCompany.experiences.map((exp, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl space-y-4"
                        >
                          {/* Experience Meta Details */}
                          <div className="flex flex-wrap items-center justify-between border-b border-slate-250/50 dark:border-slate-850/50 pb-3 gap-3">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Users size={18} className="text-slate-500" />
                              </div>
                              <div className="text-left">
                                <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">{exp.candidate}</h5>
                                <p className="text-[10px] text-slate-500 dark:text-slate-450 font-semibold uppercase">{exp.role} • Batch {exp.year}</p>
                              </div>
                            </div>

                            <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase rounded border ${
                              exp.verdict === "Selected" ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-250/30" : "text-slate-500 bg-slate-100 border-slate-200"
                            }`}>
                              {exp.verdict}
                            </span>
                          </div>

                          {/* Details feedback */}
                          <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed bg-white dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-855/50 font-medium">
                            {exp.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
