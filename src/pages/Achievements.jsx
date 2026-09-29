import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Trophy,
  ShieldCheck,
  Sparkles,
  Terminal,
  Brain,
  Award,
  ArrowUpRight,
} from "lucide-react";

export default function Achievements() {
  const ACHIEVEMENTS_DATA = useMemo(
    () => [
      {
        id: "jpmorgan-hackathon",
        icon: Trophy,
        category: "Hackathon",
        title: "JPMorgan Chase Hackathon",
        badge: "Sprint Finalist • Prototyping",
        summary:
          "Collaborated in a high-velocity agile sprint building rapid full-stack software prototypes within 24 hours.",
        details:
          "Architected modular services, integrated mock APIs under strict sprint deadlines, and pitched to industry mentors.",
        tags: ["Agile Sprint", "Java", "Prototyping", "Team Lead"],
        accent: "#f59e0b", // Gold / Amber
        linkLabel: "View Experience",
        linkHref: "#experience",
      },
      {
        id: "oracle-ai-certified",
        icon: ShieldCheck,
        category: "Enterprise AI",
        title: "Oracle Cloud OCI AI Certified",
        badge: "Oracle Certified • Enterprise ML",
        summary:
          "Official enterprise certification covering deep learning, NLP, computer vision, and GenAI on Oracle Cloud.",
        details:
          "Validated enterprise AI architecture, model deployment, OCI AI services, and production ML lifecycle management.",
        tags: ["Oracle Cloud", "OCI AI", "Deep Learning", "GenAI"],
        accent: "#ea580c", // Orange / Vermilion
        linkLabel: "View Certificate",
        linkHref: "/certifications/Oracle AI Foundation.pdf",
      },
      {
        id: "google-genai-certified",
        icon: Sparkles,
        category: "Generative AI",
        title: "Google Cloud GenAI Specialist",
        badge: "Google Cloud Certified • 2025",
        summary:
          "Professional credential demonstrating proficiency in Large Language Models (LLMs) and Google Cloud AI.",
        details:
          "Validated mastery of attention architectures, prompt tuning, responsible AI development, and cloud model serving.",
        tags: ["Google Cloud", "LLMs", "Generative Models", "AI Ethics"],
        accent: "#0284c7", // Sky Blue
        linkLabel: "View Certificate",
        linkHref: "/certifications/Google AI.pdf",
      },
      {
        id: "gfg-java-certified",
        icon: Terminal,
        category: "Programming",
        title: "GeeksforGeeks Java Certified",
        badge: "GFG Verified • OOP & Logic",
        summary:
          "Comprehensive certification validating object-oriented design, Collections framework, and robust algorithms.",
        details:
          "Demonstrated deep proficiency in Java class architecture, multi-threading patterns, memory safety, and clean code.",
        tags: ["Java", "OOP", "Collections", "Design Patterns"],
        accent: "#10b981", // Emerald
        linkLabel: "View Certificate",
        linkHref: "/certifications/Java GFG.pdf",
      },
      {
        id: "ibm-ml-vision",
        icon: Brain,
        category: "Machine Learning",
        title: "IBM Machine Learning Specialist",
        badge: "Coursera & IBM • Certified",
        summary:
          "Rigorous certification covering regression, classification, clustering, and OpenCV image processing pipelines.",
        details:
          "Built Scikit-Learn pipelines, tuned hyper-parameters with cross-validation, and trained convolutional networks.",
        tags: ["Python", "Scikit-Learn", "Computer Vision", "OpenCV"],
        accent: "#8b5cf6", // Purple
        linkLabel: "View Certificate",
        linkHref: "/certifications/Machine learning IBM.pdf",
      },
      {
        id: "aws-cloud-ai",
        icon: Award,
        category: "Cloud Architecture",
        title: "AWS Cloud & AI Essentials",
        badge: "Amazon Web Services • Cloud 2025",
        summary:
          "Foundational certification covering AWS cloud infrastructure, security models, and Amazon Q AI tooling.",
        details:
          "Validated understanding of highly available cloud systems, serverless components, identity access, and AI workflows.",
        tags: ["AWS Cloud", "Amazon Q", "Cloud Security", "Infrastructure"],
        accent: "#f59e0b", // Amber / Gold
        linkLabel: "View Certificate",
        linkHref: "/certifications/AWS.pdf",
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(ACHIEVEMENTS_DATA[0].id);
  const [interacting, setInteracting] = useState(false);

  // Smooth idle rotation
  useEffect(() => {
    if (interacting) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const timer = setInterval(() => {
      setActiveId((prev) => {
        const idx = ACHIEVEMENTS_DATA.findIndex((item) => item.id === prev);
        const nextIdx = (idx + 1) % ACHIEVEMENTS_DATA.length;
        return ACHIEVEMENTS_DATA[nextIdx].id;
      });
    }, 3400);

    return () => clearInterval(timer);
  }, [interacting, ACHIEVEMENTS_DATA]);

  const handleSelect = useCallback((id) => {
    setActiveId(id);
  }, []);

  return (
    <section
      id="achievements"
      className="relative isolate py-10 sm:py-14 overflow-hidden"
    >
      {/* Subtle Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-200/10 dark:bg-cyan-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-200/10 dark:bg-purple-900/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header: clean, compact, proportional */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-6 sm:mb-8 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#0891B2] dark:text-[#22D3EE] font-semibold">
              Milestones &amp; Honors
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-[#111827] dark:text-[#F5F7FA] mt-0.5 tracking-tight">
              Achievements &amp; Credentials
            </h2>
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-[#6B7280] dark:text-[#94A3B8]">
            Hackathons • Enterprise AI • Verified Credentials
          </span>
        </div>

        {/* Compact, Ultra-Professional Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {ACHIEVEMENTS_DATA.map((item) => {
            const Icon = item.icon;
            const active = item.id === activeId;

            return (
              <div
                key={item.id}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") {
                    setInteracting(true);
                    handleSelect(item.id);
                  }
                }}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") {
                    setInteracting(false);
                  }
                }}
                onClick={() => handleSelect(item.id)}
                style={{
                  "--card-accent": item.accent,
                }}
                className={`group relative flex min-h-[200px] sm:min-h-[220px] flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer backdrop-blur-md overflow-hidden ${
                  active
                    ? "-translate-y-0.5 bg-white/95 dark:bg-slate-900/90 border-[color-mix(in_srgb,var(--card-accent)_45%,transparent)] shadow-[0_12px_28px_-14px_color-mix(in_srgb,var(--card-accent)_30%,transparent)]"
                    : "bg-white/70 dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/70 shadow-xs hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {/* Luminous Radial Ambient Aura when Active */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out -z-10 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background: `radial-gradient(circle at 85% 15%, color-mix(in srgb, var(--card-accent) 14%, transparent), transparent 60%)`,
                  }}
                />

                {/* Top Section: Icon, Category Pill, Title & Summary */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-lg border transition-all duration-300 ${
                        active
                          ? "border-[color-mix(in_srgb,var(--card-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--card-accent)_14%,white)] dark:bg-[color-mix(in_srgb,var(--card-accent)_16%,#0a0a0a)] text-[var(--card-accent)] scale-105"
                          : "border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>

                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border transition-colors duration-200 ${
                        active
                          ? "border-[color-mix(in_srgb,var(--card-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--card-accent)_10%,transparent)] text-[var(--card-accent)]"
                          : "border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <h3
                    className={`text-sm sm:text-base font-bold font-display tracking-tight leading-snug transition-colors duration-200 ${
                      active
                        ? "text-[#111827] dark:text-[#F5F7FA]"
                        : "text-[#111827]/90 dark:text-[#F5F7FA]/80"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-0.5 text-[11px] font-mono font-medium text-[var(--card-accent)]">
                    {item.badge}
                  </p>

                  {/* Description: Compact and responsive */}
                  <div className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#4B5563] dark:text-[#94A3B8]">
                    {active ? (
                      <p className="text-[#374151] dark:text-[#CBD5E1] transition-opacity duration-200 line-clamp-3">
                        {item.details}
                      </p>
                    ) : (
                      <p className="line-clamp-2 transition-opacity duration-200">
                        {item.summary}
                      </p>
                    )}
                  </div>

                  {/* Tech Tags: clean pills revealed when active */}
                  <div
                    className={`flex flex-wrap gap-1 transition-all duration-200 ${
                      active
                        ? "opacity-100 mt-2.5 max-h-12"
                        : "opacity-0 max-h-0 overflow-hidden pointer-events-none mt-0"
                    }`}
                  >
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-medium bg-[color-mix(in_srgb,var(--card-accent)_10%,transparent)] text-[#111827] dark:text-[#F5F7FA] border border-[color-mix(in_srgb,var(--card-accent)_20%,transparent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Link & Indicator */}
                <div className="mt-3.5 pt-2.5 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60">
                  <a
                    href={item.linkHref}
                    target={item.linkHref.startsWith("http") || item.linkHref.endsWith(".pdf") || item.linkHref.endsWith(".jpg") ? "_blank" : undefined}
                    rel={item.linkHref.startsWith("http") || item.linkHref.endsWith(".pdf") || item.linkHref.endsWith(".jpg") ? "noopener noreferrer" : undefined}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1.5 self-start font-mono text-[11px] uppercase tracking-wider font-semibold transition-colors duration-200 ${
                      active
                        ? "text-[var(--card-accent)] hover:opacity-80"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                    }`}
                  >
                    <span>{item.linkLabel}</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  {/* Active Indicator Dot */}
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      active
                        ? "bg-[var(--card-accent)] shadow-[0_0_8px_var(--card-accent)] scale-125"
                        : "bg-slate-300 dark:bg-slate-700 scale-75"
                    }`}
                  />
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-0.5 bg-[var(--card-accent)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
