// src/pages/Home.jsx
import React, { Suspense, lazy } from "react";
import Hero from "./Hero";
import SideElementsMobileIcons from "../components/SideElementsMobileIcons";
import { Github, Linkedin, Instagram, Twitter } from "lucide-react";

// Lazy-load sections for performance
const About = lazy(() => import("./About"));
const Education = lazy(() => import("./Education"));
const Experience = lazy(() => import("./Experience"));
const Skills = lazy(() => import("./Skills"));
const Projects = lazy(() => import("./Projects"));
const Achievements = lazy(() => import("./Achievements"));
const Certificates = lazy(() => import("./Certificates"));
const Contact = lazy(() => import("./Contact"));

const LeetCodeIcon = ({ size = 20 }) => (
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

const socialLinks = [
  { icon: Github, href: 'https://github.com/buddherohit', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rohit-buddhe-013aa5269/', label: 'LinkedIn' },
  { icon: LeetCodeIcon, href: 'https://leetcode.com/u/rohitbuddhe/', label: 'LeetCode', isCustom: true },
  { icon: Twitter, href: 'https://x.com/rohitbuddhe', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/official_rohit_45', label: 'Instagram' },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div id="hero">
        <Hero />
      </div>

      {/* About Me Section */}
      <div id="about">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12"><div className="h-40 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <About />
        </Suspense>
      </div>

      {/* Education Section */}
      <div id="education">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12"><div className="h-40 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <Education />
        </Suspense>
      </div>

      {/* Experience Section */}
      <div id="experience">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12"><div className="h-40 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <Experience />
        </Suspense>
      </div>

      {/* Skills Section */}
      <div id="skills">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12"><div className="h-40 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <Skills />
        </Suspense>
      </div>

      {/* Projects Section */}
      <div id="projects">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12"><div className="h-40 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <Projects />
        </Suspense>
      </div>

      {/* Achievements Section */}
      <div id="achievements">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12"><div className="h-40 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <Achievements />
        </Suspense>
      </div>

      {/* Certificates Section */}
      <div id="certificates">
        <Suspense fallback={<div className="max-w-6xl mx-auto px-4 sm:px-6 py-12"><div className="h-40 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <Certificates />
        </Suspense>
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Suspense fallback={<div className="max-w-3xl mx-auto px-4 sm:px-6 py-12"><div className="h-32 animate-pulse rounded-2xl bg-gray-100/50 dark:bg-slate-900/50" /></div>}>
          <Contact />
        </Suspense>
      </div>

      {/* Mobile Social Icons */}
      <SideElementsMobileIcons
        socialLinks={socialLinks}
        onIconClick={(label) => console.log(`Clicked ${label}`)}
      />
    </>
  );
}
