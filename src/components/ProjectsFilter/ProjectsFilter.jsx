import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './ProjectsFilter.css';

const normalizeName = (name, preserveCase = false) => 
  name ? (preserveCase ? name.trim().replace(/\s+/g, ' ') : name.toLowerCase().trim().replace(/\s+/g, ' ')) : '';

const ProjectsFilter = ({ 
  categories, 
  activeFilter, 
  setActiveFilter, 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="projects-filter">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Rechercher un projet..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${
              normalizeName(activeFilter) === normalizeName(category) ? 'active' : ''
            }`}
            onClick={() => setActiveFilter(category)}
          >
            {category === 'all' ? 'Tous' : category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsFilter;