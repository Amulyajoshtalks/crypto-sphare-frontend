import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaArrowDown, FaStar, FaRegStar } from 'react-icons/fa';

const CryptoCard = ({ crypto, highlight, isFavorite, onToggleFavorite, isMobileCard }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Determine highlight styles
  const highlightStyle = highlight === 'gain' 
    ? 'ring-2 ring-green-500' 
    : highlight === 'loss' 
      ? 'ring-2 ring-red-500' 
      : '';

  // Card size based on context
  const cardSize = isMobileCard 
    ? 'w-full max-w-md mx-auto' 
    : '';

  // Generate gradient based on symbol
  const getGradient = (symbol) => {
    const firstChar = symbol.charCodeAt(0);
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-cyan-500 to-blue-600',
      'from-green-500 to-teal-600',
      'from-yellow-500 to-orange-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-violet-600',
    ];
    return gradients[firstChar % gradients.length];
  };

  return (
    <motion.div 
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-gray-700 relative ${highlightStyle} ${cardSize}`}
      whileHover={!isMobileCard ? { y: -5, scale: 1.02 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Favorite button */}
      {onToggleFavorite && (
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 text-xl z-10 cursor-pointer"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <motion.span
            animate={{ scale: isFavorite ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {isFavorite ? (
              <FaStar className="text-yellow-400" />
            ) : (
              <FaStar className="text-gray-500 hover:text-yellow-400 transition-colors" />
            )}
          </motion.span>
        </button>
      )}
      
      <div className="flex items-center mb-3">
        <div className={`bg-gradient-to-br ${getGradient(crypto.symbol)} rounded-full p-2 mr-3`}>
          <motion.div 
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white font-bold text-xl">
              {crypto.symbol.charAt(0)}
            </span>
          </motion.div>
        </div>
        <div>
          <h3 className="font-bold">{crypto.symbol}</h3>
          <p className="text-sm text-gray-400">{crypto.name}</p>
        </div>
      </div>
      
      <div className="text-xl font-bold mb-2">
        {formatCurrency(crypto.price)}
      </div>
      
      <div className="flex justify-between text-sm mb-1">
        <div className="flex items-center">
          <span className="mr-1">24h:</span>
          <span className={crypto.percent_change_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
            {crypto.percent_change_24h >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            {formatPercent(crypto.percent_change_24h)}
          </span>
        </div>
        
        <div className="flex items-center">
          <span className="mr-1">7d:</span>
          <span className={crypto.percent_change_7d >= 0 ? 'text-green-400' : 'text-red-400'}>
            {crypto.percent_change_7d >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            {formatPercent(crypto.percent_change_7d)}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between text-xs">
        <div>
          <span className="text-gray-400">Market Cap:</span>
          <span className="ml-1">
            {crypto.market_cap >= 1e9 
              ? `$${(crypto.market_cap / 1e9).toFixed(2)}B` 
              : `$${(crypto.market_cap / 1e6).toFixed(2)}M`
            }
          </span>
        </div>
        <div className="text-gray-400">
          Vol: {crypto.volume_24h >= 1e9 
            ? `$${(crypto.volume_24h / 1e9).toFixed(2)}B` 
            : `$${(crypto.volume_24h / 1e6).toFixed(2)}M`
          }
        </div>
      </div>
    </motion.div>
  );
};

export default CryptoCard;