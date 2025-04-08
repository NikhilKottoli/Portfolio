import React, { useState, useEffect } from "react";
import { ExternalLink, Code, Github } from "lucide-react";

const projects = [
  {
    image: `${process.env.PUBLIC_URL}/codemaster.png`, 
    title: "CodeMaster",
    text: "All purpose Interview platform",
    link:"https://github.com/IEEE-NITK/Codemasters",
    tech: ["React", "PostgreSQL", "Express","redis","websocket"],
    deployment: "https://codemasters-swart.vercel.app/"
  },
  { 
    image: `${process.env.PUBLIC_URL}/Synkerr.jpeg`, 
    title: "Synkerr",
    text: "Social Media Website for collaboration",
    link: "https://github.com/alphaplayerofdooms/Synkerr_Homepage",
    tech: ["React", "Node.js", "MongoDB", "Express","React Native"]
  },
];

const extendedProjects = [
  ...projects,
];

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);
    
    return () => clearTimeout(timeout);
  }, [index]);
  
  return (
    <div 
      className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <div 
        className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-500 h-full ${isHovered ? 'scale-105 shadow-2xl' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden group">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover transition-all duration-500 transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.text}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-800 text-blue-400 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-between">
            <a 
              href={project.link}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              View Project <ExternalLink size={16} className="ml-1" />
            </a>
            <a 
              href={project.deployment}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              Visit the site <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        </div>
        
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  const filteredProjects = extendedProjects.filter(project => {
    // Filter by search term
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.text.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by tech stack
    if (activeFilter !== "all" && !project.tech.includes(activeFilter)) {
      return false;
    }
    
    return true;
  });
  
  const uniqueTechStacks = ["all", ...new Set(extendedProjects.flatMap(p => p.tech))];
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 transform transition-all duration-1000 delay-300">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            My Projects
          </h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work and passion projects. Each project represents a unique challenge and learning opportunity.
          </p>
        </div>
        
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 scrollbar-hide">
            {uniqueTechStacks.map((tech, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  activeFilter === tech 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter(tech)}
              >
                {tech.charAt(0).toUpperCase() + tech.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Code size={48} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-400">No projects found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">Want to see more of my work?</p>
          <a 
            href="https://github.com/NikhilKottoli" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Github size={20} className="mr-2" />
            Visit My GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;