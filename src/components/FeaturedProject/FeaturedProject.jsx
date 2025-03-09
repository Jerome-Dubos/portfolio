import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { CircleShape } from "../DecorativeElements/DecorativeShapes";
import "./FeaturedProject.css";

const FeaturedProject = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProject = async () => {
      try {
        setLoading(true);
        
        const response = await fetch("http://localhost:5000/api/projects");
        
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des projets");
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || "Erreur lors de la récupération des projets");
        }
        
        const featuredProjects = result.data.filter(project => project.featured);
        
        if (featuredProjects.length === 0) {
          const sortedProjects = [...result.data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setProject(sortedProjects[0]);
        } else {
          const sortedFeatured = [...featuredProjects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setProject(sortedFeatured[0]);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du projet:", err);
        setError(err.message);
        
        try {
          const response = await fetch("/data/projects.json");
          const data = await response.json();
          const featuredProject = data.find(p => p.featured) || data[0];
          setProject(featuredProject);
        } catch (backupErr) {
          console.error("Erreur lors du chargement du backup:", backupErr);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProject();
  }, []);

  if (loading) return null;
  if (error && !project) return null;
  if (!project) return null;

  const projectGithub = project.githubLink || project.github || '';
  const projectDemo = project.demoLink || project.demo || '';

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
              {project.tags && project.tags.map((tech, index) => (
                <span key={index} className="tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              {projectDemo && (
                <Link to={projectDemo} className="btn btn-primary btn-cta" target="_blank" rel="noopener noreferrer">
                  Voir le site <FaArrowRight className="btn-icon" />
                </Link>
              )}
              {projectGithub && (
                <Link to={projectGithub} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
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