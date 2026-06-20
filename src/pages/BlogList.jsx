import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import { blogPosts } from "../data/blogData";
import SEO from "../components/SEO";

export default function BlogList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Get categories and their post count dynamically
  const categories = useMemo(() => {
    const counts = { All: blogPosts.length };
    blogPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, []);

  // Filter posts based on search query and category tab
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Featured post (first featured post or just the first post in general)
  const featuredPost = useMemo(() => {
    return blogPosts.find((post) => post.featured) || blogPosts[0];
  }, []);

  // Normal posts list (excluding the featured one if search/filter is not active)
  const listPosts = useMemo(() => {
    if (searchQuery !== "" || activeCategory !== "All") {
      return filteredPosts;
    }
    return filteredPosts.filter((post) => post.id !== featuredPost.id);
  }, [filteredPosts, featuredPost, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-red-500/30 selection:text-red-600 dark:selection:text-red-200 pt-28 pb-20">
      <SEO 
        title="Technical Blog" 
        description="Read technical posts, guides, architectures, and stories written by Rohit Buddhe." 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Blog Hero Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-red-600 dark:text-red-400 uppercase bg-red-100 dark:bg-red-950/20 rounded-full border border-red-300 dark:border-red-900/50">
            Developer Logs • Insights • Guides
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Insights & Engineering
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Deep-dives into LLMs, full-stack architectures, vector indexing, and lessons learned along the academic highway.
          </p>
        </div>

        {/* Featured Post (Only show when search is idle) */}
        {searchQuery === "" && activeCategory === "All" && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => navigate(`/blog/${featuredPost.slug}`)}
            className="group cursor-pointer rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900/60 backdrop-blur-sm p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 grid md:grid-cols-[1.2fr_1fr] gap-8 relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-650/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Featured Info */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-0.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-md">
                  FEATURED ARTICLE
                </span>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300 leading-tight">
                  {featuredPost.title}
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-red-500" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-amber-500" />
                    {featuredPost.readTime}
                  </span>
                  <span className="text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/40 px-2 py-0.5 rounded-full border border-red-300 dark:border-red-900/50">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-amber-400 group-hover:text-amber-300">
                  Read Article <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Custom Interactive Mock Graphic */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-6 flex flex-col justify-between h-[220px] md:h-auto overflow-hidden group-hover:border-amber-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-slate-950 pointer-events-none" />
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-500 font-bold uppercase tracking-wider">Neural Tutor Workspace</span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="flex-1 flex items-center justify-center py-4">
                <BookOpen size={48} className="text-red-500/20 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {featuredPost.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="font-mono text-[9px] text-slate-500 dark:text-slate-400 px-2 py-0.5 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-850 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search and Filters Controls */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles by title, content, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-800 rounded-xl focus:border-red-500/50 focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all shadow-md focus:shadow-red-900/5 backdrop-blur-sm"
              />
            </div>

            {/* Category count labels */}
            <div className="text-xs text-slate-400 font-bold self-end md:self-auto">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Filter Categories Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200 dark:border-slate-900">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                  activeCategory === category.name
                    ? "bg-red-600 text-white shadow-md shadow-red-900/20"
                    : "bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-850 hover:bg-slate-200 dark:hover:bg-slate-900/80 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                {category.name} <span className="ml-1 text-[10px] opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles List Grid */}
        <motion.div className="grid md:grid-cols-2 gap-6" layout>
          <AnimatePresence mode="popLayout">
            {listPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => navigate(`/blog/${post.slug}`)}
                className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-850 hover:border-slate-300 dark:hover:border-slate-800 bg-slate-50 dark:bg-slate-900/20 hover:bg-slate-100 dark:hover:bg-slate-900/40 p-6 flex flex-col justify-between space-y-6 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-red-600 dark:text-red-400 font-bold">{post.category}</span>
                    <span className="text-slate-500">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-900/60">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-950/60 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-850">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500 dark:text-slate-500 font-semibold">{post.date}</span>
                    <span className="text-amber-400 flex items-center gap-1 group-hover:text-amber-300">
                      Read Post <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No Articles Found State */}
          {listPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-16 text-center flex flex-col items-center justify-center text-slate-500 space-y-3"
            >
              <AlertCircle size={36} className="text-slate-650" />
              <p className="text-lg">No articles found matching search criteria.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="text-xs font-bold text-amber-500 hover:text-amber-400 underline cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
