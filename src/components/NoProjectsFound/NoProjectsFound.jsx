import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import './NoProjectsFound.css';

const NoProjectsFound = ({ resetFilters }) => {
  return (
    <motion.div 
      className="no-projects-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FaSearch className="search-large-icon" />
      <h3>Aucun projet ne correspond à votre recherche</h3>
      <p>Essayez de modifier vos critères de recherche ou de réinitialiser les filtres.</p>
      <motion.button 
        className="btn btn-primary btn-cta btn-glow-hover"
        onClick={resetFilters}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Réinitialiser les filtres de recherche
      </motion.button>
    </motion.div>
  );
};

export default NoProjectsFound;