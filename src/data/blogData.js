// src/data/blogData.js

export const blogPosts = [
  {
    id: 1,
    slug: "how-i-built-diplomagpt",
    title: "How I Built DiplomaGPT: An AI Tutor for Maharashtra Diploma Students",
    excerpt: "Behind the scenes of building a high-accuracy, MSBTE grading-aligned RAG chatbot with LangChain, Pinecone, and Gemini API.",
    category: "AI",
    tags: ["Generative AI", "RAG", "LangChain", "Vector DB", "Python"],
    date: "Jun 15, 2026",
    readTime: "6 min read",
    featured: true,
    image: null,
    content: `
## Introduction
As diploma students in Maharashtra studying under the MSBTE board, one major pain point we always faced was finding structured and accurate answers matching exam patterns. Textbooks often detailed broad theory, whereas exam assessors graded strictly on points defined in official MSBTE model answer sheets.

To bridge this gap, I set out to build **DiplomaGPT**—a specialized Generative AI chatbot customized specifically to understand, fetch, and compile responses according to Maharashtra State Board guidelines using **Retrieval-Augmented Generation (RAG)**.

---

## Technical Stack Architecture
To ensure high-trust responses and sub-2-second latency, I architected a decoupled system:
1. **Frontend**: React client with responsive tailwind interfaces and stream typing states.
2. **Backend Engine**: FastAPI microservice orchestrating search tasks with Python.
3. **Data Splitting & Embeddings**: LangChain text splitters and Google Embedding models (1536 dims).
4. **Vector Store**: Pinecone DB indexing 22,000 document chunks.
5. **Reasoning Agent**: Google Gemini Flash model restricted to contextual ground truth.

---

## Step 1: Parsing and Cleaning Legacy PDFs
Standard OCR engines usually fail on low-quality scanned PDF papers. Formulas, tables, and programming code snippets get warped into junk text. 

To resolve this, I built a custom Python script using **PyMuPDF** for text layout recognition and fall back to the **Google Cloud Vision API** for tables and drawings. 

Here is the helper code I developed to load PDF segments into cleaner chunk files:

\`\`\`python
import fitz # PyMuPDF

def extract_pdf_layout(pdf_path):
    doc = fitz.open(pdf_path)
    cleaned_pages = []
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text("blocks") # Preserves column grids
        page_content = []
        
        for block in text:
            block_text = block[4].strip()
            # Clean header and footer page markers
            if "Page No" in block_text or "MAHARASHTRA STATE" in block_text:
                continue
            page_content.append(block_text)
            
        cleaned_pages.append("\n".join(page_content))
    return cleaned_pages
\`\`\`

---

## Step 2: Semantic Chunking and Pinecone Vectorization
Once parsed, the documents were split using LangChain's \`RecursiveCharacterTextSplitter\` with an overlap of 150 characters to keep context intact. Each chunk was attached to custom metadata properties:
\`\`\`json
{
  "subject": "Data Structures in Java",
  "subjectCode": "22317",
  "year": "Winter 2024",
  "questionNumber": "Q2.b"
}
\`\`\`
We then uploaded the coordinates to Pinecone. During runtime, a user's question is parsed to extract the subject filter first, which is applied directly as a metadata vector constraint in Pinecone to decrease searching range.

---

## Step 3: Aligning Answers with Grading Rubrics
Standard LLM prompts generate paragraph descriptions. MSBTE examiners grade based on *specific points, code syntax, and diagrams*.
I configured system instructions to enforce structure:
> "You are an expert MSBTE examiner. Using ONLY the provided context, write the answer. Break it down into: 1. Main Definition, 2. Step-by-Step Points (with bold headers), 3. Code (if program), and 4. Schema representation. Keep language professional."

---

## Results and Core Takeaways
DiplomaGPT is currently in private beta, registering over 1,800 active chats from students. The semantic accuracy has reached **94.8%**, and feedback has been phenomenal.

Developing this taught me that raw LLM power is useless without high-quality document ingestion. Semantic chunking, database indexing, and strict context restriction are the keys to building successful enterprise AI tools.
`
  },
  {
    id: 2,
    slug: "msbte-job-portal-architecture",
    title: "Deep Dive into MSBTE Diploma Job Portal's System Architecture",
    excerpt: "Explaining how we optimized database queries and created a secure verification gateway for recruitment scaling.",
    category: "Architecture",
    tags: ["React", "Node.js", "MongoDB", "Query Optimization", "Caching"],
    date: "Jun 10, 2026",
    readTime: "5 min read",
    featured: false,
    image: null,
    content: `
## The Need for a Specialized Portal
In Maharashtra, diploma students represent a massive vocational candidate base. However, standard recruitment engines lump degrees (B.E./B.Tech) and diplomas together, or lack academic validation pipelines. Recruiters often receive bulk profiles containing forged or rounded GPA scores.

To solve this, I built the **MSBTE Diploma Job Portal**, a custom job dashboard containing branch categorization and an automated database verify gateway.

---

## Core System Architecture Block
The system utilizes a standard MERN stack setup but features decoupled worker jobs:

1. **Client Interface**: React dynamic dashboard allowing students to filter vacancies and recruiters to rank applicants.
2. **REST API Gateway**: Node.js + Express application executing verification schemas.
3. **Institutional Database**: MongoDB Atlas holding collections for Jobs, Recruiters, and Verified Academic Sheets.

---

## Optimizing Complex Query Scans
Recruiters search for students using multiple filters: Branch, GPA threshold, pass-out year, and location. In a naive database setup, this triggers scanning the entire student list sequentially, leading to database lockups.

To fix this, I set up **Compound Indexes** in MongoDB:
\`\`\`javascript
// Create compound index for active candidate searches
db.students.createIndex({ branch: 1, gpa: -1, passOutYear: 1 });
\`\`\`
This index tree sorted the candidate collections first. Rather than running a full scanning loop, MongoDB retrieves records matching branch queries instantly in logarithmic time.

---

## The Verification Schema Gateway
The crucial element is the academic verify gateway. When a student registers, they input their MSBTE enrollment number. The server contacts the institutional repository mapping:
\`\`\`javascript
const verifyStudentAcademicRecord = async (enrollmentNo) => {
  // Query verified academic sheet registry
  const record = await AcademicRegistry.findOne({ enrollmentNo });
  if (!record) {
    throw new Error("Academic enrollment record not found.");
  }
  return {
    verifiedName: record.name,
    verifiedGPA: record.cumulativeGPA,
    verifiedBranch: record.branch
  };
};
\`\`\`
This matches their registration name and locks their GPA field, preventing candidates from manually inflating grades.

---

## Metrics Achievements
- Database response time dropped from 450ms to **12ms** under query loads.
- Reduced candidate screening time for core recruiters by **80%** due to automated pre-verification badges.
- Safely handled over 12,000 applications.
`
  },
  {
    id: 3,
    slug: "react-authentication-guide",
    title: "The Bulletproof Guide to React Authentication with JWT and Context API",
    excerpt: "Best practices for managing user sessions, automatic token refresh, and protecting private router pathways.",
    category: "Web Dev",
    tags: ["React", "Security", "JWT", "Context API", "Vite"],
    date: "May 28, 2026",
    readTime: "5 min read",
    featured: false,
    image: null,
    content: `
## Why React Authentication is Deceptive
Many tutorials teach you to store JWT access tokens directly in \`localStorage\` and check authentication state inside a simple \`useEffect\`.
**This is highly insecure and leads to bad UX.**
Storing tokens in \`localStorage\` exposes them to Cross-Site Scripting (XSS) attacks. Additionally, state delays cause protected routes to flicker on page refreshes.

In this guide, we will implement a bulletproof session wrapper using **httpOnly cookies**, React Context, and a custom Router boundary.

---

## Step 1: Secure Token Setup
To protect against theft:
- **Access Tokens**: Short lifetime (15 mins), loaded in memory (React State).
- **Refresh Tokens**: Long lifetime (7 days), stored in an **httpOnly, Secure, SameSite=Strict** cookie.

The backend exposes a \`/refresh-token\` route that reads the cookie, validates the session, and sends a fresh access token.

---

## Step 2: Designing the Auth Context
Here is the core structure of our AuthProvider handling automated silent refreshes:

\`\`\`javascript
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Run silent refresh on application mount
  useEffect(() => {
    const silentRefresh = async () => {
      try {
        const response = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        setToken(response.data.accessToken);
        setUser(response.data.user);
      } catch (err) {
        // Refresh token expired or invalid, user needs to login
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    silentRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, setUser, setToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
\`\`\`

---

## Step 3: Protecting Router Pathways
To prevent flashing unauthenticated components, we wrap them in a state-checking boundary:

\`\`\`javascript
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading Session...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
\`\`\`

---

## Summary Best Practices
1. Never store access tokens in \`localStorage\`. Keep them in React state.
2. Store refresh tokens in secure cookies.
3. Hook API clients (like Axios) with request interceptors to automatically append tokens and handle \`401\` token expiration refreshes.
`
  },
  {
    id: 4,
    slug: "my-journey-diploma-ycce",
    title: "My Academic Journey: Moving from Diploma directly to YCCE Nagpur",
    excerpt: "Insights, learning methodologies, and key transition tips for direct second-year computer engineering students.",
    category: "Journey",
    tags: ["Academic Journey", "Computer Science", "YCCE", "Nagpur", "Career"],
    date: "May 15, 2026",
    readTime: "4 min read",
    featured: false,
    image: null,
    content: `
## The Path Less Traveled
In the Indian engineering education landscape, most students enter engineering degrees directly after high school (12th Grade) by writing competitive entrance exams. Another alternative—one that emphasizes technical skills—is doing a 3-year specialized **Diploma in Engineering** first and entering directly into the second year (lateral entry) of a degree program.

This is the story of my transition from a Diploma student to pursuing Computer Engineering at **Yeshwantrao Chavan College of Engineering (YCCE), Nagpur**.

---

## The Value of a Practical Foundation
My diploma program was heavy on laboratory exercises, system setups, and practical coding logic. We wrote Java, set up SQL schemas, and configured computer networks manually. 
However, transitioning directly to a major degree program like YCCE introduces a shift in academic style:
- Deep focus on theoretical algorithms and proofs.
- Higher mathematical rigor (Discrete structures, Calculus, Stats).
- Competitive peer environments who have spent years preparation.

---

## Key Strategies for Transition Success
During my transition, I developed a structured framework to adapt:

1. **Closing the Math Gap**: Diploma curricula often skip advanced engineering mathematics. I spent my first two months taking open courses on linear algebra and statistics.
2. **Staggered DSA Preparation**: I allocated two hours daily specifically to study Data Structures & Algorithms, practicing on LeetCode to catch up with degree coding standard assessments.
3. **Centralizing Notes**: Recognizing that degree lectures proceed rapidly, I built notes platforms to keep study material cataloged.

---

## Advice for Junior Lateral Entry Candidates
- **Do not procrastinate**: The semester timelines in degree programs run extremely fast. Keep tracking assignments daily.
- **Collaborate with normal-entry students**: They have solid theoretical strengths; you have solid practical debugging strengths. Team up for projects to make both stronger.
- **Participate in Hackathons**: Use your practical code-building skills to solve problems in real hackathon labs.
`
  },
  {
    id: 5,
    slug: "ai-touchless-control-system",
    title: "Building an AI Touchless Computer Control System in Python",
    excerpt: "A technical step-by-step breakdown of using OpenCV, MediaPipe, and PyAutoGUI to simulate mouse control with hands.",
    category: "AI",
    tags: ["Python", "OpenCV", "MediaPipe", "Computer Vision", "Gesture Control"],
    date: "Apr 22, 2026",
    readTime: "5 min read",
    featured: false,
    image: null,
    content: `
## Gesture Interfaces
Touchless interfaces are no longer restricted to science fiction movies. With modern webcams and deep learning frameworks, we can convert simple consumer-grade cameras into advanced human-computer interaction (HCI) devices.

In this post, I will break down how I built a low-latency **Touchless Computer Control System** in Python using MediaPipe hand-tracking.

---

## The Pipeline Pipeline Design
The pipeline flows sequentially in a loop running at 30 FPS:
1. **Frame Capture**: Read RGB frames from camera using OpenCV.
2. **Landmark Inference**: Feed frames to MediaPipe Hands model to locate 21 landmarks.
3. **Cursor Mapping**: Map the index finger coordinates to screen pixels.
4. **Action Calculation**: Calculate distances between fingers to trigger Left Click, Right Click, or Scroll.
5. **OS Simulation**: Inject mouse events into Windows using PyAutoGUI.

---

## Core Hand Tracking Loop
Here is a simplified code snippet of the framework capture and tracking logic:

\`\`\`python
import cv2
import mediapipe as mp
import pyautogui

# Initialize MediaPipe tracking models
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.8)
screen_w, screen_h = pyautogui.size()

cap = cv2.VideoCapture(0)

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        break
        
    # Flip the frame for natural mirror feedback
    frame = cv2.flip(frame, 1)
    h, w, c = frame.shape
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(rgb_frame)
    
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Extract Index Finger Tip (Landmark 8) and Thumb Tip (Landmark 4)
            index_tip = hand_landmarks.landmark[8]
            thumb_tip = hand_landmarks.landmark[4]
            
            # Map index coordinates to full screen pixels
            cursor_x = int(index_tip.x * screen_w)
            cursor_y = int(index_tip.y * screen_h)
            
            # Move cursor (with absolute coordinates)
            pyautogui.moveTo(cursor_x, cursor_y)
            
            # Calculate distance between tips for Left Click
            distance = ((index_tip.x - thumb_tip.x)**2 + (index_tip.y - thumb_tip.y)**2)**0.5
            if distance < 0.04: # Threshold
                pyautogui.click()
                
    cv2.imshow("Tracking Workspace", frame)
    if cv2.waitKey(1) & 0xFF == 27: # ESC key to close
        break

cap.release()
cv2.destroyAllWindows()
\`\`\`

---

## Essential Optimizations
To make this code production-ready, I had to resolve two major bugs:
- **PyAutoGUI Main-Thread Lockups**: PyAutoGUI runs synchronously. If a gesture is processed slowly, camera capture halts. I resolved this by running the capture on a separate Python thread and only feeding calculated coordinates to PyAutoGUI.
- **Mapping Boundaries**: Mapping the full camera frame edge-to-edge requires extreme hand extensions. I solved this by defining a smaller bounding box in the center of the camera window (e.g. 400x300 pixels) and scaling coordinates relative to that active box, enhancing accessibility.
`
  }
];
