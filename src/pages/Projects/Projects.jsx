import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import "./Projects.css";

// Données des projets (à remplacer par vos propres projets)
const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Site vitrine personnel moderne et interactif avec animations fluides.",
    longDescription: "Un portfolio personnel développé avec React et Framer Motion pour présenter mes projets et compétences. L'accent est mis sur l'expérience utilisateur avec des animations fluides et une navigation intuitive.",
    image: "/assets/projects/project1.jpg",
    technologies: ["React", "Framer Motion", "CSS3"],
    category: "Frontend",
    featured: true,
    github: "https://github.com/votre-username/portfolio",
    demo: "https://votre-portfolio.com",
    size: "large"
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Application web avec graphiques interactifs pour visualiser des données.",
    longDescription: "Une application de tableau de bord permettant de visualiser et d'analyser des données commerciales. Inclut des graphiques interactifs, des filtres personnalisables et un système d'export en PDF.",
    image: "/assets/projects/project2.jpg",
    technologies: ["React", "Chart.js", "Node.js", "Express"],
    category: "Fullstack",
    featured: true,
    github: "https://github.com/votre-username/dashboard",
    demo: "#",
    size: "medium"
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Boutique en ligne avec gestion de panier et passerelle de paiement.",
    longDescription: "Plateforme e-commerce complète avec catalogue produits, panier d'achat, système d'authentification et intégration de paiement Stripe. Inclut un tableau de bord admin pour la gestion des produits et commandes.",
    image: "/assets/projects/project3.jpg",
    technologies: ["React", "Redux", "Firebase", "Stripe"],
    category: "Fullstack",
    featured: false,
    github: "https://github.com/votre-username/ecommerce",
    demo: "#",
    size: "large"
  },
  {
    id: 4,
    title: "Weather App",
    description: "Application météo avec géolocalisation et prévisions sur 7 jours.",
    longDescription: "Application météo qui utilise la géolocalisation pour afficher les conditions météorologiques actuelles et les prévisions sur 7 jours. Inclut également une recherche par ville et des graphiques pour la température et les précipitations.",
    image: "/assets/projects/project4.jpg",
    technologies: ["Vue.js", "OpenWeather API", "CSS3"],
    category: "Frontend",
    featured: false,
    github: "https://github.com/votre-username/weather-app",
    demo: "#",
    size: "small"
  },
  {
    id: 5,
    title: "Task Manager",
    description: "Application de gestion de tâches avec glisser-déposer et filtres.",
    longDescription: "Application de gestion de tâches inspirée par Trello, avec fonctionnalité de glisser-déposer, filtres par étiquettes, dates d'échéance et membres assignés. Inclut également des notifications et un mode hors ligne.",
    image: "/assets/projects/project5.jpg",
    technologies: ["React", "Firebase", "React DnD"],
    category: "Frontend",
    featured: false,
    github: "https://github.com/votre-username/task-manager",
    demo: "#",
    size: "medium"
  },
  {
    id: 6,
    title: "Landing Page SaaS",
    description: "Page d'atterrissage pour une startup SaaS avec animations.",
    longDescription: "Landing page pour une startup SaaS avec sections témoignages, pricing, FAQ et formulaire de contact. Design moderne avec animations au scroll et optimisé pour le taux de conversion.",
    image: "/assets/projects/project6.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Frontend",
    featured: false,
    github: "https://github.com/votre-username/saas-landing",
    demo: "#",
    size: "small"
  }
];

// Catégories de filtre
const categories = ["All", "Frontend", "Fullstack", "Backend"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  // Filtrer les projets en fonction de la catégorie et du terme de recherche
  const filteredProjects = projectsData.filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Ouvrir le modal de détail du projet
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden"; // Empêcher le défilement en arrière-plan
  };

  // Fermer le modal de détail
  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto"; // Rétablir le défilement
  };

  return (
    <section className="projects-section">
      <div className="container">
        {/* En-tête de la section */}
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mes Projets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subtitle"
          >
            Découvrez une sélection de mes réalisations récentes
          </motion.p>
        </div>

        {/* Filtres de projets */}
        <motion.div 
          className="projects-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="category-filters">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
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
        </motion.div>

        {/* Grille de projets */}
        <motion.div 
          className="projects-grid"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  className={`project-card ${project.size}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -10 }}
                  onClick={() => openProjectDetail(project)}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <div className="project-overlay">
                      <span className="view-project">Voir en détail</span>
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-more">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="no-projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>Aucun projet ne correspond à votre recherche. Essayez d'autres critères.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal de détail du projet */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetail}
          >
            <motion.div 
              className="project-modal"
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeProjectDetail}>×</button>
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-content">
                <h2>{selectedProject.title}</h2>
                <p className="modal-description">{selectedProject.longDescription}</p>
                
                <div className="modal-tech-stack">
                  <h3>Technologies utilisées</h3>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="modal-links">
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    <FaGithub /> Code source
                  </a>
                  {selectedProject.demo !== "#" && (
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <FaExternalLinkAlt /> Voir le projet
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;