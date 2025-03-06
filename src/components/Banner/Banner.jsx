import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import HeroWave from '../DecorativeElements/HeroWave';
import { FaArrowRight } from 'react-icons/fa';
import './Banner.css';

/* Données statiques du banner */
const bannerData = {
  badge: "Disponible pour missions freelance",
  title: {
    first: "Transformez votre vision en",
    highlighted: "expériences digitales",
    last: "exceptionnelles"
  },
  subtitle: {
    typewriter: "Web Developer",
    suffix: " spécialisé en création d'interfaces modernes et performantes avec React et Vue.js"
  },
  ctaButtons: [
    { text: "Voir mes projets", action: "projects", type: "primary" },
    { text: "Me contacter", action: "contact", type: "secondary" }
  ],
  image: "../../assets/images/illustration.webp"
};

const Banner = () => {
  const navigate = useNavigate();
  const [typewriter, setTypewriter] = useState({ text: '', index: 0 });

  /* Effet d'écriture Typewriter */
  useEffect(() => {
    if (typewriter.index < bannerData.subtitle.typewriter.length) {
      const timeout = setTimeout(() => {
        setTypewriter((prev) => ({
          text: prev.text + bannerData.subtitle.typewriter[prev.index],
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
          {bannerData.badge && (
            <motion.div className="banner-badge" variants={fadeInUp}>
              <span className="badge">{bannerData.badge}</span>
            </motion.div>
          )}

          {/* Titre principal avec effet de mise en valeur */}
          <motion.h1 className="banner-title" variants={fadeInUp}>
            {bannerData.title.first} <br />
            <span className="gradient-text">{bannerData.title.highlighted}</span> <br />
            {bannerData.title.last}
          </motion.h1>

          {/* Sous-titre avec effet typewriter */}
          <motion.p className="banner-subtitle" variants={fadeInUp}>
            <span className="typewriter">{typewriter.text}</span>
            <span className="cursor"></span>
            {bannerData.subtitle.suffix}
          </motion.p>

          {/* Boutons d'action (CTA) */}
          <motion.div className="banner-cta" variants={fadeInUp}>
            {bannerData.ctaButtons.map((button, index) => (
              <motion.button
                key={index}
                onClick={() => handleButtonClick(button.action)}
                className={`btn btn-${button.type}`}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: index === 0 
                    ? "0 0 25px rgba(212, 177, 95, 0.3)" 
                    : "0 8px 15px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {button.text} {index === 0 && <FaArrowRight className="btn-icon" />}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Illustration du banner */}
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

      {/* Élément décoratif en bas */}
      <HeroWave className="banner-wave" />
    </section>
  );
};

export default Banner;
