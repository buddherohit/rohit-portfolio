import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Medal, Star } from "lucide-react";

export default function Achievements() {

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
  }), []);

  const ACHIEVEMENTS_DATA = [
    {
      title: "Software Development Intern",
      organization: "Cognifyz Technologies Pvt Ltd",
      location: "Nagpur, Maharashtra",
      description: "Currently working as Software Development Intern gaining real-world development experience.",
      icon: Trophy,
      color: "from-red-500 to-pink-500",
      highlights: [
        "Worked on real-world development projects",
        "Improved coding & problem solving skills",
        "Learned industry best practices"
      ],
      skills: ["Java", "Web Development", "Git"]
    },
    {
      title: "GeeksforGeeks Java Certification",
      organization: "GeeksforGeeks",
      location: "Online",
      description: "Completed Java Programming Certification from GeeksforGeeks.",
      icon: Award,
      color: "from-green-500 to-emerald-500",
      highlights: [
        "Core Java Concepts",
        "OOP Concepts",
        "Collections Framework",
        "Problem Solving"
      ],
      skills: ["Java", "OOP", "DSA"]
    },
    {
      title: "Oracle AI Foundation Certification",
      organization: "Oracle",
      location: "Online",
      description: "Completed Oracle AI Foundation certification covering AI fundamentals.",
      icon: Medal,
      color: "from-blue-500 to-cyan-500",
      highlights: [
        "AI Fundamentals",
        "Machine Learning Basics",
        "AI Applications",
        "Data & Models"
      ],
      skills: ["AI", "Machine Learning", "Oracle"]
    },
    {
      title: "Hackathon Participant",
      organization: "JPMorgan Chase Hackathon",
      location: "India",
      description: "Participated in hackathon and built innovative solutions.",
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
      highlights: [
        "Team collaboration",
        "Built prototype solution",
        "Improved problem solving"
      ],
      skills: ["Teamwork", "Java", "Problem Solving"]
    },
    {
      title: "Project Development",
      organization: "Academic Projects",
      location: "Nagpur",
      description: "Developed multiple real-world applications.",
      icon: Award,
      color: "from-orange-500 to-red-500",
      highlights: [
        "Women Safety System",
        "Student Learning Platform",
        "Smart Hostel Management"
      ],
      skills: ["Java", "Python", "DSA"]
    },
    {
      title: "DSA & Problem Solving",
      organization: "Practice & Learning",
      location: "Online",
      description: "Continuously improving problem solving skills.",
      icon: Medal,
      color: "from-indigo-500 to-purple-500",
      highlights: [
        "Practicing coding problems",
        "Improving algorithms",
        "Learning advanced concepts"
      ],
      skills: ["DSA", "Java", "Algorithms"]
    }
  ];

  return (
    <section
      id="achievements"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/20">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-red-600">
            Achievements
          </h2>
          <p className="text-gray-600 mt-2">
            Milestones and accomplishments in my journey
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200 hidden sm:block" />

          {ACHIEVEMENTS_DATA.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-[20px] top-6 w-3 h-3 bg-red-500 rounded-full ring-4 ring-white shadow transition-all duration-300 hidden sm:block" />

                {/* Card */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-red-600 font-medium mb-1">
                        {item.organization}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        {item.location}
                      </p>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                        {item.highlights.map((point, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-100 font-semibold text-gray-700 rounded-lg shadow-sm"
                          >
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
      </div>
    </section>
  );
}
