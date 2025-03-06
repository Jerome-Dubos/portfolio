import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaHome, 
  FaEnvelope, 
  FaExclamationTriangle 
} from 'react-icons/fa';
import './Error.css';

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <motion.div 
          className="error-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <div className="error-icon">
            <FaExclamationTriangle />
          </div>
          
          <motion.div 
            className="error-code"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 150 
            }}
          >
            404
          </motion.div>
          
          <h1>Oops! Page Introuvable</h1>
          
          <p className="error-description">
            La page que vous recherchez semble avoir disparu dans le néant numérique. 
            Peut-être a-t-elle été déplacée, supprimée ou n'a jamais existé.
          </p>
          
          <div className="error-actions">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="btn btn-primary">
                <FaHome /> Retour à l'accueil
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/contact" className="btn btn-secondary">
                <FaEnvelope /> Nous contacter
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="error-illustration"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img 
            src={`/assets/illustrations/404-${document.documentElement.getAttribute('data-theme') || 'dark'}.svg`} 
            alt="Page non trouvée" 
          />
        </motion.div>
      </div>

      {/* Éléments décoratifs */}
      <div className="error-decoration">
        <motion.div 
          className="error-bubble error-bubble-1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.2,
            transition: { 
              duration: 1, 
              delay: 0.5 
            } 
          }}
        />
        <motion.div 
          className="error-bubble error-bubble-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.1,
            transition: { 
              duration: 1, 
              delay: 0.7 
            } 
          }}
        />
        <motion.div 
          className="error-bubble error-bubble-3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 0.3,
            transition: { 
              duration: 1, 
              delay: 0.9 
            } 
          }}
        />
      </div>
    </div>
  );
};

export default Error;