import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './ProjectsFilter.css';

const ProjectsFilter = ({ activeFilter, setActiveFilter, searchTerm, setSearchTerm }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(response => response.json())
      .then(data => {
        const uniqueCategories = [...new Set(data.map(project => project.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Erreur de chargement des catégories:', error));
  }, []);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="projects-filters">
      <div className="filter-categories">
        <motion.button
          key="all"
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Tous les projets
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
      
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
          {searchTerm && (
            <button 
              className="search-clear-btn" 
              onClick={handleClearSearch}
              aria-label="Effacer la recherche"
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsFilter;