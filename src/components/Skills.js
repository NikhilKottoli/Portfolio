import React from "react";
import { motion } from "framer-motion";
import './Skills.css';

const SkillCard = ({ title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="block max-w-sm p-6 rounded-3xl shadow bg-gradient-to-br from-indigo-950 via-purple-900 to-black border border-purple-500/20 backdrop-blur-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group"
  >
    <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
      {title}
    </h5>
    <p className="font-normal text-gray-300 group-hover:text-white transition-colors duration-300">{description}</p>
  </motion.div>
);

const MainSkillCard = ({ title, imageSrc, imageAlt, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="relative group w-64 h-64"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
    <div className="relative flex flex-col items-center justify-center w-full h-full px-4 py-5 rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 transition-all duration-500 group-hover:from-gray-800 group-hover:to-gray-900">
      <motion.div 
        className="w-24 h-24 mb-4 flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {imageSrc && <img src={imageSrc} alt={imageAlt} className="max-w-full max-h-full object-contain" />}
      </motion.div>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-xl md:text-2xl text-center font-bold">
        {title}
      </span>
    </div>
  </motion.div>
);

const Skills = () => {
  const skillsData = [
    { title: "HTML", description: "Building Websites" },
    { title: "CSS", description: "Making Websites Look Good" },
    { title: "JavaScript", description: "Making Websites Interactive and Dynamic" },
    { title: "C++", description: "DSA and Competitive Programming" },
  ];

  const mainSkills = [
    { title: "React", imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png", imageAlt: "React Logo" },
    { title: "Tailwind CSS", imageSrc: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", imageAlt: "TailwindCSS" },
    { title: "Docker", imageSrc: "https://logos-download.com/wp-content/uploads/2016/09/Docker_logo.png", imageAlt: "Docker Logo" },
    { title: "Ruby on Rails", imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/1200px-Ruby_On_Rails_Logo.svg.png", imageAlt: "Rails Logo" },
  ];

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl text-center mb-16 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"
      >
        Skills
      </motion.h1>
      <div className="flex flex-col gap-16">
        <div className="overflow-hidden py-4">
          <div className="flex gap-6 animate-scroll">
            {[...skillsData, ...skillsData, ...skillsData].map((skill, index) => (
              <SkillCard key={index} title={skill.title} description={skill.description} index={index} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center px-4">
          {mainSkills.map((skill, index) => (
            <MainSkillCard key={index} title={skill.title} imageSrc={skill.imageSrc} imageAlt={skill.imageAlt} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;