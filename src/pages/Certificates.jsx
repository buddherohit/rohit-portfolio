import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
  };

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const certificatesData = [
    {
      id: 1,
      title: "Java (Basic)",
      issuer: "GeeksforGeeks",
      date: "2025",
      description: "Comprehensive certification in Java Programming from GeeksforGeeks, focusing on Object-Oriented Programming (OOP) concepts, collections, data structures, algorithms, and logical problem solving.",
      skills: ["Java", "OOP", "Data Structures", "Algorithms", "Problem Solving"],
      icon: "☕",
      color: "from-red-500 to-orange-500",
      imagePath: "/certifications/Java GFG.pdf",
      category: "completion"
    },
    {
      id: 2,
      title: "Oracle Cloud Infrastructure AI Foundations",
      issuer: "Oracle",
      date: "2025",
      description: "Foundational OCI AI concepts certification covering Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, and Generative AI workloads on Oracle Cloud Infrastructure.",
      skills: ["Oracle Cloud", "Artificial Intelligence", "Generative AI", "Machine Learning", "Deep Learning"],
      icon: "🔴",
      color: "from-red-600 to-red-850",
      imagePath: "/certifications/Oracle AI Foundation.pdf",
      category: "completion"
    },
    {
      id: 3,
      title: "Generative AI Fundamentals",
      issuer: "Google Cloud",
      date: "2025",
      description: "Official Google Cloud certification demonstrating proficiency in Large Language Models (LLMs), Generative AI concepts, and Google Cloud AI services.",
      skills: ["Generative AI", "Large Language Models", "Google Cloud", "AI Ethics", "Machine Learning"],
      icon: "☁️",
      color: "from-blue-500 to-green-500",
      imagePath: "/certifications/Google AI.pdf",
      category: "completion"
    },
    {
      id: 4,
      title: "Introduction to Computer Vision",
      issuer: "Coursera (IBM)",
      date: "2025",
      description: "Advanced computer vision certification covering image processing, object detection, convolutional neural networks (CNNs), and OpenCV programming.",
      skills: ["Computer Vision", "OpenCV", "Deep Learning", "Python", "Image Processing"],
      icon: "👁️",
      color: "from-cyan-550 to-blue-600",
      imagePath: "/certifications/Coursera Computer Vision.pdf",
      category: "completion"
    },
    {
      id: 5,
      title: "Machine Learning with Python",
      issuer: "IBM (Coursera)",
      date: "2025",
      description: "Professional Machine Learning certification from IBM, covering supervised and unsupervised learning algorithms, regression, classification, clustering, and model evaluation techniques.",
      skills: ["Machine Learning", "Python", "Scikit-Learn", "Regression", "Clustering"],
      icon: "📈",
      color: "from-blue-650 to-indigo-700",
      imagePath: "/certifications/Machine learning IBM.pdf",
      category: "completion"
    },
    {
      id: 6,
      title: "SQL (Basic & Intermediate)",
      issuer: "HackerRank / Simplilearn",
      date: "2025",
      description: "Validated SQL certifications demonstrating proficiency in writing complex database queries, table joins, aggregations, subqueries, and database design principles.",
      skills: ["SQL", "Relational Databases", "MySQL", "Queries", "Database Design"],
      icon: "🗄️",
      color: "from-indigo-500 to-pink-500",
      imagePath: "/certifications/sql_basic certificate.pdf",
      category: "completion"
    },
    {
      id: 7,
      title: "Data Analysis with Python",
      issuer: "Coursera (IBM)",
      date: "2025",
      description: "Data analytics certification covering data wrangling, exploratory data analysis (EDA), statistical model development, and visualization using Pandas, NumPy, and Matplotlib.",
      skills: ["Data Analysis", "Python", "Pandas", "Data Visualization", "NumPy"],
      icon: "📊",
      color: "from-teal-500 to-emerald-500",
      imagePath: "/certifications/Coursera Data Analytics.pdf",
      category: "completion"
    },
    {
      id: 8,
      title: "AWS Cloud Practitioner & AI Essentials",
      issuer: "Amazon Web Services (AWS)",
      date: "2025",
      description: "AWS cloud computing foundations certification, covering architectural principles, cloud security, billing, and generative AI features like Amazon Q.",
      skills: ["AWS", "Cloud Computing", "Amazon Q", "Cloud Security", "Infrastructure"],
      icon: "🧡",
      color: "from-orange-500 to-yellow-500",
      imagePath: "/certifications/AWS.pdf",
      category: "completion"
    },
  ];

  const filteredCerts = filter === "all"
    ? certificatesData
    : certificatesData.filter(c => c.category === filter);

  return (
    <motion.section
      className="relative isolate bg-purple-50/30 dark:bg-slate-950/20 py-20 sm:py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
      }}
    >
      {/* Subtle Background Blobs */}
      <div className="absolute inset-0 overflow-hidden text-gray-800 dark:text-slate-100">
        <div className="absolute -top-24 right-10 h-72 w-72 rounded-full bg-red-300/30 dark:bg-red-950/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-red-500/20 dark:bg-red-950/5 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 space-y-12 text-gray-800 dark:text-slate-100">
        {/* Header */}
        <motion.div variants={heroVariants} className="text-center space-y-4">
          <span className="px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/20 rounded-full inline-block">
            Achievements • Certifications • Learning
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-slate-100">
            Certificates & Achievements
          </h2>
          <p className="text-base sm:text-lg max-w-3xl mx-auto text-gray-600 dark:text-slate-400">
            Professional certifications and achievements showcasing my learning journey and technical expertise
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={heroVariants} className="flex justify-center gap-3">
          {[
            { label: "All", value: "all", count: certificatesData.length },
            { label: "Completion", value: "completion", count: certificatesData.filter(c => c.category === "completion").length },
            { label: "Participation", value: "participation", count: certificatesData.filter(c => c.category === "participation").length }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${filter === tab.value
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-white/80 dark:bg-slate-900/60 text-gray-700 dark:text-slate-350 border border-gray-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-500/30 hover:bg-red-50 dark:hover:bg-slate-800'
                }`}
            >
              {tab.label} <span className="ml-1.5 text-xs opacity-75">({tab.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                variants={item}
                layout
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                onClick={() => openModal(cert)}
                className="cursor-pointer group"
              >
                <div className="h-full rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-red-200 dark:hover:border-red-900 flex flex-col">
                  {/* Icon & Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${cert.color} rounded-xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {cert.icon}
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${cert.category === 'completion'
                      ? 'bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-400'
                      : 'bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400'
                      }`}>
                      {cert.category === 'completion' ? 'Completed' : 'Participated'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2 line-clamp-2 min-h-[56px] group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-450 mb-3">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="line-clamp-1">{cert.issuer}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-slate-350 line-clamp-3 mb-4 flex-grow">
                    {cert.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{cert.date}</span>
                    </div>
                    <span className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={heroVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Total Certificates", value: certificatesData.length, icon: "📜" },
            { label: "Completion", value: certificatesData.filter(c => c.category === "completion").length, icon: "✅" },
            { label: "Participation", value: certificatesData.filter(c => c.category === "participation").length, icon: "🎯" },
            { label: "Skills Gained", value: "25+", icon: "🚀" }
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-5 text-center shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-500 mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedCert && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

              <motion.div
                className="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl md:max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl border dark:border-slate-800"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-800 p-5 flex items-start justify-between z-10">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 bg-gradient-to-r ${selectedCert.color} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
                      {selectedCert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-1 pr-8">{selectedCert.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-300">{selectedCert.issuer}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{selectedCert.date}</p>
                    </div>
                  </div>

                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5 text-gray-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Certificate Image */}
                  <div className="bg-gray-50 dark:bg-slate-950/40 rounded-xl p-4 border dark:border-slate-800/40">
                    {selectedCert.imagePath.toLowerCase().endsWith('.pdf') ? (
                      <div className="flex flex-col items-center gap-3">
                        <iframe
                          src={`${selectedCert.imagePath}#toolbar=0`}
                          title={`${selectedCert.title} certificate`}
                          className="w-full h-[50vh] rounded-lg border border-gray-200 dark:border-slate-800 bg-white"
                        />
                        <a
                          href={selectedCert.imagePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-red-650 dark:text-red-450 hover:underline flex items-center gap-1.5 cursor-pointer font-medium"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Open PDF in New Tab
                        </a>
                      </div>
                    ) : (
                      <img
                        src={selectedCert.imagePath}
                        alt={`${selectedCert.title} certificate`}
                        className="w-full h-auto max-h-[56vh] object-contain rounded-lg"
                      />
                    )}
                  </div>

                  {/* Description */}
                  <div className="bg-red-50 dark:bg-red-950/10 rounded-xl p-5 border border-red-100 dark:border-red-950/30">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-2">About this certification</h4>
                    <p className="text-sm text-gray-700 dark:text-slate-350 leading-relaxed">
                      {selectedCert.description}
                    </p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-3">Skills & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm rounded-full border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-gray-700 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
