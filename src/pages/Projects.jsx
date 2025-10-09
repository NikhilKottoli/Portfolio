import React, { useState, useEffect } from "react";
import { ExternalLink, Code, Github, X } from "lucide-react";
import { title } from "motion/react-client";

const projects = [
    {
      image: `${process.env.PUBLIC_URL}/ImpactChain.png`,
      title: "ImpactChain",
      text: "social impact platform that combines social media, campaign management, and data monetization to create verified, blockchain-backed social good initiatives",
      description: "ImpactChain is a social impact platform that combines social media, campaign management, and data monetization to create verified, blockchain-backed social good initiatives. It empowers users to create and support impactful campaigns while ensuring transparency and accountability through blockchain technology.",
      link: "https://github.com/NikhilKottoli/ImpactChain",
      tech: ["React","Solidity","Express"],
    },
    {
    image: `${process.env.PUBLIC_URL}/Polkaflow.png`,
    title: "Polkaflow",
    text: "A visual blockchain workflow builder",
    description: "Polkaflow is a visual blockchain workflow builder that empowers users to design, generate, and deploy smart contracts for the Polkadot ecosystem with ease.",
    link: "https://github.com/NikhilKottoli/Polkadot",
    tech: ["React","Express","Solidity"],
    deployment: "https://684f67f55264e77559942f2f--polkaflownikhil.netlify.app/"
  },
  {
    image: `${process.env.PUBLIC_URL}/codemaster.png`, 
    title: "CodeMaster",
    text: "All purpose Interview platform",
    description: "A comprehensive interview platform designed to streamline the technical interview process. Features real-time code collaboration, multiple programming language support.",
    link:"https://github.com/IEEE-NITK/Codemasters",
    tech: ["React","PostgreSQL","Express","redis"],
    deployment: "https://codemasters-swart.vercel.app/"
  },
  { 
    image: `${process.env.PUBLIC_URL}/Synkerr.jpeg`, 
    title: "Synkerr",
    text: "Social Media Website for collaboration",
    description: "A modern social media platform focused on professional collaboration and networking. Includes real-time messaging, project sharing, and team formation features.",
    link: "https://github.com/NikhilKottoli/Synkerr_Homepage",
    tech: ["React","MongoDB","Express"]
  },
  {
    image: `${process.env.PUBLIC_URL}/DDS.png`,
    title: "Matrix Multiplier",
    text: "Digital Circuit Design",
    description: "This project addresses the need for efficient matrix operations by developing a tool that exclusively uses combinational and sequential circuits to perform multiplication, transposition, and determinant calculations. This solution is grounded in digital systems and implements most used matrix operations in as little hardware as possible.",
    link: "https://github.com/NikhilKottoli/S2-T15",
    tech: ["verilog"],
  }
];

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
        >
          <X size={20} />
        </button>
        
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 md:h-full object-cover rounded-l-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
          </div>
          
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={project.link}
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Github size={20} className="mr-2" />
                View Code
              </a>
              
              {project.deployment && (
                <a 
                  href={project.deployment}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink size={20} className="mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index, onCardClick }) => {
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
        className={`bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all duration-500 h-full cursor-pointer ${isHovered ? 'scale-105 shadow-2xl' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onCardClick(project)}
      >
        <div className="relative overflow-hidden group">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover transition-all duration-500 transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-lg font-semibold mb-2">Click to view details</p>
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mx-auto">
                <ExternalLink size={20} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.text}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="px-3 py-1 bg-gray-800 text-blue-400 rounded-full text-sm">
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };
  
  const filteredProjects = projects.filter(project => {
    if (searchTerm && !project.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !project.text.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (activeFilter !== "all" && !project.tech.includes(activeFilter)) {
      return false;
    }
    
    return true;
  });
  
  const uniqueTechStacks = ["all", ...new Set(projects.flatMap(p => p.tech))];
  
  return (
    <>
      <div className={`min-h-screen bg-black text-white py-16 px-4 transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              My Projects
            </h1>
          </div>
          
          <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">

            
            <div className="flex items-center gap-4">
              <div className="flex mx-auto flex-wrap gap-2 overflow-x-auto">
                {uniqueTechStacks.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setActiveFilter(tech)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeFilter === tech
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {tech === "all" ? "All" : tech}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  index={index} 
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Code size={48} className="mx-auto text-gray-500 mb-4" />
              <h3 className="text-2xl font-bold text-gray-400">No projects found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Projects;
