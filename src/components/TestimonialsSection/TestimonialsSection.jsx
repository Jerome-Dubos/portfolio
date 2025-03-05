import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaQuoteLeft, 
  FaStar, 
  FaArrowLeft, 
  FaArrowRight, 
  FaCheck 
} from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import './TestimonialsSection.css';

// Données statiques des témoignages
const testimonialsData = {
  title: "Ce que mes clients disent",
  subtitle: "Découvrez les expériences des personnes avec qui j'ai collaboré",
  cta: {
    text: "Laisser un témoignage",
    url: "/contact"
  },
  items: [
    {
      id: 1,
      name: "Alice Dupont",
      position: "CEO - StartUpTech",
      image: "/assets/testimonials/client1.jpg",
      rating: 5,
      text: "Travailler avec ce développeur a été une expérience exceptionnelle. Sa capacité à comprendre nos besoins et à les transformer en solutions techniques élégantes est impressionnante. Le site qu'il a créé pour nous a dépassé toutes nos attentes en termes de design et de fonctionnalités."
    },
    {
      id: 2,
      name: "Marc Lefevre",
      position: "Freelance Designer",
      image: "/assets/testimonials/client2.jpg",
      rating: 5,
      text: "J'ai collaboré sur plusieurs projets avec ce développeur, et je suis toujours aussi impressionné par son travail. Sa maîtrise technique, sa créativité et sa capacité à respecter les délais font de lui un partenaire idéal pour tout projet web. Je n'hésiterai pas à faire appel à ses services à nouveau."
    },
    {
      id: 3,
      name: "Sophie Lambert",
      position: "Fondatrice - ShopOnline",
      image: "/assets/testimonials/client3.jpg",
      rating: 5,
      text: "Notre site e-commerce avait désespérément besoin d'une refonte complète, et ce développeur a réussi à transformer notre vision en réalité. Non seulement le site est magnifique, mais il est également extrêmement performant et facile à maintenir. Notre taux de conversion a augmenté de 40% depuis la mise en ligne !"
    },
    {
      id: 4,
      name: "Thomas Dubois",
      position: "Directeur Marketing - TechCorp",
      image: "/assets/testimonials/client4.jpg",
      rating: 4,
      text: "Nous avons engagé ce développeur pour créer une application web complexe, et le résultat est impressionnant. Son expertise technique et sa capacité à résoudre des problèmes complexes ont été déterminantes pour le succès de notre projet. Sa communication claire et ses délais respectés ont rendu la collaboration très agréable."
    },
    {
      id: 5,
      name: "Julie Martin",
      position: "Consultant UX - DesignAgency",
      image: "/assets/testimonials/client5.jpg",
      rating: 5,
      text: "En tant que consultante UX, je suis particulièrement attentive à la qualité de l'implémentation de mes designs. Ce développeur a parfaitement traduit mes maquettes en code, avec une attention particulière aux détails et aux animations. Sa compréhension des principes d'expérience utilisateur fait toute la différence."
    }
  ]
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef(null);
  
  // Fonction pour naviguer vers le témoignage suivant
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialsData.items.length);
  };
  
  // Fonction pour naviguer vers le témoignage précédent
  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialsData.items.length) % testimonialsData.items.length);
  };
  
  // Gérer le défilement automatique
  useEffect(() => {
    if (autoplay && testimonialsData.items.length > 1) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000); // Changer toutes les 5 secondes
    }
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay, activeIndex]);
  
  // Mettre en pause le défilement automatique lors du survol
  const handleMouseEnter = () => {
    setAutoplay(false);
  };
  
  const handleMouseLeave = () => {
    setAutoplay(true);
  };
  
  // Variantes pour les animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };
  
  // Générer les étoiles pour la notation
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FaStar 
        key={index} 
        className={index < rating ? 'star active' : 'star'} 
      />
    ));
  };
  
  return (
    <section className="testimonials-section">
      <div className="container">
        <SectionTitle 
          title={testimonialsData.title} 
          subtitle={testimonialsData.subtitle} 
        />
        
        <motion.div 
          className="testimonials-slider"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button 
            className="slider-arrow prev"
            onClick={prevTestimonial}
            aria-label="Témoignage précédent"
          >
            <FaArrowLeft />
          </button>
          
          <div className="testimonials-wrapper">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {testimonialsData.items.length > 0 && (
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 }
                  }}
                  className="testimonial-card"
                >
                  <div className="quote-icon">
                    <FaQuoteLeft />
                  </div>
                  <p className="testimonial-text">
                    {testimonialsData.items[activeIndex].text}
                  </p>
                  <div className="testimonial-rating">
                    {renderStars(testimonialsData.items[activeIndex].rating)}
                  </div>
                  <div className="testimonial-author">
                    <div className="author-image">
                      <img 
                        src={testimonialsData.items[activeIndex].image} 
                        alt={testimonialsData.items[activeIndex].name} 
                        loading="lazy"
                      />
                    </div>
                    <div className="author-info">
                      <h3>{testimonialsData.items[activeIndex].name}</h3>
                      <p>{testimonialsData.items[activeIndex].position}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            className="slider-arrow next"
            onClick={nextTestimonial}
            aria-label="Témoignage suivant"
          >
            <FaArrowRight />
          </button>
        </motion.div>
        
        <div className="testimonials-dots">
          {testimonialsData.items.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              aria-label={`Témoignage ${index + 1}`}
            />
          ))}
        </div>
        
        {testimonialsData.cta && (
          <motion.div 
            className="testimonials-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>Vous êtes satisfait de notre collaboration ?</p>
            <Link to={testimonialsData.cta.url} className="btn btn-primary">
              {testimonialsData.cta.text}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;