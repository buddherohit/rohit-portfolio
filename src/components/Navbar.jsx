// src/components/Navbar.jsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Home, User, GraduationCap, Briefcase, Code, FolderGit, Award, Mail } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

window.addEventListener('scroll', handleScroll, { passive: true });    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "education", "experience", "skills", "projects", "achievements", "contact"];
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
  }, []);

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
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = useMemo(() => [
    { id: "hero", label: "HOME", icon: Home },
    { id: "about", label: "ABOUT", icon: User },
    { id: "education", label: "EDUCATION", icon: GraduationCap },
    { id: "experience", label: "EXPERIENCE", icon: Briefcase },
    { id: "skills", label: "SKILLS", icon: Code },
    { id: "projects", label: "PROJECTS", icon: FolderGit },
    { id: "achievements", label: "ACHIEVEMENTS", icon: Award },
    // { id: "certificates", label: "CERTIFICATES", icon: Award },
    { id: "contact", label: "CONTACT", icon: Mail },
  ], []);

  const handleItemClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Floating Right Side Buttons */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[102] flex items-center gap-3">
        {/* Get my Resume Button - Only show when NOT scrolled */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border-2 border-red-600 text-red-700 rounded-lg font-medium text-sm hover:bg-red-50 transition-all duration-300 flex items-center gap-2 whitespace-nowrap bg-white shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.3 } }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline">Get my Resume</span>
              <span className="sm:hidden">Resume</span>
            </motion.a>
          )}
        </AnimatePresence>

        {/* Hamburger Menu Button */}
        <motion.button
          ref={hamburgerRef}
          onClick={() => setIsOpen(!isOpen)}
          className="menu-button relative p-2 rounded-lg hover:bg-gray-100 transition-colors bg-white shadow-md"
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} className="text-red-700" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1.5"
              >
                <div className="h-0.5 bg-red-700 rounded-full w-5" />
                <div className="h-0.5 bg-red-700 rounded-full w-4" />
                <div className="h-0.5 bg-red-700 rounded-full w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Vertical Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 z-[98]"
            />

            {/* Vertical Menu Container */}
            <motion.div
              ref={menuRef}
              className="fixed top-16 right-4 md:top-20 md:right-6 z-[100] pointer-events-auto"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Resume Button in Menu - Only show when scrolled */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
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
                      <div className="bg-white text-red-600 text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg whitespace-nowrap border border-red-200">
                        Download Resume
                      </div>
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white"></div>
                    </div>

                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <motion.div
                        className="w-11 h-11 rounded-full bg-red-600 border-2 border-red-600 flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-150"
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
                        <Download size={18} />
                      </motion.div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {navItems.map((item, i) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className="relative group mb-3 last:mb-0 flex items-center justify-end"
                    initial={{ opacity: 0, x: -20, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.5 }}
                    transition={{
                      delay: i * 0.08,
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
                          : 'bg-white text-gray-800 border-gray-200'
                        }`}>
                        {item.label}
                      </div>
                      {/* Arrow pointing to icon */}
                      <div className={`absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] ${isActive ? 'border-l-amber-400' : 'border-l-white'
                        }`}></div>
                    </div>

                    <div
                      onClick={(e) => {
                        e.preventDefault();
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
                        handleItemClick(item);
                      }}
                      className="cursor-pointer block"
                    >
                      {/* Circular Icon Button */}
                      <motion.div
                        className={`w-11 h-11 rounded-full border-2 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-150 ${isActive
                            ? 'bg-amber-400 border-amber-500 text-gray-900'
                            : 'bg-white border-red-600 text-red-600'
                          }`}
                        whileHover={{
                          scale: 1.15,
                          rotate: 360,
                          backgroundColor: isActive ? "#fbbf24" : "#DC2626",
                          color: isActive ? "#111827" : "#FFFFFF",
                        }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                      >
                        <IconComponent size={18} />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
