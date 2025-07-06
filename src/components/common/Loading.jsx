import React from 'react';
import { motion } from 'framer-motion';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';

const Loading = ({ text = "Loading market data..." }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[70vh] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ring Rotate */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="text-5xl md:text-6xl text-yellow-400 bg-gray-800/80 rounded-full p-4">
            <FaBitcoin />
          </div>
        </motion.div>
        
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.3
          }}
        >
          <div className="text-3xl text-purple-400 bg-gray-800/80 rounded-full p-3">
            <FaEthereum />
          </div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-1/4"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.6
          }}
        >
          <div className="text-2xl text-green-400 bg-gray-800/80 rounded-full p-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-teal-500" />
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="mt-8 text-center max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h3 
          className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundSize: '200% 200%'
          }}
        >
          CryptoSphere Tracker
        </motion.h3>
        
        <motion.p 
          className="text-gray-400"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.p>
        
        {/* Progress indicator */}
        <motion.div 
          className="mt-6 h-1.5 w-48 bg-gray-800 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "12rem" }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
            animate={{ 
              x: ["-100%", "100%"],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;