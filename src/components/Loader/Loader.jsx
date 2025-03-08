import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = ({ fullScreen = true }) => {
  return (
    <div className={`loader-container ${!fullScreen ? 'relative' : ''}`}>
      <motion.div
        className="loader-dots"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {[
          { className: 'loader-dot-1', delay: 0 },
          { className: 'loader-dot-2', delay: 0.2 },
          { className: 'loader-dot-3', delay: 0.4 }
        ].map((dot, index) => (
          <motion.div 
            key={index}
            className={`loader-dot ${dot.className}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: dot.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
      
      <motion.div
        className="loader-background"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default Loader;