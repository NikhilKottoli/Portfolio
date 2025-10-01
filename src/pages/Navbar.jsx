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
      className="sticky top-0 w-full py-4 z-50" 
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          {/* Navigation container with glass effect - this is what holds the buttons and still has a background */}
          <div className="flex items-center space-x-1 p-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-xl">
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
                    // Active state styling
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    // Inactive state styling
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                  }
                  hover:shadow-md transform hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-blue-500/20
                `}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active indicator background using framer-motion's layoutId for smooth transition */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Button text (ensure it stays on top of the background indicator) */}
                <span className="relative z-10">
                  {item.name}
                </span>
                
                {/* Subtle hover effect on the button */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar;
