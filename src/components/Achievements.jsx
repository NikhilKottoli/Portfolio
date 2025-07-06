import React, { useState } from 'react';
import { Trophy, X, Calendar, Code, Award, Shield, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

// ============================
// DATA CONFIGURATION
// ============================
const ACHIEVEMENTS_DATA = {
  pageTitle: "Achievements",
  pageSubtitle: "Celebrating innovation, technical excellence, and professional recognition",

  hackathonWins: [
    {
      id: 1,
      name: "Polkadot AssetHub 2025",
      organizer: "Polkadot",
      position: "3rd Place",
      date: "June 2025",
      image: `${process.env.PUBLIC_URL}/Polkadot.webp`,
      description: "Polkaflow is a visual blockchain workflow builder that empowers users to design, generate, and deploy smart contracts for the Polkadot ecosystem with ease. By leveraging PolkaVM, AssetHub, and both AI-driven and manual logic code generation, Polkaflow makes blockchain development accessible for everyone—from no-code users to advanced developers.",
      category: "Web3",
      link: "https://dorahacks.io/buidl/26737",
      type: "hackathon"
    },
  ],

  certifications: [
    {
      id: 4,
      name: "Postman Student Expert",
      issuer: "Postman",
      image: `${process.env.PUBLIC_URL}/Postman.png`,
      description: "Certification in API testing and automation using Postman. Demonstrated proficiency in creating and managing API tests, collections, and automated testing workflows.",
      date: "API testing and automation using Postman",
      icon: "trophy",
      type: "certification"
    },
    {
      id: 5,
      name: "C++ basics certification codechef",
      issuer: "CodeChef",
      image: `${process.env.PUBLIC_URL}/codechef_cpp.png`,
      description: "Certification in C++ programming fundamentals. Covered basic syntax, data structures, algorithms, and problem-solving techniques using C++.",
      date: "C++ programming fundamentals",
      icon: "trophy",
      type: "certification"
    }
  ]
};

// ============================
// COMPONENTS
// ============================
const HackathonCard = ({ hackathon, index, onClick }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'AI/ML':
        return 'from-[#3b82f6] to-[#1d4ed8]';
      case 'Social Impact':
        return 'from-[#10b981] to-[#047857]';
      case 'EdTech':
        return 'from-[#8b5cf6] to-[#7c3aed]';
      case 'Design':
        return 'from-[#f59e0b] to-[#d97706]';
      case 'Web3':
        return 'from-[#ec4899] to-[#be185d]';
      default:
        return 'from-[#6b7280] to-[#4b5563]';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer aspect-square"
      onClick={() => onClick(hackathon)}
    >
      <div className="relative p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] transition-all duration-300 hover:bg-[#1e293b]/50 backdrop-blur-sm overflow-hidden flex flex-col">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(hackathon.category)} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${getCategoryColor(hackathon.category)}`}>
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-[#f8fafc] group-hover:text-white transition-colors line-clamp-2">
                {hackathon.name}
              </h3>
              <p className="text-[#3b82f6] font-semibold text-sm truncate">{hackathon.organizer}</p>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(hackathon.category)} text-white whitespace-nowrap`}>
            {hackathon.category}
          </span>
        </div>

        {/* Position and Date */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center gap-4 text-sm text-[#94a3b8]">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-[#f59e0b] font-semibold">{hackathon.position}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{hackathon.date}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="relative z-10 flex-1 flex flex-col">
          <p className="text-[#cbd5e1] text-sm leading-relaxed line-clamp-4 flex-1">
            {hackathon.description}
          </p>
          
          {/* View more indicator */}
          <div className="mt-4 text-[#3b82f6] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Click to view details →
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CertificationCard = ({ cert, index, onClick }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-[#f59e0b]" />;
      default:
        return <Award className="w-6 h-6 text-[#8b5cf6]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#0f172a] rounded-xl p-6 cursor-pointer border border-[#1e293b] hover:border-[#334155] transition-all duration-300 hover:shadow-2xl hover:shadow-[#8b5cf6]/20 hover:-translate-y-1"
      onClick={() => onClick(cert)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/0 via-[#8b5cf6]/10 to-[#8b5cf6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getIcon(cert.icon)}
          <h3 className="text-xl font-semibold text-[#f8fafc] ml-2">{cert.name}</h3>
        </div>
        <Shield className="w-5 h-5 text-[#8b5cf6] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-[#94a3b8] mb-2">{cert.issuer}</p>
      <p className="text-[#64748b] text-sm mb-2">{cert.date}</p>
      <div className="absolute bottom-2 right-2">
        <Star className="w-4 h-4 text-[#f59e0b]/40 group-hover:text-[#f59e0b] transition-colors" />
      </div>
    </motion.div>
  );
};

// ============================
// MAIN COMPONENT
// ============================
const Achievements = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { pageTitle, pageSubtitle, hackathonWins, certifications } = ACHIEVEMENTS_DATA;

  return (
    <div className="min-h-screen bg-black to-[#1e293b] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-[#f59e0b]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#f8fafc] mb-6">
            {pageTitle}
          </h1>
          <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#f59e0b] to-[#8b5cf6] mx-auto rounded-full" />
        </motion.div>

        {/* Hackathon Wins */}
        <section className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-[#f8fafc] mb-12 flex items-center gap-3"
          >
            Hackathon Wins
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hackathonWins.map((hackathon, index) => (
              <HackathonCard
                key={hackathon.id}
                hackathon={hackathon}
                index={index}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-[#f8fafc] mb-12 flex items-center gap-3"
          >
            <Award className="w-8 h-8 text-[#8b5cf6]" />
            Professional Certifications
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard
                key={cert.id}
                cert={cert}
                index={index}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-md"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-8 max-w-4xl w-full relative border border-[#334155] shadow-2xl backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-[#94a3b8] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#1e293b]"
              onClick={() => setSelectedItem(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {selectedItem.type === 'hackathon' ? (
              // Hackathon Modal Content
              <div className="mb-6">
                {/* Image Display */}
                {selectedItem.image && (
                  <div className="relative w-full h-64 mb-6 flex items-center justify-center bg-[#1e293b]/30 rounded-lg overflow-hidden">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="max-w-full max-h-full object-contain rounded-lg"
                      onError={(e) => {
                        console.log('Image failed to load:', selectedItem.image);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', selectedItem.image);
                      }}
                    />
                  </div>
                )}

                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706]">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#f8fafc]">{selectedItem.name}</h3>
                    <p className="text-[#3b82f6] text-lg font-semibold">{selectedItem.organizer}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg bg-[#1e293b]/50">
                    <Trophy className="w-6 h-6 text-[#f59e0b] mx-auto mb-2" />
                    <div className="text-sm text-[#94a3b8]">Position</div>
                    <div className="font-semibold text-[#f8fafc]">{selectedItem.position}</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-[#1e293b]/50">
                    <Calendar className="w-6 h-6 text-[#3b82f6] mx-auto mb-2" />
                    <div className="text-sm text-[#94a3b8]">Date</div>
                    <div className="font-semibold text-[#f8fafc]">{selectedItem.date}</div>
                  </div>
                </div>

                <p className="text-[#cbd5e1] leading-relaxed mb-6">
                  {selectedItem.description}
                </p>

                {selectedItem.link && (
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white rounded-lg hover:from-[#2563eb] hover:to-[#7c3aed] transition-all duration-300 font-medium"
                  >
                    <Code className="w-5 h-5" />
                    View Project
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ) : (
              // Certification Modal Content
              <div className="mb-6">
                <div className="relative w-full h-64 mb-6 flex items-center justify-center bg-[#1e293b]/30 rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                    onError={(e) => {
                      console.log('Certificate image failed to load:', selectedItem.image);
                      e.target.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('Certificate image loaded successfully:', selectedItem.image);
                    }}
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <Trophy className="w-8 h-8 text-[#f59e0b] mr-3" />
                  <h3 className="text-3xl font-bold text-[#f8fafc]">{selectedItem.name}</h3>
                </div>
                <p className="text-[#8b5cf6] mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  {selectedItem.issuer}
                </p>
                <p className="text-[#94a3b8] mb-4">{selectedItem.date}</p>
                <p className="text-[#cbd5e1] leading-relaxed">{selectedItem.description}</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Achievements;
