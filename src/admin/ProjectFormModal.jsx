import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave, FaTimes, FaExclamationCircle, FaStar, FaRegStar, FaImage, FaClipboard } from 'react-icons/fa';
import './AdminStyles.css';



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
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

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
      setImagePreview(project.image || null);
    } else {
      setFormData(initialFormData);
      setImagePreview(null);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (!formData.category.trim()) newErrors.category = 'La catégorie est requise';
    if (formData.demoLink && !/^https?:\/\//.test(formData.demoLink)) newErrors.demoLink = 'URL invalide';
    if (formData.githubLink && !/^https?:\/\//.test(formData.githubLink)) newErrors.githubLink = 'URL invalide';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setApiError('');
    try {
      const token = localStorage.getItem('adminToken');
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && key !== 'tags') {
          formDataToSubmit.append(key, formData[key]);
        }
      });
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
      formDataToSubmit.append('tags', tagsArray.join(','));
      if (formData.image instanceof File) {
        formDataToSubmit.append('image', formData.image);
      }
      const url = project ? `http://localhost:5000/api/projects/${project._id}` : 'http://localhost:5000/api/projects';
      const response = await fetch(url, {
        method: project ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataToSubmit
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur lors de l'enregistrement");
      if (onSubmit) onSubmit(data.data);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="modal-container" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={onClose}><FaTimes /></button>
            <h3>{project ? 'Modifier le projet' : 'Ajouter un projet'}</h3>
            {apiError && <div className="error"><FaExclamationCircle /> {apiError}</div>}
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Titre" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
              <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Catégorie" required />
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
              {imagePreview && <img src={imagePreview} alt="Aperçu" />}
              <button type="button" onClick={() => fileInputRef.current?.click()}><FaImage /> Choisir un fichier</button>
              <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enregistrement...' : <><FaSave /> Enregistrer</>}</button>
              <button type="button" onClick={onClose}>Annuler</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectFormModal;