import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = true }) => {
  return (
    <div 
      className="loader-container" 
      style={{
        position: fullScreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: fullScreen ? '100vh' : '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--bg-body)',
        zIndex: 9999,
        overflow: 'hidden'
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
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
          { color: 'var(--gold)', delay: 0 },
          { color: 'var(--gold-soft)', delay: 0.2 },
          { color: 'var(--gold-light)', delay: 0.4 }
        ].map((dot, index) => (
          <motion.div 
            key={index}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: dot.color,
              boxShadow: 'var(--glow-gold-soft)',
              opacity: 0.8
            }}
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
      
      {/* Effet de fond subtil */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(var(--gold-rgb), 0.1), transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.3,
          filter: 'blur(50px)',
          zIndex: -1
        }}
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