import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectsFilter from '../../components/ProjectsFilter/ProjectsFilter';
import NoProjectsFound from '../../components/NoProjectsFound/NoProjectsFound';
import { CircleShape } from '../../components/DecorativeElements/DecorativeShapes';
import './Projects.css';

const Projects = () => {
  // État pour les filtres et la recherche
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // État pour les données des projets
  const [projects, setProjects] = useState([]);
  
  // Chargement des données des projets depuis le fichier JSON
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/data/projects.json');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      }
    };

    fetchProjects();
  }, []);
  
  // Catégories pour les filtres
  const categories = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'html-css', name: 'HTML & CSS' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'react', name: 'React' },
    { id: 'seo', name: 'SEO & Performance' },
    { id: 'debug', name: 'Débogage' }
  ];
  
  // Réinitialiser les filtres
  const resetFilters = () => {
    setActiveFilter('all');
    setSearchTerm('');
  };
  
  // Filtrer les projets en fonction du filtre actif et du terme de recherche
  useEffect(() => {
    let results = projects;
    
    // Filtre par catégorie
    if (activeFilter !== 'all') {
      results = results.filter(project => project.category === activeFilter);
    }
    
    // Filtre par terme de recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) || 
        project.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredProjects(results);
  }, [activeFilter, searchTerm, projects]);
  
  return (
    <div className="projects-page">
      {/* ... */}
      
      {/* Section des projets */}
      <section className="projects-showcase">
        <div className="container">
          {/* Filtres des projets */}
          <ProjectsFilter 
            categories={categories}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* Projets mis en avant (si sur la catégorie "Tous les projets") */}
          {activeFilter === 'all' && !searchTerm && (
            <div className="featured-projects">
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
            </div>
          )}
          
          {/* Tous les projets ou projets filtrés */}
          <div className="all-projects">
            <SectionTitle 
              title={activeFilter === 'all' && !searchTerm ? "Tous les projets" : "Projets filtrés"}
              subtitle={`${filteredProjects.length} projet${filteredProjects.length > 1 ? 's' : ''} trouvé${filteredProjects.length > 1 ? 's' : ''}`}
              center={false}
            />
            
            {filteredProjects.length === 0 ? (
              <NoProjectsFound resetFilters={resetFilters} />
            ) : (
              <div className="projects-grid">
                {filteredProjects.map((project, index) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* ... */}
    </div>
  );
};

export default Projects;