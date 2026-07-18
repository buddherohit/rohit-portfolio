// src/data/placementData.js

export const placementCategories = [
  {
    id: "dsa",
    title: "DSA",
    description: "Master algorithms, data structures, and problem-solving techniques for coding rounds.",
    resourceCount: 24,
    iconName: "Binary",
    colorClass: "from-red-500 to-rose-500",
    items: [
      { name: "Blind 75 Curated List", type: "Sheet", status: "In Progress" },
      { name: "Striver's A2Z DSA Course", type: "Sheet", status: "Active" },
      { name: "LeetCode Daily Practices", type: "Platform", status: "Daily" },
      { name: "Dynamic Programming Cheat Sheet", type: "PDF", status: "Completed" }
    ]
  },
  {
    id: "development",
    title: "Development",
    description: "Hands-on projects, full-stack technologies, system building, and app development guides.",
    resourceCount: 18,
    iconName: "Laptop",
    colorClass: "from-amber-500 to-orange-500",
    items: [
      { name: "Full Stack MERN Architecture", type: "Guide", status: "Completed" },
      { name: "Next.js & React 19 Mastery", type: "Course", status: "Active" },
      { name: "RESTful API Best Practices", type: "Documentation", status: "Completed" },
      { name: "Docker & Containerization Guide", type: "DevOps", status: "In Progress" }
    ]
  },
  {
    id: "resume",
    title: "Resume",
    description: "Sleek resume templates, ATS-friendly keyword alignment, portfolio building, and reviews.",
    resourceCount: 6,
    iconName: "FileText",
    colorClass: "from-blue-500 to-indigo-500",
    items: [
      { name: "ATS-Friendly Resume Template", type: "LaTeX", status: "Active" },
      { name: "Action Verbs & Impact Keywords", type: "PDF", status: "Completed" },
      { name: "Project Description Generator", type: "Tool", status: "Ready" },
      { name: "LinkedIn Profile Optimization", type: "Guide", status: "Completed" }
    ]
  },
  {
    id: "interview-prep",
    title: "Interview Preparation",
    description: "Behavioral question frameworks, system design bases, mock interview plans, and QA vaults.",
    resourceCount: 15,
    iconName: "MessageSquareText",
    colorClass: "from-green-500 to-emerald-500",
    items: [
      { name: "STAR Method for Behavioral QA", type: "Framework", status: "Completed" },
      { name: "System Design Primer", type: "GitHub", status: "Active" },
      { name: "Mock Interview Checklist", type: "Sheet", status: "Ready" },
      { name: "HR Interview FAQ Guide", type: "Doc", status: "Completed" }
    ]
  },
  {
    id: "company-prep",
    title: "Company Preparation",
    description: "Specific company guides, past interview patterns, coding requirements, and interview logs.",
    resourceCount: 12,
    iconName: "Building2",
    colorClass: "from-purple-500 to-pink-500",
    items: [
      { name: "FAANG Interview Experiences", type: "Log", status: "Active" },
      { name: "Product Company Coding Sheets", type: "Sheet", status: "In Progress" },
      { name: "Startup Tech Round Expectations", type: "Guide", status: "Completed" },
      { name: "Company Wise Coding Questions", type: "Repo", status: "Active" }
    ]
  },
  {
    id: "cs-fundamentals",
    title: "CS Fundamentals",
    description: "Core academic concepts including DBMS, Operating Systems, Computer Networks, and OOP.",
    resourceCount: 20,
    iconName: "Database",
    colorClass: "from-cyan-500 to-sky-500",
    items: [
      { name: "DBMS SQL Query Cheat Sheet", type: "PDF", status: "Completed" },
      { name: "Operating Systems Core Concepts", type: "Revision", status: "Active" },
      { name: "Computer Networks Protocols Guide", type: "Notes", status: "Completed" },
      { name: "OOP Concepts & Design Patterns", type: "Notes", status: "Completed" }
    ]
  },
  {
    id: "aptitude",
    title: "Aptitude",
    description: "Quantitative formulas, logical reasoning puzzles, and verbal logic preparation materials.",
    resourceCount: 10,
    iconName: "Brain",
    colorClass: "from-teal-500 to-emerald-500",
    items: [
      { name: "Quantitative Aptitude Formulas", type: "Cheat Sheet", status: "Completed" },
      { name: "Logical Reasoning Puzzles Guide", type: "PDF", status: "Active" },
      { name: "Data Interpretation Basics", type: "Course", status: "Ready" },
      { name: "Verbal Ability Practice Sets", type: "Practice", status: "In Progress" }
    ]
  },
  {
    id: "roadmaps",
    title: "Roadmaps",
    description: "Step-by-step career path guides, technical tracks, skills sequencing, and timeline planning.",
    resourceCount: 8,
    iconName: "Compass",
    colorClass: "from-indigo-500 to-purple-500",
    items: [
      { name: "Frontend Developer Roadmap", type: "Interactive", status: "Active" },
      { name: "Backend Engineer Roadmap", type: "Interactive", status: "Active" },
      { name: "Data Structures & Algorithms Track", type: "Track", status: "Completed" },
      { name: "DevOps & Cloud Fundamentals", type: "Track", status: "In Progress" }
    ]
  }
];
