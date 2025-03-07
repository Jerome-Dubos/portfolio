import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaPaintBrush, FaChartLine, FaTools, FaCog, FaLightbulb } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import CtaSection from "../../components/CtaSection/CtaSection";
import "./Services.css";

const Services = () => {
  // Données des services avec icônes
  const servicesList = [
    { 
      title: "Développement Web", 
      description: "Création de sites web modernes et performants, adaptés aux besoins des entreprises et startups.", 
      icon: <FaCode />,
      features: [
        "Sites vitrines et portfolios",
        "Applications web React/Vue.js",
        "Intégration de CMS",
        "Sites e-commerce"
      ] 
    },
    { 
      title: "Design UI/UX", 
      description: "Conception d'interfaces ergonomiques et esthétiques pour une meilleure expérience utilisateur.", 
      icon: <FaPaintBrush />,
      features: [
        "Maquettes et prototypes",
        "Design responsive",
        "Audit UX",
        "Refonte graphique"
      ] 
    },
    { 
      title: "Optimisation SEO", 
      description: "Stratégies avancées pour améliorer le référencement et la visibilité sur les moteurs de recherche.", 
      icon: <FaChartLine />,
      features: [
        "Audit SEO technique",
        "Optimisation on-page",
        "Stratégie de contenu",
        "Suivi de performance"
      ] 
    },
    { 
      title: "Maintenance & Support", 
      description: "Suivi et mise à jour des sites pour garantir leur sécurité et leur performance.", 
      icon: <FaTools />,
      features: [
        "Mises à jour régulières",
        "Sauvegardes automatisées",
        "Correction de bugs",
        "Support technique"
      ] 
    },
    { 
      title: "Développement d'Applications", 
      description: "Création d'applications web performantes et évolutives avec les technologies modernes.", 
      icon: <FaCog />,
      features: [
        "Applications métier",
        "APIs et micro-services",
        "Systèmes de gestion",
        "Tableaux de bord"
      ] 
    },
    { 
      title: "Conseil & Stratégie", 
      description: "Accompagnement dans la définition et la mise en œuvre de votre stratégie digitale.", 
      icon: <FaLightbulb />,
      features: [
        "Audit technique",
        "Cahier des charges",
        "Transformation digitale",
        "Formation technique"
      ] 
    }
  ];

  return (
    <div className="services-page">
      {/* En-tête de la page */}
      <section className="services-header">
        <div className="container">
          <motion.div 
            className="services-header-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="services-title">Mes Services</h1>
            <p className="services-subtitle">
              Des solutions sur mesure pour répondre à vos besoins digitaux, de la conception à la mise en ligne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section d'introduction */}
      <section className="services-intro">
        <div className="container">
          <motion.div 
            className="services-intro-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionTitle 
              title="Une expertise adaptée à vos projets" 
              subtitle="Je propose des services complets pour vous accompagner à chaque étape de votre projet web"
            />
            <p className="intro-text">
              En tant que développeur web freelance, je m'engage à fournir des solutions de qualité, adaptées à vos besoins spécifiques.
              Mon objectif est de vous aider à concrétiser vos idées et à développer votre présence en ligne grâce à des outils performants et modernes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Liste des services */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {servicesList.map((service, index) => (
              <motion.div 
                className="service-card"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h2 className="service-title">{service.title}</h2>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section sur la méthodologie */}
      <section className="methodology-section">
        <div className="container">
          <motion.div 
            className="methodology-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle 
              title="Ma méthodologie" 
              subtitle="Une approche structurée pour des résultats optimaux"
            />
            
            <div className="methodology-steps">
              <motion.div 
                className="methodology-step"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Analyse & Consultation</h3>
                  <p>Compréhension approfondie de vos besoins, objectifs et contraintes pour définir ensemble les solutions les plus adaptées.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="methodology-step"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Conception & Planification</h3>
                  <p>Élaboration d'une stratégie claire, création de maquettes et définition d'un planning précis pour la réalisation du projet.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="methodology-step"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Développement & Tests</h3>
                  <p>Réalisation technique selon les meilleures pratiques et tests rigoureux pour garantir qualité et performance.</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="methodology-step"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Livraison & Suivi</h3>
                  <p>Mise en ligne, formation à l'utilisation et accompagnement post-lancement pour assurer le succès de votre projet.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section des tarifs */}
      <section className="pricing-section">
        <div className="container">
          <motion.div 
            className="pricing-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle 
              title="Tarifs & Formules" 
              subtitle="Des solutions adaptées à votre budget"
            />
            
            <div className="pricing-info">
              <p>
                Chaque projet étant unique, mes tarifs sont établis sur mesure en fonction de vos besoins spécifiques.
                Je propose différentes formules pour m'adapter à tous les types de projets, des simples sites vitrines aux applications web complexes.
              </p>
              <p>
                Pour obtenir un devis personnalisé, n'hésitez pas à me contacter en détaillant votre projet.
                Je vous répondrai dans les plus brefs délais avec une proposition adaptée à vos besoins et à votre budget.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section CTA */}
      <CtaSection />
    </div>
  );
};

export default Services;