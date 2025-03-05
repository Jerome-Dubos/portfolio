import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle/SectionTitle';
import './TechStack.css';

// Données statiques des technologies
const techData = {
  title: "Technologies maîtrisées",
  subtitle: "Je travaille avec les frameworks et librairies modernes pour créer des applications performantes",
  technologies: [
    {
      name: "React",
      logo: "react-logo.svg"
    },
    {
      name: "Vue",
      logo: "vue-logo.svg"
    },
    {
      name: "JavaScript",
      logo: "javascript-logo.svg"
    },
    {
      name: "Node.js",
      logo: "nodejs-logo.svg"
    },
    {
      name: "CSS3",
      logo: "css3-logo.svg"
    },
    {
      name: "HTML5",
      logo: "html5-logo.svg"
    }
  ]
};

const TechStack = ({ isElevated = true }) => {
  return (
    <section className={`tech-section ${isElevated ? 'elevated' : ''}`}>
      <div className="container">
        <SectionTitle 
          title={techData.title} 
          subtitle={techData.subtitle} 
        />
        
        <motion.div 
          className="tech-logos"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {techData.technologies.map((tech, index) => (
            <motion.div 
              key={tech.name}
              className="tech-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <img src={`/assets/tech/${tech.logo}`} alt={tech.name} />
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;