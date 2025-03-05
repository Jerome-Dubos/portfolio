import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroWave from '../DecorativeElements/HeroWave';
import { DotsPattern } from '../DecorativeElements/DecorativeShapes';
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
      url: "/projects",
      type: "primary",
      size: "lg"
    },
    {
      text: "Me contacter",
      url: "/contact", 
      type: "secondary",
      size: "lg"
    }
  ],
  image: "/assets/hero-illustration.svg"
};

const Banner = () => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  // Animation du texte typewriter
  React.useEffect(() => {
    if (currentIndex < bannerData.subtitle.typewriter.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + bannerData.subtitle.typewriter[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <section className="banner">
      <DotsPattern height="50%" opacity={0.03} />
      <div className="container banner-container">
        <div className="banner-content">
          {bannerData.badge && (
            <motion.div 
              className="banner-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge">{bannerData.badge}</span>
            </motion.div>
          )}
          
          <motion.h1 
            className="banner-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {bannerData.title.first && <>{bannerData.title.first}<br /></>}
            {bannerData.title.highlighted && <span className="gradient-text">{bannerData.title.highlighted}</span>}
            {bannerData.title.last && <><br />{bannerData.title.last}</>}
          </motion.h1>
          
          {bannerData.subtitle && (
            <motion.p 
              className="banner-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {bannerData.ctaButtons.map((button, index) => (
                <Link 
                  key={index}
                  to={button.url} 
                  className={`btn btn-${button.type} ${button.size ? `btn-${button.size}` : ''}`}
                >
                  {button.text}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
        
        {bannerData.image && (
          <motion.div 
            className="banner-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img src={bannerData.image} alt="Illustration" />
          </motion.div>
        )}
      </div>
      
      <HeroWave className="banner-wave" />
    </section>
  );
};

export default Banner;