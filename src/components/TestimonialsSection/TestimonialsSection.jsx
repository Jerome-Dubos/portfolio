import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import './TestimonialsSection.css';

const testimonialsData = {
  title: "Ce que mes clients disent",
  subtitle: "Découvrez les expériences des personnes avec qui j'ai collaboré",
  items: [
    {
      id: 1,
      name: "Alice Dupont",
      position: "CEO - StartUpTech",
      image: "/assets/testimonials/client1.jpg",
      rating: 5,
      text: "Travailler avec ce développeur a été une expérience exceptionnelle. Sa capacité à comprendre nos besoins et à les transformer en solutions techniques élégantes est impressionnante."
    },
    {
      id: 2,
      name: "Marc Lefevre",
      position: "Freelance Designer",
      image: "/assets/testimonials/client2.jpg",
      rating: 5,
      text: "J'ai collaboré sur plusieurs projets avec ce développeur, et je suis toujours aussi impressionné par son travail. Sa maîtrise technique et sa créativité font de lui un partenaire idéal."
    },
    {
      id: 3,
      name: "Sophie Lambert",
      position: "Fondatrice - ShopOnline",
      image: "/assets/testimonials/client3.jpg",
      rating: 5,
      text: "Notre site e-commerce avait besoin d'une refonte complète, et ce développeur a réussi à transformer notre vision en réalité. Notre taux de conversion a augmenté de 40% !"
    }
  ]
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoplayRef = useRef(null);
  
  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonialsData.items.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonialsData.items.length) % testimonialsData.items.length);
  };
  
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
    return () => clearInterval(autoplayRef.current);
  }, [activeIndex]);
  
  return (
    <section className="testimonials-section">
      <div className="container">
        <SectionTitle title={testimonialsData.title} subtitle={testimonialsData.subtitle} />
        <div className="testimonials-slider">
          <button className="slider-arrow prev visible" onClick={prevTestimonial} aria-label="Témoignage précédent">
            <FaArrowLeft />
          </button>
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
                <p className="testimonial-text">{testimonialsData.items[activeIndex].text}</p>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className={index < testimonialsData.items[activeIndex].rating ? 'star active' : 'star'} />
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="author-image">
                    <img src={testimonialsData.items[activeIndex].image} alt={testimonialsData.items[activeIndex].name} loading="lazy" />
                  </div>
                  <div className="author-info">
                    <h3>{testimonialsData.items[activeIndex].name}</h3>
                    <p>{testimonialsData.items[activeIndex].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button className="slider-arrow next visible" onClick={nextTestimonial} aria-label="Témoignage suivant">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;