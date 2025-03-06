import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroWave from '../DecorativeElements/HeroWave';
import { FaArrowRight } from 'react-icons/fa';
import './Banner.css';

// Données statiques du banner
const bannerData = {
  badge: "Disponible pour missions freelance",
  title: {
    first: "Transformez votre vision en",
    highlighted: "expériences digitales",
    last: "exceptionnelles"
  },
  subtitle: {
    prefix: "",
    typewriter: "Web Developer",
    suffix: " spécialisé en création d'interfaces modernes et performantes avec React et Vue.js"
  },
  ctaButtons: [
    {
      text: "Voir mes projets",
      action: "projects",
      type: "primary",
      size: "lg"
    },
    {
      text: "Me contacter",
      action: "contact", 
      type: "secondary",
      size: "lg"
    }
  ],
  image: "/assets/hero-illustration.svg"
};

const Banner = () => {
  const navigate = useNavigate();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Animation du texte typewriter
  useEffect(() => {
    if (currentIndex < bannerData.subtitle.typewriter.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + bannerData.subtitle.typewriter[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Gestion des actions des boutons
  const handleButtonClick = (action) => {
    switch(action) {
      case 'projects':
        window.scrollTo(0, document.getElementById('projects')?.offsetTop || 0);
        break;
      case 'contact':
        window.scrollTo(0, document.getElementById('contact')?.offsetTop || 0);
        break;
      default:
        break;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="banner">
      <div className="glow-orb"></div>
      <div className="glow-orb secondary"></div>
      <div className="glow-orb tertiary"></div>
      <div className="golden-mist"></div>
      
      <div className="container banner-container">
        <motion.div 
          className="banner-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bannerData.badge && (
            <motion.div 
              className="banner-badge"
              variants={itemVariants}
            >
              <span className="badge">{bannerData.badge}</span>
            </motion.div>
          )}
          
          <motion.h1 
            className="banner-title"
            variants={itemVariants}
          >
            {bannerData.title.first && <>{bannerData.title.first}<br /></>}
            {bannerData.title.highlighted && <span className="gradient-text">{bannerData.title.highlighted}</span>}
            {bannerData.title.last && <><br />{bannerData.title.last}</>}
          </motion.h1>
          
          {bannerData.subtitle && (
            <motion.p 
              className="banner-subtitle"
              variants={itemVariants}
            >
              {bannerData.subtitle.prefix}
              <span className="typewriter">{displayedText}</span>
              <span className="cursor"></span>
              {bannerData.subtitle.suffix}
            </motion.p>
          )}
          
          {bannerData.ctaButtons && bannerData.ctaButtons.length > 0 && (
            <motion.div 
              className="banner-cta"
              variants={itemVariants}
            >
              {bannerData.ctaButtons.map((button, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: index === 0 
                      ? "0 0 25px rgba(212, 177, 95, 0.3)" 
                      : "0 8px 15px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button 
                    onClick={() => handleButtonClick(button.action)} 
                    className={`btn btn-${button.type} ${button.size ? `btn-${button.size}` : ''}`}
                  >
                    {button.text}
                    {index === 0 && <FaArrowRight className="btn-icon" />}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
        
        {bannerData.image && (
          <motion.div 
            className="banner-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
          >
            <div className="image-glow"></div>
            <img src={bannerData.image} alt="Illustration" />
          </motion.div>
        )}
      </div>
      
      <HeroWave className="banner-wave" />
    </section>
  );
};

export default Banner;