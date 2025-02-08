import React, { useState } from 'react';
import { Award, Crown, X, Shield, Star, Trophy } from 'lucide-react';

const certifications = [
  {
    id: 1,
    name: "Postman Student Expert",
    issuer: "Postman",
    image: `${process.env.PUBLIC_URL}/Postman.png`,
    description: "Certification in API testing and automation using Postman.",
    icon: "trophy"
  }
];

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'trophy':
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      default:
        return <Award className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/20 to-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center mb-4">
            <Crown 
              className="w-12 h-12 animate-bounce" 
              style={{
                color: '#FFD700',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
                stroke: 'url(#goldGradient)'
              }}
            />
            <svg width="0" height="0">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#FFD700' }} />
                  <stop offset="50%" style={{ stopColor: '#FFA500' }} />
                  <stop offset="100%" style={{ stopColor: '#DAA520' }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text">
            Certifications
          </h2>
          <p className="text-gray-400">Professional achievements and credentials</p>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 blur-3xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-purple-900/40 rounded-xl p-6 cursor-pointer border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getIcon(cert.icon)}
                  <h3 className="text-xl font-semibold text-white ml-2">{cert.name}</h3>
                </div>
                <Shield className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-purple-200 mb-2">{cert.issuer}</p>
              <div className="absolute bottom-2 right-2">
                <Star className="w-4 h-4 text-yellow-400/40 group-hover:text-yellow-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {selectedCert && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="bg-gradient-to-br from-purple-900/90 to-purple-800/90 rounded-xl p-8 max-w-2xl w-full relative border border-purple-500/30 shadow-2xl transform transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-purple-300 hover:text-white transition-colors"
                onClick={() => setSelectedCert(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="relative w-full h-64 mb-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 rounded-lg" />
                <img
                  src={selectedCert.image}
                  alt={selectedCert.name}
                  className="w-160 h-60 object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
                <h3 className="text-3xl font-bold text-white">{selectedCert.name}</h3>
              </div>
              <p className="text-purple-300 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                {selectedCert.issuer}
              </p>
              <p className="text-purple-300 mb-4">{selectedCert.date}</p>
              <p className="text-white/90 leading-relaxed">{selectedCert.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;