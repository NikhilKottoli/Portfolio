import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'About', path: '/' },
    { name: 'Experience', path: '/Experience' },
    { name: 'Projects', path: '/Projects' },
    { name: 'Open Source', path: '/OpenSource' },
    { name: 'Contact', path: '/Contact' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 w-full py-4 z-50 backdrop-blur-xl bg-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          {/* Navigation container with glass effect */}
          <div className="flex items-center space-x-1 p-2 bg-[#f8fafc]/80 backdrop-blur-sm rounded-full border border-[#e2e8f0]/50 shadow-lg">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(item.path)}
                className={`
                  relative px-6 py-2.5 rounded-full font-medium text-sm
                  transition-all duration-300 ease-in-out
                  ${isActive(item.path)
                    ? 'bg-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/25'
                    : 'text-[#64748b] hover:text-[#0f172a] hover:bg-white/60'
                  }
                  hover:shadow-md transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/20
                `}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active indicator background */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#3b82f6] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Button text */}
                <span className="relative z-10">
                  {item.name}
                </span>
                
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3b82f6]/0 via-[#3b82f6]/5 to-[#3b82f6]/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
