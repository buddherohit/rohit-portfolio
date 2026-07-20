// src/data/companyData.js

export const companyPrepList = [
  {
    id: "amazon",
    name: "Amazon",
    category: "Product",
    difficulty: "Hard",
    overview: "Global e-commerce and cloud giant focusing heavily on data structures, system design, and Leadership Principles.",
    hiringProcess: [
      "Online Assessment (2 Coding Questions + Work Simulation)",
      "Technical Interview 1 (DSA & Leadership Principles)",
      "Technical Interview 2 (DSA & Leadership Principles)",
      "Bar Raiser Interview (System Design & Leadership Principles)"
    ],
    onlineAssessment: {
      duration: "120 Mins",
      topics: "2 coding questions (Data Structures, Greedy, DP) + 15 mins behavioral explanation write-up.",
      pattern: "Questions are typically LeetCode Medium/Hard focusing on Arrays, Trees, HashMaps, and Heaps."
    },
    interviewRounds: [
      { name: "Technical Round 1", focus: "DSA logic, time/space complexities, and 2 behavioral leadership questions." },
      { name: "Technical Round 2", focus: "Advanced DSA (e.g. Graphs, Dynamic Programming) + Leadership Principles integration." },
      { name: "Bar Raiser", focus: "External interviewer focusing on cultural fit (Leadership Principles), design scaling, and edge-cases handling." }
    ],
    importantTopics: ["Trees & Graphs", "Dynamic Programming", "Heaps/Priority Queues", "Amazon Leadership Principles", "System Design Basics"],
    preparationResources: [
      { name: "Amazon Leadership Principles Guide", type: "article", url: "https://www.aboutamazon.com/about-us/leadership-principles" },
      { name: "Amazon Top LeetCode Sheet", type: "sheet", url: "https://leetcode.com/discuss/interview-question/1151603/Amazon-Top-Questions" }
    ],
    experiences: [
      {
        candidate: "Rahul S.",
        role: "SDE-1",
        year: "2025",
        verdict: "Selected",
        details: "R1 had a graph problem (BFS traversal). R2 was DP (similar to Edit Distance). Bar Raiser focused heavily on 'Customer Obsession' and 'Ownership' leadership principles. Be thorough with STAR behavioral answers!"
      }
    ]
  },
  {
    id: "google",
    name: "Google",
    category: "Product",
    difficulty: "Hard",
    overview: "World's leading search engine known for its rigorous algorithmic testing, complex graph traversals, and Googleyness guidelines.",
    hiringProcess: [
      "Resume Screening",
      "Screening Code Round (1 Coding Question)",
      "3-4 Onsite Technical Rounds (Algorithmic DSA)",
      "Behavioral Round (Googleyness & Leadership)"
    ],
    onlineAssessment: {
      duration: "90 Mins",
      topics: "2 advanced coding questions (Graphs, DP, Segment Trees/Tries).",
      pattern: "Highly algorithmic. Solutions require optimal space-time trade-offs and handling complex boundaries."
    },
    interviewRounds: [
      { name: "Screening Round", focus: "45-min coding round checking basic DS mastery and communication flow." },
      { name: "Onsite Technical R1-R3", focus: "Advanced algorithms, math/combinatorics, Graph traversals (DFS/BFS/Dijkstra), Tries, and DP grids." },
      { name: "Googleyness & Leadership", focus: "Behavioral assessment checking teamwork, ambiguity handling, ethical biases, and leadership." }
    ],
    importantTopics: ["Graph Algorithms (Dijkstra, MST)", "Tries & Segment Trees", "Dynamic Programming", "Recursion & Backtracking", "Googleyness & Ambiguity"],
    preparationResources: [
      { name: "Google Tech Dev Prep Guide", type: "article", url: "https://techdevguide.withgoogle.com/" },
      { name: "Google Top Interview Questions Sheet", type: "sheet", url: "https://leetcode.com/discuss/interview-question/315152/Google-Onsite-Interview-Questions" }
    ],
    experiences: [
      {
        candidate: "Sneha P.",
        role: "Software Engineer",
        year: "2025",
        verdict: "Selected",
        details: "All coding rounds were unique variations. No direct LeetCode copy-paste. I got a topological sorting question and a matrix game DP question. Googleyness round had scenario-based ethical questions."
      }
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    category: "Product",
    difficulty: "Hard",
    overview: "Software and cloud computing pioneer testing deep fundamental CS concepts, systems, and algorithmic designs.",
    hiringProcess: [
      "Online Assessment (Codility/HackerRank)",
      "Technical Screening Round",
      "2-3 Loop Onsite Rounds (DSA + System Design)",
      "As-Appropriate (AA) Final Round (Product Fit & Logic)"
    ],
    onlineAssessment: {
      duration: "100 Mins",
      topics: "3 coding questions (Arrays, Strings, Linked Lists, simple DP).",
      pattern: "Usually hosted on Codility. Focuses on edge cases and correctness across large inputs."
    },
    interviewRounds: [
      { name: "Screening Round", focus: "Coding practice and reviews of past projects and backend architectures." },
      { name: "Loop Technical Rounds", focus: "DSA questions (Tree traversals, stacks/queues) + Low-Level Design (LLD) or High-Level Design (HLD) basics." },
      { name: "AA Round", focus: "Final director round evaluating logic, problem-solving, values alignment, and project depth." }
    ],
    importantTopics: ["Linked Lists & Trees", "Stacks & Monotonic Queues", "Low Level Design (LLD)", "High Level Design (HLD)", "Concurrency & Threading"],
    preparationResources: [
      { name: "Microsoft Interview Prep Track", type: "article", url: "https://www.geeksforgeeks.org/microsoft-interview-preparation/" }
    ],
    experiences: [
      {
        candidate: "Aditya K.",
        role: "Software Engineer SDE-1",
        year: "2025",
        verdict: "Selected",
        details: "First onsite was LLD (Design a parking lot). Second onsite was DSA (Binary Tree serialization). Final AA round asked about cloud scalability and JWT token security."
      }
    ]
  },
  {
    id: "jpmorgan",
    name: "JPMorgan Chase & Co.",
    category: "FinTech",
    difficulty: "Medium",
    overview: "Global financial services firm looking for strong Java full-stack builders, database developers, and collaborative innovators.",
    hiringProcess: [
      "Online Coding Assessment (HackerRank)",
      "Video Interview (HireVue - Behavioral questions)",
      "Super Day (2 consecutive Technical/Personal interviews)"
    ],
    onlineAssessment: {
      duration: "60 Mins",
      topics: "2 coding questions (Strings, Arrays, HashMaps, Math).",
      pattern: "Medium level problems. Clean code correctness and basic complexity explanations are evaluated."
    },
    interviewRounds: [
      { name: "Technical Round 1", focus: "OOP principles, Java core collections, SQL query joins, and 1 DSA question (Arrays/Strings)." },
      { name: "Technical/HR Round 2", focus: "Project architectures discussion, database normalization, behavioral questions, and culture fit." }
    ],
    importantTopics: ["Java OOP & Collections", "SQL Queries & Database Indexes", "Arrays & String Manipulation", "REST APIs", "Team Collaboration (Behavioral)"],
    preparationResources: [
      { name: "JPMC Interview Prep Kit", type: "article", url: "https://www.geeksforgeeks.org/j-p-morgan-chase-co-interview-experience/" }
    ],
    experiences: [
      {
        candidate: "Amit R.",
        role: "Technology Analyst",
        year: "2025",
        verdict: "Selected",
        details: "HireVue was purely video recording. Super Day had two rounds. They asked about HashMap internal workings, abstract classes vs interfaces, SQL joins, and behavioral questions about conflict resolution."
      }
    ]
  },
  {
    id: "tcs",
    name: "TCS",
    category: "Services",
    difficulty: "Easy-Medium",
    overview: "Leading global IT service provider hiring through National Qualifier Test (NQT) for Ninja and Digital profiles.",
    hiringProcess: [
      "TCS NQT (Aptitude + English + Coding)",
      "Technical Interview (TR)",
      "Managerial Interview (MR)",
      "HR Interview"
    ],
    onlineAssessment: {
      duration: "180 Mins",
      topics: "Numerical Ability, Verbal Ability, Reasoning Ability, and 2 Coding Questions (1 Easy, 1 Medium).",
      pattern: "Focuses heavily on general aptitude. Coding questions are simple loops, math, array search, or string conversions."
    },
    interviewRounds: [
      { name: "Technical Round", focus: "Academic projects description, basic C/Java/Python syntax, basic SQL queries, and OOP concepts." },
      { name: "Managerial Round", focus: "Situational questions, project team role, and willingness to learn new technologies." },
      { name: "HR Round", focus: "Background checks, salary discussions, shift flexibilities, and relocation choices." }
    ],
    importantTopics: ["General Aptitude & Reasoning", "C/Java/Python Programming Basics", "OOPs Concepts", "SQL Basics", "Academic Projects Details"],
    preparationResources: [
      { name: "TCS NQT Coding Prep Sheet", type: "sheet", url: "https://www.geeksforgeeks.org/tcs-nqt-preparation/" }
    ],
    experiences: [
      {
        candidate: "Pooja D.",
        role: "Systems Engineer (Digital)",
        year: "2025",
        verdict: "Selected",
        details: "The NQT had comprehensive aptitude sections. Technical interview was 30 mins, focusing on my Java certification, basic OOP principles, and a simple prime number code. HR round checked my documents."
      }
    ]
  },
  {
    id: "infosys",
    name: "Infosys",
    category: "Services",
    difficulty: "Easy-Medium",
    overview: "IT services multinational recruiting for System Engineer (SE), Specialist Programmer (SP), and Digital Specialist Engineer (DSE) roles.",
    hiringProcess: [
      "Online Assessment (InfyTQ or HackWithInfy)",
      "Technical Interview",
      "HR Interview"
    ],
    onlineAssessment: {
      duration: "150 Mins",
      topics: "3 Coding Questions (ranges from Arrays/Greedy to Dynamic Programming for SP profile).",
      pattern: "Assessment difficulty varies heavily based on profile. SP/DSE assessments contain LeetCode Medium/Hard algorithmic questions."
    },
    interviewRounds: [
      { name: "Technical Round", focus: "Deep-dive into DBMS/SQL, OOP design, coding questions solved in OA, and project implementations." },
      { name: "HR Round", focus: "Communication validation, basic behavioral scenarios, and relocations checklist." }
    ],
    importantTopics: ["Data Structures (Arrays, Strings)", "DBMS & SQL Normalization", "OOP Principles", "Software Engineering SDLC", "Web Development Basics"],
    preparationResources: [
      { name: "Infosys Placement Preparation Path", type: "article", url: "https://www.geeksforgeeks.org/infosys-recruitment-process/" }
    ],
    experiences: [
      {
        candidate: "Kunal G.",
        role: "Digital Specialist Engineer",
        year: "2025",
        verdict: "Selected",
        details: "Cleared via HackWithInfy. Had two coding questions solved in OA. Technical round interviewer asked me to explain the logic of my code, followed by database indexing, differences between SQL and NoSQL, and SDLC models."
      }
    ]
  },
  {
    id: "accenture",
    name: "Accenture",
    category: "Services",
    difficulty: "Easy-Medium",
    overview: "Global professional services company hiring Associate Software Engineers (ASE) and Advanced ASE (AASE).",
    hiringProcess: [
      "Cognitive and Technical Assessment",
      "Coding Assessment (2 Questions)",
      "Communication Assessment (Automated)",
      "One-on-One Interview (TR + HR)"
    ],
    onlineAssessment: {
      duration: "90 Mins (Cognitive) + 45 Mins (Coding)",
      topics: "Analytical reasoning, English, Ms Office basics, networking, security, and 2 coding questions.",
      pattern: "Coding round has 2 questions. Common topics include array loops, string pattern counts, or binary operations."
    },
    interviewRounds: [
      { name: "TR & HR Interview", focus: "Brief discussion on academic projects, personal interests, internship learnings, and basic behavioral scenarios (teamwork, deadlocks)." }
    ],
    importantTopics: ["Technical MCQ (Networking, OS)", "Cognitive Reasoning", "Basic Coding Loops", "Academic Project Architecture", "Communication & Confidence"],
    preparationResources: [
      { name: "Accenture Preparation Kit", type: "article", url: "https://www.geeksforgeeks.org/accenture-recruitment-process/" }
    ],
    experiences: [
      {
        candidate: "Vikram S.",
        role: "Associate Software Engineer",
        year: "2025",
        verdict: "Selected",
        details: "Cognitive assessment is elimination-based. Coding round had two arrays-based questions (easy). The automated communication test checks grammar and speaking flow. The interview was combined TR/HR and felt like a casual project discussion."
      }
    ]
  },
  {
    id: "deloitte",
    name: "Deloitte",
    category: "Services",
    difficulty: "Easy-Medium",
    overview: "Leading consulting and advisory firm recruiting for Analyst, USI Consulting SDE, and tech advisors.",
    hiringProcess: [
      "Online Assessment (Aptitude + CS Fundamentals + English)",
      "Group Discussion (GD) or Jam Session (Select Profiles)",
      "Combined Technical & HR Interview"
    ],
    onlineAssessment: {
      duration: "90 Mins",
      topics: "Quantitative, logical, English comprehension, and MCQs on OS, DBMS, and Pseudocodes.",
      pattern: "Aptitude and basic software pseudocodes are heavily evaluated. Correct syntax dry-runs are tested."
    },
    interviewRounds: [
      { name: "TR & HR Interview", focus: "Walkthrough of resume, database queries (e.g. Group By, Having), Java fundamentals, and behavioral consulting scenarios (e.g. client management)." }
    ],
    importantTopics: ["Quantitative & Logical Reasoning", "Pseudocodes & Output prediction", "DBMS & Joins queries", "Consulting Situations (Behavioral)", "Communication Skills"],
    preparationResources: [
      { name: "Deloitte Placement Prep Guide", type: "article", url: "https://www.geeksforgeeks.org/deloitte-recruitment-process/" }
    ],
    experiences: [
      {
        candidate: "Anjali K.",
        role: "Analyst (USI)",
        year: "2025",
        verdict: "Selected",
        details: "Aptitude test had standard logical questions. Interviewer asked about final/finally/finalize keywords, abstract vs interface, and a query to find the second highest salary in SQL. Behavioral questions focused on handling demanding clients."
      }
    ]
  }
];
