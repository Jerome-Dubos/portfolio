import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCocktail, FaCode } from 'react-icons/fa';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ContactForm from '../../components/ContactForm/ContactForm';
import { CircleShape } from '../../components/DecorativeElements/DecorativeShapes';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Section Présentation Personnelle */}
      <section className="personal-introduction">
        <div className="container">
          <motion.div 
            className="personal-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="personal-image">
              <img src="/images/profile.webp" alt="Jérôme Dubos" />
              <div className="image-overlay"></div>
            </div>
            <div className="personal-text">
              <h1 className="personal-title">
                Jérôme <span className="gradient-text">Dubos</span>
              </h1>
              <p className="personal-description">
                Artisan du digital, je transforme des concepts en expériences numériques uniques. 
                Mon parcours atypique - d'un bar élégant aux interfaces web sophistiquées - 
                reflète ma passion pour la créativité et l'innovation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section Parcours Luxueux */}
      <section className="luxe-journey-section">
        <div className="container">
          <SectionTitle 
            title="Mon Parcours" 
            subtitle="L'évolution d'un artisan créatif" 
          />
          
          <div className="luxe-timeline">
            {[
              {
                year: "2015 - 2020",
                title: "Maître Barman",
                icon: <FaCocktail />,
                description: "Artisan des cocktails dans des établissements de prestige. Chaque boisson était une création unique, mêlant précision technique et expression artistique.",
                side: "left"
              },
              {
                year: "2020 - 2021",
                title: "Formation Développement Web",
                icon: <FaGraduationCap />,
                description: "Apprentissage intensif des technologies web modernes, transformant ma passion créative en compétences numériques raffinées.",
                side: "right"
              },
              {
                year: "Depuis 2025",
                title: "Développeur Web Freelance",
                icon: <FaCode />,
                description: "Création de Dubos Web Services, où chaque projet web devient une œuvre d'art numérique, alliant élégance technique et vision créative.",
                side: "left"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className={`luxe-timeline-item ${item.side}`}
                initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2 
                }}
              >
                <div className="luxe-timeline-content">
                  <div className="luxe-timeline-icon">
                    {item.icon}
                  </div>
                  <div className="luxe-timeline-details">
                    <div className="luxe-timeline-year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section id="contact" className="contact-section">
        <div className="container">
          <SectionTitle 
            title="Parlons Projet" 
            subtitle="Transformer vos idées en expériences numériques exceptionnelles" 
          />
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default About;