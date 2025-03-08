import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import handleContactClick from '../../utils/handleContactClick'; 
import HeroWave from '../DecorativeElements/HeroWave';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [typewriter, setTypewriter] = useState({ text: '', index: 0 });

  useEffect(() => {
    if (typewriter.index < "Web Developer".length) {
      const timeout = setTimeout(() => {
        setTypewriter((prev) => ({
          text: prev.text + "Web Developer"[prev.index],
          index: prev.index + 1
        }));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typewriter]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('.banner').nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const getScrollIndicatorDelay = () => {
    return 1.2;
  };

  return (
    <section className="banner">
      <div className="glow-orb"></div>
      <div className="glow-orb secondary"></div>
      <div className="glow-orb tertiary"></div>
      <div className="golden-mist"></div>
      <div className="immersive-effects">
        <div className="flow-line flow-line-1"></div>
        <div className="flow-line flow-line-2"></div>
        <div className="flow-line flow-line-3"></div>
        <div className="particle-container">
          {[...Array(20)].map((_, index) => (
            <div key={index} className={`particle particle-${index + 1}`}></div>
          ))}
        </div>
        <div className="light-pulse"></div>
        <div className="digital-waves"></div>
      </div>

      <div className="container banner-container">
        <motion.div 
          className="banner-content"
          initial="hidden" 
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
        >
          <motion.div className="banner-badge" variants={fadeInUp}>
            <span className="badge">Disponible pour missions freelance</span>
          </motion.div>

          <motion.h1 className="banner-title" variants={fadeInUp}>
            Transformez votre vision en <br />
            <span className="gradient-text">expérience digitale</span> <br />
            exceptionnelle
          </motion.h1>

          <motion.p className="banner-subtitle" variants={fadeInUp}>
            <span className="typewriter">{typewriter.text}</span>
            <span className="cursor"></span>
            {" spécialisé en création d'interfaces modernes et performantes avec React"}
          </motion.p>

          <motion.div className="banner-cta" variants={fadeInUp}>
            <motion.button
              onClick={() => navigate('/projects')}
              className="btn btn-primary btn-cta btn-glow-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Voir mes projets <FaArrowRight className="btn-icon" />
            </motion.button>

            <motion.button
              onClick={(e) => handleContactClick(navigate, location, e)}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Me contacter
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="interactive-glow"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            type: "spring",
            stiffness: 100
          }}
        >
          <div className="glow-container">
            <div className="glow-effect main-glow"></div>
            <div className="glow-effect secondary-glow"></div>
            <div className="glow-effect accent-glow"></div>
            <div className="spark-container">
              {[...Array(8)].map((_, index) => (
                <div key={index} className={`spark spark-${index + 1}`}></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: getScrollIndicatorDelay(), duration: 0.8 }}
        onClick={scrollToNextSection}
      >
        <motion.div 
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <FaArrowDown />
        </motion.div>
        <span>En savoir plus</span>
      </motion.div>

      <HeroWave 
        className="banner-wave" 
        tiltAngle={-8} 
        animated={true} 
      />
    </section>
  );
};

export default Banner;