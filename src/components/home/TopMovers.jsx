import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CryptoCard from '../common/CryptoCard';
import { FaArrowUp, FaArrowDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const TopMovers = ({ cryptos }) => {
    const [activeSection, setActiveSection] = useState('gainers');
  const [carouselIndex, setCarouselIndex] = useState(0);
  // TODO Get top gainers and losers
  const gainers = [...cryptos]
    .sort((a, b) => b.percent_change_24h - a.percent_change_24h)
    .slice(0, 4);
    
  const losers = [...cryptos]
    .sort((a, b) => a.percent_change_24h - b.percent_change_24h)
    .slice(0, 4);


  const nextCard = () => {
    setCarouselIndex(prev => (prev + 1) % 4);
  };

  const prevCard = () => {
    setCarouselIndex(prev => (prev === 0 ? 3 : prev - 1));
  };

  return (
    <div className="mb-8">
      <div className="md:hidden flex justify-center mb-6">
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveSection('gainers')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'gainers'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setActiveSection('losers')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeSection === 'losers'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            Top Losers
          </button>
        </div>
      </div>

    
      <div className="hidden md:block">
        <div className="mb-6">
          <motion.h3 
            className="text-lg font-semibold mb-3 text-green-400 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FaArrowUp className="mr-2" />
            Top Gainers
            <motion.span 
              className="ml-2 text-xs bg-green-900/30 px-2 py-1 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              24h Performance
            </motion.span>
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {gainers.map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CryptoCard 
                  crypto={crypto} 
                  highlight="gain" 
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <motion.h3 
            className="text-lg font-semibold mb-3 text-red-400 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaArrowDown className="mr-2" />
            Top Losers
            <motion.span 
              className="ml-2 text-xs bg-red-900/30 px-2 py-1 rounded-full"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              24h Performance
            </motion.span>
          </motion.h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {losers.map((crypto, index) => (
              <motion.div
                key={crypto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CryptoCard 
                  crypto={crypto} 
                  highlight="loss" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {activeSection === 'gainers' && (
            <motion.div
              key="gainers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.h3 
                  className="text-lg font-semibold text-green-400 flex items-center"
                >
                  <FaArrowUp className="mr-2" />
                  Top Gainers
                </motion.h3>
                <div className="flex gap-2">
                  <button 
                    onClick={prevCard}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={nextCard}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              
              <motion.div
                key={`gainers-${carouselIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <CryptoCard 
                  crypto={gainers[carouselIndex]} 
                  highlight="gain" 
                  isMobileCard={true}
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex gap-1">
                    {gainers.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === carouselIndex ? 'bg-green-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeSection === 'losers' && (
            <motion.div
              key="losers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.h3 
                  className="text-lg font-semibold text-red-400 flex items-center"
                >
                  <FaArrowDown className="mr-2" />
                  Top Losers
                </motion.h3>
                <div className="flex gap-2">
                  <button 
                    onClick={prevCard}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                  >
                    <FaChevronLeft />
                  </button>
                  <button 
                    onClick={nextCard}
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              
              <motion.div
                key={`losers-${carouselIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <CryptoCard 
                  crypto={losers[carouselIndex]} 
                  highlight="loss" 
                  isMobileCard={true}
                />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="flex gap-1">
                    {losers.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === carouselIndex ? 'bg-red-400' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopMovers;