import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight, FaExclamationCircle } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import TestimonialFormModal from './TestimonialFormModal';
import './TestimonialsSection.css';

const initialData = {
  title: "Votre avis compte",
  subtitle: "Découvrez les expériences des personnes avec qui j'ai collaboré",
  items: []
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(initialData.items);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const autoplayRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Récupérer les témoignages depuis l'API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('http://localhost:5000/api/testimonials');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Une erreur s\'est produite lors de la récupération des témoignages');
        }
        
        if (data.data && data.data.length > 0) {
          setTestimonials(data.data);
        } else {
          // Si aucun témoignage n'est retourné, utiliser un tableau vide
          setTestimonials([]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Erreur lors de la récupération des témoignages:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTestimonials();
  }, []);
  
  const nextTestimonial = () => {
    if (testimonials.length <= 1) return;
    
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    if (testimonials.length <= 1) return;
    
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  // Configurer l'autoplay
  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    autoplayRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(autoplayRef.current);
  }, [activeIndex, testimonials.length]);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (!autoplayRef.current && testimonials.length > 1) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial();
      }, 8000);
    }
  };
  
  // Après la soumission d'un nouveau témoignage, rafraîchir la liste après quelques secondes
  const handleSubmitTestimonial = (testimonialData) => {
    console.log("Témoignage soumis:", testimonialData);
    
    // Optionnel: rafraîchir la liste des témoignages approuvés après un court délai
    setTimeout(() => {
      // Cette fonction n'est pas vraiment nécessaire car les nouveaux témoignages
      // doivent être approuvés avant d'apparaître sur la page principale
    }, 5000);
  };
  
  if (loading) {
    return (
      <section className="testimonials-section">
        <div className="container">
          <SectionTitle title={initialData.title} subtitle={initialData.subtitle} />
          <div className="testimonials-slider">
            <div className="testimonials-wrapper loading">
              <p className="loading-text">Chargement des témoignages...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error) {
    return (
      <section className="testimonials-section">
        <div className="container">
          <SectionTitle title={initialData.title} subtitle={initialData.subtitle} />
          <div className="testimonials-slider">
            <div className="testimonials-wrapper error">
              <p className="error-text">
                <FaExclamationCircle />
                {error}
              </p>
            </div>
          </div>
          <div className="testimonial-cta">
            <motion.button 
              className="btn btn-primary btn-cta btn-glow-hover" 
              onClick={handleOpenModal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Partager votre expérience
            </motion.button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="testimonials-section">
      <div className="container">
        <SectionTitle title={initialData.title} subtitle={initialData.subtitle} />
        
        {testimonials.length > 0 ? (
          <div className="testimonials-slider">
            {testimonials.length > 1 && (
              <button 
                className="slider-arrow prev visible" 
                onClick={prevTestimonial} 
                aria-label="Témoignage précédent"
              >
                <FaArrowLeft />
              </button>
            )}
            
            <div className="testimonials-wrapper">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="testimonial-card"
                >
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  <p className="testimonial-text">{testimonials[activeIndex].text}</p>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar 
                        key={index} 
                        className={index < testimonials[activeIndex].rating ? 'star active' : 'star'} 
                      />
                    ))}
                  </div>
                  <div className="testimonial-author no-image">
                    <div className="author-info">
                      <h3>{testimonials[activeIndex].name}</h3>
                      <p>{testimonials[activeIndex].position}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {testimonials.length > 1 && (
              <button 
                className="slider-arrow next visible" 
                onClick={nextTestimonial} 
                aria-label="Témoignage suivant"
              >
                <FaArrowRight />
              </button>
            )}
          </div>
        ) : (
          <div className="testimonials-slider empty">
            <div className="testimonials-wrapper">
              <p className="empty-text">Aucun témoignage disponible pour le moment. Soyez le premier à partager votre expérience!</p>
            </div>
          </div>
        )}
        
        <div className="testimonial-cta">
          <motion.button 
            className="btn btn-primary btn-cta btn-glow-hover" 
            onClick={handleOpenModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Partager votre expérience
          </motion.button>
        </div>
        
        <TestimonialFormModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSubmit={handleSubmitTestimonial} 
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;