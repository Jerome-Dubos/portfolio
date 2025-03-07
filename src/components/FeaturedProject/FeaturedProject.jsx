import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CircleShape } from "../DecorativeElements/DecorativeShapes";
import "./FeaturedProject.css";

const FeaturedProject = () => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((response) => response.json())
      .then((data) => {
        const latestProject = data.reduce((latest, current) => {
          const [latestMonth, latestYear] = latest.year.split("/").map(Number);
          const [currentMonth, currentYear] = current.year.split("/").map(Number);

          const latestDate = new Date(latestYear, latestMonth - 1); // Mois commence à 0
          const currentDate = new Date(currentYear, currentMonth - 1);

          return currentDate > latestDate ? current : latest;
        });

        setProject(latestProject);
      })
      .catch((error) => console.error("Erreur lors du chargement du projet:", error));
  }, []);

  if (!project) return null;

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
        <motion.div 
          className="featured-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="featured-text">
            <span className="featured-label">Dernier projet</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            
            <div className="featured-tags">
              {project.tags.map((tech, index) => (
                <span key={index} className="tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              <Link to={project.demo} className="btn btn-primary btn-cta" target="_blank" rel="noopener noreferrer">
                Voir le site <FaArrowRight className="btn-icon" />
              </Link>
              {project.github && (
                <Link to={project.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                  Code source
                </Link>
              )}
            </div>
          </motion.div>
          
          <motion.div className="featured-image">
            <img src={project.image} alt={project.title} />
          </motion.div>
        </motion.div>
        
        <div className="all-projects-btn-container">
          <Link to="/projects" className="btn btn-outline btn-lg btn-glow-hover">
            Voir tous mes projets <FaArrowRight className="btn-icon" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;
