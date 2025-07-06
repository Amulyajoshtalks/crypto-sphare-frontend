import React from 'react';
import { useCrypto } from '../../context/CryptoContext';
import { motion } from 'framer-motion';

const Error = ({ message }) => {
  const { retryFetch } = useCrypto();

  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-10 px-4 bg-red-900/20 rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
        <p className="text-red-300 mb-6 max-w-md">{message || 'Failed to fetch cryptocurrency data'}</p>
        
        <motion.button
          onClick={retryFetch}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Retry
        </motion.button>
        
        <div className="mt-6 text-sm text-gray-400">
          <p>If this error persists, check:</p>
          <ul className="list-disc list-inside mt-2 text-left">
            <li>Your internet connection</li>
            <li>API key validity in backend/.env</li>
            <li>CoinMarketCap API status</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;