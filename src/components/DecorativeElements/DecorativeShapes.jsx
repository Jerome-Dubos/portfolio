import React from 'react';

export const CircleShape = ({ 
  className, 
  color, 
  size = '200px', 
  top, 
  left, 
  right, 
  bottom, 
  opacity = 0.1,
  blurAmount = '50px',
  gradient 
}) => {
  const style = {
    position: 'absolute',
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    borderRadius: '50%',
    backgroundColor: !gradient ? (color || 'var(--primary)') : undefined,
    backgroundImage: gradient ? `radial-gradient(circle, ${gradient.start}, ${gradient.end})` : undefined,
    opacity: opacity,
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    zIndex: -2,
    filter: `blur(${blurAmount})`,
  };

  return <div className={className} style={style} aria-hidden="true"></div>;
};

export const DotsPattern = ({ 
  className, 
  width = '100%', 
  height = '100%', 
  opacity = 0.05,
  dotColor = 'var(--primary)',
  dotSize = '1px',
  gridSize = '20px'
}) => {
  const style = {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    backgroundImage: `radial-gradient(${dotColor} ${dotSize}, transparent ${dotSize})`,
    backgroundSize: `${gridSize} ${gridSize}`,
    opacity: opacity,
    zIndex: -2,
  };

  return <div className={className} style={style} aria-hidden="true"></div>;
};

export const WavyLine = ({ 
  className, 
  color = 'var(--primary)', 
  opacity = 0.2, 
  strokeWidth = 2,
  animated = false 
}) => {
  return (
    <svg 
      className={`wavy-line ${animated ? 'animated-wavy-line' : ''} ${className || ''}`} 
      width="100%" 
      height="20" 
      viewBox="0 0 1000 20" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex: -2 }}
      aria-hidden="true"
    >
      <style>
        {`
          @keyframes waveAnimation {
            0% { transform: translateX(0); }
            50% { transform: translateX(-2%); }
            100% { transform: translateX(0); }
          }
          .animated-wavy-line path {
            animation: waveAnimation 8s ease-in-out infinite;
          }
        `}
      </style>
      <path
        d="M0 10C83.3333 -3.33333 166.667 -3.33333 250 10C333.333 23.3333 416.667 23.3333 500 10C583.333 -3.33333 666.667 -3.33333 750 10C833.333 23.3333 916.667 23.3333 1000 10"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};