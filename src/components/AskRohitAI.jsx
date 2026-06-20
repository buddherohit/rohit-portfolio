// src/components/AskRohitAI.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronDown, Minimize2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   KNOWLEDGE BASE
   ──────────────────────────────────────────────────────────────── */
const KB = [
  {
    keys: ["who is rohit", "tell me about rohit", "about rohit", "introduce", "yourself", "who are you", "background"],
    answer: "Rohit Buddhe is a B.Tech Computer Science & Design student at YCCE Nagpur (graduating 2027), with a prior Diploma in Computer Engineering.\n\nHe specialises in full-stack development and AI-powered applications — building systems that are used by thousands of real users. He's currently open to internships in AI/ML, full-stack, or backend engineering."
  },
  {
    keys: ["projects", "show projects", "what projects", "built", "made", "portfolio projects", "work"],
    answer: "Rohit's key projects:\n\n• DiplomaGPT — RAG-powered AI tutor for MSBTE exam prep (1,800+ active users)\n• MSBTE Job Portal — Career platform for 100k+ diploma students (5,000+ users)\n• AI Touchless Computer Control — Hand gesture OS control via OpenCV\n• Credex AI Audit — Financial anomaly detection with LangChain\n• Women Safety App — Android SOS + live GPS tracking\n• Smart Hostel Management System — Full-stack hostel ops platform\n\nEach project has a detailed case study — click 'View Projects' on the homepage."
  },
  {
    keys: ["diplomagpt", "diploma gpt", "rag", "msbte gpt", "ai tutor"],
    answer: "DiplomaGPT is Rohit's most advanced AI project — a RAG-powered chatbot tailored for MSBTE curriculum students.\n\nStack: React · Python FastAPI · LangChain · Gemini API · Pinecone Vector DB\n\nHow it works: 5 years of MSBTE model answer papers are chunked and vectorised into Pinecone (~22,000 chunks). Semantic search retrieves the closest solved answer, then Gemini formats it in MSBTE exam style.\n\nResults: 94.8% accuracy · <1.8s response time · 1,800+ active students\n\nLive at diplomagpt-ai.vercel.app"
  },
  {
    keys: ["skills", "technologies", "tech stack", "languages", "tools", "frameworks", "technical"],
    answer: "Rohit's technical skill set:\n\nLanguages — Java · JavaScript · Python · C++\nFrontend — React · Vite · Tailwind CSS · Framer Motion\nBackend — Node.js · Express · Spring Boot · FastAPI\nDatabases — MongoDB · MySQL · Firebase · Pinecone\nAI / ML — LangChain · OpenCV · MediaPipe · Gemini API · RAG\nInfra — Git · Docker · Vercel · Render · Android Studio\n\nStrongest in: full-stack JavaScript + AI/ML integration."
  },
  {
    keys: ["internship", "experience", "work", "cognifyz", "eduskills", "aiml", "job"],
    answer: "Professional experience:\n\n1. AIML Intern — EduSkills Academy\n   Remote · June 2026 – Present\n   Machine learning projects and AI curriculum work.\n\n2. Web Development Intern — Cognifyz Technologies\n   Remote · April – June 2026\n   Full-stack features with React and Node.js.\n\nRohit has also participated in multiple hackathons and contributes to open-source projects."
  },
  {
    keys: ["contact", "reach", "email", "hire", "connect", "linkedin", "github", "social"],
    answer: "How to reach Rohit:\n\nEmail — rohitbuddhe564@gmail.com\nGitHub — github.com/buddherohit\nLinkedIn — linkedin.com/in/rohit-buddhe-013aa5269\nLeetCode — leetcode.com/u/rohitbuddhe\n\nHe's actively seeking internship opportunities in AI/ML, full-stack, or backend roles. Based in Nagpur, India (IST) — available remote."
  },
  {
    keys: ["education", "college", "university", "ycce", "btech", "diploma", "degree"],
    answer: "Education:\n\nB.Tech — Computer Science & Design\nYCCE, Nagpur · 2023 – 2027\n\nDiploma — Computer Engineering\nCompleted before B.Tech\n\nThe 'Design' in his degree gives him a unique blend of engineering rigour and UX thinking."
  },
  {
    keys: ["java", "spring boot", "backend", "algorithms", "leetcode", "dsa"],
    answer: "Java is Rohit's strongest compiled language — used for:\n\n• Spring Boot REST API backends\n• Android app development\n• Data Structures & Algorithms (active on LeetCode)\n• Core backend services with JDBC/JPA\n\nHe also holds a Java Certificate from GeeksForGeeks."
  },
  {
    keys: ["hackathon", "open source", "competition", "awards", "achievements", "certificates"],
    answer: "Achievements:\n\n• Multiple state-level hackathon participant\n• Built tools actively used by thousands of students\n• Certifications: GFG Java · Oracle AI Fundamentals · Google Gen AI · IBM Machine Learning · AWS Cloud · Coursera Computer Vision & Data Analysis\n• Active open-source contributor on GitHub"
  },
  {
    keys: ["resume", "cv", "download"],
    answer: "Rohit's resume is available directly on the portfolio.\n\nClick 'View Resume' in the top navbar. An interactive PDF viewer opens where you can preview, download, or open it in a new tab.\n\nIt's kept current."
  },
  {
    keys: ["available", "hire", "open to work", "internship opportunity", "looking for", "freelance"],
    answer: "Rohit is actively available for:\n\n✓ Internships — AI/ML · Full-Stack · Backend\n✓ Freelance Projects\n✓ Open Source Collaboration\n✓ Research Projects\n\nLocation: Nagpur, India (IST) · Can work remote\nContact: rohitbuddhe564@gmail.com"
  },
  {
    keys: ["msbte", "job portal", "career platform", "diploma students"],
    answer: "The MSBTE Job Portal is a specialised career platform for Maharashtra diploma graduates in Mechanical, Civil, Electrical, and Computer/IT branches.\n\nFeatures: branch-specific job filters · MSBTE academic verification · Quick-Apply with bio-data generation · Recruiter dashboard\n\nStats: 5,000+ active users · 45+ recruiters · 12,000+ verified applications\n\nLive at msbte-diploma-job-portal.vercel.app"
  },
];

