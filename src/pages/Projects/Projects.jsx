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

const normalizeName = (name, preserveCase = false) => 
  name ? (preserveCase ? name.trim().replace(/\s+/g, ' ') : name.toLowerCase().trim().replace(/\s+/g, ' ')) : '';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleRefresh = () => {
    ProjectsCacheManager.clearCache();
    setRefreshKey(prev => prev + 1);
  };

  const fetchProjects = useCallback(async (forceRefresh = false) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!forceRefresh) {
        const cachedProjects = ProjectsCacheManager.getCachedProjects();
        const cacheExpiry = ProjectsCacheManager.getCacheExpiry();
        
        const now = new Date().getTime();
        if (cachedProjects && cacheExpiry && now < cacheExpiry) {
          console.log("Utilisation des données en cache");
          processProjects(cachedProjects);
          return;
        }
      } else {
        console.log("Rechargement forcé des projets");
      }
      
      console.log("Chargement des projets depuis l'API");
      const response = await fetch('http://localhost:5000/api/projects');
      if (!response.ok) {
        throw new Error(`Erreur de chargement : ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Erreur lors de la récupération des projets');
      }
      
      console.log("Projets chargés depuis l'API:", result.data);
      const data = result.data;
      
      const validProjects = data.map(project => ({
        ...project,
        id: project._id,
        normalizedCategory: normalizeName(project.category, true),
        originalCategory: project.category
      }));

      const cacheExpiry = new Date().getTime() + 2 * 60 * 1000;
      ProjectsCacheManager.saveProjects(validProjects, cacheExpiry);
      processProjects(validProjects);

    } catch (err) {
      console.error('Erreur de chargement des projets :', err);
      setError('Impossible de charger les projets. Veuillez réessayer.');
      
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        
        console.log("Chargement de secours depuis JSON:", data);
        
        const validProjects = data.map(project => ({
          ...project,
          normalizedCategory: normalizeName(project.category, true),
          originalCategory: project.category
        }));
        
        processProjects(validProjects);
      } catch (backupErr) {
        console.error('Échec du chargement de secours:', backupErr);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const processProjects = (loadedProjects) => {
    const uniqueCategories = ['all', ...new Set(
      loadedProjects.map(p => p.originalCategory || p.category)
    )];

    setProjects(loadedProjects);
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    fetchProjects(refreshKey > 0);
  }, [fetchProjects, refreshKey]);

  useEffect(() => {
    const checkForUpdates = () => {
      if (ProjectsCacheManager.isCacheExpired()) {
        fetchProjects(true);
      }
    };
    
    const intervalId = setInterval(checkForUpdates, 30000);
    
    return () => clearInterval(intervalId);
  }, [fetchProjects]);

  const filteredProjects = useMemo(() => {
    let results = projects;

    if (activeFilter !== 'all') {
      results = results.filter(project => 
        normalizeName(project.normalizedCategory || project.category) === normalizeName(activeFilter)
      );
    }

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

  const resetFilters = () => {
    setActiveFilter('all');
    setSearchTerm('');
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error && projects.length === 0) {
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
          onClick={handleRefresh}
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
      
      <div className="refresh-container">
        <motion.button 
          className="refresh-button"
          onClick={handleRefresh}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Rafraîchir les projets"
        >
          Rafraîchir
        </motion.button>
      </div>
      
      <section className="projects-showcase">
        <div className="container">
          <ProjectsFilter 
            categories={categories}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
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
                      key={project.id || project._id}
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
                    key={project.id || project._id}
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