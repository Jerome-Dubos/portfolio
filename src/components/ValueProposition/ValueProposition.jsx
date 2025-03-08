import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaLaptopCode, FaCheckCircle } from 'react-icons/fa';
import SectionTitle from '../SectionTitle/SectionTitle';
import { CircleShape } from '../DecorativeElements/DecorativeShapes';
import './ValueProposition.css';

const iconMap = {
  FaCode: FaCode,
  FaRocket: FaRocket,
  FaLaptopCode: FaLaptopCode
};

const valueData = {
  title: "Pourquoi me choisir ?",
  subtitle: "Je combine expertise technique et approche centrée sur les besoins clients",
  values: [
    {
      id: "custom-dev",
      icon: "FaCode",
      title: "Développement sur mesure",
      description: "Des solutions personnalisées répondant parfaitement à vos besoins spécifiques.",
      features: [
        "Sites responsive",
        "Applications interactives",
        "Code propre et maintenable"
      ]
    },
    {
      id: "performance",
      icon: "FaRocket",
      title: "Performance optimale",
      description: "Des applications rapides et fluides offrant une expérience utilisateur exceptionnelle.",
      features: [
        "Chargement rapide",
        "SEO optimisé",
        "Expérience utilisateur fluide"
      ]
    },
    {
      id: "collaboration",
      icon: "FaLaptopCode",
      title: "Collaboration efficace",
      description: "Une communication claire et un processus transparent du début à la fin du projet.",
      features: [
        "Suivi régulier",
        "Réactivité",
        "Conseils professionnels"
      ]
    }
  ]
};

const ValueProposition = () => {
  return (
    <section className="value-section">
      <CircleShape 
        top="-200px" 
        right="-200px" 
        size={400} 
        color="var(--primary)" 
        opacity={0.05} 
      />
      
      <div className="container">
        <SectionTitle 
          title={valueData.title} 
          subtitle={valueData.subtitle} 
        />
        
        <div className="value-cards">
          {valueData.values.map((value, index) => {
            const IconComponent = iconMap[value.icon] || FaCode;
            
            return (
              <motion.div 
                key={value.id}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
              >
                <div className="value-icon">
                  <IconComponent />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <ul className="value-features">
                  {value.features.map((feature, i) => (
                    <li key={i}><FaCheckCircle /> {feature}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;