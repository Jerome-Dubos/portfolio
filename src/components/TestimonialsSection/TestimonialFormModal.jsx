import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar, FaPaperPlane, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import './TestimonialFormModal.css';

const TestimonialFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    rating: 0,
    text: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    position: '',
    text: '',
    rating: ''
  });
  
  const [hoverRating, setHoverRating] = useState(0);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const ErrorMessage = ({ message }) => (
    <p className="error-message">
      <FaExclamationCircle aria-hidden="true" style={{ marginRight: '6px', verticalAlign: '-0.125em' }} /> 
      {message}
    </p>
  );
  
  const patterns = {
    name: /^[a-zA-ZÀ-ÿ\s'-]{3,50}$/,
    position: /^[a-zA-ZÀ-ÿ0-9\s'-]{3,50}$/, 
    text: /^.{10,500}$/ 
  };
  
  const errorMessages = {
    name: 'Veuillez entrer un nom valide (3-50 caractères)',
    position: 'Veuillez entrer un poste/entreprise valide (3-50 caractères)',
    text: 'Votre avis doit contenir entre 10 et 500 caractères',
    required: 'Ce champ est requis',
    rating: 'Veuillez attribuer une note avant de soumettre votre témoignage'
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (patterns[name]) {
      validateField(name, value);
    }
  };
  
  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating
    });
    
    // Effacer l'erreur de rating quand l'utilisateur sélectionne une note
    setErrors(prev => ({
      ...prev,
      rating: ''
    }));
  };
  
  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (!value.trim()) {
      errorMsg = errorMessages.required;
    } else if (!patterns[name].test(value)) {
      errorMsg = errorMessages[name];
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMsg
    }));
    
    return !errorMsg;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nameValid = validateField('name', formData.name);
    const positionValid = validateField('position', formData.position);
    const textValid = validateField('text', formData.text);
    
    // Validation de la note
    let ratingValid = true;
    if (formData.rating === 0) {
      setErrors(prev => ({
        ...prev,
        rating: errorMessages.rating
      }));
      ratingValid = false;
    }
    
    if (nameValid && positionValid && textValid && ratingValid) {
      onSubmit(formData);
      
      setFormData({
        name: '',
        position: '',
        rating: 0,
        text: ''
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
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
      transition: { duration: 0.2 } 
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
            className="modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close-btn" onClick={onClose}>
              <FaTimes />
            </button>
            
            {!isSubmitted ? (
              <form className="testimonial-form" onSubmit={handleSubmit}>
                <h3>Partagez votre expérience</h3>
                <p className="form-description">
                  Votre avis sera examiné par l'administrateur avant d'être publié.
                </p>
                
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className={errors.name ? 'error' : ''}
                    required 
                  />
                  {errors.name && <ErrorMessage message={errors.name} />}
                </div>
                
                <div className="form-group">
                  <label htmlFor="position">Poste / Entreprise</label>
                  <input 
                    type="text" 
                    id="position" 
                    name="position" 
                    value={formData.position} 
                    onChange={handleInputChange}
                    className={errors.position ? 'error' : ''}
                    required 
                  />
                  {errors.position && <ErrorMessage message={errors.position} />}
                </div>
                
                <div className="form-group">
                  <label>Votre note</label>
                  <div className="rating-input">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <span 
                          key={index} 
                          className="star-container"
                          onClick={() => handleRatingChange(ratingValue)}
                          onMouseEnter={() => setHoverRating(ratingValue)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          {ratingValue <= (hoverRating || formData.rating) ? (
                            <FaStar className="star active" />
                          ) : (
                            <FaRegStar className="star" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                  {errors.rating ? (
                    <ErrorMessage message={errors.rating} />
                  ) : (
                    formData.rating === 0 && (
                      <p className="rating-helper">Cliquez pour attribuer une note</p>
                    )
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="text">Votre avis</label>
                  <textarea 
                    id="text" 
                    name="text" 
                    value={formData.text} 
                    onChange={handleInputChange} 
                    className={errors.text ? 'error' : ''}
                    required 
                    rows="4"
                  ></textarea>
                  {errors.text && <ErrorMessage message={errors.text} />}
                  <div className="char-counter">
                    {formData.text.length} / 500 caractères
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Annuler
                  </button>
                  <motion.button 
                    type="submit" 
                    className="btn btn-primary btn-cta btn-glow-hover"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPaperPlane className="btn-icon" /> Envoyer
                  </motion.button>
                </div>
              </form>
            ) : (
              <div className="submission-success">
                <h3>Merci pour votre témoignage !</h3>
                <p>Votre avis a été reçu et sera examiné par l'administrateur avant d'être publié.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TestimonialFormModal;