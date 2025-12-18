import { useState, useEffect } from 'react';
import { Github, GitMerge, Check } from 'lucide-react';

// 1. Your data is now grouped by organization
const mergedContributions = [
  {
    orgName: "Ruby On Rails",
    orgLogo: "https://avatars.githubusercontent.com/u/4223?s=200&v=4",
    orgUrl: "https://github.com/rails",
    prs: [
      {
        repository: "rails/rails",
        prNumber: "55581",
        description: "Documentation Correction for Rails Release 8.0",
        status: "Merged",
        url: "https://github.com/rails/rails/pull/55581",
        lines: "+1 -1"
      },
      {
        repository: "rails/cssbundling-rails",
        prNumber: "182",
        description: "Documentation Fix for css bundler",
        status: "Merged",
        url: "https://github.com/rails/cssbundling-rails/pull/182",
        lines: "+8 -2"
      }
      // Add more PRs for 'Ruby On Rails' here
    ]
  },
  // Add more organizations here
];


// 2. The card is now an "Org" card that lists PRs
const OrgContributionCard = ({ contributionGroup, index }) => {
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
        className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col ${isHovered ? 'scale-105 shadow-xl border-green-500/50' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Organization Logo Header */}
        <div className="relative h-32 bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
          <img 
            src={contributionGroup.orgLogo} 
            alt={`${contributionGroup.orgName} logo`}
            className="w-16 h-16 rounded-lg shadow-lg"
          />
          {/* Link to the organization page */}
          <a 
            href={contributionGroup.orgUrl}
            target="_blank" 
            rel="noopener noreferrer" 
            className="absolute top-3 right-3 inline-flex items-center justify-center bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 transition-colors"
            title={`View ${contributionGroup.orgName} on GitHub`}
          >
            <Github size={16} />
          </a>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          {/* Organization Title */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1">{contributionGroup.orgName}</h3>
            <span className="text-sm text-gray-400">
              {contributionGroup.prs.length} Merged Contribution(s)
            </span>
          </div>
          
          {/* List of PRs */}
          <div className="flex-1 space-y-4">
            {contributionGroup.prs.map((pr) => (
              <div 
                key={pr.prNumber} 
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 transition-all hover:border-gray-600"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <a 
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-white hover:text-green-400"
                    >
                      {pr.repository} #{pr.prNumber}
                    </a>
                    <p className="text-gray-300 text-sm leading-snug line-clamp-2 mt-1">
                      {pr.description}
                    </p>
                  </div>
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full flex items-center gap-1 flex-shrink-0 ml-2">
                    <Check size={10} />
                    {pr.status}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="inline-flex items-center px-2 py-1 bg-gray-700 text-green-400 rounded text-xs border border-gray-600">
                    <GitMerge size={12} className="mr-1" />
                    {pr.lines}
                  </span>
                  <a 
                    href={pr.url}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center bg-green-600 text-white py-1.5 px-3 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                  >
                    <GitMerge size={14} className="mr-1" />
                    View PR
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. The main component maps the new card and passes the new prop
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
          {mergedContributions.map((contributionGroup, index) => (
            <OrgContributionCard 
              key={contributionGroup.orgName} 
              contributionGroup={contributionGroup} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OpenSource;