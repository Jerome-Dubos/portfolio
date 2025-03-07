import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectsFilter from '../../components/ProjectsFilter/ProjectsFilter';
import NoProjectsFound from '../../components/NoProjectsFound/NoProjectsFound';
import Loader from '../../components/Loader/Loader';
import { CircleShape } from '../../components/DecorativeElements/DecorativeShapes';
import { ProjectsCacheManager } from '../../utils/ProjectsCacheManager';
import './Projects.css';

// Constantes pour la normalisation
const normalizeName = (name, preserveCase = false) => 
  name ? (preserveCase ? name.trim().replace(/\s+/g, ' ') : name.toLowerCase().trim().replace(/\s+/g, ' ')) : '';

const Projects = () => {
  // États de gestion des projets
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Chargement des projets avec gestion de cache
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Vérifier le cache
      const cachedProjects = ProjectsCacheManager.getCachedProjects();
      if (cachedProjects) {
        processProjects(cachedProjects);
        return;
      }

      // Charger depuis le fichier JSON
      const response = await fetch('/data/projects.json');
      
      if (!response.ok) {
        throw new Error(`Erreur de chargement : ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validation et prétraitement des projets
      const validProjects = data.filter(project => 
        project.id && 
        project.title && 
        project.category && 
        project.description
      ).map(project => ({
        ...project,
        normalizedCategory: normalizeName(project.category, true),
        originalCategory: project.category
      }));

      // Sauvegarder dans le cache
      ProjectsCacheManager.saveProjects(validProjects);
      
      // Traiter les projets
      processProjects(validProjects);

    } catch (err) {
      console.error('Erreur de chargement des projets :', err);
      setError('Impossible de charger les projets. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Traitement des projets chargés
  const processProjects = (loadedProjects) => {
    // Extraction des catégories uniques avec préservation de la casse originale
    const uniqueCategories = ['all', ...new Set(
      loadedProjects.map(p => p.originalCategory)
    )];

    setProjects(loadedProjects);
    setCategories(uniqueCategories);
  };

  // Chargement initial des projets
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Filtrage des projets
  const filteredProjects = useMemo(() => {
    let results = projects;

    // Filtre par catégorie
    if (activeFilter !== 'all') {
      results = results.filter(project => 
        normalizeName(project.normalizedCategory) === normalizeName(activeFilter)
      );
    }

    // Filtre par terme de recherche
    if (searchTerm) {
      const term = normalizeName(searchTerm);
      results = results.filter(project => 
        normalizeName(project.title).includes(term) || 
        normalizeName(project.description).includes(term) || 
        project.tags?.some(tag => normalizeName(tag).includes(term))
      );
    }

    return results;
  }, [projects, activeFilter, searchTerm]);

  // Réinitialisation des filtres
  const resetFilters = () => {
    setActiveFilter('all');
    setSearchTerm('');
  };

  // Gestion des états de chargement et d'erreur
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="projects-page error-container">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-message"
        >
          {error}
        </motion.p>
        <motion.button 
          onClick={fetchProjects}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary"
        >
          Réessayer
        </motion.button>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <CircleShape 
        top="-200px" 
        right="-200px" 
        size={400} 
        color="var(--primary)" 
        opacity={0.05} 
      />
      
      <section className="projects-showcase">
        <div className="container">
          <ProjectsFilter 
            categories={categories}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* Projets mis en avant */}
          {activeFilter === 'all' && !searchTerm && (
            <motion.div 
              className="featured-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle 
                title="Projets à la une" 
                subtitle="Mes projets les plus représentatifs"
                center={false}
              />
              
              <div className="featured-grid">
                {projects
                  .filter(project => project.featured)
                  .map((project, index) => (
                    <ProjectCard 
                      key={project.id}
                      project={project}
                      featured={true}
                      delay={index * 0.1}
                    />
                  ))}
              </div>
            </motion.div>
          )}
          
          
          <motion.div 
            className="all-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionTitle 
              title={activeFilter === 'all' && !searchTerm 
                ? "Tous les projets" 
                : "Projets filtrés"}
              subtitle={`${filteredProjects.length} projet${
                filteredProjects.length > 1 ? 's' : ''
              } trouvé${filteredProjects.length > 1 ? 's' : ''}`}
              center={false}
            />
            
            {filteredProjects.length === 0 ? (
              <NoProjectsFound resetFilters={resetFilters} />
            ) : (
              <motion.div 
                className="projects-grid"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: {
                      delayChildren: 0.2,
                      staggerChildren: 0.1
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    delay={index * 0.1}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;