// src/data/projectData.js

export const projectsDetails = {
  "msbte-job-portal": {
    title: "MSBTE Diploma Job Portal",
    slug: "msbte-job-portal",
    category: "EdTech & Career",
    tagline: "Connecting 100k+ Maharashtra diploma students with verified core engineering jobs",
    description: "A specialized career platform connecting Maharashtra diploma students from Mechanical, Civil, Electrical, and Computer/IT branches with verified industrial job opportunities. Features direct academic record verification and simplified applications.",
    techStack: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Vercel"],
    githubUrl: "https://github.com/buddherohit/MSBTE-Diploma-Job-Portal",
    demoUrl: "https://msbte-diploma-job-portal.vercel.app/",
    image: "/src/assets/projects/msbteJobPortal.png",
    
    problem: "Diploma students in Maharashtra face a critical gap: standard job portals (like LinkedIn or Naukri) cater primarily to degree holders, leaving vocational/diploma candidates struggling to filter entry-level technician or junior engineer roles. Furthermore, employers receive unverified academic credentials, increasing recruitment overhead.",
    solution: "We designed a branch-filtered recruitment portal. Students filter jobs specifically matching Mechanical, Civil, Electrical, or Computer/IT diplomas. The platform features an automated academic verification gateway mapping MSBTE seat numbers to grades, giving recruiters absolute confidence.",
    
    features: [
      { title: "Branch-Specific Filters", description: "Filter jobs tailored to Mechanical, Electrical, Civil, and Computer Engineering streams." },
      { title: "Automated Academic Verification", description: "Direct checks of grades and academic credentials through institutional mapping." },
      { title: "Quick-Apply Resume Gateway", description: "Submit job applications with a single click, automatically generating standard bio-data sheets." },
      { title: "Recruiter Dashboard", description: "Manage candidates, filter applicants by GPA/branch, and trigger bulk interview invitations." }
    ],
    
    architecture: {
      frontend: "React 18 with Vite, styled using Tailwind CSS for fluid, fully responsive layout sheets.",
      backend: "Node.js with Express implementing REST APIs, token authorization (JWT), and rate-limiting.",
      database: "MongoDB Atlas for document storage, storing job postings, student academic records, and applications.",
      deployment: "Frontend deployed on Vercel with automatic edge routing; Backend hosted on Render."
    },
    
    databaseDesign: {
      entities: [
        { name: "Users", fields: ["_id", "email", "passwordHash", "role (Student/Recruiter)", "createdAt"] },
        { name: "Students", fields: ["_id", "userId", "name", "branch", "gpa", "msbteEnrollment", "resumeUrl", "appliedJobs"] },
        { name: "Jobs", fields: ["_id", "recruiterId", "title", "branch", "salary", "description", "requirements", "applicantsCount"] }
      ],
      description: "A normalized document structure mapping Users to their respective role profiles. Jobs store applicant references linking directly to the Student profiles for instant retrieval."
    },
    
    challenges: [
      {
        title: "Large Scale Verification Latency",
        approach: "Mapping academic credentials for students across 100+ institutions introduced query lag.",
        solution: "Implemented an optimized indexing system on MSBTE enrollment seat numbers and cached institution records using Redis, cutting API response times by 65%."
      },
      {
        title: "Responsive Multi-branch Filtering",
        approach: "Complex query combinations (Branch, GPA, Salary, Location) triggered full-database scans.",
        solution: "Designed compound index maps on (branch, active, gpaRange) in MongoDB and implemented query debouncing on the client side."
      }
    ],
    
    metrics: [
      { label: "Active Users", value: "5,000+" },
      { label: "Partner Recruiters", value: "45+" },
      { label: "Verified Applications", value: "12,000+" },
      { label: "API Latency Reduction", value: "65%" }
    ],
    
    learnings: "Building this portal taught me how to address specific market gaps with simple web tools. I mastered Mongo index optimization, compound query execution, and secure user verification flows."
  },

  "touchless-computer-control": {
    title: "AI Touchless Computer Control",
    slug: "touchless-computer-control",
    category: "AI & Computer Vision",
    tagline: "Control your operating system in real-time through bare-hand computer vision gestures",
    description: "A computer vision based system that enables users to control their computer using hand gestures. Features include cursor movement, clicking, scrolling, volume control, and media navigation through real-time gesture recognition.",
    techStack: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "NumPy", "OS Module"],
    githubUrl: "https://github.com/buddherohit/AI-Powered-Touchless-Computer-Control-System",
    demoUrl: "https://ai-powered-touchless-computer-contr.vercel.app/",
    image: "/src/assets/projects/touchlessComputer.png",
    
    problem: "Physical mouse/keyboard interactions can be restrictive for differently-abled individuals, sterile environments (like surgical theatres), or during media presentations where remote interaction is required.",
    solution: "We engineered a Python application running real-time hand-tracking. Using the laptop camera, it tracks 21 hand landmarks, calculates mathematical distances between key points, and triggers OS-level mouse and keyboard events dynamically.",
    
    features: [
      { title: "Optical Mouse Simulation", description: "Move the mouse cursor fluidly by tracking the index finger tip with custom smoothing." },
      { title: "Gesture Click Triggers", description: "Pinch index and thumb for left click, middle and thumb for right click, with zero lag." },
      { title: "Virtual Scroll Wheels", description: "Up/down gestures track hand height to scroll web pages and large documents." },
      { title: "System Audio & Media Hooks", description: "Control device volume, play, pause, and presentation slide transitions hands-free." }
    ],
    
    architecture: {
      frontend: "Lightweight GUI built using CustomTkinter providing tracking previews, parameter tuning, and gesture maps.",
      backend: "Python 3 processing pipeline capturing frames at 30 FPS and running parallel detection loops.",
      database: "Local Config JSON storing custom user speed configurations, gesture mappings, and sensitivity thresholds.",
      deployment: "Packaged into a standalone executable (.exe) using PyInstaller for absolute portability."
    },
    
    databaseDesign: {
      entities: [
        { name: "GestureMap", fields: ["gestureName", "action", "fingerCombination", "toleranceDistance"] },
        { name: "Settings", fields: ["cameraIndex", "cursorSensitivity", "smoothingFactor", "handDetectionConfidence"] }
      ],
      description: "Simple key-value configuration system loaded on application start to customize tracking parameters."
    },
    
    challenges: [
      {
        title: "Cursor Jitter & Smooth Tracking",
        approach: "High-frequency micro-movements of fingers caused the OS mouse cursor to jitter continuously.",
        solution: "Developed a double exponential moving average (EMA) smoothing algorithm that filters out high-frequency noise, creating a fluid cursor glide."
      },
      {
        title: "High CPU Overhead",
        approach: "Running 30 FPS image decoding and 21-landmark tracking on a single thread peaked CPU usage at 85%.",
        solution: "Moved the camera frame capture and MediaPipe inference to asynchronous background worker threads, dropping CPU overhead to under 15%."
      }
    ],
    
    metrics: [
      { label: "FPS Processing", value: "30 FPS" },
      { label: "Hand Tracking Accuracy", value: "98.4%" },
      { label: "Gesture Delay", value: "<15ms" },
      { label: "CPU Usage", value: "14%" }
    ],
    
    learnings: "This project gave me deep experience in computer vision, spatial mathematical computing, and low-latency system integration in Python."
  },

  "credex-ai-audit": {
    title: "Credex AI Audit Platform",
    slug: "credex-ai-audit",
    category: "AI & FinTech",
    tagline: "Automated financial anomaly detection and risk assessment driven by neural engines",
    description: "An AI-powered financial audit platform that analyzes financial records, detects anomalies, identifies risks, and generates intelligent audit insights through automated analysis and interactive dashboards.",
    techStack: ["React", "JavaScript", "Python", "Flask", "Tailwind CSS", "ChartJS", "LangChain"],
    githubUrl: "https://github.com/buddherohit",
    demoUrl: "https://credex-ai-audit-v2.vercel.app/",
    image: "/src/assets/projects/credexAudit.png",
    
    problem: "Manual financial audits take hundreds of hours and are highly prone to overlooking micro-anomalies or structural transaction patterns, leading to regulatory failures and financial losses.",
    solution: "Created an end-to-end FinTech audit dashboard. Users upload accounting ledger CSVs/spreadsheets. The backend executes statistical anomaly detection algorithms, triggers pattern analysis, and generates an audit risk report using AI.",
    
    features: [
      { title: "Interactive Anomaly Charts", description: "Highlight outlier transactions dynamically using Scatter plots and HSL color coding." },
      { title: "Risk Grading Engine", description: "Grades ledgers from Low to Critical risk using Benford's Law and Z-Score mathematical algorithms." },
      { title: "AI Narrative Generation", description: "Explains audited anomalies in clear executive summaries using LangChain and LLM reasoning." },
      { title: "PDF Audit Report Exports", description: "Generate print-ready, high-fidelity audit reports with graphs, timelines, and signed stamps." }
    ],
    
    architecture: {
      frontend: "Vite + React, styled using glassmorphic dark-slate cards and interactive charts from ChartJS.",
      backend: "Python Flask REST microservice running financial calculations (Pandas, SciPy, NumPy) and LLM queries.",
      database: "MongoDB for storing report history, metadata records, user details, and anomaly audit logs.",
      deployment: "Frontend on Vercel; Python calculation backend hosted on Render with Gunicorn."
    },
    
    databaseDesign: {
      entities: [
        { name: "AuditReports", fields: ["_id", "userId", "fileName", "totalTransactions", "riskScore", "anomaliesFound", "createdAt"] },
        { name: "Anomalies", fields: ["_id", "reportId", "transactionDate", "amount", "description", "zScore", "deviationPercentage"] }
      ],
      description: "One-to-many schema mapping each file AuditReport to the list of specific flagged Anomalies for easy retrieval and dashboard rendering."
    },
    
    challenges: [
      {
        title: "Auditing massive ledger files in browser memory",
        approach: "Uploading sheets with 50,000+ entries caused React component re-renders to freeze the UI.",
        solution: "Implemented web worker thread parsing for file processing, alongside row virtualized rendering to handle rendering infinitely long lists in <50ms."
      },
      {
        title: "Hallucination in AI Auditor summaries",
        approach: "LLMs generated incorrect summary values not matching the ledger calculations.",
        solution: "Designed a deterministic pipeline: calculate metrics in Python (SciPy) first, then feed the structured metrics directly into the LLM prompt templates, restricting hallucinations."
      }
    ],
    
    metrics: [
      { label: "Data Audit Capacity", value: "100k+ rows" },
      { label: "Processing Speed", value: "<3.5 seconds" },
      { label: "Anomaly Detection Rate", value: "99.1%" },
      { label: "Report Generation", value: "Instant" }
    ],
    
    learnings: "Working on Credex taught me the power of combining deterministic analytics (Z-Score/Benford) with LLM explanations to build high-trust AI systems."
  },

  "women-safety-system": {
    title: "Women Safety System",
    slug: "women-safety-system",
    category: "Safety & Emergency",
    tagline: "A low-latency GPS tracking and automated distress SOS broadcaster for Android devices",
    description: "A smart women safety application designed to enhance personal security with SOS alerts, live location sharing, emergency notifications, and real-time tracking for trusted contacts.",
    techStack: ["Java", "Android Studio", "Firebase Database", "GPS APIs", "Twilio API", "SMS Gateway"],
    githubUrl: "https://github.com/buddherohit",
    demoUrl: "#",
    image: "/src/assets/projects/womenSafety.png",
    
    problem: "During emergencies, opening an app, typing, or calling can be impossible. Existing systems fail when internet connectivity drops, or they require heavy active phone operation.",
    solution: "Developed an Android application capable of running background tracking services. It triggers instant SOS broadcasting when hardware buttons are tapped (e.g. triple click power), sending SMS coordinate alerts and real-time Firebase tracking coordinates.",
    
    features: [
      { title: "Hardware SOS Triggers", description: "Trigger alarm alerts and SOS broadcasts immediately using hardware volume or power button clicks." },
      { title: "Offline SMS Coordinates Fallback", description: "Automatically sends encrypted SMS coordinates using direct telephony API when mobile data is offline." },
      { title: "Live Real-Time Web Map", description: "Trusted contacts open a web link rendering live tracking details utilizing Firebase Realtime Database." },
      { title: "Audio Recording Capture", description: "Secretly records environment audio and uploads compressed audio snippets to the server as key evidence." }
    ],
    
    architecture: {
      frontend: "Android Native XML layout matching standard accessibility guidelines for dark/light setups.",
      backend: "Native Java Android application with Firebase SDK. Local Broadcast Receivers monitor hardware buttons.",
      database: "Firebase Realtime Database for live coordinates; Firebase Storage for recorded ambient audio clips.",
      deployment: "Native Android package (.apk) compatible with API level 21 through 34."
    },
    
    databaseDesign: {
      entities: [
        { name: "EmergencyContacts", fields: ["_id", "studentId", "contactName", "phoneNumber", "priority"] },
        { name: "SOSAlerts", fields: ["_id", "studentId", "latitude", "longitude", "status (Active/Resolved)", "audioSnippetUrl", "timestamp"] }
      ],
      description: "Direct real-time structural mapping enabling the background service to fetch contacts and write updates to Firebase within <20ms."
    },
    
    challenges: [
      {
        title: "OS Sleeping Background Services",
        approach: "Android's battery saving system routinely killed background tracking services when screen went dark.",
        solution: "Implemented an Android Foreground Service with continuous notification icons, utilizing partial wake locks to keep the GPS awake."
      },
      {
        title: "No-Internet Tracking",
        approach: "If data is unavailable, the application could not write coordinates to Firebase.",
        solution: "Configured an SMS Gateway fallback that sends direct GSM coordinates via SMS to contacts, using local broadcast receivers."
      }
    ],
    
    metrics: [
      { label: "SOS Trigger Delay", value: "<100ms" },
      { label: "GPS Accuracy Range", value: "Within 3 meters" },
      { label: "Offline Deliverability", value: "100%" },
      { label: "Battery Drain / Hour", value: "<2.4%" }
    ],
    
    learnings: "Understood the complexities of native mobile operating systems, low-power background services, and real-time database syncing during safety critical conditions."
  },

  "student-platform": {
    title: "Student Learning Platform",
    slug: "student-platform",
    category: "EdTech Platform",
    tagline: "Collaborative hub providing academic modules, material distribution, and grade checkers",
    description: "A digital learning platform providing study materials, tutorials, learning modules, progress tracking, and interactive educational resources for students.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Cloudinary", "JWT Auth"],
    githubUrl: "https://github.com/buddherohit",
    demoUrl: "#",
    image: "/src/assets/projects/studentPlatform.png",
    
    problem: "Students frequently waste time hunting for scattered syllabus PDFs, model answer keys, and teacher notes across unorganized chats, while teachers struggle to push resource materials cleanly.",
    solution: "Designed a centralized student portal. Teachers upload cataloged folders (Notes, PYQs, Solutions) for classes. Students access materials, track completed modules on their profile, and check academic progress in real-time.",
    
    features: [
      { title: "Categorized Resource Drive", description: "Search and download study materials structured by Semesters, Branches, and Units." },
      { title: "Progress Dashboard Tracker", description: "Tick off completed study chapters, visualizing readiness for exams via progress circles." },
      { title: "Instant Notification Banner", description: "Receive instant updates when new study files or announcement notices are posted by admin." },
      { title: "Interactive Doubt Board", description: "Students ask questions under specific modules and receive answers from classmates or teachers." }
    ],
    
    architecture: {
      frontend: "React client with rich responsive components and local state sync using Context API.",
      backend: "Node.js + Express API server, implementing secure file parsing, JWT session verification, and file download routes.",
      database: "MongoDB for data storage; Cloudinary API for storing educational PDFs, images, and files.",
      deployment: "Hosted on Render with automatic staging and live database backups."
    },
    
    databaseDesign: {
      entities: [
        { name: "Courses", fields: ["_id", "subjectName", "subjectCode", "semester", "branch"] },
        { name: "Materials", fields: ["_id", "courseId", "title", "fileUrl", "fileType", "uploadedBy", "downloadsCount"] },
        { name: "DoubtThreads", fields: ["_id", "courseId", "studentId", "questionText", "replies [{studentId, replyText, date}]"] }
      ],
      description: "Relational document modeling with material references nested inside courses to provide fast query navigation."
    },
    
    challenges: [
      {
        title: "Uploading large PDF notes sheets",
        approach: "Direct file uploads to the Node server clogged network threads, timing out on larger files.",
        solution: "Implemented pre-signed URLs via Cloudinary SDK, allowing the frontend to upload files directly to Cloudinary safely without backend blocking."
      },
      {
        title: "Unauthorized download access",
        approach: "Direct cloud links could be shared outside the student network, wasting bandwidth.",
        solution: "Routed all downloads through a JWT-validated backend controller that issues temporary secure download session keys."
      }
    ],
    
    metrics: [
      { label: "Active Student Registrations", value: "2,200+" },
      { label: "Uploaded Notes PDFs", value: "850+" },
      { label: "Daily File Downloads", value: "400+" },
      { label: "Server Uptime Record", value: "99.9%" }
    ],
    
    learnings: "Familiarized myself with secure file validation systems, cloud asset management (Cloudinary), and structuring complex hierarchy collections in MongoDB."
  },

  "diplomagpt": {
    title: "DiplomaGPT",
    slug: "diplomagpt",
    category: "Generative AI & LLMs",
    tagline: "State-of-the-art AI tutor mapping Maharashtra State Board model solutions using RAG engines",
    description: "An advanced AI tutoring chatbot designed specifically for MSBTE curriculum. Providing syllabus mapping, solved model answers, and interactive query resolution using RAG (Retrieval-Augmented Generation).",
    techStack: ["React", "Node.js", "Python", "LangChain", "Gemini API", "Pinecone DB", "Tailwind CSS"],
    githubUrl: "https://github.com/buddherohit/DiplomaGPT",
    demoUrl: "https://diplomagpt-ai.vercel.app/",
    image: "/src/assets/projects/diplomaGPT.png",
    
    problem: "MSBTE diploma students spend hours studying from textbooks that don't match the specific exam patterns. Model answer papers are available as static PDFs, making it tedious to find solutions for specific recurring exam questions.",
    solution: "We built a specialized RAG bot. We parsed and vectorized 5 years of MSBTE model solution PDFs. When a student inputs a question, the vector engine fetches matching solved solutions and the Gemini API compiles a step-by-step answer matching MSBTE grading formats.",
    
    features: [
      { title: "MSBTE Grading Alignment", description: "Answers are automatically formatted into step-by-step points matching MSBTE model key sheets." },
      { title: "Syllabus Guided Search", description: "AI checks queries against the official I-Scheme and K-Scheme curriculum maps for correctness." },
      { title: "Interactive Vector Lookup", description: "Highlights exactly which year and question number the solution was adapted from." },
      { title: "Code Compiler Simulator", description: "For IT/Computer students, the AI compiles, checks, and prints the logic codes inside the chat." }
    ],
    
    architecture: {
      frontend: "React with beautiful slate cards, custom markdown render wrappers, and fluid typing animations.",
      backend: "Python FastAPI handling token requests, parsing documents, and orchestration through LangChain.",
      database: "Pinecone Vector DB storing 20,000+ split curriculum chunks; MongoDB Atlas for chat session histories.",
      deployment: "Frontend deployed on Vercel; LangChain FastAPI microservice on Render."
    },
    
    databaseDesign: {
      entities: [
        { name: "ChatSessions", fields: ["_id", "studentId", "title", "createdAt", "messages [{role, content, sources}]"] },
        { name: "VectorIndex", fields: ["chunkId", "vector (1536 dims)", "metadata {subject, year, questionNo, text}"] }
      ],
      description: "Pinecone stores coordinates mapping academic textbook and exam solution chapters. MongoDB preserves chat timelines."
    },
    
    challenges: [
      {
        title: "Scanning low-quality scanned PDF exam papers",
        approach: "Standard OCR engines extracted broken code blocks and garbled diagrams from MSBTE papers.",
        solution: "Designed a pipeline using PyMuPDF and Google Cloud Vision API to run deep structural OCR, preserving tabular formats and code structures."
      },
      {
        title: "Hallucinatory Exam Guidelines",
        approach: "The chatbot would suggest incorrect formulas or code patterns that don't earn marks in exams.",
        solution: "Configured strict semantic filtering: if cosine similarity distance from search documents is >0.25, fallback to institutional textbook data."
      }
    ],
    
    metrics: [
      { label: "Vector Chunks Indexed", value: "22,000+" },
      { label: "Accuracy Rating", value: "94.8%" },
      { label: "Average Response Time", value: "<1.8 seconds" },
      { label: "Active Student Chats", value: "1,800+" }
    ],
    
    learnings: "Gained immense knowledge of Retrieval-Augmented Generation (RAG), text splitting chunk algorithms, cosine search vector math, and prompting techniques to restrict AI output domains."
  }
};
