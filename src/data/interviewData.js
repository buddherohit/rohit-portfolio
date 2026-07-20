// src/data/interviewData.js

export const resumeData = {
  builder: {
    title: "Resume Builder",
    description: "Access curated LaTeX templates, markdown frameworks, and instructions to build a premium developer CV.",
    downloadUrl: "/templates/rohit-cv-template.tex",
    fileType: "LaTeX",
    steps: [
      "Select a clean, single-column layout (avoid multi-column ATS parser blocks).",
      "Draft clear bullet points using the Google X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z].",
      "Compile using Overleaf or local LaTeX engines to ensure perfect alignment and fonts.",
      "Export as a flat PDF without vector graphics or embedded forms."
    ]
  },
  atsGuide: {
    title: "ATS Resume Guide",
    description: "Ensure your resume parses perfectly through Applicant Tracking Systems (ATS) used by major product companies.",
    downloadUrl: "/guides/ats_compliance_handbook.pdf",
    fileType: "PDF",
    rules: [
      { rule: "Format Layout", detail: "Use a clean, single-column design. Avoid text boxes, tables, headers/footers, and complex graphics." },
      { rule: "Font Stack", detail: "Use standard web fonts like Inter, Arial, or Georgia. Avoid decorative custom fonts." },
      { rule: "Keywords Integration", detail: "Incorporate exact skill terms (e.g., 'Spring Boot', 'REST APIs', 'React') matching the job post." },
      { rule: "Section Titles", detail: "Stick to standard titles: 'Experience', 'Education', 'Projects', 'Skills'. Avoid 'Where I've Been'." },
      { rule: "File Type", detail: "Always upload as a PDF unless explicitly asked for a DOCX. Keep it text-searchable." }
    ]
  },
  checklist: [
    { id: "c1", label: "Contact Info", detail: "Email, Phone, Location (City, State), LinkedIn, and GitHub links are verified and clickable.", category: "Personal" },
    { id: "c2", label: "Single Page Limit", detail: "Content fits on exactly one page. Margins are between 0.5 to 1.0 inch.", category: "Layout" },
    { id: "c3", label: "Action Verbs First", detail: "Every experience and project bullet starts with a strong action verb (e.g., 'Architected', 'Optimized').", category: "Content" },
    { id: "c4", label: "Metrics & Outcomes", detail: "At least 60% of experience bullets contain quantifiable metrics (e.g., 'boosted speed by 40%').", category: "Content" },
    { id: "c5", label: "ATS Keywords Check", detail: "Keywords from the target job descriptions are organically integrated into the Skills & Experience blocks.", category: "Keywords" },
    { id: "c6", label: "Clickable Project Links", detail: "All listed projects include live demo links or source code repository links.", category: "Layout" },
    { id: "c7", label: "No Typos or Slang", detail: "Spelling, grammar, and formal wording have been verified multiple times.", category: "Content" }
  ]
};

