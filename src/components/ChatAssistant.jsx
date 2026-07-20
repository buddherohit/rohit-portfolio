// src/components/ChatAssistant.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ChevronDown, Minimize2 } from "lucide-react";

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
                ? <strong key={j} className="font-bold text-slate-900 dark:text-white">{p.slice(2, -2)}</strong>
                : p
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function ChatAssistant({
  avatarInitials = "A",
  title = "AI Assistant",
  subtitle = "Local AI · Always online",
  placeholder = "Ask a question...",
  initialMessage = "Hello! How can I help you today?",
  suggestedQuestions = [],
  knowledgeBase = [],
  fallbackAnswer = "I'm not sure about that. Try asking one of the suggested questions!",
  triggerBgClass = "from-red-600 to-pink-500 dark:from-amber-500 dark:to-orange-400",
  TriggerIcon,
  footerText = "Local knowledge base · No external API"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimised, setIsMinimised] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: initialMessage,
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

  const getAIResponse = useCallback((query) => {
    const q = query.toLowerCase().trim();
    for (const item of knowledgeBase) {
      if (item.keys.some((k) => q.includes(k))) return item.answer;
    }
    return fallbackAnswer;
  }, [knowledgeBase, fallbackAnswer]);

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
  }, [input, getAIResponse]);

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
            whileHover={{ y: -4, scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => { setIsOpen(true); setIsMinimised(false); }}
            className={`fixed bottom-6 right-6 z-[200] flex items-center justify-center w-14 h-14 bg-gradient-to-tr ${triggerBgClass} text-white dark:text-slate-950 rounded-full shadow-xl shadow-red-600/35 dark:shadow-amber-500/20 cursor-pointer contact-btn border-0 outline-none hover:shadow-red-650/45 dark:hover:shadow-amber-500/35 transition-all duration-300`}
            aria-label="Open AI assistant"
          >
            {/* Animated ping dot indicator */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 dark:bg-amber-300 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-red-500 dark:bg-amber-400" />
            </span>
            <TriggerIcon size={24} className="text-white dark:text-slate-950" />
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
            className="ask-rohit-ai-chat fixed bottom-6 right-6 z-[200] flex flex-col bg-white dark:bg-[#0f0f0f] border border-[#e0e0e0] dark:border-[#2a2a2a] shadow-2xl overflow-hidden"
            style={{
              width: "min(400px, calc(100vw - 3rem))",
              height: isMinimised ? "56px" : "min(560px, calc(100vh - 5rem))",
              transition: "height 0.35s cubic-bezier(0.4,0,0.2,1)",
              borderRadius: "16px",
            }}
          >
            {/* ── Header ─────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-[#e0e0e0] dark:border-[#2a2a2a] bg-[#111111] flex-shrink-0"
              style={{ minHeight: "56px" }}
            >
              <div className="flex items-center gap-3">
                {/* Avatar dot initials */}
                <div className="w-7 h-7 bg-white text-slate-950 flex items-center justify-center flex-shrink-0 font-bold"
                  style={{ fontSize: "14px", fontFamily: "monospace" }}>
                  {avatarInitials}
                </div>
                <div className="text-left">
                  <p className="text-white text-[13px] font-semibold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {title}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[11px] text-white/60">{subtitle}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimised(m => !m)}
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Minimise"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Body ───────────────────────────────────────── */}
            {!isMinimised && (
              <>
                {/* Messages Panel */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fafafa] dark:bg-[#0f0f0f] scrollbar-hide text-left"
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
                      {/* Avatar initials */}
                      <div
                        className={`w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold ${
                          msg.role === "assistant"
                            ? "bg-[#111111] text-white"
                            : "bg-[#e8e8e8] dark:bg-[#2a2a2a] text-[#111] dark:text-white"
                        }`}
                        style={{ fontFamily: "monospace" }}
                      >
                        {msg.role === "assistant" ? avatarInitials : "U"}
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

                  {/* Typing Indicator bubbles */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-2.5"
                      >
                        <div className="w-6 h-6 bg-[#111111] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ fontFamily: "monospace", borderRadius: 0 }}>
                          {avatarInitials}
                        </div>
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

                  {/* Suggested helper questions */}
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
                        {suggestedQuestions.map((q) => (
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
                  {!showSug && (
                    <button
                      onClick={() => setShowSug(true)}
                      className="flex items-center gap-1 text-[10px] text-[#888888] hover:text-[#333333] dark:hover:text-white transition-colors px-4 pt-2 pb-0 cursor-pointer"
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
                      placeholder={placeholder}
                      rows={1}
                      className="flex-1 resize-none text-[13px] px-4 py-3.5 bg-transparent text-[#111111] dark:text-[#f0f0f0] placeholder-[#aaaaaa] dark:placeholder-[#555555] focus:outline-none leading-relaxed max-h-28 overflow-y-auto scrollbar-hide"
                      style={{ cursor: "text", fontFamily: "'Space Grotesk', sans-serif", borderRadius: 0 }}
                    />
                    <button
                      onClick={() => send()}
                      disabled={!input.trim() || isTyping}
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#111111] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#333333] transition-all cursor-pointer"
                      style={{ borderRadius: 0 }}
                      aria-label="Send"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                  <p className="text-center text-[10px] text-[#cccccc] dark:text-[#444444] pb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {footerText}
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
