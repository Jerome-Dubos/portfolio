import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCode, FaCocktail } from 'react-icons/fa';
import ContactForm from '../../components/ContactForm/ContactForm';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './About.css';

const timelineData = [
  {
    year: "2016 - 2024",
    title: "Barman - Mixologue",
    description: "Création et réalisations de cocktails, gestion d'etablissements et service clients.",
    icon: <FaCocktail />,
    type: "work"
  },
  {
    year: "2024 - 2025",
    title: "Formation Développement Web",
    description: "Apprentissage intensif des technologies web modernes, transformant ma passion créative en compétences numériques.",
    icon: <FaGraduationCap />,
    type: "education"
  },
  {
    year: "Depuis 2025",
    title: "Développement Freelance à Temps Plein",
    description: "Lancement officiel de mon activité de développeur web freelance.",
    icon: <FaCode />,
    type: "work"
  }
];

const About = () => {
  return (
    <div className="about-page">
      <section className="about-banner">
        <div className="container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="about-image-container">
              <img 
                src="/images/profile.webp" 
                alt="Jérôme Dubos" 
                className="about-profile-image" 
              />
            </div>
            <div className="about-text">
              <h1>Jérôme Dubos</h1>
              <h2 className="about-subtitle">Développeur Web Freelance</h2>
              <p>
                Après plusieurs années dans l’univers des bars à cocktails, 
                j’ai choisi de me réinventer à travers une reconversion dans 
                le développement web. Aujourd’hui, je suis développeur web freelance, 
                combinant créativité et technicité pour concevoir des sites modernes et dynamiques.
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      <section className="timeline-section">
        <div className="container">
          <SectionTitle 
            title="Mon Parcours" 
            subtitle="Une histoire de croissance, d'apprentissage et de passion"
          />
          
          <div className="timeline">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index} 
                className={`timeline-item ${item.type}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2 
                }}
              >
                <div className="timeline-content">
                  <div className="timeline-icon">
                    {item.icon}
                  </div>
                  <div className="timeline-details">
                    <span className="timeline-year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section id="contact">
        <ContactForm />
      </section>
    </div>
  );
};

export default About;