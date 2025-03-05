import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  return (
    <section className="error-section">
      <div className="error-container">
        <motion.div 
          className="error-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="error-code">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                type: "spring", 
                stiffness: 100 
              }}
            >
              4
            </motion.span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: 1
              }}
              transition={{ 
                duration: 1.2,
                delay: 0.2,
                type: "spring", 
                stiffness: 100 
              }}
            >
              0
            </motion.span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                type: "spring", 
                stiffness: 100 
              }}
            >
              4
            </motion.span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Page introuvable
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="error-message"
          >
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="error-actions"
          >
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Me contacter
            </Link>
          </motion.div>
        </motion.div>
        
        <div className="error-illustration">
          <motion.img
            src="/assets/error-illustration.svg"
            alt="Page non trouvée"
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>
      
      <div className="error-background">
        <div className="error-shape error-shape-1"></div>
        <div className="error-shape error-shape-2"></div>
        <div className="error-shape error-shape-3"></div>
        <div className="error-shape error-shape-4"></div>
      </div>
    </section>
  );
};

export default Error;