export const interviewData = {
  hr: {
    title: "HR Interview Questions",
    downloadUrl: "/guides/hr_faq_vault.pdf",
    questions: [
      {
        q: "Tell me about yourself.",
        a: "Summarize your career chronologically using the Present-Past-Future formula. Talk about your current internship/role, key technical milestones from your past projects, and why you are excited about this specific opportunity.",
        tip: "Keep it under 90 seconds. Focus on achievements rather than listing classes."
      },
      {
        q: "Why should we hire you?",
        a: "Align your skills directly with the job description. Emphasize your fast learning ability (e.g., building a GenAI workspace, mastering Java Full Stack), your internship experience, and how you can add value immediately.",
        tip: "Be confident and cite a specific project where you solved a similar problem."
      },
      {
        q: "What are your strengths and weaknesses?",
        a: "For strengths, select something technical/professional (e.g., problem solving, architectural design) and give a brief example. For weaknesses, state a genuine area of improvement (e.g., public speaking or taking on too much responsibility) and immediately explain how you are actively addressing it.",
        tip: "Never say 'I have no weaknesses' or 'I am a perfectionist'."
      }
    ]
  },
  java: {
    title: "Java Interview Questions",
    downloadUrl: "/cheatsheets/java_oop_concepts.pdf",
    questions: [
      {
        q: "Why is String immutable in Java?",
        a: "Immutability ensures security (parameters passing), caching in the String Pool (saving heap memory), thread safety (multiple threads can read safely), and secure hashing (HashMap keys don't change values).",
        tip: "Be prepared to explain how the JVM Heap handles the String Constant Pool."
      },
      {
        q: "Explain Garbage Collection and how it works in JVM.",
        a: "JVM automatically reclaims memory by identifying unused objects. It uses a Mark-and-Sweep algorithm across three main generations: Young Generation (Eden, S0, S1), Old Generation, and Permanent Generation (Metaspace). Objects that survive minor GC collections are promoted to the Old Generation.",
        tip: "Explain System.gc() only suggests collection but doesn't guarantee immediate execution."
      },
      {
        q: "What is the difference between fail-fast and fail-safe iterators?",
        a: "Fail-fast iterators (e.g., ArrayList, HashMap) throw a ConcurrentModificationException if the collection is structurally modified during iteration. Fail-safe iterators (e.g., CopyOnWriteArrayList, ConcurrentHashMap) iterate over a copy of the collection, avoiding exceptions.",
        tip: "Relate this to multithreaded environments and copy-on-write overheads."
      }
    ]
  },
  react: {
    title: "React Interview Questions",
    downloadUrl: "/cheatsheets/react_core_concepts.pdf",
    questions: [
      {
        q: "How does the Virtual DOM work in React?",
        a: "React creates a lightweight in-memory representation of the real DOM. When states change, React generates a new Virtual DOM tree, compares it with the previous tree using a diffing algorithm (Reconciliation), and batch updates only the changed nodes in the real DOM.",
        tip: "Explain that diffing has O(N) complexity due to assumptions about element keys and types."
      },
      {
        q: "What is the difference between useMemo and useCallback?",
        a: "useMemo caches the *result* of an expensive calculation, whereas useCallback caches the *instance* of a function itself between component re-renders.",
        tip: "Mention that unnecessary usage can consume extra memory for closures, so use them only when child props depend on reference identity."
      }
    ]
  },
  springBoot: {
    title: "Spring Boot Interview Questions",
    downloadUrl: "/cheatsheets/spring_boot_cheat_sheet.pdf",
    questions: [
      {
        q: "What is Dependency Injection (DI) and how does IoC Container handle it?",
        a: "Dependency Injection is a design pattern where object dependencies are supplied rather than created inside the class. The Inversion of Control (IoC) Container manages bean lifecycles, instantiates dependencies, and injects them using @Autowired (Constructor, Setter, or Field injection).",
        tip: "Constructor injection is recommended as it allows final fields and easier unit testing."
      },
      {
        q: "Explain @Transactional annotation and propagation behaviors.",
        a: "The @Transactional annotation automates database transaction boundaries. Propagation options (like REQUIRED, REQUIRES_NEW) specify how nested transactional calls behave (e.g., joining an existing transaction or starting a new independent one).",
        tip: "Explain that transactions fail to trigger on self-invocation due to Spring Proxy interceptors."
      }
    ]
  },
  sql: {
    title: "SQL Interview Questions",
    downloadUrl: "/cheatsheets/sql_indexes_joins.pdf",
    questions: [
      {
        q: "What is the difference between Clustered and Non-Clustered Indexes?",
        a: "A Clustered Index determines the physical order of data storage in tables (one per table, usually Primary Key). A Non-Clustered Index stores a separate structure with pointers back to physical rows (multiple per table allowed).",
        tip: "B-Tree data structures are typically used behind indexes. Explain lookup speeds versus insert overheads."
      },
      {
        q: "Explain different types of Joins in SQL.",
        a: "INNER JOIN returns matching rows in both tables. LEFT JOIN returns all rows from left table and matching rows from right. RIGHT JOIN is the inverse of LEFT. FULL JOIN returns rows when there is a match in either table.",
        tip: "Practice writing brief queries on matching foreign keys to demonstrate clarity."
      }
    ]
  },
  behavioral: {
    title: "Behavioral Questions (STAR Method)",
    downloadUrl: "/guides/star_behavioral_workbook.pdf",
    questions: [
      {
        q: "Describe a time you faced a technical conflict in a group project.",
        a: "Structure your answer using the STAR method: S (Situation), T (Task), A (Action), R (Result). Explain the conflict (e.g., choosing React vs pure JS), your analytical step to compare benchmarks, the cooperative discussion, and the successful timely delivery of the project.",
        tip: "Focus on facts and compromise rather than portraying anyone negatively."
      },
      {
        q: "Tell me about a time you failed to meet a project deadline.",
        a: "Explain a situation where a bottleneck occurred (unforeseen API changes). Discuss the actions you took: immediately informing stakeholders, restructuring tasks, working extra hours, and shipping a clean product shortly after. Conclude with the lessons learned on timeline estimation.",
        tip: "Be honest. Focus on accountability and proactive communication."
      }
    ]
  },
  communication: {
    title: "Communication Tips & Elevator Pitch",
    downloadUrl: "/guides/elevator_pitch_template.pdf",
    tips: [
      { title: "The 30-Second Elevator Pitch", detail: "Briefly outline: 1) Who you are (Full-stack developer student), 2) What you specialize in (Java, Spring Boot, React), 3) A notable project outcome, and 4) What you seek (Full-time software engineering roles)." },
      { title: "Active Listening", detail: "During technical interviews, listen to the complete question and write down key parameters. Clarify assumptions before writing code." },
      { title: "Think Out Loud", detail: "During coding rounds, vocalize your thoughts. Interviewers evaluate your approach, reasoning, and problem-solving flow, not just syntax." },
      { title: "The STAR Framework", detail: "When answering situational questions, explicitly break down your response: Situation -> Task -> Action -> Result." }
    ]
  }
};
