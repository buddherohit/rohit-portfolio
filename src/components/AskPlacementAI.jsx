// src/components/AskPlacementAI.jsx
import React from "react";
import { Sparkles } from "lucide-react";
import ChatAssistant from "./ChatAssistant";

const KB = [
  {
    keys: ["dsa", "data structures", "algorithms", "binary search", "sorting", "complexity"],
    answer: "Data Structures & Algorithms (DSA) is the foundation of technical rounds:\n\n• **Core Areas**: Arrays, Strings, Linked Lists, Stacks, Queues, Binary Trees, Graphs, Heaps, and Dynamic Programming.\n• **Complexity**: Always target O(N) or O(log N) runtime and optimize space. Know dry-runs for sorting (Merge/Quick) and searching.\n• **Tip**: Focus on patterns (Two Pointers, Sliding Window, BFS/DFS, Topo Sort) rather than memorizing individual problems."
  },
  {
    keys: ["interview questions", "generate questions", "mock questions", "test me", "practice questions"],
    answer: "Here are high-frequency mock questions to prepare:\n\n1. **Technical**: 'How does HashMap handle collisions internally?', 'Explain React Virtual DOM diffing', 'Write a query to find the second highest salary'.\n2. **Behavioral**: 'Describe a time you solved a technical conflict under tight timelines', 'Tell me about a time you failed to deliver a project milestone'."
  },
  {
    keys: ["resume review", "review resume", "resume checklist", "auditing", "cv review"],
    answer: "Let's review your developer resume checklist:\n\n1. **Layout**: Keep it single-column, clean margins (0.5-1.0 inch), no text boxes or icons.\n2. **Metrics**: Quantify accomplishments (e.g. 'Optimized REST API query speed by 35%').\n3. **Formatting**: Start every bullet point with a strong action verb (e.g., 'Architected', 'Spearheaded').\n4. **Links**: Ensure clickable links for your GitHub, LinkedIn, and personal portfolio."
  },
  {
    keys: ["system design", "hld", "lld", "scalability", "caching", "load balancer"],
    answer: "System Design basics for junior engineers:\n\n• **Low-Level Design (LLD)**: Master OOP principles, SOLID guidelines, and design patterns (Singleton, Factory, Observer).\n• **High-Level Design (HLD)**: Understand horizontal scaling vs vertical scaling, CDNs for asset deliveries, Caching layers (Redis), and Load Balancers (Nginx) to distribute queries."
  },
  {
    keys: ["study plan", "suggest study plan", "preparation roadmap", "30 day plan"],
    answer: "Suggested 30-Day Placement Preparation Roadmap:\n\n• **Days 1-10**: Solve LeetCode Top 50 (Arrays, Strings, HashMaps, Trees). Review LaTeX resume layouts.\n• **Days 11-20**: Build 1 backend REST API project. Practice SQL queries (Joins, aggregations).\n• **Days 21-30**: Solve STAR behavioral templates, study JVM internals, and practice mock pitches."
  },
  {
    keys: ["java", "garbage collection", "jvm", "immutability", "oop"],
    answer: "Java Core Interview Checklist:\n\n• **OOP**: Encapsulation, Inheritance, Polymorphism, and Abstraction.\n• **JVM**: Heap vs Stack memory, Garbage Collection (Mark & Sweep in Eden/Survivor generations).\n• **Strings**: Immutability ensures String pool caching, security parameter locks, and thread safety."
  },
  {
    keys: ["react", "virtual dom", "hooks", "usememo", "usecallback"],
    answer: "React Client Interview Checklist:\n\n• **Virtual DOM**: Lightweight representation of real DOM; reconciles changes in O(N) using key and element diffing.\n• **Hooks**: useEffect (lifecycles), useMemo (memoize calculated values), useCallback (memoize function references to avoid child re-renders)."
  },
  {
    keys: ["sql", "dbms", "joins", "indexes", "acid", "normalization"],
    answer: "Database (DBMS) Interview Checklist:\n\n• **ACID**: Atomicity, Consistency, Isolation, Durability (ensures safe transactional states).\n• **Indexes**: Clustered index (orders physical table rows, one per table) vs Non-Clustered index (orders pointer nodes).\n• **Joins**: INNER, LEFT, RIGHT, and FULL outer matching operations."
  },
  {
    keys: ["os", "operating system", "process vs thread", "virtual memory", "paging"],
    answer: "Operating Systems (OS) Interview Checklist:\n\n• **Process vs Thread**: A process is an independent execution environment with its own memory; a thread is a lightweight segment of a process sharing code and data segments.\n• **Virtual Memory**: Maps physical memory to virtual address blocks using Paging and page fault swaps."
  },
  {
    keys: ["cn", "networks", "tcp vs udp", "dns", "http", "osi layers"],
    answer: "Computer Networks (CN) Interview Checklist:\n\n• **TCP vs UDP**: TCP is connection-oriented, reliable, and uses 3-way handshakes. UDP is connectionless, fast, and does not guarantee packet arrivals (best for video streams).\n• **OSI Layers**: Physical, Data Link, Network, Transport, Session, Presentation, Application layers."
  }
];

const SUGGESTED = [
  "Explain DSA concepts",
  "Generate interview questions",
  "Review my resume checklist",
  "Explain System Design scalability",
  "Suggest a placement study plan",
  "Review Java & React FAQs"
];

export default function AskPlacementAI() {
  return (
    <ChatAssistant
      avatarInitials="P"
      title="Ask Placement AI"
      subtitle="Placement Mentor · Always online"
      placeholder="Ask about DSA, Java, SQL, System Design..."
      initialMessage="Hi! I'm your AI Placement Mentor.\n\nAsk me to explain data structures, generate mock questions, review your resume, or explain core CS subjects."
      suggestedQuestions={SUGGESTED}
      knowledgeBase={KB}
      fallbackAnswer={"I don't have information on that specific concept. Try asking about:\n\n• DSA concepts & complexities\n• Interview Questions (technical/HR)\n• Resume reviews\n• System Design (caching/scaling)\n• CS Fundamentals (Java, React, SQL, OS, CN)"}
      triggerBgClass="from-emerald-600 to-teal-500 dark:from-emerald-500 dark:to-teal-400"
      TriggerIcon={Sparkles}
      footerText="Placement Mentor AI · Keep preparing! 🚀"
    />
  );
}
