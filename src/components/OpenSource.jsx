import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, GitMerge, Check } from 'lucide-react';

// Your actual merged pull request
const mergedContributions = [
  {
    title: "Ruby On Rails",
    repository: "rails/rails",
    prNumber: "55581",
    description: "Documentation Correction for Rails Release 8.0",
    status: "Merged",
    url: "https://github.com/rails/rails/pull/55581",
    repositoryUrl: "https://github.com/rails/rails",
    orgLogo: "https://avatars.githubusercontent.com/u/4223?s=200&v=4", // Rails organization logo
    lines: "+1 -1"
  }
];

const ContributionCard = ({ contribution, index }) => {
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
        className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg transition-all duration-300 h-full ${isHovered ? 'scale-105 shadow-xl border-green-500/50' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Organization Logo Header */}
        <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
          <img 
            src={contribution.orgLogo} 
            alt={`${contribution.repository} logo`}
            className="w-16 h-16 rounded-lg shadow-lg"
          />
          <div className="absolute top-3 right-3">
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full flex items-center gap-1">
              <Check size={10} />
              {contribution.status}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          {/* Title and Repository */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white mb-1">{contribution.title}</h3>
            <span className="text-sm text-gray-400">{contribution.repository}</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-2">{contribution.description}</p>
          
          {/* Changes indicator */}
          <div className="mb-6">
            <span className="inline-flex items-center px-2 py-1 bg-gray-800/50 text-green-400 rounded text-xs border border-gray-600">
              <GitMerge size={12} className="mr-1" />
              {contribution.lines}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <a 
              href={contribution.url}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 inline-flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <GitMerge size={16} className="mr-1" />
              View PR
            </a>
            
            <a 
              href={contribution.repositoryUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center bg-gray-700 text-white py-2 px-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const OpenSource = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  return (
    <div className={`min-h-screen text-white py-16 px-4 transition-opacity duration-1000 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-8">
            <Github size={32} className="text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-blue-600 bg-clip-text text-transparent">
            Open Source Contributions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Contributing to the developer community through meaningful pull requests and code improvements
          </p>
        </div>
        
        {/* Contributions Grid - 2 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mergedContributions.map((contribution, index) => (
            <ContributionCard 
              key={index} 
              contribution={contribution} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenSource;