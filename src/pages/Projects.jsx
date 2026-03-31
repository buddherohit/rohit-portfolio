import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

// Import project images
import womenSafetyImg from "../assets/projects/womenSafety.png";
import studentPlatformImg from "../assets/projects/studentPlatform.png";
import hostelManagementImg from "../assets/projects/hostelManagement.png";

const projectsData = [
{
image: womenSafetyImg,
category: "Safety & Emergency",
title: "Women Safety System",
description:
"A smart women safety application designed to enhance personal security. The system provides emergency alerts, real-time location tracking, and quick contact notification to ensure user safety. The application allows users to send SOS alerts instantly and share live location with trusted contacts during emergency situations.",
tags: [
"Java",
"Android",
"GPS",
"Firebase",
"Location Tracking",
],
href: "https://github.com/buddherohit",
demoUrl: "#",
},

{
image: studentPlatformImg,
category: "EdTech Platform",
title: "Student Learning Platform",
description:
"A digital learning platform designed to provide educational resources, course materials, and structured learning modules for students. The platform allows users to access study content, track learning progress, and improve academic performance through interactive learning.",
tags: [
"Java",
"React",
"Node.js",
"MongoDB",
"Web Development",
],
href: "https://github.com/buddherohit",
demoUrl: "#",
},

{
image: hostelManagementImg,
category: "Management System",
title: "Smart Hostel Management System",
description:
"A smart hostel management system designed to manage hostel operations efficiently. Features include student registration, room allocation, attendance tracking, complaint management, and admin dashboard for better management and monitoring.",
tags: [
"Java",
"MySQL",
"Spring Boot",
"React",
"Full Stack",
],
href: "https://github.com/buddherohit",
demoUrl: "#",
},
];

export default function Projects() {
return (
<motion.section
id="projects"
className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 overflow-hidden"
initial="hidden"
whileInView="show"
viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
variants={{
hidden: {},
show: { transition: { staggerChildren: 0.15 } },
}}
>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<motion.div className="mb-12 sm:mb-16">
<span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 rounded-full border border-red-100">
Portfolio • Work • Projects
</span>

<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
My Projects
</h2>

<p className="text-lg text-gray-600 max-w-2xl">
Here are some of my projects showcasing my skills in software development,
problem solving and real world applications.
</p>

</motion.div>

<div className="space-y-12">
{projectsData.map((project, index) => (
<ProjectCard key={index} index={index} {...project} />
))}
</div>

</div>

</motion.section>
);
}