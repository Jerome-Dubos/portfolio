import React, { useState, useEffect } from 'react';
import './HeroWave.css';

const HeroWave = ({ 
  className,
  animated = true,
  customGradient = null,
  accentColor = null,
  starsDensity = 'medium'
}) => {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
        }
      });
    };

    const observer = new MutationObserver(handleThemeChange);
    
    observer.observe(document.documentElement, { 
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const gradientColors = customGradient || {
    dark: {
      start: "rgba(10, 10, 10, 0.8)",
      middle: "rgba(15, 15, 15, 0.85)",
      end: "rgba(10, 10, 10, 0.8)"
    },
    light: {
      start: "rgba(245, 240, 230, 0.8)",
      middle: "rgba(250, 247, 242, 0.85)",
      end: "rgba(245, 240, 230, 0.8)"
    }
  };

  const currentColors = gradientColors[theme];
  const goldColor = accentColor || 'var(--gold-soft)';
  const goldLightColor = accentColor ? `${accentColor}80` : 'var(--gold-light)';

  const getStars = () => {
    let starsCount;
    switch(starsDensity) {
      case 'low':
        starsCount = 4;
        break;
      case 'high':
        starsCount = 12;
        break;
      case 'medium':
      default:
        starsCount = 8;
        break;
    }

    const stars = [];
    for (let i = 0; i < starsCount; i++) {
      const x = Math.floor(Math.random() * 1400) + 20;
      const y = Math.floor(Math.random() * 150) + 80;
      const size = (Math.random() * 1.5) + 0.5;
      const color = Math.random() > 0.5 ? goldColor : goldLightColor;
      stars.push(
        <circle 
          key={i} 
          cx={x} 
          cy={y} 
          r={size} 
          fill={color} 
          opacity={(Math.random() * 0.5) + 0.3}
        />
      );
    }
    return stars;
  };

  return (
    <svg 
      className={`hero-wave ${animated ? 'animate-wave' : ''} ${className || ''}`} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1440 320" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={currentColors.start} />
          <stop offset="50%" stopColor={currentColors.middle} />
          <stop offset="100%" stopColor={currentColors.end} />
        </linearGradient>
        
        <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <path 
        fill="url(#waveGradient)" 
        d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,149.3C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      />
      
      <path 
        fill="none" 
        stroke={goldColor} 
        strokeOpacity="0.15" 
        strokeWidth="1" 
        filter="url(#glow)"
        d="M0,64L48,80C96,96,192,128,288,144C384,160,480,160,576,149.3C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128"
      />
      
      <g opacity="0.4" filter="url(#softGlow)">
        {getStars()}
      </g>
    </svg>
  );
};

export default HeroWave;