import React from 'react';
import { ChevronRight, Calendar, Building2, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      title: "Web Developer Intern",
      company: "IRIS - NITK's Administrative System",
      date: "November 2024 - Present",
      description: [
        "IRIS is the official student-led ERP system of NITK, with 15K+ active users.",
        "Contributed to the development of the Research and Development module by gathering requirements and implementing features to meet user needs and enhance functionality",
        "Worked extensively with MySQL and ActiveRecord ORM for efficient database management and query optimization",
        "Refactored and optimized existing codebase, leveraging RuboCop and RSpec for code quality and testing"
      ],
      type: "Work",
      image: `${process.env.PUBLIC_URL}/iris.png`
    },
    {
      title: "Executive member",
      company: "IEEE NITK Student Branch",
      date: "October 2024 - Present",
      description: [
        "Organized workshops and seminars on various technical topics",
        "Conducted coding competitions and hackathons for students",
        "Mentored junior members and guided them in their projects",
        "Collaborated with other student branches for joint events"
      ],
      type: "Volunteer",
      image: `${process.env.PUBLIC_URL}/ieee-nitk.png`
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            Experience
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              key={index}
              className="group relative bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-8 hover:from-slate-700 hover:to-slate-800 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl border border-slate-700/50"
            >
              <div className="absolute -left-4 top-10 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                {exp.type === "Work" ? (
                  <Building2 className="w-4 h-4 text-white" />
                ) : (
                  <GraduationCap className="w-4 h-4 text-white" />
                )}
              </div>

              <div className="ml-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h2>
                      <ChevronRight className="w-6 h-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="flex items-center gap-2 text-blue-400 mb-3">
                      <Building2 className="w-5 h-5" />
                      <p className="text-xl text-white">{exp.company}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-5 h-5" />
                      <p className="text-lg text-white">{exp.date}</p>
                    </div>
                  </div>

                  <div className="w-full md:w-64 aspect-w-4 aspect-h-3 rounded-lg overflow-hidden text-white">
                    <img 
                      src={exp.image} 
                      alt={exp.company}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <motion.li 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      key={i} 
                      className="text-gray-300 flex items-start text-lg group-hover:text-gray-200"
                    >
                      <span className="text-blue-400 mr-3 font-bold">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;