import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Cpu, Layers, Database, Globe, CheckCircle, ArrowRight, Maximize2, Award, Zap, BookOpen } from "lucide-react";
import { projectsDetails } from "../data/projectData";
import SEO from "../components/SEO";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const project = projectsDetails[slug];

  // If project doesn't exist, render a premium 404 page
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-20 text-center">
        <SEO title="Project Not Found" description="The requested project case study could not be found." />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl" />
          <h2 className="text-4xl font-extrabold text-slate-100 mb-4">Case Study Offline</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            The project case study you are looking for has been archived or does not exist. Let's head back to the profile dashboard.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-gradient-to-r from-red-650 to-amber-500 hover:from-red-750 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg transition duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  // Get related projects
  const allSlugs = Object.keys(projectsDetails);
  const relatedSlugs = allSlugs.filter((s) => s !== slug).slice(0, 2);
  const relatedProjects = relatedSlugs.map((s) => projectsDetails[s]);

  // Schema structured data for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "genre": project.category,
    "creator": {
      "@type": "Person",
      "name": "Rohit Buddhe"
    },
    "techStack": project.techStack
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-red-500/30 selection:text-red-200">
      <SEO 
        title={`${project.title} Case Study`}
        description={project.tagline}
        ogTitle={`${project.title} | Developer Case Study`}
        ogDescription={project.description}
        schemaData={schemaData}
      />

      {/* Hero Header */}
      <section className="relative pt-28 pb-16 overflow-hidden border-b border-slate-900 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950">
        <div className="absolute top-20 left-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/#projects"
            state={{ scrollTo: "projects" }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to projects
          </Link>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
            {/* Left Col - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-red-400 uppercase bg-red-950/30 rounded-full border border-red-900/50">
                {project.category}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-slate-350 leading-relaxed font-medium">
                {project.tagline}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 hover:border-amber-500/30 hover:text-amber-400 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-red-650 to-amber-500 hover:from-red-750 hover:to-amber-600 text-slate-950 dark:text-slate-950 font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 cursor-pointer scale-100 hover:scale-[1.02]"
                  >
                    <ExternalLink size={18} /> Live Deployment
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 font-bold rounded-xl transition duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <Github size={18} /> View Repository
                </a>
              </div>
            </motion.div>

            {/* Right Col - Card Preview Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group cursor-pointer"
              onClick={() => { if (project.image) setLightboxOpen(true); }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-amber-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500" />
              <div className="relative rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl bg-slate-950 aspect-video flex items-center justify-center">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 right-3 p-2 bg-slate-900/90 backdrop-blur-md rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={16} />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-red-950/40 to-slate-950 flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <span className="text-6xl animate-bounce">🤖</span>
                    <div>
                      <h4 className="font-bold text-lg text-slate-200">Generative AI Mockup</h4>
                      <p className="text-xs text-slate-400">Case study architecture dashboard active</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Breakdown Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-red-650/5 rounded-full blur-2xl" />
              <div className="space-y-4">
                <span className="p-3 bg-red-950/50 border border-red-900/50 rounded-2xl inline-block text-red-400">
                  <Zap size={22} />
                </span>
                <h3 className="text-2xl font-bold text-white">The Challenge</h3>
                <p className="text-slate-350 leading-relaxed text-base">
                  {project.problem}
                </p>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />
              <div className="space-y-4">
                <span className="p-3 bg-amber-950/30 border border-amber-900/30 rounded-2xl inline-block text-amber-400">
                  <CheckCircle size={22} />
                </span>
                <h3 className="text-2xl font-bold text-white">The Engineered Solution</h3>
                <p className="text-slate-350 leading-relaxed text-base">
                  {project.solution}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Key Features Grid */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Core Platform Capabilities</h2>
              <p className="text-slate-400">Interactive mechanics built to address high-friction features</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-850 hover:border-red-500/30 hover:bg-slate-900 transition-all duration-300 relative group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-red-400 bg-red-950/50 border border-red-900/50 px-2.5 py-0.5 rounded-full">
                      Feature 0{idx + 1}
                    </span>
                    <h4 className="font-bold text-lg text-slate-100 group-hover:text-white transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* System Architecture */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">System Architecture</h2>
              <p className="text-slate-400">Robust layers optimized for throughput and scale</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Frontend Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-blue-950/50 border border-blue-900/50 rounded-xl text-blue-400">
                      <Cpu size={18} />
                    </span>
                    <h4 className="font-bold text-slate-200">Frontend Layer</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {project.architecture.frontend}
                  </p>
                </div>
              </div>

              {/* Backend Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-red-950/50 border border-red-900/50 rounded-xl text-red-400">
                      <Layers size={18} />
                    </span>
                    <h4 className="font-bold text-slate-200">Backend API Gateway</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {project.architecture.backend}
                  </p>
                </div>
              </div>

              {/* Database Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-green-950/50 border border-green-900/50 rounded-xl text-green-400">
                      <Database size={18} />
                    </span>
                    <h4 className="font-bold text-slate-200">Persistence Store</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {project.architecture.database}
                  </p>
                </div>
              </div>

              {/* Deployment Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 bg-purple-950/50 border border-purple-900/50 rounded-xl text-purple-400">
                      <Globe size={18} />
                    </span>
                    <h4 className="font-bold text-slate-200">Infrastructure</h4>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {project.architecture.deployment}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Database Schema Design */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/30 border border-slate-800/80 relative overflow-hidden space-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Relational Document Schema Design</h3>
              <p className="text-slate-450 text-sm">Visualizing collection schemas and database index models</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-4">
              {project.databaseDesign.entities.map((entity) => (
                <div key={entity.name} className="p-5 rounded-2xl bg-slate-950/60 border border-slate-850 hover:border-slate-800 transition duration-300">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="font-bold text-slate-200">{entity.name}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-500">Collection</span>
                  </div>
                  <ul className="space-y-1.5">
                    {entity.fields.map((field) => (
                      <li key={field} className="text-xs font-mono text-slate-400 flex items-center justify-between">
                        <span>{field.split(" ")[0]}</span>
                        <span className="text-[10px] text-slate-500">{field.includes("(") || field.includes(" ") ? field.split(" ").slice(1).join(" ") : "field"}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 italic">
              *Schema Description: {project.databaseDesign.description}
            </p>
          </div>

          {/* Technical Challenges (Tabs layout) */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Technical Bottlenecks & Resolutions</h2>
              <p className="text-slate-400">Engineering challenges solved through systematic debugging</p>
            </div>

            <div className="border border-slate-800 rounded-3xl overflow-hidden bg-slate-900/20 backdrop-blur-sm">
              {/* Tab headers */}
              <div className="flex border-b border-slate-850 overflow-x-auto bg-slate-900/60">
                {project.challenges.map((challenge, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-semibold transition-all cursor-pointer border-b-2 flex-shrink-0 ${
                      activeTab === idx
                        ? "border-red-500 text-white bg-slate-950/40"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Challenge {idx + 1}: {challenge.title}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8 sm:p-10 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-red-400 mb-2">The Bottleneck</h4>
                  <p className="text-slate-200 text-lg font-medium">{project.challenges[activeTab].title}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 pt-4 border-t border-slate-850">
                  <div>
                    <h5 className="text-xs uppercase font-bold tracking-wider text-slate-500 mb-2">Our Initial Approach</h5>
                    <p className="text-slate-350 text-sm leading-relaxed">{project.challenges[activeTab].approach}</p>
                  </div>
                  <div>
                    <h5 className="text-xs uppercase font-bold tracking-wider text-amber-500 mb-2">Optimized Resolution</h5>
                    <p className="text-slate-300 text-sm leading-relaxed">{project.challenges[activeTab].solution}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics & Key takeaways */}
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 pt-6">
            {/* Metrics */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Impact Analytics</h3>
                <p className="text-slate-450 text-sm">Key performance indicators tracked post-deployment</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-850 flex flex-col justify-between">
                    <span className="text-3xl font-extrabold text-white tracking-tight bg-gradient-to-r from-red-400 to-amber-500 bg-clip-text text-transparent">
                      {metric.value}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider pt-2">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Takeaway Learning Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4 z-10">
                <span className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl inline-block">
                  <Award size={22} />
                </span>
                <h3 className="text-2xl font-bold text-white">Personal Growth & Takeaways</h3>
                <p className="text-slate-350 leading-relaxed text-base">
                  {project.learnings}
                </p>
              </div>
            </div>
          </div>

          {/* Related/Footer Navigation */}
          <div className="pt-16 border-t border-slate-900 space-y-8">
            <h3 className="text-2xl font-bold text-white">Other Case Studies</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="p-6 rounded-2xl bg-slate-900/30 border border-slate-850 hover:border-red-500/30 hover:bg-slate-900/50 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-650/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  <div className="space-y-2 z-10">
                    <span className="text-xs uppercase tracking-wider text-red-400 font-bold">{p.category}</span>
                    <h4 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">{p.title}</h4>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{p.tagline}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 pt-4 z-10">
                    Read Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && project.image && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[85vh] overflow-hidden z-10 flex items-center justify-center"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-900/90 text-slate-200 hover:text-white rounded-lg hover:bg-slate-800 transition-colors z-20 cursor-pointer"
              >
                <X size={20} />
              </button>
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg border border-slate-800"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Lightbox helper X icon from lucide
function X({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