const SUGGESTED = [
  "Who is Rohit?",
  "Show his projects",
  "What is DiplomaGPT?",
  "What technologies does he use?",
  "Tell me about his internships",
  "How can I contact him?",
];

function getAIResponse(query) {
  const q = query.toLowerCase().trim();
  for (const item of KB) {
    if (item.keys.some((k) => q.includes(k))) return item.answer;
  }
  return "I don't have information on that specific topic. Try asking about:\n\n• Rohit's projects\n• His technical skills\n• DiplomaGPT\n• How to contact him\n• His internship experience\n\nOr reach out directly at rohitbuddhe564@gmail.com";
}

/* ─────────────────────────────────────────────────────────────────
   TEXT RENDERER — preserves line breaks & bold **text**
   ──────────────────────────────────────────────────────────────── */
function MsgText({ text }) {
  return (
    <div className="space-y-1 leading-relaxed">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={i} className="text-[13px] leading-relaxed">
            {parts.map((p, j) =>
              p.startsWith("**") && p.endsWith("**")
                ? <strong key={j}>{p.slice(2, -2)}</strong>
                : p
            )}
          </p>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────────── */
export default function AskRohitAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimised, setIsMinimised] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Rohit's AI assistant.\n\nAsk me anything about his projects, skills, experience, or how to reach him.",
      id: 0,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSug, setShowSug] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimised) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isMinimised]);

  useEffect(() => {
    if (isOpen && !isMinimised) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen, isMinimised]);

  const send = useCallback((text) => {
    const q = (text || input).trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: "user", text: q, id: Date.now() }]);
    setInput("");
    setShowSug(false);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: getAIResponse(q), id: Date.now() + 1 }]);
      setIsTyping(false);
    }, 600 + Math.random() * 500);
  }, [input]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <>
      {/* ── Floating Trigger Button ───────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="trigger"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setIsOpen(true); setIsMinimised(false); }}
            className="fixed bottom-6 left-6 z-[200] flex items-center gap-2.5 px-4 py-2.5 bg-[#111111] text-white text-sm font-medium tracking-wide shadow-lg"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.03em" }}
            aria-label="Open AI assistant"
          >
            {/* Animated indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Ask Rohit AI
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Widget ──────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed bottom-6 left-6 z-[200] flex flex-col bg-white dark:bg-[#0f0f0f] border border-[#e0e0e0] dark:border-[#2a2a2a] shadow-2xl overflow-hidden"
            style={{
              width: "min(400px, calc(100vw - 3rem))",
              height: isMinimised ? "56px" : "min(560px, calc(100vh - 5rem))",
              transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
              borderRadius: 0,
            }}
          >
            {/* ── Header ─────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] dark:border-[#2a2a2a] bg-[#111111] flex-shrink-0"
              style={{ minHeight: "56px" }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-7 h-7 bg-white flex items-center justify-center flex-shrink-0"
                  style={{ fontSize: "14px", fontFamily: "monospace" }}>
                  R
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Ask Rohit AI
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[11px] text-white/60">Local AI · Always online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimised(m => !m)}
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Minimise"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Body ───────────────────────────────────────── */}
            {!isMinimised && (
              <>
                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fafafa] dark:bg-[#0f0f0f] scrollbar-hide"
                  data-lenis-prevent
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar dot */}
                      <div
                        className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold ${
                          msg.role === "assistant"
                            ? "bg-[#111111] text-white"
                            : "bg-[#e8e8e8] dark:bg-[#2a2a2a] text-[#111] dark:text-white"
                        }`}
                        style={{ fontFamily: "monospace" }}
                      >
                        {msg.role === "assistant" ? "R" : "U"}
                      </div>

                      {/* Bubble */}
                      <div
                        className={`max-w-[82%] px-3.5 py-2.5 text-[#111111] dark:text-[#f0f0f0] ${
                          msg.role === "assistant"
                            ? "bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#2a2a2a]"
                            : "bg-[#111111] dark:bg-[#222222] !text-white border border-[#111111]"
                        }`}
                        style={{ borderRadius: 0 }}
                      >
                        {msg.role === "user"
                          ? <p className="text-[13px] text-white leading-relaxed">{msg.text}</p>
                          : <MsgText text={msg.text} />
                        }
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2.5"
                      >
                        <div className="w-6 h-6 bg-[#111111] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ fontFamily: "monospace", borderRadius: 0 }}>R</div>
                        <div className="px-3.5 py-3 bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#2a2a2a] flex items-center gap-1.5" style={{ borderRadius: 0 }}>
                          {[0, 1, 2].map(i => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-[#888888]"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Suggested questions */}
                  <AnimatePresence>
                    {showSug && messages.length === 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pt-1 space-y-1.5"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#888888] dark:text-[#555555] pl-8">
                          Suggested
                        </p>
                        {SUGGESTED.map((q) => (
                          <button
                            key={q}
                            onClick={() => send(q)}
                            className="ml-8 block text-[12px] text-left px-3 py-1.5 bg-white dark:bg-[#1a1a1a] border border-[#e0e0e0] dark:border-[#2a2a2a] text-[#333333] dark:text-[#cccccc] hover:bg-[#f0f0f0] dark:hover:bg-[#252525] hover:border-[#aaaaaa] transition-colors w-[calc(100%-2rem)]"
                            style={{ borderRadius: 0, fontFamily: "'Space Grotesk', sans-serif" }}
                          >
                            {q}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={endRef} />
                </div>

                {/* ── Input Area ──────────────────────────────── */}
                <div className="flex-shrink-0 border-t border-[#e0e0e0] dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f]">
                  {/* Show suggestions toggle */}
                  {!showSug && (
                    <button
                      onClick={() => setShowSug(true)}
                      className="flex items-center gap-1 text-[10px] text-[#888888] hover:text-[#333333] dark:hover:text-white transition-colors px-4 pt-2 pb-0"
                      style={{ borderRadius: 0, fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <ChevronDown size={11} /> Show suggestions
                    </button>
                  )}

                  <div className="flex items-end gap-0">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Ask anything about Rohit…"
                      rows={1}
                      className="flex-1 resize-none text-[13px] px-4 py-3.5 bg-transparent text-[#111111] dark:text-[#f0f0f0] placeholder-[#aaaaaa] dark:placeholder-[#555555] focus:outline-none leading-relaxed max-h-28 overflow-y-auto scrollbar-hide"
                      style={{ cursor: "text", fontFamily: "'Space Grotesk', sans-serif", borderRadius: 0 }}
                    />
                    <button
                      onClick={() => send()}
                      disabled={!input.trim() || isTyping}
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#111111] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#333333] transition-colors"
                      style={{ borderRadius: 0 }}
                      aria-label="Send"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-[#cccccc] dark:text-[#444444] pb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Local knowledge base · No external API
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
