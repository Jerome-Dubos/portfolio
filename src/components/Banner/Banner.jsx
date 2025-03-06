import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import handleContactClick from '../../utils/handleContactClick'; // Import centralisé
import HeroWave from '../DecorativeElements/HeroWave';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import './Banner.css';

const Banner = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <section className="banner">
      <div className="container banner-container">
        <motion.div 
          className="banner-content"
          initial="hidden" 
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
        >
          <motion.h1 className="banner-title">
            Transformez votre vision en <br />
            <span className="gradient-text">expérience digitale</span> <br />
            exceptionnelle
          </motion.h1>

          <motion.div className="banner-cta">
            <motion.button
              onClick={() => navigate('/projects')}
              className="btn btn-primary"
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
      </div>

      <HeroWave className="banner-wave" />
    </section>
  );
};

export default Banner;
