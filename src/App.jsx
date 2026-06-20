import React, { Suspense, lazy, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Github, Instagram, Twitter, Linkedin } from "lucide-react";
import Lenis from "lenis";

// Components
import Navbar from "./components/Navbar";
import SideElements from "./components/SideElements";
import { FireBall } from "./components/ui/FireBall";

// Custom LeetCode Icon Component
const LeetCodeIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
      fill="#FFA116"
    />
  </svg>
);

// Lazy-loaded Pages & Components
const Home = lazy(() => import("./pages/Home"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const AskRohitAI = lazy(() => import("./components/AskRohitAI"));

// Helper Scroll Controller for routing & scroll resets
function ScrollToTopAndSection() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // If we have a state indicating scroll to a homepage section, handle it
    if (pathname === "/" && state?.scrollTo) {
      const id = state.scrollTo;
      
      // Reset state in window history to prevent scrolling again on page refresh
      window.history.replaceState({}, document.title);

      setTimeout(() => {
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
      }, 150);
    } else {
      // Standard page change scroll reset
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, state]);

  return null;
}

function AppContent() {
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    window.lenis = lenis;

    // Handle standard internal anchor clicks inside the page
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          lenis.scrollTo(element, {
            offset: -80,
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Sync scroll event triggers (for GSAP, reveal transitions, etc.)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          window.dispatchEvent(new Event('scroll'));
          ticking = false;
        });
        ticking = true;
      }
    };
    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      window.lenis = null;
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 text-gray-800 dark:text-slate-100 min-h-screen flex flex-col relative transition-colors duration-300">
      {/* FireBall Mouse Effect */}
      <FireBall
        particleColors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]}
        particleOpacity={0.85}
        background="transparent"
        particleRadiusRange={[1, 3]}
        maxParticles={100}
        particlesPerBurst={6}
        maxBurstsPerSecond={15}
        particleLifeRange={[200, 400]}
        speedRange={[0.3, 1.2]}
        drift={0.08}
        gravity={0.02}
        decay={0.92}
        cursorSize={16}
        cursorOutlineWidth={2}
        cursorOutlineColor="rgba(59, 130, 246, 0.8)"
        cursorShadowBlur={8}
        cursorShadowColor="rgba(59, 130, 246, 0.4)"
        fullScreen={true}
        style={{ zIndex: 9999, pointerEvents: "none" }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Dynamic Scroll & Routing Controller */}
      <ScrollToTopAndSection />

      {/* Side Elements (Social Icons & Email) */}
      <SideElements
        email="rohitbuddhe564@gmail.com"
        socialLinks={[
          { icon: Github, href: 'https://github.com/buddherohit', label: 'GitHub' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/rohit-buddhe-013aa5269/', label: 'LinkedIn' },
          { icon: LeetCodeIcon, href: 'https://leetcode.com/u/rohitbuddhe/', label: 'LeetCode', isCustom: true },
          { icon: Twitter, href: 'https://x.com/rohitbuddhe', label: 'Twitter' },
          { icon: Instagram, href: 'https://instagram.com/official_rohit_45', label: 'Instagram' },
        ]}
        onIconClick={(label) => console.log(`Clicked ${label}`)}
        onEmailClick={() => window.location.href = 'mailto:rohitbuddhe564@gmail.com'}
      />

      {/* Main Multi-Page Routed Content */}
      <main className="flex-1 relative">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent dark:border-amber-500 dark:border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
          </Routes>
        </Suspense>
      </main>

      {/* 🤖 Ask Rohit AI — Global Floating Widget (lazy loaded) */}
      <Suspense fallback={null}>
        <AskRohitAI />
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
