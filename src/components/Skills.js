import React from "react";
import Marquee from "./Marquee";

const SkillCard = ({ title, description }) => (
  <div className="block max-w-sm p-6 rounded-3xl shadow bg-gradient-to-br from-black via-gray-950 to-indigo-950 transform transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-gray-800 hover:via-gray-900 hover:to-indigo-800">
    <h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-white">
      {title}
    </h5>
    <p className="font-normal text-gray-400">{description}</p>
  </div>
);

const MainSkillCard = ({ title, imageSrc, imageAlt }) => (
  <div className="bg-gradient-to-br from-purple-700 via-black to-purple-500 p-0.5 rounded-3xl hover:scale-105 transition-transform duration-300">
    <div className="flex flex-col items-center justify-center w-full h-48 px-4 py-5 rounded-3xl shadow hover:bg-gray-900 bg-gradient-to-br from-black via-gray-950 to-indigo-950">
      <div className="w-20 h-20 mb-4 flex items-center justify-center">
        {imageSrc && <img src={imageSrc} alt={imageAlt} className="max-w-full max-h-full object-contain" />}
      </div>
      <span className="text-white text-xl md:text-2xl text-center font-semibold">
        {title}
      </span>
    </div>
  </div>
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
    { title: "Tailwind CSS", imageSrc: "https://seeklogo.com/images/T/tailwind-css-logo-5AD4175897-seeklogo.com.png", imageAlt: "TailwindCSS" },
    { title: "Docker", imageSrc: "https://logos-download.com/wp-content/uploads/2016/09/Docker_logo.png", imageAlt: "Docker Logo" },
    { title:"Ruby on Rails", imageSrc:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/1200px-Ruby_On_Rails_Logo.svg.png", imageAlt:"Rails Logo"},
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-950">
      <h1 className="text-4xl md:text-5xl text-white text-center mb-10">Skills</h1>
      <div className="flex flex-col gap-10">
        <Marquee className="hidden md:flex">
          <div className="flex gap-6 flex-wrap justify-center">
            {[...skillsData, ...skillsData, ...skillsData].map((skill, index) => (
              <SkillCard key={index} title={skill.title} description={skill.description} />
            ))}
          </div>
        </Marquee>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {mainSkills.map((skill, index) => (
            <MainSkillCard key={index} title={skill.title} imageSrc={skill.imageSrc} imageAlt={skill.imageAlt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;