import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaTools,
  FaArrowRight
} from 'react-icons/fa';
import { IoConstructOutline } from 'react-icons/io5';
import './Error.css';

const Error = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Gestion du bouton "En savoir plus" similaire à la NavBar
  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/about") {
      // Si l'utilisateur est déjà sur la page "À propos", faire défiler jusqu'à la section contact
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Sinon, naviguer vers la page "À propos" puis faire défiler jusqu'à la section contact
      navigate("/about#contact");
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 500);
    }
  };

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
            <IoConstructOutline />
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
            En construction
          </motion.div>
          
          <h1>Page en développement</h1>
          
          <p className="error-description">
            Cette page est actuellement en cours de développement. 
            Je travaille activement à créer du contenu innovant et pertinent. 
            Revenez bientôt pour découvrir les dernières mises à jour !
          </p>
          
          <div className="error-actions">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="btn btn-primary btn-cta btn-glow-hover">
                <FaHome /> Retour à l'accueil <FaArrowRight className="btn-icon" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                className="btn btn-secondary" 
                onClick={handleContactClick}
              >
                <FaTools /> En savoir plus
              </button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="error-illustration"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <IoConstructOutline className="construction-icon" />
        </motion.div>
      </div>
    </div>
  );
};

export default Error;