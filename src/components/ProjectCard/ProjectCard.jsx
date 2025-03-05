import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project, featured = false, delay = 0 }) => {
  if (!project) return null;
  
  return (
    <motion.div
      className={`project-card ${featured ? 'featured-project-card' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay">
          <div className="project-actions">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
                aria-label="Voir le code sur GitHub"
              >
                <FaGithub />
              </a>
            )}
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
                aria-label="Voir la démo du projet"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        
        <div className="project-meta">
          <div className="project-tags">
            {project.tags && project.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
          
          <div className="project-info">
            {project.year && <span className="project-year">{project.year}</span>}
            {project.durationHours && (
              <span className="project-duration">
                <FaRegCalendarAlt /> {project.durationHours}h
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;