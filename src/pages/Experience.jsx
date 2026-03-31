import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, ExternalLink, CheckCircle2 } from "lucide-react";

export default function Experience() {

const containerVariants = useMemo(() => ({
hidden: { opacity: 0 },
show: {
opacity: 1,
transition: { staggerChildren: 0.1, delayChildren: 0.05 }
},
}), []);

const itemVariants = useMemo(() => ({
hidden: { opacity: 0, y: 20 },
show: {
opacity: 1,
y: 0,
transition: { duration: 0.5, ease: "easeOut" }
},
}), []);

const EXPERIENCE_DATA = useMemo(() => [

{
period: "Present",
duration: "Current",
title: "Software Development Intern",
company: "Cognifyz Technologies Pvt Ltd",
location: "Nagpur, Maharashtra",
description:
"Currently working as a Software Development Intern gaining hands-on experience in real-world software development and modern technologies.",
highlights: [
"Working on real-world development projects",
"Improving problem solving skills",
"Learning industry-level development practices",
"Collaborating with development teams"
],
skills: ["Java", "Web Development", "Git", "Problem Solving"],
icon: Briefcase,
color: "from-green-500 to-emerald-500",
certificateUrl: "",
},

{
period: "Jun 2024 - Jul 2024",
duration: "2 mos",
title: "Web Development Intern",
company: "Optech Pvt Ltd",
location: "Gondia, Maharashtra",
description:
"Gained hands-on experience in full-stack web development, contributing to real-world projects and learning industry best practices.",
highlights: [
"Developed proficiency in React & NodeJS framework",
"Implemented MVT architecture",
"Built responsive UI using Bootstrap",
"Collaborated using Git"
],
skills: ["React", "NodeJS", "HTML/CSS", "Bootstrap", "Git"],
icon: Briefcase,
color: "from-blue-500 to-cyan-500",
certificateUrl: "",
},

{
period: "2025",
duration: "Hackathon",
title: "Hackathon Participant",
company: "JPMorgan Chase Hackathon",
location: "India",
description:
"Participated in hackathon and worked in team environment to build innovative solutions.",
highlights: [
"Worked in team environment",
"Built project prototype",
"Improved problem solving skills",
"Experience with rapid development"
],
skills: ["Java", "Teamwork", "Problem Solving", "Web Development"],
icon: Briefcase,
color: "from-purple-500 to-pink-500",
certificateUrl: "",
},

{
period: "2024 - 2025",
duration: "Projects",
title: "Software Development Projects",
company: "Personal Projects",
location: "Nagpur",
description:
"Developed multiple real-world software projects.",
highlights: [
"Women Safety System",
"Student Learning Platform",
"Smart Hostel Management System",
"Hands-on development experience"
],
skills: ["Java", "Python", "DSA", "Web Development"],
icon: Briefcase,
color: "from-orange-500 to-red-500",
certificateUrl: "",
},

], []);

return (
<div className="relative isolate bg-gradient-to-b from-white via-gray-50 to-white py-16 sm:py-20 overflow-hidden">

<div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

{/* Header */}
<div className="text-center mb-12 relative z-10">

<div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20 mb-4">
<Briefcase className="w-7 h-7 text-white" />
</div>

<h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-gray-900">
Professional Experience
</h2>

<div className="mx-auto w-20 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full mb-4" />

<p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
My professional journey and practical experience in the tech industry
</p>

</div>

{/* Timeline */}
<motion.div
className="relative z-10 w-full max-w-6xl mx-auto"
variants={containerVariants}
initial="hidden"
whileInView="show"
viewport={{ once: true }}
>

<div className="absolute left-4 sm:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gray-200 via-blue-200 to-gray-200" />

<div className="space-y-8 sm:space-y-12">

{EXPERIENCE_DATA.map((exp, index) => {

const Icon = exp.icon;

return (

<motion.div
key={index}
variants={itemVariants}
className="relative pl-12 sm:pl-24"
>

<div className="absolute left-1.5 sm:left-[26px] top-6 z-20">
<div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border-4 border-blue-500 rounded-full shadow-md" />
</div>

<div className="group relative p-1 sm:p-3 transition-all duration-300">

<div className="relative z-10">

<div className="flex flex-col sm:flex-row gap-4 mb-4">

<div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
<Icon className="w-6 h-6 sm:w-7 sm:h-7" />
</div>

<div className="flex-1">

<div className="flex flex-wrap items-center justify-between gap-2 mb-1">
<h3 className="text-lg sm:text-xl font-bold text-gray-900">
{exp.title}
</h3>

<div className="flex items-center gap-2">
<span className="px-3 py-1 text-xs font-bold text-blue-600 bg-blue-50 rounded-full border border-blue-100">
{exp.period}
</span>

<span className="text-xs text-gray-500 font-medium hidden sm:inline-block">
({exp.duration})
</span>
</div>

</div>

<div className="text-sm sm:text-base font-medium text-gray-700 mb-1">
{exp.company}
</div>

<div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
<MapPin className="w-3.5 h-3.5" />
{exp.location}
</div>

</div>
</div>

<div className="mb-5 pl-0 sm:pl-[72px]">

<p className="text-sm text-gray-600 leading-relaxed mb-4">
{exp.description}
</p>

<div className="grid sm:grid-cols-2 gap-3 mb-5">
{exp.highlights.map((highlight, idx) => (
<div key={idx} className="flex items-start gap-2">
<span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
<span className="text-sm text-gray-600">
{highlight}
</span>
</div>
))}
</div>

<div className="flex flex-wrap gap-2 mb-4">
{exp.skills.map((skill, i) => (
<span
key={i}
className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-md border border-gray-100"
>
<CheckCircle2 className="w-3 h-3 text-blue-500" />
{skill}
</span>
))}
</div>

</div>

</div>

</div>

</motion.div>

);

})}

</div>

</motion.div>

</div>

</div>
);
}