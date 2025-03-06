import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../SectionTitle/SectionTitle';
import './TechStack.css';
import ReactLogo from '../../assets/icons/react.svg'
import JavascriptLogo from '../../assets/icons/javascript.svg'
import CssLogo from '../../assets/icons/css.svg'
import HtmlLogo from '../../assets/icons/html.svg'

const TechStack = ({ isElevated = true }) => {
  return (
    <section className={`tech-section ${isElevated ? 'elevated' : ''}`}>
      <div className="container">
        <SectionTitle 
          title="Technologies maîtrisées" 
          subtitle="Je travaille avec les frameworks et librairies modernes pour créer des applications performantes" 
        />
        
        <motion.div 
          className="tech-logos"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { name: "React", logo: ReactLogo },
            { name: "JavaScript", logo: JavascriptLogo },
            { name: "CSS3", logo: CssLogo },
            { name: "HTML5", logo: HtmlLogo }
          ].map((tech, index) => (
            <motion.div 
              key={tech.name}
              className="tech-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <img src={tech.logo} alt={tech.name} />
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;