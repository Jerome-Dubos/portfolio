import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTimes, FaExclamationCircle, FaStar, FaRegStar, FaSync, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import ProjectFormModal from './ProjectFormModal';
import './AdminStyles.css';


const ProjectsAdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);
  
  const fetchProjects = async () => {
    try {
      setIsRefreshing(true);
      setError('');
      
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        throw new Error('Vous devez être connecté pour accéder à cette page');
      }
      
      const response = await fetch('http://localhost:5000/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la récupération des projets');
      }
      
      setProjects(data.data);
      
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };
  
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  const handleOpenCreateModal = () => {
    setCurrentProject(null);
    setIsModalOpen(true);
  };
  
  const handleOpenEditModal = (project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };
  
  const handleFormSubmit = () => {
    handleRefresh();
    handleCloseModal();
  };
  
  const handleToggleFeatured = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/projects/${id}/toggle-featured`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la modification du projet');
      }
      
      handleRefresh();
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la suppression du projet');
      }
      
      handleRefresh();
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleMoveUp = (index) => {
    if (index <= 0) return;
    
    const updatedProjects = [...projects];
    const temp = updatedProjects[index];
    updatedProjects[index] = updatedProjects[index - 1];
    updatedProjects[index - 1] = temp;
    
    updateProjectsOrder(updatedProjects);
  };
  
  const handleMoveDown = (index) => {
    if (index >= projects.length - 1) return;
    
    const updatedProjects = [...projects];
    const temp = updatedProjects[index];
    updatedProjects[index] = updatedProjects[index + 1];
    updatedProjects[index + 1] = temp;
    
    updateProjectsOrder(updatedProjects);
  };
  
  const updateProjectsOrder = async (sortedProjects) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const projectsOrder = sortedProjects.map((project, index) => ({
        id: project._id,
        order: index
      }));
      
      const response = await fetch('http://localhost:5000/api/projects/order/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectsOrder })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la mise à jour de l\'ordre');
      }
      
      handleRefresh();
      
    } catch (err) {
      setError(err.message);
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="admin-content">
        <div className="admin-loading">Chargement des projets...</div>
      </div>
    );
  }
  
  return (
    <div className="admin-projects-panel">
      <div className="admin-panel-header">
        <h3>Gestion des projets</h3>
        <button 
          className="admin-btn admin-btn-primary" 
          onClick={handleOpenCreateModal}
        >
          <FaPlus /> Ajouter un projet
        </button>
      </div>
      
      {error && (
        <div className="admin-error">
          <FaExclamationCircle />
          <span>{error}</span>
        </div>
      )}
      
      {projects.length === 0 ? (
        <p className="admin-empty-message">Aucun projet trouvé. Cliquez sur "Ajouter un projet" pour créer votre premier projet.</p>
      ) : (
        <div className="admin-projects-list">
          <div className="admin-project-card header">
            <div className="admin-project-info">Titre</div>
            <div className="admin-project-category">Catégorie</div>
            <div className="admin-project-featured">Mis en avant</div>
            <div className="admin-project-date">Date d'ajout</div>
            <div className="admin-project-order">Ordre</div>
            <div className="admin-project-actions">Actions</div>
          </div>
          
          {projects.map((project, index) => (
            <div key={project._id} className="admin-project-card">
              <div className="admin-project-info">
                <h4>{project.title}</h4>
                <p className="admin-project-description">{project.description.substring(0, 60)}...</p>
              </div>
              
              <div className="admin-project-category">
                <span className="category-badge">{project.category}</span>
              </div>
              
              <div className="admin-project-featured">
                <button 
                  className="featured-toggle-btn"
                  onClick={() => handleToggleFeatured(project._id)}
                  title={project.featured ? "Retirer des projets mis en avant" : "Ajouter aux projets mis en avant"}
                >
                  {project.featured ? (
                    <FaStar className="featured-star active" />
                  ) : (
                    <FaRegStar className="featured-star" />
                  )}
                </button>
              </div>
              
              <div className="admin-project-date">
                {formatDate(project.createdAt)}
              </div>
              
              <div className="admin-project-order">
                <button 
                  className="order-btn" 
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  title="Monter"
                >
                  <FaArrowUp />
                </button>
                <span className="order-value">{project.order}</span>
                <button 
                  className="order-btn" 
                  onClick={() => handleMoveDown(index)}
                  disabled={index === projects.length - 1}
                  title="Descendre"
                >
                  <FaArrowDown />
                </button>
              </div>
              
              <div className="admin-project-actions">
                <button 
                  className="admin-btn admin-btn-edit"
                  onClick={() => handleOpenEditModal(project)}
                >
                  <FaEdit /> Modifier
                </button>
                <button 
                  className="admin-btn admin-btn-delete"
                  onClick={() => handleDelete(project._id)}
                >
                  <FaTimes /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isModalOpen && (
        <ProjectFormModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          project={currentProject}
        />
      )}
    </div>
  );
};

export default ProjectsAdminPanel;