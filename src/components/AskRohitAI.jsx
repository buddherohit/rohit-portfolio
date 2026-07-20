// src/components/AskRohitAI.jsx
import React from "react";
import { Bot } from "lucide-react";
import ChatAssistant from "./ChatAssistant";

const KB = [
  {
    keys: ["who is rohit", "tell me about rohit", "about rohit", "introduce", "yourself", "who are you", "background"],
    answer: "Rohit Buddhe is a B.Tech Computer Science & Design student at YCCE Nagpur (graduating 2027), with a prior Diploma in Computer Engineering.\n\nHe specialises in full-stack development and AI-powered applications — building systems that are used by thousands of real users. He's currently open to internships in AI/ML, full-stack, or backend engineering."
  },
  {
    keys: ["projects", "show projects", "what projects", "built", "made", "portfolio projects", "work"],
    answer: "Rohit's key projects:\n\n• DiplomaGPT — RAG-powered AI tutor for MSBTE exam prep (1,800+ active users)\n• MSBTE Job Portal — Career platform for 100k+ diploma students (5,000+ users)\n• AI Touchless Computer Control — Hand gesture OS control via OpenCV\n• Credex AI Audit — Financial anomaly detection with LangChain\n• Women Safety App — Android SOS + live GPS tracking\n• Smart Hostel Management System — Full-stack hostel ops platform\n\nEach project has a detailed case study — click 'View Projects' on the homepage."
  },
  {
    keys: ["diplomagpt", "diploma gpt", "rag", "msbte gpt", "ai tutor"],
    answer: "DiplomaGPT is Rohit's most advanced AI project — a RAG-powered chatbot tailored for MSBTE curriculum students.\n\nStack: React · Python FastAPI · LangChain · Gemini API · Pinecone Vector DB\n\nHow it works: 5 years of MSBTE model answer papers are chunked and vectorised into Pinecone (~22,000 chunks). Semantic search retrieves the closest solved answer, then Gemini formats it in MSBTE exam style.\n\nResults: 94.8% accuracy · <1.8s response time · 1,800+ active students\n\nLive at diplomagpt-ai.vercel.app"
  },
  {
    keys: ["skills", "technologies", "tech stack", "languages", "tools", "frameworks", "technical"],
    answer: "Rohit's technical skill set:\n\nLanguages — Java · JavaScript · Python · C++\nFrontend — React · Vite · Tailwind CSS · Framer Motion\nBackend — Node.js · Express · Spring Boot · FastAPI\nDatabases — MongoDB · MySQL · Firebase · Pinecone\nAI / ML — LangChain · OpenCV · MediaPipe · Gemini API · RAG\nInfra — Git · Docker · Vercel · Render · Android Studio\n\nStrongest in: full-stack JavaScript + AI/ML integration."
  },
  {
    keys: ["internship", "experience", "work", "cognifyz", "eduskills", "aiml", "job"],
    answer: "Professional experience:\n\n1. AIML Intern — EduSkills Academy\n   Remote · June 2026 – Present\n   Machine learning projects and AI curriculum work.\n\n2. Web Development Intern — Cognifyz Technologies\n   Remote · April – June 2026\n   Full-stack features with React and Node.js.\n\nRohit has also participated in multiple hackathons and contributes to open-source projects."
  },
  {
    keys: ["contact", "reach", "email", "hire", "connect", "linkedin", "github", "social"],
    answer: "How to reach Rohit:\n\nEmail — rohitbuddhe564@gmail.com\nGitHub — github.com/buddherohit\nLinkedIn — linkedin.com/in/rohit-buddhe-013aa5269\nLeetCode — leetcode.com/u/rohitbuddhe\n\nHe's actively seeking internship opportunities in AI/ML, full-stack, or backend roles. Based in Nagpur, India (IST) — available remote."
  },
  {
    keys: ["education", "college", "university", "ycce", "btech", "diploma", "degree"],
    answer: "Education:\n\nB.Tech — Computer Science & Design\nYCCE, Nagpur · 2023 – 2027\n\nDiploma — Computer Engineering\nCompleted before B.Tech\n\nThe 'Design' in his degree gives him a unique blend of engineering rigour and UX thinking."
  },
  {
    keys: ["java", "spring boot", "backend", "algorithms", "leetcode", "dsa"],
    answer: "Java is Rohit's strongest compiled language — used for:\n\n• Spring Boot REST API backends\n• Android app development\n• Data Structures & Algorithms (active on LeetCode)\n• Core backend services with JDBC/JPA\n\nHe also holds a Java Certificate from GeeksForGeeks."
  },
  {
    keys: ["hackathon", "open source", "competition", "awards", "achievements", "certificates"],
    answer: "Achievements:\n\n• Multiple state-level hackathon participant\n• Built tools actively used by thousands of students\n• Certifications: GFG Java · Oracle AI Fundamentals · Google Gen AI · IBM Machine Learning · AWS Cloud · Coursera Computer Vision & Data Analysis\n• Active open-source contributor on GitHub"
  },
  {
    keys: ["resume", "cv", "download"],
    answer: "Rohit's resume is available directly on the portfolio.\n\nClick 'View Resume' in the top navbar. An interactive PDF viewer opens where you can preview, download, or open it in a new tab.\n\nIt's kept current."
  },
  {
    keys: ["available", "role", "hire", "open to work", "internship opportunity", "looking for", "freelance"],
    answer: "Rohit is actively available for:\n\n✓ Internships — AI/ML · Full-Stack · Backend\n✓ Freelance Projects\n✓ Open Source Collaboration\n✓ Research Projects\n\nLocation: Nagpur, India (IST) · Can work remote\nContact: rohitbuddhe564@gmail.com"
  },
  {
    keys: ["msbte", "job portal", "career platform", "diploma students"],
    answer: "The MSBTE Job Portal is a specialised career platform for Maharashtra diploma graduates in Mechanical, Civil, Electrical, and Computer/IT branches.\n\nFeatures: branch-specific job filters · MSBTE academic verification · Quick-Apply with bio-data generation · Recruiter dashboard\n\nStats: 5,000+ active users · 45+ recruiters · 12,000+ verified applications\n\nLive at msbte-diploma-job-portal.vercel.app"
  }
];

const SUGGESTED = [
  "Who is Rohit?",
  "Show his projects",
  "What is DiplomaGPT?",
  "What technologies does he use?",
  "Tell me about his internships",
  "How can I contact him?"
];

export default function AskRohitAI() {
  return (
    <ChatAssistant
      avatarInitials="R"
      title="Ask Rohit AI"
      subtitle="Local AI · Always online"
      placeholder="Ask anything about Rohit..."
      initialMessage="Hi! I'm Rohit's AI assistant.\n\nAsk me anything about his projects, skills, experience, or how to reach him."
      suggestedQuestions={SUGGESTED}
      knowledgeBase={KB}
      fallbackAnswer={"I don't have information on that specific topic. Try asking about:\n\n• Rohit's projects\n• His technical skills\n• DiplomaGPT\n• How to contact him\n• His internship experience\n\nOr reach out directly at rohitbuddhe564@gmail.com"}
      triggerBgClass="from-red-600 to-pink-500 dark:from-amber-500 dark:to-orange-400"
      TriggerIcon={Bot}
      footerText="Local knowledge base · No external API"
    />
  );
}
