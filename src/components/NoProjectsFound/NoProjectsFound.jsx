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
      <button 
        className="btn btn-primary"
        onClick={resetFilters}
      >
        Voir tous les projets
      </button>
    </motion.div>
  );
};

export default NoProjectsFound;