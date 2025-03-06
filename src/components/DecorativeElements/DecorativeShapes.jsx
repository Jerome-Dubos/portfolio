import React from 'react';

export const CircleShape = ({ className, color, size = 200, top, left, right, bottom, opacity = 0.1 }) => {
  const style = {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: color || 'var(--primary)',
    opacity: opacity,
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    zIndex: -2, // Modifié pour être en-dessous des waves
    filter: 'blur(50px)', // Ajout d'un effet de flou pour plus de subtilité
  };

  return <div className={className} style={style}></div>;
};

export const DotsPattern = ({ className, width = '100%', height = '100%', opacity = 0.05 }) => {
  const style = {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    opacity: opacity,
    zIndex: -2, // Modifié pour être en-dessous des waves
  };

  return <div className={className} style={style}></div>;
};

export const WavyLine = ({ className }) => {
  return (
    <svg 
      className={className} 
      width="100%" 
      height="20" 
      viewBox="0 0 1000 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: -2 }} // Ajout du zIndex
    >
      <path
        d="M0 10C83.3333 -3.33333 166.667 -3.33333 250 10C333.333 23.3333 416.667 23.3333 500 10C583.333 -3.33333 666.667 -3.33333 750 10C833.333 23.3333 916.667 23.3333 1000 10"
        stroke="var(--primary)"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
    </svg>
  );
};