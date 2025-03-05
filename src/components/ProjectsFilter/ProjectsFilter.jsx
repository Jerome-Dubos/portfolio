import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import './ProjectsFilter.css';

const ProjectsFilter = ({ 
  categories, 
  activeFilter, 
  setActiveFilter, 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="projects-filters">
      {/* Filtres par catégorie */}
      <div className="filter-categories">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
      
      {/* Barre de recherche */}
      <div className="search-container">
        <div className="search-input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Rechercher un projet"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsFilter;