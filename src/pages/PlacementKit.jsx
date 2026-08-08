// src/pages/PlacementKit.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  BookOpen,
  Flame,
  Sparkles,
  Check,
  Star,
  Search,
  Clock,
  ExternalLink,
  GraduationCap,
  X,
  HelpCircle,
  Lock,
  Unlock,
  ShieldCheck,
  Loader2,
  Download
} from "lucide-react";
import { placementCategories } from "../data/placementData";
import { trackerCategories } from "../data/trackerData";
import { dsaTopics } from "../data/dsaData";
import { developmentTracks } from "../data/developmentData";
import { resumeData, interviewData } from "../data/interviewData";
import { companyPrepList } from "../data/companyData";
import SEO from "../components/SEO";
import { useAuth } from "../context/AuthContext";
import AuthModal from "../components/AuthModal";

// Icon Map helper to resolve string names to Lucide icons
const IconMap = {
  Binary,
  Laptop,
  FileText,
  MessageSquareText,
  Building2,
  Database,
  Brain,
  Compass,
  Download
};

const premiumFeatures = [
  {
    title: "Java DSA Masterclass",
    desc: "150+ standard sheets, dynamic pattern-based coding problems, and optimized dry-run explanations.",
    icon: "Binary",
    colorClass: "from-red-500 to-rose-500",
  },
  {
    title: "Resume & LaTeX Templates",
    desc: "ATS-friendly single-column layouts, action verbs list, and LaTeX sources used for top-tier selections.",
    icon: "FileText",
    colorClass: "from-blue-500 to-indigo-500",
  },
  {
    title: "Interview Questions",
    desc: "HR, behavioral, and technical questionnaire banks utilizing STAR response frameworks.",
    icon: "MessageSquareText",
    colorClass: "from-green-500 to-emerald-500",
  },
  {
    title: "Company-wise Prep",
    desc: "Deep-dives into past assessment patterns for FAANG, startups, and top product companies.",
    icon: "Building2",
    colorClass: "from-purple-500 to-pink-500",
  },
  {
    title: "Curated Roadmaps",
    desc: "Comprehensive guides for Frontend, Backend, Fullstack, and DevOps paths with resource references.",
    icon: "Compass",
    colorClass: "from-indigo-500 to-purple-500",
  },
  {
    title: "Detailed Placement Notes",
    desc: "In-depth summary notes for DBMS SQL queries, OS paging models, OOP design rules, and CN protocols.",
    icon: "Database",
    colorClass: "from-cyan-500 to-sky-500",
  },
  {
    title: "Technical Cheat Sheets",
    desc: "Quick summaries of language syntaxes, complexity notations, Git workflows, and deployment guidelines.",
    icon: "FileText",
    colorClass: "from-amber-500 to-orange-500",
  },
  {
    title: "AI Placement Mentor",
    desc: "Interactive mock questions, resume checks, and coding pattern assistance available 24/7.",
    icon: "Brain",
    colorClass: "from-teal-500 to-emerald-500",
  },
];

