import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  GraduationCap,
  Briefcase,
  Code2,
  FolderGit2,
  Award,
  FileBadge,
  Mail,
  BookOpen,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Bot,
  Monitor,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  CornerDownLeft,
} from "lucide-react";

const LeetCodeIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
      fill="currentColor"
    />
  </svg>
);

export default function CommandPalette({
  portfolioMode = "developer",
  theme = "dark",
  onSelectMode,
  onToggleTheme,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAcademic, setIsAcademic] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        document.documentElement.classList.contains("academic") ||
        localStorage.getItem("portfolioMode") === "academic"
      );
    }
    return false;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Sync mode state
  useEffect(() => {
    const checkMode = () => {
      const academic =
        document.documentElement.classList.contains("academic") ||
        localStorage.getItem("portfolioMode") === "academic";
      setIsAcademic(academic);
    };

    const handleModeEvent = (e) => {
      if (e.detail?.mode) {
        setIsAcademic(e.detail.mode === "academic");
      } else {
        checkMode();
      }
    };

    window.addEventListener("portfolio-mode-changed", handleModeEvent);
    window.addEventListener("storage", checkMode);

    const observer = new MutationObserver(checkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("portfolio-mode-changed", handleModeEvent);
      window.removeEventListener("storage", checkMode);
      observer.disconnect();
    };
  }, []);

  // Keyboard shortcut listener: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, [isOpen]);

  // Reset query and focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = useCallback(
    (id) => {
      setIsOpen(false);
      if (location.pathname === "/") {
        const element = document.getElementById(id);
        if (element && window.lenis) {
          window.lenis.scrollTo(element, {
            offset: -80,
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/", { state: { scrollTo: id } });
      }
    },
    [location.pathname, navigate]
  );

  const handleSelectMode = useCallback((mode) => {
    setIsOpen(false);
    if (onSelectMode) {
      onSelectMode(mode);
    } else {
      window.dispatchEvent(
        new CustomEvent("portfolio-mode-changed", { detail: { mode } })
      );
    }
  }, [onSelectMode]);

  const handleToggleTheme = useCallback(() => {
    setIsOpen(false);
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      window.dispatchEvent(
        new CustomEvent("theme-changed", {
          detail: { theme: theme === "light" ? "dark" : "light" },
        })
      );
    }
  }, [onToggleTheme, theme]);

  // All Available Commands
  const commands = useMemo(
    () => [
      // NAVIGATION
      {
        id: "nav-home",
        category: "Navigation",
        label: "Go Home",
        description: "Back to hero overview",
        icon: Home,
        keywords: ["home", "hero", "top", "landing"],
        action: () => scrollToSection("hero"),
      },
      {
        id: "nav-about",
        category: "Navigation",
        label: "About Me",
        description: "Bio, background, and summary",
        icon: User,
        keywords: ["about", "bio", "who", "profile"],
        action: () => scrollToSection("about"),
      },
      {
        id: "nav-education",
        category: "Navigation",
        label: "Education",
        description: "B.Tech & Diploma qualifications",
        icon: GraduationCap,
        keywords: ["education", "college", "ycce", "degree", "diploma"],
        action: () => scrollToSection("education"),
      },
      {
        id: "nav-experience",
        category: "Navigation",
        label: "Experience",
        description: "Internships & professional journey",
        icon: Briefcase,
        keywords: ["experience", "internship", "work", "job", "career"],
        action: () => scrollToSection("experience"),
      },
      {
        id: "nav-skills",
        category: "Navigation",
        label: "Skills & Tech Stack",
        description: "Languages, frameworks, and tools",
        icon: Code2,
        keywords: ["skills", "technologies", "stack", "java", "react", "python"],
        action: () => scrollToSection("skills"),
      },
      {
        id: "nav-projects",
        category: "Navigation",
        label: "Projects",
        description: "Software engineering portfolio",
        icon: FolderGit2,
        keywords: ["projects", "apps", "work", "diplomagpt", "code"],
        action: () => scrollToSection("projects"),
      },
      {
        id: "nav-achievements",
        category: "Navigation",
        label: "Achievements",
        description: "Hackathons, ranks & recognitions",
        icon: Award,
        keywords: ["achievements", "awards", "hackathon", "milestones"],
        action: () => scrollToSection("achievements"),
      },
      {
        id: "nav-certificates",
        category: "Navigation",
        label: "Certificates",
        description: "Verified tech credentials",
        icon: FileBadge,
        keywords: ["certificates", "certifications", "licenses", "gfg", "google"],
        action: () => scrollToSection("certificates"),
      },
      {
        id: "nav-contact",
        category: "Navigation",
        label: "Contact Me",
        description: "Send message or get in touch",
        icon: Mail,
        keywords: ["contact", "email", "reach", "hire", "message"],
        action: () => scrollToSection("contact"),
      },
      {
        id: "nav-blog",
        category: "Navigation",
        label: "Blog & Articles",
        description: "Technical writeups and tutorials",
        icon: BookOpen,
        keywords: ["blog", "articles", "posts", "writing"],
        action: () => {
          setIsOpen(false);
          navigate("/blog");
        },
      },

      // PROJECTS
      {
        id: "proj-browse",
        category: "Projects",
        label: "Browse All Projects",
        description: "Explore interactive case studies",
        icon: FolderGit2,
        keywords: ["projects", "all", "case studies"],
        action: () => scrollToSection("projects"),
      },

      // RESUME
      {
        id: "resume-view",
        category: "Resume",
        label: "View Resume",
        description: "Open interactive CV viewer",
        icon: FileText,
        keywords: ["resume", "cv", "pdf", "download resume"],
        action: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent("open-resume-modal"));
        },
      },

      // SOCIAL
      {
        id: "soc-github",
        category: "Social Links",
        label: "Open GitHub",
        description: "github.com/buddherohit",
        icon: Github,
        keywords: ["github", "git", "code", "repo", "source"],
        action: () => {
          setIsOpen(false);
          window.open("https://github.com/buddherohit", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "soc-linkedin",
        category: "Social Links",
        label: "Open LinkedIn",
        description: "linkedin.com/in/rohit-buddhe-013aa5269",
        icon: Linkedin,
        keywords: ["linkedin", "network", "connect", "profile"],
        action: () => {
          setIsOpen(false);
          window.open(
            "https://www.linkedin.com/in/rohit-buddhe-013aa5269/",
            "_blank",
            "noopener,noreferrer"
          );
        },
      },
      {
        id: "soc-leetcode",
        category: "Social Links",
        label: "Open LeetCode",
        description: "leetcode.com/u/rohitbuddhe",
        icon: LeetCodeIcon,
        keywords: ["leetcode", "dsa", "coding", "problem solving"],
        action: () => {
          setIsOpen(false);
          window.open("https://leetcode.com/u/rohitbuddhe/", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "soc-twitter",
        category: "Social Links",
        label: "Open Twitter / X",
        description: "x.com/rohitbuddhe",
        icon: Twitter,
        keywords: ["twitter", "x", "social"],
        action: () => {
          setIsOpen(false);
          window.open("https://x.com/rohitbuddhe", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "soc-instagram",
        category: "Social Links",
        label: "Open Instagram",
        description: "instagram.com/official_rohit_45",
        icon: Instagram,
        keywords: ["instagram", "photos", "social"],
        action: () => {
          setIsOpen(false);
          window.open("https://instagram.com/official_rohit_45", "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "soc-email",
        category: "Social Links",
        label: "Send Direct Email",
        description: "rohitbuddhe564@gmail.com",
        icon: Mail,
        keywords: ["email", "mail", "send", "gmail", "inbox"],
        action: () => {
          setIsOpen(false);
          window.location.href = "mailto:rohitbuddhe564@gmail.com";
        },
      },

      // AI ASSISTANT
      {
        id: "ai-rohit",
        category: "AI Assistant",
        label: "Ask Rohit AI",
        description: "Talk to local AI about my projects & skills",
        icon: Bot,
        keywords: ["ai", "assistant", "bot", "ask", "chat", "diplomagpt"],
        action: () => {
          setIsOpen(false);
          window.dispatchEvent(new CustomEvent("open-ai-chat"));
        },
      },

      // PORTFOLIO THEME MODES
      {
        id: "theme-toggle",
        category: "Mode & Theme",
        label: theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme",
        description:
          theme === "light"
            ? "Enable deep space dark palette"
            : "Enable clean light palette",
        icon: theme === "light" ? Moon : Sun,
        keywords: ["theme", "dark", "light", "mode", "toggle", "sun", "moon"],
        action: handleToggleTheme,
      },
      {
        id: "mode-dev",
        category: "Mode & Theme",
        label: "Switch to Developer Mode",
        description: "Deep space cosmic animations, stars & geometry",
        icon: Sparkles,
        keywords: ["developer mode", "cosmic", "dark", "space", "stars"],
        action: () => handleSelectMode("developer"),
      },
      {
        id: "mode-academic",
        category: "Mode & Theme",
        label: "Switch to Academic Mode",
        description: "Monochrome paper aesthetic & minimal animations",
        icon: Monitor,
        keywords: ["academic mode", "paper", "resume mode", "light", "minimal"],
        action: () => handleSelectMode("academic"),
      },
    ],
    [scrollToSection, navigate, handleSelectMode, handleToggleTheme, theme]
  );

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return commands;
    return commands.filter((cmd) => {
      const matchLabel = cmd.label.toLowerCase().includes(q);
      const matchDesc = cmd.description.toLowerCase().includes(q);
      const matchCat = cmd.category.toLowerCase().includes(q);
      const matchKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
      return matchLabel || matchDesc || matchCat || matchKeywords;
    });
  }, [commands, query]);

  // Adjust selection index when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (filteredCommands.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredCommands.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        selected.action();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 border transition-all ${
              isAcademic
                ? "bg-[#faf6ee] border-[#333333] text-[#111111] shadow-[4px_4px_0_#333333]"
                : "bg-slate-900/90 border-cyan-500/30 text-slate-100 backdrop-blur-xl shadow-cyan-950/40"
            }`}
          >
            {/* Search Input Bar */}
            <div
              className={`flex items-center gap-3 px-4 py-3.5 border-b ${
                isAcademic
                  ? "border-[#cccccc] bg-[#f2ede3]"
                  : "border-slate-800/80 bg-slate-950/40"
              }`}
            >
              <Search
                size={20}
                className={
                  isAcademic ? "text-[#555555]" : "text-cyan-400 flex-shrink-0"
                }
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search sections, projects, social..."
                className={`w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-gray-400 dark:placeholder:text-slate-500 ${
                  isAcademic ? "font-serif text-[#111111]" : "text-slate-100 font-sans"
                }`}
              />
              <span
                className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded border ${
                  isAcademic
                    ? "bg-[#e8e0d0] border-[#999999] text-[#444444]"
                    : "bg-slate-800/80 border-slate-700 text-slate-400"
                }`}
              >
                ESC
              </span>
            </div>

            {/* Commands List */}
            <div
              ref={listRef}
              className="max-h-[380px] overflow-y-auto p-2 space-y-1 scrollbar-hide"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-sm opacity-60">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      data-index={idx}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? isAcademic
                            ? "bg-[#111111] text-[#faf6ee]"
                            : "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent border border-cyan-500/40 text-cyan-200"
                          : isAcademic
                          ? "hover:bg-[#e8e0d0] text-[#111111]"
                          : "hover:bg-slate-800/50 text-slate-300 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? isAcademic
                                ? "bg-transparent text-[#faf6ee]"
                                : "bg-cyan-400/20 text-cyan-300"
                              : isAcademic
                              ? "bg-[#e8e0d0] text-[#111111]"
                              : "bg-slate-800/80 text-slate-400 group-hover:text-slate-200"
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-sm font-semibold truncate ${
                              isSelected
                                ? isAcademic
                                  ? "text-[#faf6ee]"
                                  : "text-white"
                                : ""
                            }`}
                          >
                            {cmd.label}
                          </p>
                          <p
                            className={`text-xs truncate ${
                              isSelected
                                ? isAcademic
                                  ? "text-[#cccccc]"
                                  : "text-cyan-300/70"
                                : isAcademic
                                ? "text-[#666666]"
                                : "text-slate-400"
                            }`}
                          >
                            {cmd.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span
                          className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                            isSelected
                              ? isAcademic
                                ? "bg-[#333333] text-[#faf6ee]"
                                : "bg-cyan-500/30 text-cyan-200 border border-cyan-400/40"
                              : isAcademic
                              ? "bg-[#e8e0d0] text-[#555555]"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {cmd.category}
                        </span>
                        {isSelected && (
                          <CornerDownLeft
                            size={14}
                            className={
                              isAcademic ? "text-[#faf6ee]" : "text-cyan-400"
                            }
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Shortcut Hints */}
            <div
              className={`flex items-center justify-between px-4 py-2 text-[11px] font-mono border-t ${
                isAcademic
                  ? "border-[#cccccc] bg-[#f2ede3] text-[#555555]"
                  : "border-slate-800/80 bg-slate-950/60 text-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/20 dark:bg-white/10">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-black/20 dark:bg-white/10">
                    ↓
                  </kbd>{" "}
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-black/20 dark:bg-white/10">
                    ↵
                  </kbd>{" "}
                  Execute
                </span>
              </div>
              <span className="hidden sm:inline-block">
                Rohit Buddhe Portfolio Command Center
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
