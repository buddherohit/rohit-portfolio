import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Code2, Rocket, Wrench } from "lucide-react";

export default function Skills() {
    // Memoized skill categories
    const SKILLS_CATEGORIES = useMemo(
        () => [
            {
                title: "Programming Languages",
                description:
                    "Core languages I use for problem-solving and development.",
                icon: Code2,
                color: "from-blue-500 to-cyan-500",
                skills: [
                    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
                    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
                    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
                    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
                    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg" },
                ],
            },
            {
                title: "Dev Skills & Frameworks",
                description:
                    "Modern frameworks and technologies for building full-stack applications.",
                icon: Rocket,
                color: "from-emerald-500 to-teal-500",
                skills: [
                    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
                    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
                    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
                    { name: "REST API", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
                    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                ],
            },
            {
                title: "Tools & Databases",
                description:
                    "Essential tools and database systems for efficient development workflows.",
                icon: Wrench,
                color: "from-orange-500 to-red-500",
                skills: [
                    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
                    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
                    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
                    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
                    { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
                    { name: "npm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
                    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
                ],
            },
        ],
        []
    );

    // Directional spring animation variants
    const getCardVariants = useMemo(
        () => (index) => {
            const xOffset = 50;
            const yOffset = 50;
            let initial = {};
            if (index === 0) initial = { opacity: 0, x: -xOffset }; // left card
            else if (index === 1) initial = { opacity: 0, y: yOffset }; // center card
            else initial = { opacity: 0, x: xOffset }; // right card

            return {
                hidden: initial,
                show: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                        type: "spring",
                        stiffness: 40,
                        damping: 15,
                        mass: 1,
                        delay: index * 0.1, // Reduced delay for snappier feel
                    },
                },
            };
        },
        []
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative overflow-hidden">
            {/* Background blobs - Optimized with CSS only animation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div
                    className="absolute top-20 left-20 w-72 h-72 bg-blue-100/30 dark:bg-blue-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob"
                    style={{ willChange: "transform" }}
                />
                <div
                    className="absolute top-20 right-20 w-72 h-72 bg-purple-100/30 dark:bg-purple-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-2000"
                    style={{ willChange: "transform" }}
                />
                <div
                    className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-100/30 dark:bg-pink-900/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-4000"
                    style={{ willChange: "transform" }}
                />
            </div>

            {/* Header */}
            <div className="text-center mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4 tracking-tight">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                            Expertise
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        A curated stack of modern technologies I use to build scalable applications.
                    </p>
                </motion.div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {SKILLS_CATEGORIES.map((category, idx) => {
                    const Icon = category.icon;
                    return (
                        <motion.div
                            key={idx}
                            variants={getCardVariants(idx)}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
                            className="h-full"
                        >
                            <div className="group relative bg-white/80 dark:bg-slate-900/60 backdrop-blur-md rounded-[2rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 flex flex-col h-full overflow-hidden hover:-translate-y-2">
                                {/* Glass overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-blue-50/30 dark:from-slate-900/50 dark:to-blue-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Card Header */}
                                <div className="mb-8 relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-450 transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-slate-400 leading-relaxed">{category.description}</p>
                                </div>

                                {/* Skills List */}
                                <div className="flex flex-wrap gap-3 mt-auto relative z-10">
                                    {category.skills.map((skill, skillIdx) => (
                                        <div
                                            key={skillIdx}
                                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50/80 hover:bg-white dark:bg-slate-950/50 dark:hover:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300 cursor-default group/skill"
                                        >
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-5 h-5 object-contain group-hover/skill:scale-110 transition-transform"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <span className="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover/skill:text-gray-900 dark:group-hover/skill:text-slate-100">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
