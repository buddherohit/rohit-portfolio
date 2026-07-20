// src/data/trackerData.js

export const trackerCategories = [
  {
    id: "dsa",
    title: "DSA Mastery",
    iconName: "Binary",
    colorClass: "from-red-500 to-rose-500",
    milestones: [
      { id: "dsa_1", label: "Master Arrays & Strings", detail: "Solve 20+ problems (Two Sum, Anagrams, etc.)" },
      { id: "dsa_2", label: "Solve Linked List Cycles", detail: "Pointer reversals, merging lists, floyd cycle check" },
      { id: "dsa_3", label: "Implement Stacks & Queues", detail: "Min Stack, Valid Parentheses, sliding window dequeue" },
      { id: "dsa_4", label: "Build Binary Search Trees", detail: "Invert tree, check validator BST, LCA lookups" },
      { id: "dsa_5", label: "Understand DFS & BFS on Graphs", detail: "Number of Islands, matrix topological sorting" },
      { id: "dsa_6", label: "Implement DP Grids & Knapsack", detail: "Climbing stairs, Coin change patterns" }
    ]
  },
  {
    id: "development",
    title: "Development Paths",
    iconName: "Laptop",
    colorClass: "from-amber-500 to-orange-500",
    milestones: [
      { id: "dev_1", label: "Frontend HTML/CSS/JS Basics", detail: "Master responsive layouts & async JS calls" },
      { id: "dev_2", label: "Build REST APIs with Node/Spring", type: "Server", detail: "JWT authorization filters & routing controllers" },
      { id: "dev_3", label: "Design Database Schemas", detail: "SQL Joins & Mongoose document embedding" },
      { id: "dev_4", label: "Architect Systems", detail: "Caching layers, consistent hashing, load balancers" }
    ]
  },
  {
    id: "resume",
    title: "Resume & Profiles",
    iconName: "FileText",
    colorClass: "from-blue-500 to-indigo-500",
    milestones: [
      { id: "res_1", label: "ATS-Friendly Single-Column Layout", detail: "Strict spacing margins, standard clean font stacks" },
      { id: "res_2", label: "Google X-Y-Z Bullet Formatting", detail: "Accomplished [X] by doing [Z] measured by [Y]" },
      { id: "res_3", label: "Verification of Clickable Portfolio Links", detail: "Linked LinkedIn, GitHub, LeetCode, and email logs" }
    ]
  },
  {
    id: "interview",
    title: "Interview QA",
    iconName: "MessageSquareText",
    colorClass: "from-green-500 to-emerald-500",
    milestones: [
      { id: "int_1", label: "Perfect 30s Elevator Pitch", detail: "Briefing who you are, project highlights, role target" },
      { id: "int_2", label: "STAR Behavioral QA Templates", detail: "Structured logs on conflicts, deadlines, and failures" },
      { id: "int_3", label: "Core JVM Memory & Garbage Collection", detail: "Young gen, Old gen promotions, heap GC rules" },
      { id: "int_4", label: "React Reconciliation & Hooks", detail: "Virtual DOM comparison diffs, useMemo vs useCallback" }
    ]
  },
  {
    id: "aptitude",
    title: "Aptitude Tests",
    iconName: "Brain",
    colorClass: "from-teal-500 to-emerald-500",
    milestones: [
      { id: "apt_1", label: "Quantitative Formula Reference Sheet", detail: "Percentages, profit-loss, work-time, speed logs" },
      { id: "apt_2", label: "Solve Logical Puzzles & DI Sets", detail: "Logical grids, seating arrangements, chart reviews" },
      { id: "apt_3", label: "Verbal Reasoning Practices", detail: "English comprehensions, synonyms, error detections" }
    ]
  },
  {
    id: "projects",
    title: "Projects Checklist",
    iconName: "Compass",
    colorClass: "from-indigo-500 to-purple-500",
    milestones: [
      { id: "prj_1", label: "Write clean, modular code bases", detail: "Logical folder layers, environment variables" },
      { id: "prj_2", label: "Document setup steps in README", detail: "Tech stack badges, architecture flows, API details" },
      { id: "prj_3", label: "Containerize & Deploy (Docker)", detail: "Multi-stage Dockerfiles and cloud gateway deploys" }
    ]
  }
];
