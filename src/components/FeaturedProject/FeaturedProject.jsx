import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CircleShape } from "../DecorativeElements/DecorativeShapes";
import "./FeaturedProject.css";

const FeaturedProject = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data) => {
        const featured = data.filter((project) => project.featured);
        setFeaturedProjects(featured);
      })
      .catch((error) => console.error("Erreur lors du chargement des projets:", error));
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredProjects.length) % featuredProjects.length);
  };

  if (featuredProjects.length === 0) return null;

  const project = featuredProjects[currentIndex];

  return (
    <section className="featured-project">
      <CircleShape 
        bottom="-150px" 
        left="-150px" 
        size={300}
        color="var(--secondary)" 
        opacity={0.07} 
      />
      
      <div className="container">
        <div className="carousel-controls">
          <button className="carousel-btn" onClick={prevProject}><FaChevronLeft /></button>
          <button className="carousel-btn" onClick={nextProject}><FaChevronRight /></button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div 
            key={project.id}
            className="featured-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="featured-text">
              <span className="featured-label">Projet en vedette</span>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              
              <div className="featured-tags">
                {project.tags.map((tech, index) => (
                  <span key={index} className="tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-links">
                <Link to={project.demo} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                  Voir la démo <FaArrowRight />
                </Link>
                <Link to={project.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  Code source
                </Link>
              </div>
            </motion.div>
            
            <motion.div className="featured-image">
              <img src={project.image} alt={project.title} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        <div className="all-projects-btn-container">
          <Link to="/projects" className="btn btn-outline-primary btn-lg">
            Voir tous les projets <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;