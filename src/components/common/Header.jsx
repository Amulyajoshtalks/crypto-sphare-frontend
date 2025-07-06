import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaExchangeAlt, FaChartLine } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-blue-900 shadow-xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-sm"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-full flex items-center justify-center">
                <div className="bg-gradient-to-br from-cyan-200 to-white rounded-full w-8 h-8 flex items-center justify-center">
                  <FaExchangeAlt className="text-cyan-700 text-lg" />
                </div>
              </div>
            </div>
            <motion.h1 
              className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              CryptoSphere Tracker
            </motion.h1>
          </motion.div>
          
          {/* For Desktop View  */}
          <nav className="hidden md:block">
            <ul className="flex space-x-2">
              <li>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg transition-all flex items-center ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg' 
                        : 'text-gray-200 hover:bg-blue-800/50'
                    }`
                  }
                >
                  <FaChartLine className="mr-2" />
                  Market
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/converter" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg transition-all flex items-center ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg' 
                        : 'text-gray-200 hover:bg-blue-800/50'
                    }`
                  }
                >
                  <FaExchangeAlt className="mr-2" />
                  Converter
                </NavLink>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg text-gray-200 hover:bg-blue-800/50"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </motion.button>
        </div>
        
        {/* For Mobile View */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ul className="pt-4 pb-2 space-y-2">
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `block px-4 py-3 rounded-lg transition-all flex items-center ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg' 
                          : 'text-gray-200 hover:bg-blue-800/50'
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    <FaChartLine className="mr-3" />
                    Market Overview
                  </NavLink>
                </motion.li>
                <motion.li
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <NavLink 
                    to="/converter" 
                    className={({ isActive }) => 
                      `block px-4 py-3 rounded-lg transition-all flex items-center ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg' 
                          : 'text-gray-200 hover:bg-blue-800/50'
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    <FaExchangeAlt className="mr-3" />
                    Crypto Converter
                  </NavLink>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;