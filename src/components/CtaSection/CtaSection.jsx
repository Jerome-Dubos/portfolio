import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import handleContactClick from '../../utils/handleContactClick'; // Importation de la fonction
import './CtaSection.css';

const CtaSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Prêt à concrétiser votre projet ?</h2>
          <p>Discutons de vos besoins et de la manière dont je peux vous aider à atteindre vos objectifs.</p>
          
          <motion.button 
            onClick={(e) => handleContactClick(navigate, location, e)} 
            className="btn btn-primary"
            whileHover={{ scale: 1.03 }}
          >
            Me contacter
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
