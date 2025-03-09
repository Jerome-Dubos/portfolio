import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave, FaTimes, FaExclamationCircle, FaStar, FaRegStar } from 'react-icons/fa';

const ProjectFormModal = ({ isOpen, onClose, onSubmit, project }) => {
  const initialFormData = {
    title: '',
    description: '',
    category: '',
    image: '',
    demoLink: '',
    githubLink: '',
    featured: false,
    tags: ''
  };
  
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        image: project.image || '',
        demoLink: project.demoLink || '',
        githubLink: project.githubLink || '',
        featured: project.featured || false,
        tags: project.tags ? project.tags.join(', ') : ''
      });
    } else {
      setFormData(initialFormData);
    }
  }, [project]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Le titre doit comporter au moins 3 caractères';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La description doit comporter au moins 10 caractères';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'La catégorie est requise';
    }
    
    if (formData.demoLink && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.demoLink)) {
      newErrors.demoLink = 'URL de démo invalide';
    }
    
    if (formData.githubLink && !/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\/)?$/.test(formData.githubLink)) {
      newErrors.githubLink = 'URL GitHub invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      setApiError('');
      
      const token = localStorage.getItem('adminToken');
      
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        : [];
      
      const projectData = {
        ...formData,
        tags: tagsArray
      };
      
      const url = project
        ? `http://localhost:5000/api/projects/${project._id}`
        : 'http://localhost:5000/api/projects';
      
      const method = project ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'enregistrement du projet');
      }
      
      if (onSubmit) {
        onSubmit(data.data);
      }
      
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleToggleFeatured = () => {
    setFormData({
      ...formData,
      featured: !formData.featured
    });
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      } 
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            className="modal-container project-form-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close-btn" 
              onClick={onClose}
              aria-label="Fermer"
            >
              <FaTimes />
            </button>
            
            <div className="project-form-wrapper">
              <h3>{project ? 'Modifier le projet' : 'Ajouter un nouveau projet'}</h3>
              
              {apiError && (
                <div className="admin-error">
                  <FaExclamationCircle />
                  <span>{apiError}</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Titre*</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    className={errors.title ? 'error' : ''}
                    required 
                  />
                  {errors.title && <p className="error-message">{errors.title}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Catégorie*</label>
                  <input 
                    type="text" 
                    id="category" 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    className={errors.category ? 'error' : ''}
                    required 
                  />
                  {errors.category && <p className="error-message">{errors.category}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description*</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    className={errors.description ? 'error' : ''}
                    rows="4"
                    required 
                  ></textarea>
                  {errors.description && <p className="error-message">{errors.description}</p>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="image">URL de l'image</label>
                  <input 
                    type="text" 
                    id="image" 
                    name="image" 
                    value={formData.image} 
                    onChange={handleChange} 
                    placeholder="https://exemple.com/image.jpg"
                  />
                  <p className="help-text">Laissez vide pour utiliser l'image par défaut</p>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="demoLink">Lien de démo</label>
                    <input 
                      type="text" 
                      id="demoLink" 
                      name="demoLink" 
                      value={formData.demoLink} 
                      onChange={handleChange} 
                      className={errors.demoLink ? 'error' : ''}
                      placeholder="https://demo-site.com"
                    />
                    {errors.demoLink && <p className="error-message">{errors.demoLink}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="githubLink">Lien GitHub</label>
                    <input 
                      type="text" 
                      id="githubLink" 
                      name="githubLink" 
                      value={formData.githubLink} 
                      onChange={handleChange} 
                      className={errors.githubLink ? 'error' : ''}
                      placeholder="https://github.com/username/repo"
                    />
                    {errors.githubLink && <p className="error-message">{errors.githubLink}</p>}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="tags">Tags (séparés par des virgules)</label>
                  <input 
                    type="text" 
                    id="tags" 
                    name="tags" 
                    value={formData.tags} 
                    onChange={handleChange} 
                    placeholder="react, javascript, responsive"
                  />
                </div>
                
                <div className="form-group featured-toggle">
                  <button 
                    type="button" 
                    className="featured-btn" 
                    onClick={handleToggleFeatured}
                  >
                    {formData.featured ? (
                      <>
                        <FaStar className="star-icon active" /> Projet mis en avant
                      </>
                    ) : (
                      <>
                        <FaRegStar className="star-icon" /> Marquer comme projet à la une
                      </>
                    )}
                  </button>
                  <p className="help-text">Les projets mis en avant apparaissent dans la section "Projets à la une"</p>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="admin-btn admin-btn-secondary" 
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </button>
                  
                  <button 
                    type="submit" 
                    className="admin-btn admin-btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Enregistrement...'
                    ) : (
                      <>
                        <FaSave /> {project ? 'Mettre à jour' : 'Enregistrer'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectFormModal;