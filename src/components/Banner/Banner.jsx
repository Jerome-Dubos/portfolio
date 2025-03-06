import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroWave from '../DecorativeElements/HeroWave';
import { FaArrowRight } from 'react-icons/fa';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();
  const [typewriter, setTypewriter] = useState({ text: '', index: 0 });

  /* Effet d'écriture Typewriter */
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

  /* Gestion du clic sur les boutons CTA */
  const handleButtonClick = (action) => {
    const target = document.getElementById(action);
    if (target) {
      window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  };

  /* Variants d'animation */
  const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <section className="banner">
      {/* Orbes lumineux pour effet visuel */}
      <div className="glow-orb"></div>
      <div className="glow-orb secondary"></div>
      <div className="glow-orb tertiary"></div>
      <div className="golden-mist"></div>
      
      {/* Effets de glow améliorés */}
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

      {/* Conteneur principal */}
      <div className="container banner-container">
        
        {/* Contenu textuel */}
        <motion.div 
          className="banner-content" 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
        >

          {/* Badge "Disponible pour missions freelance" */}
          <motion.div className="banner-badge" variants={fadeInUp}>
            <span className="badge">Disponible pour missions freelance</span>
          </motion.div>

          {/* Titre principal avec effet de mise en valeur */}
          <motion.h1 className="banner-title" variants={fadeInUp}>
            Transformez votre vision en <br />
            <span className="gradient-text">expériences digitales</span> <br />
            exceptionnelles
          </motion.h1>

          {/* Sous-titre avec effet typewriter */}
          <motion.p className="banner-subtitle" variants={fadeInUp}>
            <span className="typewriter">{typewriter.text}</span>
            <span className="cursor"></span>
            {" spécialisé en création d'interfaces modernes et performantes avec React et Vue.js"}
          </motion.p>

          {/* Boutons d'action (CTA) */}
          <motion.div className="banner-cta" variants={fadeInUp}>
            <motion.button
              onClick={() => handleButtonClick("projects")}
              className="btn btn-primary"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 25px rgba(212, 177, 95, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Voir mes projets <FaArrowRight className="btn-icon" />
            </motion.button>

            <motion.button
              onClick={() => handleButtonClick("contact")}
              className="btn btn-secondary"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Me contacter
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Élément de glow interactif remplaçant la vidéo */}
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

      {/* Élément décoratif en bas */}
      <HeroWave className="banner-wave" />
    </section>
  );
};

export default Banner;