export default function PlacementKit() {
  const navigate = useNavigate();
  const { user, token, apiUrl, unlockPlacementKit } = useAuth();
  const [toast, setToast] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);

  // Dynamically load Razorpay SDK
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUnlockNow = async (overrideUser = null, overrideToken = null) => {
    const currentUser = overrideUser || user;
    const currentToken = overrideToken || token;

    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setPaymentLoading(true);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        triggerToast("Failed to load Razorpay SDK. Please check your internet connection.");
        setPaymentLoading(false);
        return;
      }

      // Create Order on backend
      const response = await fetch(`${apiUrl}/api/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
        },
        body: JSON.stringify({
          amount: 9900, // ₹99 in paise
          currency: "INR",
          receipt: `receipt_${currentUser._id}_${Date.now()}`
        })
      });

      const orderData = await response.json();
      if (!response.ok) {
        throw new Error(orderData.message || "Failed to create payment order");
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Placement Success Kit Pro",
        description: "One-time payment for lifetime premium access.",
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            setPaymentLoading(true);
            const verifyRes = await fetch(`${apiUrl}/api/payments/verify-payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.unlocked) {
              unlockPlacementKit();
              triggerToast("🎉 Welcome to Pro! Premium access unlocked successfully!");
            } else {
              triggerToast(verifyData.message || "Payment verification failed.");
            }
          } catch (verifyErr) {
            console.error(verifyErr);
            triggerToast("Verification error occurred. Please contact support.");
          } finally {
            setPaymentLoading(false);
          }
        },
        prefill: {
          email: currentUser.email,
        },
        theme: {
          color: "#EF4444",
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
            triggerToast("Payment cancelled by user.");
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      
      paymentObject.on("payment.failed", function (response) {
        setPaymentLoading(false);
        triggerToast(response.error ? `Payment failed: ${response.error.description}` : "Payment failed.");
      });

      paymentObject.open();
    } catch (err) {
      console.error(err);
      triggerToast(err.message || "Payment initialization failed.");
    } finally {
      setPaymentLoading(false);
    }
  };

  // Dynamic displays categories including downloads and AI mentor
  const displayCategories = useMemo(() => {
    if (user && user.placementKitUnlocked) {
      return [
        ...placementCategories,
        {
          id: "downloads",
          title: "Premium Downloads",
          description: "Curated resource files, LaTeX resume templates, cheat sheets, and technical guides ready for offline study.",
          resourceCount: 5,
          iconName: "Download",
          colorClass: "from-rose-500 to-red-500",
          items: [
            { name: "Single-Column LaTeX Template", type: "LaTeX", status: "Download" },
            { name: "SQL & DBMS Cheat Sheet", type: "PDF", status: "Download" },
            { name: "System Design Key Patterns", type: "PDF", status: "Download" }
          ]
        },
        {
          id: "ai-mentor",
          title: "AI Placement Mentor",
          description: "Stuck on a problem or resume point? Start a real-time conversation with the specialized mentor in the bottom right corner.",
          resourceCount: "Active",
          iconName: "Brain",
          colorClass: "from-teal-500 to-emerald-500",
          items: [
            { name: "Mock coding questionnaire", type: "AI Tool", status: "Active" },
            { name: "Resume auditor helper", type: "AI Tool", status: "Active" },
            { name: "CS core subject revision", type: "AI Tool", status: "Active" }
          ]
        }
      ];
    }
    return placementCategories;
  }, [user]);

  // Tracker & Milestone States
  const [completedMilestones, setCompletedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem("placement_tracker_completed");
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem("placement_tracker_streak");
      return saved ? JSON.parse(saved) : { count: 0, lastCheckIn: null };
    } catch (e) {
      return { count: 0, lastCheckIn: null };
    }
  });

  const [activeTrackerCategory, setActiveTrackerCategory] = useState("dsa");

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem("placement_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Recent Views State
  const [recentViews, setRecentViews] = useState(() => {
    try {
      const saved = localStorage.getItem("placement_recent_resources");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Load Bookmarks and Recent Views on focus/mount
  useEffect(() => {
    const reloadStoredData = () => {
      try {
        const savedBookmarks = localStorage.getItem("placement_bookmarks");
        if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
        
        const savedRecents = localStorage.getItem("placement_recent_resources");
        if (savedRecents) setRecentViews(JSON.parse(savedRecents));
      } catch (e) {
        console.error(e);
      }
    };
    reloadStoredData();
    window.addEventListener("focus", reloadStoredData);
    return () => window.removeEventListener("focus", reloadStoredData);
  }, []);

  const removeBookmark = (id, e) => {
    e.stopPropagation();
    const updated = bookmarks.filter(b => b.id !== id);
    localStorage.setItem("placement_bookmarks", JSON.stringify(updated));
    setBookmarks(updated);
  };

  // Global Search State & Indexer
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  const searchIndex = useMemo(() => {
    const list = [];

    // 1. DSA Topics
    dsaTopics.forEach(t => {
      list.push({
        id: t.id,
        title: t.title,
        type: "DSA Topic",
        description: t.description,
        path: "/placement-kit/dsa"
      });
    });

    // 2. Dev Tracks
    developmentTracks.forEach(t => {
      list.push({
        id: t.id,
        title: t.title,
        type: "Dev Path",
        description: t.description.length > 80 ? t.description.slice(0, 80) + "..." : t.description,
        path: "/placement-kit/development"
      });
    });

    // 3. Resume & Interview
    list.push({
      id: "resume_builder",
      title: resumeData.builder.title,
      type: "Resume Tool",
      description: resumeData.builder.description,
      path: "/placement-kit/interview"
    });
    list.push({
      id: "ats_guide",
      title: resumeData.atsGuide.title,
      type: "Resume Guide",
      description: resumeData.atsGuide.description,
      path: "/placement-kit/interview"
    });
    Object.keys(interviewData).forEach(key => {
      list.push({
        id: `interview_${key}`,
        title: interviewData[key].title,
        type: "Interview FAQ",
        description: `Preparation questions bank and candidate notes for ${interviewData[key].title}.`,
        path: "/placement-kit/interview"
      });
    });

    // 4. Companies
    companyPrepList.forEach(c => {
      list.push({
        id: c.id,
        title: c.name,
        type: "Company Prep",
        description: c.overview,
        path: "/placement-kit/company"
      });
    });

    return list;
  }, []);

  const searchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return [];
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(globalSearchQuery.toLowerCase())
    );
  }, [globalSearchQuery, searchIndex]);

  const triggerToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleMilestoneToggle = (id) => {
    setCompletedMilestones((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem("placement_tracker_completed", JSON.stringify(updated));
      return updated;
    });
  };

  const handleCheckIn = () => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    
    if (streak.lastCheckIn === today) {
      triggerToast("Already checked in today! Keep learning! 🔥");
      return;
    }

    let newCount = 1;
    if (streak.lastCheckIn) {
      const lastDate = new Date(streak.lastCheckIn);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        newCount = streak.count + 1;
      }
    }

    const updated = { count: newCount, lastCheckIn: today };
    localStorage.setItem("placement_tracker_streak", JSON.stringify(updated));
    setStreak(updated);
    triggerToast(`Daily check-in success! Streak: ${newCount} days 🔥`);
  };

  // Progress metrics calculations
  const progressMetrics = useMemo(() => {
    const totalCount = trackerCategories.reduce((acc, cat) => acc + cat.milestones.length, 0);
    const completedCount = Object.values(completedMilestones).filter(Boolean).length;
    const overallPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

    const categoryStats = {};
    trackerCategories.forEach(cat => {
      const catTotal = cat.milestones.length;
      const catCompleted = cat.milestones.filter(m => !!completedMilestones[m.id]).length;
      const catPercent = catTotal ? Math.round((catCompleted / catTotal) * 100) : 0;
      categoryStats[cat.id] = { total: catTotal, completed: catCompleted, percent: catPercent };
    });

    return { totalCount, completedCount, overallPercent, categoryStats };
  }, [completedMilestones]);

  const recommendations = useMemo(() => {
    const recs = [];
    const percent = progressMetrics.overallPercent;

    if (percent < 35) {
      recs.push({
        title: "Master Arrays & Strings",
        category: "DSA Mastery",
        reason: "Recommended starting point to build basic indexing and iteration logic.",
        path: "/placement-kit/dsa"
      });
      recs.push({
        title: "ATS-Friendly Single-Column Layout",
        category: "Resume & Profiles",
        reason: "Highly critical first step for resume formatting to bypass applicant filters.",
        path: "/placement-kit/interview"
      });
    } else if (percent < 70) {
      recs.push({
        title: "React Virtual DOM & Reconciliation",
        category: "Interview QA",
        reason: "Highly frequent question in frontend client developer assessments.",
        path: "/placement-kit/interview"
      });
      recs.push({
        title: "SQL Queries & Database Indexes",
        category: "Aptitude & DBs",
        reason: "Intermediate concepts tested in almost every full-stack technical interview.",
        path: "/placement-kit/interview"
      });
    } else {
      recs.push({
        title: "System Design & Scaling Architectures",
        category: "Development Paths",
        reason: "Advanced backend requirements. Master caching, CDNs, load balancing.",
        path: "/placement-kit/development"
      });
      recs.push({
        title: "FAANG & Product Companies Preparation Guides",
        category: "Company Prep",
        reason: "Focus on Amazon Leadership Principles, Google DFS algorithms, and Microsoft LLDs.",
        path: "/placement-kit/company"
      });
    }

    return recs;
  }, [progressMetrics.overallPercent]);

  const handleCardClick = (id, title) => {
    if (id === "dsa") {
      navigate("/placement-kit/dsa");
    } else if (id === "development") {
      navigate("/placement-kit/development");
    } else if (id === "resume" || id === "interview-prep") {
      navigate("/placement-kit/interview");
    } else if (id === "company-prep") {
      navigate("/placement-kit/company");
    } else if (id === "downloads") {
      setIsDownloadsOpen(true);
    } else if (id === "ai-mentor") {
      triggerToast("🤖 Your AI Mentor is online! Click the glowing bubble in the bottom right corner to start querying!");
    } else {
      triggerToast(`${title} Hub is coming soon in Phase 6!`);
    }
  };

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

  // Render Premium Locked Landing Page
  if (!user || !user.placementKitUnlocked) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200 relative overflow-hidden">
        <SEO 
          title="Placement Success Kit Pro" 
          description="Unlock the ultimate developer preparation platform containing Java DSA sheets, Resume templates, company guides, and AI placement mentor." 
        />

        {/* Ambient background glows */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-500/5 dark:bg-red-500/3 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-10 w-80 h-80 bg-amber-500/5 dark:bg-amber-500/3 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold tracking-widest text-red-600 dark:text-amber-500 uppercase bg-red-50 dark:bg-slate-900/60 rounded-full border border-red-200 dark:border-slate-800">
                🚀 Success Kit Pro
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Placement Success Kit <span className="bg-gradient-to-r from-red-655 to-rose-500 dark:from-amber-400 dark:to-orange-500 bg-clip-text text-transparent">Pro</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything I used to prepare for Software Engineering placements. Step up your preparation with standard resources, mock guides, and an AI mentor.
            </motion.p>
          </div>

          {/* Premium Lock Experience Section (Paywall Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-850 p-8 sm:p-10 rounded-3xl shadow-xl backdrop-blur-md relative overflow-hidden text-center"
          >
            {/* Absolute gradients for aesthetics */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 dark:bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/10 dark:bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-6">
              <div className="inline-flex p-4 rounded-full bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-amber-550 border border-red-100 dark:border-red-900/20 shadow-inner">
                <Lock size={28} className="animate-pulse" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Unlock Lifetime Access</h2>
                <p className="text-xs text-slate-550 dark:text-slate-400 max-w-sm mx-auto">
                  Get full access to all standard preparation sections and files instantly. One-time secure checkout.
                </p>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto py-2">
                {[
                  "Premium Content",
                  "Lifetime Access",
                  "Regular Updates",
                  "Downloadable Resources",
                ].map((prop, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white dark:bg-slate-950/40 border border-slate-100 dark:border-slate-850/50 p-3 rounded-2xl shadow-xs">
                    <ShieldCheck size={16} className="text-emerald-550 shrink-0" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-350 text-left">{prop}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & Checkout Button */}
              <div className="space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-850/50">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-sm text-slate-400 line-through">₹499</span>
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">Only ₹99</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-1.5 py-0.5 rounded">80% OFF</span>
                </div>

                <button
                  onClick={handleUnlockNow}
                  disabled={paymentLoading}
                  className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-red-600 to-rose-600 dark:from-amber-500 dark:to-orange-500 text-white dark:text-slate-950 rounded-2xl font-bold shadow-lg shadow-red-900/20 dark:shadow-amber-500/10 hover:shadow-red-900/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 mx-auto"
                >
                  {paymentLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Initializing Payment...
                    </>
                  ) : (
                    <>
                      <Unlock size={18} />
                      Unlock Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Locked Feature Cards Section */}
          <div className="space-y-8">
            <div className="text-left">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">What's Included in Pro</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore the premium tools and documents designed to help you clear interview filters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumFeatures.map((feat, idx) => {
                const IconComp = IconMap[feat.icon] || BookOpen;
                return (
                  <div
                    key={idx}
                    className="group rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 p-6 flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300 text-left border-dashed"
                  >
                    {/* Glow backdrop */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feat.colorClass} opacity-[0.03] dark:opacity-[0.05] rounded-full blur-xl pointer-events-none`} />

                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feat.colorClass} flex items-center justify-center text-white shadow-md shadow-slate-900/5`}>
                          <IconComp size={22} />
                        </div>
                        <span className="flex items-center gap-1.5 text-[9px] font-bold text-red-650 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2.5 py-1 rounded-full border border-red-200/20 dark:border-red-900/20 uppercase tracking-widest font-mono">
                          <Lock size={9} /> Locked
                        </span>
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {feat.title}
                        </h3>
                        <p className="text-slate-550 dark:text-slate-400 text-xs leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Guest Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={handleUnlockNow}
        />

        {/* Toast Notification */}
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

        {/* 1b. Interactive Placement Progress Dashboard */}
        <div className="bg-slate-55/5 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-6 shadow-sm relative overflow-hidden text-left">
          <div className="border-b border-slate-200/60 dark:border-slate-850/60 pb-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="text-amber-500 w-5 h-5" />
                Preparation Control Panel
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Monitor preparation milestones, update checklist targets, and claim your learning streak.
              </p>
            </div>

            {/* Streak Counter Widget */}
            <div className="flex items-center gap-3 self-start sm:self-auto bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-2.5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200/40 text-orange-600 dark:text-orange-400">
                <Flame size={16} className="animate-pulse fill-orange-500/20" />
                <span className="text-xs font-bold font-mono">{streak.count} Day Streak</span>
              </div>
              <button
                onClick={handleCheckIn}
                className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Check In
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Dashboard Left Column: Overall Progress & Milestones List */}
            <div className="space-y-6">
              {/* Overall Completion Card */}
              <div className="bg-white dark:bg-slate-950 p-4 border border-slate-200/60 dark:border-slate-850/60 rounded-2xl space-y-3.5 shadow-xs">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-500">Overall Progress</span>
                  <span className="text-slate-850 dark:text-slate-300 font-bold">{progressMetrics.overallPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressMetrics.overallPercent}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold text-center uppercase tracking-wider">
                  {progressMetrics.completedCount} of {progressMetrics.totalCount} Milestones Verified
                </div>
              </div>

              {/* Sidebar Category Selectors */}
              <div className="bg-white dark:bg-slate-950/40 p-2.5 border border-slate-250 dark:border-slate-850 rounded-2xl space-y-1">
                {trackerCategories.map(cat => {
                  const isSelected = activeTrackerCategory === cat.id;
                  const percent = progressMetrics.categoryStats[cat.id]?.percent || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTrackerCategory(cat.id)}
                      className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-100 dark:bg-slate-900 text-red-650 dark:text-amber-450 border border-slate-200 dark:border-slate-800 font-bold"
                          : "text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/60"
                      }`}
                    >
                      <span className="text-xs">{cat.title}</span>
                      <span className="text-[10px] font-mono font-bold bg-slate-200/50 dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 text-slate-500">
                        {percent}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dashboard Right Column: Expanded Milestone Checks list */}
            <div className="lg:col-span-2">
              {trackerCategories.map(cat => {
                if (cat.id !== activeTrackerCategory) return null;
                const statsInfo = progressMetrics.categoryStats[cat.id] || { completed: 0, total: 0 };
                const IconComponent = IconMap[cat.iconName] || BookOpen;

                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4 shadow-xs"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.colorClass} flex items-center justify-center text-white`}>
                          <IconComponent size={16} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{cat.title} Checklist</h3>
                      </div>
                      <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest font-mono">
                        {statsInfo.completed} / {statsInfo.total} Completed
                      </span>
                    </div>

                    {/* Checkbox Rows */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {cat.milestones.map(milestone => {
                        const isChecked = !!completedMilestones[milestone.id];
                        return (
                          <div
                            key={milestone.id}
                            onClick={() => handleMilestoneToggle(milestone.id)}
                            className={`flex items-start gap-3 p-3 border rounded-2xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-800 transition-colors select-none ${
                              isChecked
                                ? "bg-emerald-50/[0.05] border-emerald-500/20"
                                : "bg-slate-50/40 dark:bg-slate-950/20 border-slate-200 dark:border-slate-850"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}} // Click handled on container div
                              className="mt-0.5 accent-emerald-500 cursor-pointer shrink-0"
                            />
                            <div className="text-left space-y-0.5">
                              <p className="text-xs font-bold text-slate-805 dark:text-slate-200 leading-tight">
                                {milestone.label}
                              </p>
                              <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed">
                                {milestone.detail}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

        {/* 1c. Personalized Prep Assistant (Bookmarks, Recommendations, Recent Views) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          
          {/* Column 1: Recommendations Engine */}
          <div className="bg-slate-55/5 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="border-b border-slate-200/60 dark:border-slate-850/60 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="text-amber-500 w-4 h-4" />
                Prep Recommendations
              </h3>
            </div>
            <div className="space-y-3">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(rec.path)}
                  className="p-3 bg-white dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850/50 rounded-xl cursor-pointer hover:border-slate-350 dark:hover:border-slate-805 transition-colors space-y-1"
                >
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-850 dark:text-slate-250 leading-tight">
                      {rec.title}
                    </h4>
                    <span className="text-[8px] font-bold font-mono uppercase bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-450 px-1.5 py-0.2 rounded shrink-0">
                      {rec.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-relaxed">
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Bookmarks */}
          <div className="bg-slate-55/5 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="border-b border-slate-200/60 dark:border-slate-850/60 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="text-amber-500 w-4 h-4 fill-amber-500/10" />
                Bookmarked Topics
              </h3>
            </div>
            <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1 custom-scrollbar">
              {bookmarks.length > 0 ? (
                bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    onClick={() => navigate(bookmark.path)}
                    className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850/50 rounded-xl cursor-pointer hover:border-slate-350 dark:hover:border-slate-800 transition-colors"
                  >
                    <div className="text-left space-y-0.5">
                      <p className="text-xs font-bold text-slate-805 dark:text-slate-200 leading-tight">
                        {bookmark.title}
                      </p>
                      <span className="text-[8px] font-bold uppercase tracking-wider text-slate-450 font-mono">
                        {bookmark.type}
                      </span>
                    </div>
                    <button
                      onClick={(e) => removeBookmark(bookmark.id, e)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-450 hover:text-red-500 cursor-pointer"
                      aria-label="Remove bookmark"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-[11px] text-slate-450 italic">
                  No bookmarks saved. Click the Star icon inside hubs to pin them here.
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Recent Views */}
          <div className="bg-slate-55/5 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 p-5 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="border-b border-slate-200/60 dark:border-slate-850/60 pb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="text-amber-500 w-4 h-4" />
                Recently Viewed
              </h3>
            </div>
            <div className="space-y-2.5">
              {recentViews.length > 0 ? (
                recentViews.map((recent) => (
                  <div
                    key={recent.id}
                    onClick={() => navigate(recent.path)}
                    className="flex items-center justify-between p-2.5 bg-white dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-850/50 rounded-xl cursor-pointer hover:border-slate-350 dark:hover:border-slate-800 transition-colors"
                  >
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-805 dark:text-slate-200 leading-tight">
                        {recent.title}
                      </p>
                    </div>
                    <ExternalLink size={11} className="text-slate-405 shrink-0" />
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-[11px] text-slate-450 italic">
                  Explore resource hubs below to populate recent items.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* 2. Quick Access Grid Section */}
        <div id="resources-grid" className="space-y-8 scroll-mt-24">
          <div className="border-b border-slate-200 dark:border-slate-900 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Quick Access Hub
              </h2>
              <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
                Select a resource hub below to explore specific topic guides.
              </p>
            </div>

            {/* Global Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-450 w-4 h-4" />
              <input
                type="text"
                placeholder="Search across all resources & hubs..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-slate-55/5 dark:bg-slate-900/60 border border-slate-250 dark:border-slate-800 rounded-xl focus:border-red-500/50 focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs transition-all shadow-sm"
              />
              {globalSearchQuery && (
                <button
                  onClick={() => setGlobalSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {globalSearchQuery ? (
            // Search Results Panel
            <div className="space-y-4 min-h-[300px] text-left">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Search Results</h3>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((result, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate(result.path)}
                      className="p-4 bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-850 rounded-2xl hover:border-slate-350 dark:hover:border-slate-800 cursor-pointer hover:-translate-y-0.5 transition-all shadow-xs"
                    >
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <h4 className="text-sm font-bold text-slate-905 dark:text-slate-200 group-hover:text-amber-500">
                          {result.title}
                        </h4>
                        <span className="text-[8px] font-bold uppercase tracking-wider font-mono bg-red-100 dark:bg-red-950/20 text-red-650 dark:text-amber-450 px-2 py-0.5 rounded border border-red-200/20 dark:border-red-900/20">
                          {result.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">
                        {result.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center flex flex-col items-center justify-center text-slate-500 space-y-2.5">
                  <HelpCircle size={32} className="text-slate-400" />
                  <p className="text-sm font-semibold">No preparation resources match your query.</p>
                  <button
                    onClick={() => setGlobalSearchQuery("")}
                    className="text-xs font-bold text-red-650 dark:text-amber-505 underline cursor-pointer"
                  >
                    Clear Search Query
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {displayCategories.map((category) => {
                const IconComp = IconMap[category.iconName] || BookOpen;

                return (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    onClick={() => handleCardClick(category.id, category.title)}
                    className="group rounded-3xl border border-slate-200 dark:border-slate-850 hover:border-slate-350 dark:hover:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/70 dark:hover:bg-slate-900/30 p-6 flex flex-col justify-between h-full shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden cursor-pointer"
                  >
                    {/* Glassmorphic backdrop glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.colorClass} opacity-[0.03] dark:opacity-[0.05] rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                    <div className="space-y-5">
                      {/* Header: Icon and Resource Count */}
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.colorClass} flex items-center justify-center text-white shadow-md shadow-slate-900/10`}>
                          <IconComp size={22} />
                        </div>
                        <span className="text-[11px] font-bold text-red-650 dark:text-red-400 bg-red-50 dark:bg-red-950/30 px-2.5 py-0.5 rounded-full border border-red-100 dark:border-red-900/30">
                          {category.resourceCount} items
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                          {category.title}
                        </h3>
                        <p className="text-slate-650 dark:text-slate-400 text-xs leading-relaxed line-clamp-3">
                          {category.description}
                        </p>
                      </div>
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
        )}
        </div>
      </div>

      {/* Premium Downloads Modal */}
      <AnimatePresence>
        {isDownloadsOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDownloadsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border border-slate-200/50 dark:border-slate-850/50 p-8 rounded-3xl shadow-2xl relative max-w-lg w-full z-10 text-left"
            >
              <button
                onClick={() => setIsDownloadsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-slate-700 dark:hover:text-slate-250 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Download className="text-red-500 w-5 h-5" />
                Premium Resources Download Vault
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Get full access to all cheat sheets, LaTeX source files, and compilation lists. Click to download.
              </p>

              <div className="space-y-3">
                {[
                  { name: "Single-Column LaTeX Resume Template", type: "Latex Source", size: "12 KB", link: "#" },
                  { name: "Blind 75 DSA Code Snippets Compilation", type: "PDF Document", size: "1.4 MB", link: "#" },
                  { name: "DBMS SQL Queries & Normalization Notes", type: "PDF Document", size: "840 KB", link: "#" },
                  { name: "STAR Method Behavioral Interview Template", type: "DOCX Form", size: "18 KB", link: "#" },
                  { name: "System Design Cheat Sheet (HLD & LLD Keys)", type: "PDF Document", size: "1.1 MB", link: "#" },
                ].map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-850/60 rounded-2xl hover:border-slate-350 dark:hover:border-slate-800 transition-colors">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-250">{file.name}</p>
                      <p className="text-[10px] text-slate-450 uppercase tracking-wider font-mono font-bold mt-0.5">
                        {file.type} • {file.size}
                      </p>
                    </div>
                    <a
                      href={file.link}
                      onClick={(e) => { e.preventDefault(); triggerToast(`Downloading ${file.name}...`); }}
                      className="p-2 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-amber-400 hover:bg-red-650 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-950 transition-all font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Download size={14} />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
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
