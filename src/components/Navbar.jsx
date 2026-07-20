// src/components/Navbar.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const motionDesign = motion;
const FramerAnimatePresence = AnimatePresence;
import { X, Download, Home, User, GraduationCap, Briefcase, Code, FolderGit, Award, Mail, Sun, Moon, BookOpen, Eye, GraduationCap as AcademicCapIcon, Monitor, Rocket, LogIn, LogOut } from "lucide-react";
import ResumeModal from "./ResumeModal";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const [portfolioMode, setPortfolioMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolioMode") || "developer";
    }
    return "developer";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Apply academic class immediately on mount (from saved localStorage)
  useEffect(() => {
    const savedMode = localStorage.getItem("portfolioMode");
    if (savedMode === "academic") {
      window.document.documentElement.classList.add("academic");
      window.document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (portfolioMode === "academic") {
      root.classList.add("academic");
      root.classList.remove("dark");
      localStorage.setItem("portfolioMode", "academic");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      root.classList.remove("academic");
      localStorage.setItem("portfolioMode", "developer");
    }
  }, [portfolioMode]);

  const toggleMode = useCallback(() => {
    setPortfolioMode((prev) => (prev === "developer" ? "academic" : "developer"));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section on scroll (only if on landing/home page)
  useEffect(() => {
    if (location.pathname !== "/") {
      if (location.pathname.startsWith("/blog")) {
        setActiveSection("blog");
      } else if (location.pathname.startsWith("/projects/")) {
        setActiveSection("projects");
      }
      return;
    }

    const handleScroll = () => {
      const sections = ["hero", "about", "education", "experience", "skills", "projects", "achievements", "certificates", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (e) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(e.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('nav-menu-open');
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('nav-menu-open');
    };
  }, [isOpen]);

  const navItems = useMemo(() => [
    { id: "hero", label: "HOME", icon: Home, isRoute: false },
    { id: "about", label: "ABOUT", icon: User, isRoute: false },
    { id: "education", label: "EDUCATION", icon: GraduationCap, isRoute: false },
    { id: "experience", label: "EXPERIENCE", icon: Briefcase, isRoute: false },
    { id: "skills", label: "SKILLS", icon: Code, isRoute: false },
    { id: "projects", label: "PROJECTS", icon: FolderGit, isRoute: false },
    { id: "placement-kit", label: "PLACEMENT KIT", icon: Rocket, isRoute: true, path: "/placement-kit" },
    { id: "blog", label: "BLOG", icon: BookOpen, isRoute: true, path: "/blog" },
    { id: "achievements", label: "ACHIEVEMENTS", icon: Award, isRoute: false },
    { id: "certificates", label: "CERTIFICATES", icon: Award, isRoute: false },
    { id: "contact", label: "CONTACT", icon: Mail, isRoute: false },
  ], []);

  const handleItemClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Floating Right Side Buttons */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[102] flex items-center gap-3">
        {/* Get my Resume Button - Only show when NOT scrolled */}
        <FramerAnimatePresence>
          {!isScrolled && (
            <motionDesign.button
              onClick={() => setIsResumeOpen(true)}
              className="px-4 py-2 border-2 border-red-650 dark:border-amber-500 text-red-750 dark:text-amber-400 rounded-lg font-medium text-sm hover:bg-red-50 dark:hover:bg-slate-800 transition-all duration-300 flex items-center gap-2 whitespace-nowrap bg-white dark:bg-slate-900 shadow-md cursor-pointer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">View Resume</span>
              <span className="sm:hidden">Resume</span>
            </motionDesign.button>
          )}
        </FramerAnimatePresence>

        {/* Academic / Developer Mode Toggle */}
        <motionDesign.button
          onClick={toggleMode}
          className="relative p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Academic/Developer mode"
          title={portfolioMode === "developer" ? "Switch to Academic Mode 📄" : "Switch to Developer Mode 💻"}
        >
          {portfolioMode === "developer" ? (
            <span className="text-base leading-none" role="img" aria-label="Academic mode">📄</span>
          ) : (
            <Monitor size={18} className="text-slate-700" />
          )}
          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-1 rounded-md bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {portfolioMode === "developer" ? "Academic Mode" : "Developer Mode"}
          </span>
        </motionDesign.button>

        {/* Dark Mode Toggle Button */}
        <motionDesign.button
          onClick={toggleTheme}
          disabled={portfolioMode === "academic"}
          className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 text-red-700 dark:text-amber-400 hover:bg-red-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={{ scale: portfolioMode === "academic" ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </motionDesign.button>

        {/* User Auth Button */}
        <motionDesign.button
          onClick={user ? logout : () => setIsAuthModalOpen(true)}
          className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:bg-red-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={user ? "Logout" : "Login"}
          title={user ? `Logged in as ${user.email} (Click to Logout)` : "Login / Register"}
        >
          {user ? (
            <LogOut size={18} className="text-red-650 dark:text-red-400" />
          ) : (
            <LogIn size={18} className="text-slate-700 dark:text-amber-500" />
          )}
          {/* Tooltip */}
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-1 rounded-md bg-slate-900 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            {user ? "Sign Out" : "Sign In / Register"}
          </span>
        </motionDesign.button>

        {/* Hamburger Menu Button */}
        <motionDesign.button
          ref={hamburgerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="menu-button relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 shadow-md text-red-700 dark:text-amber-500 cursor-pointer"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <FramerAnimatePresence mode="wait">
            {isOpen ? (
              <motionDesign.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} className="text-red-700 dark:text-amber-400" />
              </motionDesign.div>
            ) : (
              <motionDesign.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1.5"
              >
                <div className="h-0.5 bg-red-700 dark:bg-amber-400 rounded-full w-5" />
                <div className="h-0.5 bg-red-700 dark:bg-amber-400 rounded-full w-4" />
                <div className="h-0.5 bg-red-700 dark:bg-amber-400 rounded-full w-5" />
              </motionDesign.div>
            )}
          </FramerAnimatePresence>
        </motionDesign.button>
      </div>

      {/* Vertical Navigation Menu */}
      <FramerAnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motionDesign.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 z-[98]"
            />

            {/* Vertical Menu Container */}
            <motionDesign.div
              ref={menuRef}
              className="fixed top-16 right-4 md:top-20 md:right-6 z-[100] pointer-events-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Resume Button in Menu - Only show when scrolled */}
              <FramerAnimatePresence>
                {isScrolled && (
                  <motionDesign.div
                    className="relative group mb-3 flex items-center justify-end"
                    initial={{ opacity: 0, x: 30, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        duration: 0.4,
                        ease: [0.34, 1.56, 0.64, 1],
                      }
                    }}
                    exit={{
                      opacity: 0,
                      x: 20,
                      scale: 0.9,
                      transition: {
                        duration: 0.2,
                        ease: "easeIn"
                      }
                    }}
                  >
                    {/* Label - shown on hover */}
                    <div
                      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none z-50 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
                    >
                      <div className="bg-white dark:bg-slate-800 text-red-650 dark:text-amber-450 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap border border-red-200 dark:border-slate-700">
                        View Resume
                      </div>
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white dark:border-l-slate-800"></div>
                    </div>

                    <button
                      onClick={() => {
                        setIsResumeOpen(true);
                        setIsOpen(false);
                      }}
                      className="block cursor-pointer bg-transparent border-0 p-0"
                    >
                      <motionDesign.div
                        className="w-11 h-11 rounded-full bg-red-650 dark:bg-amber-500 border-2 border-red-650 dark:border-amber-500 flex items-center justify-center text-white dark:text-slate-950 shadow-md hover:shadow-lg transition-all duration-150"
                        initial={{ scale: 0 }}
                        animate={{
                          scale: 1,
                          transition: {
                            delay: 0.1,
                            duration: 0.3,
                            ease: [0.34, 1.56, 0.64, 1]
                          }
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye size={18} />
                      </motionDesign.div>
                    </button>
                  </motionDesign.div>
                )}
              </FramerAnimatePresence>

              {navItems.map((item, i) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motionDesign.div
                    key={item.id}
                    className="relative group mb-3 last:mb-0 flex items-center justify-end"
                    initial={{ opacity: 0, x: -20, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.5 }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.4,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {/* Name label - shown on left side */}
                    <div
                      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none z-50 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 ease-out"
                    >
                      <div className={`text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap border ${isActive
                          ? 'bg-amber-400 text-gray-900 border-amber-500'
                          : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-200 dark:border-slate-700'
                        }`}>
                        {item.label}
                        {item.id === "placement-kit" && user?.placementKitUnlocked && " 👑 PRO"}
                      </div>
                      {/* Arrow pointing to icon */}
                      <div className={`absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] ${isActive ? 'border-l-amber-400' : 'border-l-white dark:border-l-slate-800'
                        }`}></div>
                    </div>

                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleItemClick();
                        if (item.isRoute) {
                          navigate(item.path);
                        } else {
                          if (location.pathname === "/") {
                            const element = document.getElementById(item.id);
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
                            navigate("/", { state: { scrollTo: item.id } });
                          }
                        }
                      }}
                      className="cursor-pointer block"
                    >
                      {/* Circular Icon Button */}
                      <motionDesign.div
                        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-150 nav-item-btn relative ${isActive
                            ? 'is-active bg-amber-400 border-amber-500 text-gray-900'
                            : 'bg-white dark:bg-slate-900 border-red-650 dark:border-amber-500 text-red-650 dark:text-amber-405'
                          }` }
                        whileHover={{
                          scale: 1.15,
                          rotate: item.isRoute ? 0 : 360,
                          backgroundColor: isActive ? "#fbbf24" : "#DC2626",
                          color: isActive ? "#111827" : "#FFFFFF",
                        }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <IconComponent size={18} />
                        {item.id === "placement-kit" && user?.placementKitUnlocked && (
                          <span className="absolute -top-1 -right-1 text-[8px] bg-gradient-to-tr from-amber-500 to-yellow-400 text-white rounded-full w-4 h-4 flex items-center justify-center border border-white dark:border-slate-950 font-bold shadow-xs">
                            👑
                          </span>
                        )}
                      </motionDesign.div>
                    </div>
                  </motionDesign.div>
                );
              })}
            </motionDesign.div>
          </>
        )}
      </FramerAnimatePresence>

      {/* Resume Preview Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
