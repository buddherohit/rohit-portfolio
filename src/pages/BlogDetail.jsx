import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Twitter, Link2, Check, BookOpen } from "lucide-react";
import { blogPosts } from "../data/blogData";
import SEO from "../components/SEO";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState("");
  const [copied, setCopied] = useState(false);

  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug);
  }, [slug]);

  // Handle non-existent blog posts
  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center px-4 py-20 text-center">
        <SEO title="Post Not Found" description="The requested blog post could not be found." />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">Article Offline</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            The article you are looking for has been moved or does not exist. Let's return to the tech directory listings.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="w-full py-3 bg-gradient-to-r from-red-650 to-amber-500 hover:from-red-750 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={18} /> Back to Blog
          </button>
        </motion.div>
      </div>
    );
  }

  // Parse Headings dynamically for ToC
  const headings = useMemo(() => {
    const lines = post.content.split("\n");
    const found = [];
    lines.forEach((line) => {
      if (line.startsWith("## ")) {
        const title = line.replace("## ", "").trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        found.push({ title, id });
      }
    });
    return found;
  }, [post]);

  // Tracks reading progress and scroll spy
  useEffect(() => {
    const handleScroll = () => {
      // 1. Reading progress indicator
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // 2. Active ToC heading tracker
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 150;

      let currentActive = "";
      for (const el of headingElements) {
        if (scrollPosition >= el.offsetTop) {
          currentActive = el.id;
        } else {
          break;
        }
      }
      setActiveId(currentActive || (headings[0] ? headings[0].id : ""));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial trigger
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Content Splitter & Renderer for custom styled layouts
  const renderedContent = useMemo(() => {
    const parts = post.content.split(/(```[a-z]*\n[\s\S]*?\n```)/g);
    
    return parts.map((part, index) => {
      // Code Blocks check
      if (part.startsWith("```")) {
        const lines = part.split("\n");
        const lang = lines[0].replace("```", "").trim() || "javascript";
        const code = lines.slice(1, -1).join("\n");
        
        return (
          <div key={index} className="my-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-lg font-mono text-xs sm:text-sm">
            {/* Top Bar bar */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-slate-900 bg-slate-900/60 select-none">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">{lang}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }}
                className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 p-1 rounded hover:bg-slate-800 text-[10px] font-bold"
                title="Copy code"
              >
                Copy
              </button>
            </div>
            {/* Code */}
            <pre className="p-4 overflow-x-auto text-slate-300 leading-relaxed custom-scrollbar">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      
      // Inline headers & paragraphs rendering
      const lines = part.split("\n");
      return lines.map((line, lIdx) => {
        const cleanLine = line.trim();
        if (!cleanLine) return <div key={lIdx} className="h-4" />;
        
        if (cleanLine.startsWith("## ")) {
          const title = cleanLine.replace("## ", "").trim();
          const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <h2
              key={lIdx}
              id={id}
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-10 mb-4 scroll-mt-24 border-l-4 border-red-500 pl-4"
            >
              {title}
            </h2>
          );
        }

        if (cleanLine.startsWith("> ")) {
          const blockquote = cleanLine.replace("> ", "").trim();
          return (
            <blockquote key={lIdx} className="my-6 pl-4 border-l-4 border-amber-500 italic text-slate-400 py-1 bg-slate-900/40 rounded-r-xl">
              {blockquote}
            </blockquote>
          );
        }

        if (cleanLine.startsWith("- ")) {
          const item = cleanLine.replace("- ", "").trim();
          return (
            <li key={lIdx} className="ml-6 list-disc text-slate-350 leading-relaxed my-1.5 pl-1">
              {item}
            </li>
          );
        }

        if (cleanLine.startsWith("1. ")) {
          const item = cleanLine.replace(/^\d+\.\s+/, "").trim();
          return (
            <li key={lIdx} className="ml-6 list-decimal text-slate-350 leading-relaxed my-1.5 pl-1">
              {item}
            </li>
          );
        }

        // Inline Bold parsing (e.g. **text**)
        if (cleanLine.includes("**")) {
          const segments = cleanLine.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={lIdx} className="text-slate-350 leading-relaxed text-base mb-4">
              {segments.map((seg, sIdx) => {
                if (seg.startsWith("**") && seg.endsWith("**")) {
                  return <strong key={sIdx} className="font-bold text-slate-100">{seg.replace(/\*\*/g, "")}</strong>;
                }
                return seg;
              })}
            </p>
          );
        }

        // Standard Paragraph
        return (
          <p key={lIdx} className="text-slate-350 leading-relaxed text-base mb-4">
            {cleanLine}
          </p>
        );
      });
    });
  }, [post]);

  // Related blog articles
  const relatedPosts = useMemo(() => {
    return blogPosts.filter((p) => p.slug !== slug).slice(0, 2);
  }, [slug]);

  // Schema data for dynamic SEO Structured Data injection
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": "2026-06-20", // or custom dates mapping
    "author": {
      "@type": "Person",
      "name": "Rohit Buddhe"
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
        ogType="article"
        schemaData={schemaData}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-900 z-[201] pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-red-650 to-amber-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Banner / Header */}
      <section className="relative pt-28 pb-12 border-b border-slate-200 dark:border-slate-900 bg-gradient-to-b from-slate-100/40 dark:from-slate-900/40 to-white dark:to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to articles
          </Link>

          <div className="space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-red-600 dark:text-red-400 uppercase bg-red-100 dark:bg-red-950/30 rounded-full border border-red-300 dark:border-red-900/50">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-900">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-red-500" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-500" />
                {post.readTime}
              </span>
              <span className="text-slate-500">
                Author: Rohit Buddhe
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_2.5fr] gap-12 items-start">
          
          {/* Left Column: TOC / Share Panel */}
          <aside className="hidden lg:sticky lg:top-24 lg:block space-y-8 select-none">
            
            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-2 flex items-center gap-2">
                  <BookOpen size={14} className="text-red-500" /> Contents
                </h4>
                <ul className="space-y-2.5">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(heading.id);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={`block text-xs font-semibold leading-relaxed transition-all hover:text-slate-200 border-l-2 pl-3 ${
                          activeId === heading.id
                            ? "text-amber-400 border-amber-500 pl-4 font-bold"
                            : "text-slate-500 border-slate-900"
                        }`}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share Panel */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 space-y-4">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-2">Share post</h4>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                  title="Share on Twitter"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <button
                  onClick={copyUrlToClipboard}
                  className="p-2.5 bg-slate-950 border border-slate-900 hover:border-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer flex items-center justify-center relative"
                  title="Copy link"
                >
                  {copied ? <Check size={16} className="text-green-500" /> : <Link2 size={16} />}
                </button>
              </div>
            </div>

          </aside>

          {/* Right Column: Main Content */}
          <div className="space-y-8">
            <article className="prose prose-invert max-w-none text-slate-350">
              {renderedContent}
            </article>

            {/* Share Panel for Mobile devices */}
            <div className="lg:hidden p-6 border-t border-slate-900 mt-12 space-y-4">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Share article</h4>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  <Linkedin size={18} />
                </a>
                <button
                  onClick={copyUrlToClipboard}
                  className="p-3 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center"
                >
                  {copied ? <Check size={18} className="text-green-500" /> : <Link2 size={18} />}
                </button>
              </div>
            </div>

            {/* Footer Navigation: Related Posts */}
            <div className="pt-16 border-t border-slate-200 dark:border-slate-900 space-y-6">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Recommended Reading</h4>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/blog/${rp.slug}`}
                    className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900/40 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">{rp.category}</span>
                      <h5 className="font-bold text-slate-200 line-clamp-2">{rp.title}</h5>
                    </div>
                    <span className="text-xs text-amber-500 font-semibold pt-4 flex items-center gap-1">
                      Read article
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
