import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project, featured = false, delay = 0 }) => {
  if (!project) return null;
  
  const projectGithub = project.githubLink || project.github || '';
  const projectDemo = project.demoLink || project.demo || '';
  const projectYear = project.year || (project.createdAt ? new Date(project.createdAt).toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' }).replace('/', '/') : '');
  
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
            {projectGithub && (
              <a 
                href={projectGithub} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
                aria-label="Voir le code sur GitHub"
              >
                <FaGithub />
              </a>
            )}
            {projectDemo && (
              <a 
                href={projectDemo} 
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
            {projectYear && <span className="project-year">{projectYear}</span>}
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