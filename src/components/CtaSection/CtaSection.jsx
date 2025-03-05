import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CtaSection.css';

// Données statiques de la section CTA
const ctaData = {
  title: "Prêt à concrétiser votre projet ?",
  description: "Discutons de vos besoins et de la manière dont je peux vous aider à atteindre vos objectifs.",
  button: {
    text: "Me contacter",
    url: "/contact",
    type: "accent",
    size: "lg"
  }
};

const CtaSection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>{ctaData.title}</h2>
          <p>{ctaData.description}</p>
          
          <Link 
            to={ctaData.button.url} 
            className={`btn ${ctaData.button.type ? `btn-${ctaData.button.type}` : 'btn-primary'} ${ctaData.button.size ? `btn-${ctaData.button.size}` : ''}`}
          >
            {ctaData.button.text}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;