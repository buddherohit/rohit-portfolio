// src/data/developmentData.js

export const developmentTracks = [
  {
    id: "frontend",
    title: "Frontend",
    category: "Client Side",
    description: "Learn to build user interfaces using HTML, CSS, JavaScript, and modern layout/styling systems.",
    roadmap: [
      "HTML5 Semantics, Accessibility & SEO best practices",
      "CSS3 Layouts (Flexbox, Grid) & variables",
      "Modern JavaScript ES6+ (DOM, Async/Await, Fetch)",
      "Tailwind CSS & utility-first configurations",
      "Build tools (Vite, PostCSS) & npm packages"
    ],
    resources: [
      { name: "MDN Web Docs - Frontend", type: "article", url: "https://developer.mozilla.org/en-US/" },
      { name: "JavaScript.info - JS Mastery", type: "article", url: "https://javascript.info/" },
      { name: "Tailwind CSS Documentation", type: "docs", url: "https://tailwindcss.com/" }
    ],
    notes: [
      { title: "Semantic HTML", description: "Use tags like <main>, <article>, and <section> to improve accessibility and crawler indexings." },
      { title: "Asynchronous JS", description: "Master Promise chains, error handling in async/await, and API throttles." }
    ],
    recommendedProjects: [
      { name: "Interactive Portfolio Website", description: "Build a responsive grid portfolio with custom CSS themes and form integrations.", tech: ["HTML5", "Tailwind CSS", "JS"] },
      { name: "Crypto Tracker Dashboard", description: "Fetch real-time currency charts using Coingecko API and canvas rendering.", tech: ["JavaScript", "Vite", "ChartJS"] }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    category: "Server Side",
    description: "Understand servers, REST API development, server routing, security layers, and databases.",
    roadmap: [
      "HTTP/HTTPS Protocols, status codes, and headers",
      "RESTful API architectural patterns",
      "JSON Web Tokens (JWT) & cookie-based sessions",
      "Database connections & schema designs (SQL & NoSQL)",
      "Server-side security headers, CORS configs, and rate limits"
    ],
    resources: [
      { name: "Architecting Web APIs Guide", type: "article", url: "https://restfulapi.net/" },
      { name: "API Security Checklist", type: "cheat-sheet", url: "https://github.com/shieldfy/API-Security-Checklist" }
    ],
    notes: [
      { title: "Stateless Auth", description: "JWT tokens must be signed securely, stored in HttpOnly cookies, and checked in custom filters." }
    ],
    recommendedProjects: [
      { name: "Task Management Server", description: "Implement secure CRUD REST endpoints with JWT authorization and query filter logs.", tech: ["Node.js", "Express", "JWT"] },
      { name: "E-Commerce Gateway API", description: "Build API routing, request validation, and mock payment gateway processors.", tech: ["Backend API", "Swagger"] }
    ]
  },
  {
    id: "java-fullstack",
    title: "Java Full Stack",
    category: "Projects & Ops",
    description: "Connect enterprise-grade Java backends (Spring Boot) with reactive modern frontends (React).",
    roadmap: [
      "Core Java & Collections frameworks",
      "Spring Boot REST APIs & database integrations",
      "Object-Relational Mapping (Hibernate & Spring Data JPA)",
      "Vite React interface design & state synchronizations",
      "Unified builds, packaging (JAR/WAR), and environment variables"
    ],
    resources: [
      { name: "Spring Boot + React Architecture Guide", type: "article", url: "https://spring.io/guides/tutorials/react-and-spring-data-rest/" },
      { name: "Java Collections Cheat Sheet", type: "cheat-sheet", url: "https://www.geeksforgeeks.org/collections-in-java/" }
    ],
    notes: [
      { title: "Spring Security CORS", description: "Configure custom WebMvcConfigurer beans to permit React client queries on port 5173." }
    ],
    recommendedProjects: [
      { name: "Employee Directory Application", description: "Complete React dashboard retrieving profiles from a PostgreSQL-backed Spring Boot server.", tech: ["React", "Spring Boot", "JPA", "PostgreSQL"] }
    ]
  },
  {
    id: "react",
    title: "React",
    category: "Client Side",
    description: "Build reactive, component-driven single page applications (SPA) with hooks and states.",
    roadmap: [
      "Virtual DOM & reconciliation models",
      "Functional Components, props, and custom hooks (useState, useEffect)",
      "State Management (Context API, Redux Toolkit, or Zustand)",
      "React Router DOM configuration & lazy page loads",
      "Performance optimization (useMemo, useCallback, React.memo)"
    ],
    resources: [
      { name: "React 19 Official Documentation", type: "docs", url: "https://react.dev/" },
      { name: "React Hooks Reference Guide", type: "cheat-sheet", url: "https://react.dev/reference/react" }
    ],
    notes: [
      { title: "Virtual DOM diffs", description: "React uses keys to track node additions/deletions. Never use index as keys on dynamic lists." }
    ],
    recommendedProjects: [
      { name: "Personal Portfolio Hub", description: "Build a responsive React developer portfolio featuring lazy routing and smooth scroll animations.", tech: ["React", "Framer Motion", "Lenis"] },
      { name: "Kanban Board Workspace", description: "Create a productivity dashboard utilizing local storage persistence and drag-and-drop actions.", tech: ["React", "Zustand"] }
    ]
  },
  {
    id: "nodejs",
    title: "Node.js",
    category: "Server Side",
    description: "Event-driven asynchronous JavaScript runtime for high-performance server structures.",
    roadmap: [
      "Node.js Event Loop, V8 Engine, and thread pool execution",
      "File System module (fs) & streams for handling large files",
      "Express.js routing, middleware chains, and error catchers",
      "Asynchronous tasks with EventEmitter and callbacks",
      "Environment setup (.env) & configurations"
    ],
    resources: [
      { name: "Node.js Official Documentation", type: "docs", url: "https://nodejs.org/" },
      { name: "Express.js Routing Guide", type: "article", url: "https://expressjs.com/" }
    ],
    notes: [
      { title: "Event Loop Architecture", description: "JavaScript runs on a single thread. Avoid blocking CPU tasks inside server handlers." }
    ],
    recommendedProjects: [
      { name: "Real-time Chat Server", description: "Asynchronous messaging backend with WebSocket pipelines for active client chats.", tech: ["Node.js", "Express", "Socket.io"] }
    ]
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    category: "Server Side",
    description: "Enterprise Java framework designed to build secure, production-ready microservices.",
    roadmap: [
      "Dependency Injection & Inversion of Control (IoC)",
      "Spring MVC annotations (@RestController, @RequestMapping)",
      "Data layer configuration with Spring Data JPA & Hibernate",
      "REST exception handlers using @ControllerAdvice",
      "Secure endpoints setup with Spring Security & JWT filters"
    ],
    resources: [
      { name: "Spring Boot Official Guides", type: "docs", url: "https://spring.io/guides" },
      { name: "Baeldung Spring Boot Tutorials", type: "article", url: "https://www.baeldung.com/spring-boot" }
    ],
    notes: [
      { title: "Bean Scopes", description: "Understand difference between Singleton (default), Prototype, Request, and Session bean Lifecycles." }
    ],
    recommendedProjects: [
      { name: "Student Management Portal", description: "REST server managing registrations with Hibernate auditing, validators, and custom scopes.", tech: ["Spring Boot", "Spring Data JPA", "H2 Database"] }
    ]
  },
  {
    id: "mongodb",
    title: "MongoDB",
    category: "Database & System",
    description: "NoSQL document database designed for high scalability, flexible schemas, and JSON documents.",
    roadmap: [
      "Document database structure vs Relational tables",
      "Mongoose schema setups & dynamic schema model validations",
      "CRUD operations, aggregation pipelines, and text indexes",
      "Referencing documents (ObjectId) vs embedded subdocuments",
      "Sharding & replication basics for high availability"
    ],
    resources: [
      { name: "MongoDB University Learning Path", type: "docs", url: "https://learn.mongodb.com/" },
      { name: "Mongoose ODM Documentation", type: "docs", url: "https://mongoosejs.com/" }
    ],
    notes: [
      { title: "Normalization vs Denormalization", description: "Embed schemas for data that changes together; reference documents to avoid duplicate modifications." }
    ],
    recommendedProjects: [
      { name: "Social Media Database Model", description: "Design a NoSQL structure handling posts, replies, user tags, and activity streams.", tech: ["MongoDB", "Mongoose"] }
    ]
  },
  {
    id: "system-design",
    title: "System Design",
    category: "Database & System",
    description: "Architect scalable, reliable, and fault-tolerant software systems for interviews and production.",
    roadmap: [
      "Load balancing algorithms (Round Robin, Least Connections)",
      "Caching layers (Write-through, Write-back, LRU evictions)",
      "Database partitioning (Horizontal sharding, master-slave replicas)",
      "Message queues (Kafka, RabbitMQ) for asynchronous decoupling",
      "Consistent Hashing & CAP Theorem (Consistency, Availability, Partition)"
    ],
    resources: [
      { name: "System Design Primer GitHub Repo", type: "docs", url: "https://github.com/donnemartin/system-design-primer" },
      { name: "ByteByteGo System Design Basics", type: "video", url: "https://bytebytego.com/" }
    ],
    notes: [
      { title: "CAP Theorem Guide", type: "link", url: "#", description: "In a network partition, you must choose either Consistency (CP) or Availability (AP)." }
    ],
    recommendedProjects: [
      { name: "URL Shortener System Blueprint", type: "blueprint", description: "Design URL shortening service handling redirection logs, scale sharding, and caching.", tech: ["System Design", "Redis", "Hashing"] }
    ]
  },
  {
    id: "projects",
    title: "Projects",
    category: "Projects & Ops",
    description: "Tips on highlighting, structuring, and demonstrating projects in resume screening & technical reviews.",
    roadmap: [
      "Identifying unique problem statements (avoid simple todo apps)",
      "Writing clean modular code with readable structures",
      "Documenting code (README.md, architecture flows, setup guides)",
      "Handling API documentation using Swagger / Postman",
      "Adding Unit Tests & integration tests"
    ],
    resources: [
      { name: "Write Beautiful Readmes Guide", type: "docs", url: "https://readme.so/" }
    ],
    notes: [
      { title: "README checklist", description: "Your README must detail: Tech Stack, Installation steps, Architecture diagram, and API definitions." }
    ],
    recommendedProjects: [
      { name: "Women Safety Companion App", description: "Locational alerts, hardware triggers, and cloud backend databases.", tech: ["Python", "Flask", "SQLite"] }
    ]
  },
  {
    id: "deployment",
    title: "Deployment",
    category: "Projects & Ops",
    description: "Ship full-stack systems to staging or production using clouds, containers, and pipelines.",
    roadmap: [
      "Containerization basics using Docker & docker-compose configurations",
      "CI/CD pipelines automation (GitHub Actions, Netlify build flows)",
      "Static site hosting (Vercel, Netlify, GitHub Pages)",
      "Backend cloud hosting platforms (Render, Heroku, AWS EC2)",
      "Domain name mappings, SSL certifications (HTTPS), and logs"
    ],
    resources: [
      { name: "Docker Basics Tutorials", type: "article", url: "https://docs.docker.com/get-started/" },
      { name: "GitHub Actions Automations", type: "docs", url: "https://docs.github.com/en/actions" }
    ],
    notes: [
      { title: "Docker Containerization", description: "Create multi-stage Dockerfiles to minimize build asset sizes for production deployments." }
    ],
    recommendedProjects: [
      { name: "Dockerized App Deployment", description: "Containerize a React/Node app and deploy it on Render using GitHub Actions pipelines.", tech: ["Docker", "GitHub Actions", "Render"] }
    ]
  }
];
