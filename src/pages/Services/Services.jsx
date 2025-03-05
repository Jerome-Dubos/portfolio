import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCode, 
  FaDesktop, 
  FaMobileAlt, 
  FaRocket, 
  FaChartLine, 
  FaServer,
  FaCheck,
  FaArrowRight,
  FaLightbulb,
  FaPencilRuler,
  FaLaptopCode,
  FaRedo
} from "react-icons/fa";
import "./Services.css";

// Données des services
const servicesData = [
  {
    id: "frontend",
    icon: <FaCode />,
    title: "Développement Frontend",
    shortDescription: "Création d'interfaces modernes et interactives avec React et Vue.js",
    description: "Je développe des interfaces utilisateur réactives et performantes en utilisant les frameworks JavaScript modernes comme React et Vue.js. Avec une attention particulière aux détails et à l'expérience utilisateur, je crée des interfaces fluides, intuitives et visuellement attrayantes.",
    features: [
      "Développement avec React.js / Vue.js",
      "Applications Single Page (SPA)",
      "Interfaces responsive et adaptatives",
      "Optimisation des performances",
      "Animations et transitions fluides"
    ],
    pricing: {
      project: "À partir de 3000€",
      hourly: "80€ / heure"
    }
  },
  {
    id: "fullstack",
    icon: <FaServer />,
    title: "Développement Fullstack",
    shortDescription: "Solutions complètes combinant frontend moderne et API backend robuste",
    description: "Je propose des solutions fullstack complètes incluant à la fois le développement frontend et backend. Que ce soit pour une application web, une API RESTful ou une solution e-commerce, je m'occupe de l'architecture complète de votre projet.",
    features: [
      "Architecture frontend-backend",
      "API REST / GraphQL",
      "Bases de données SQL / NoSQL",
      "Authentification et sécurité",
      "Déploiement et hébergement"
    ],
    pricing: {
      project: "À partir de 5000€",
      hourly: "90€ / heure"
    }
  },
  {
    id: "mobile",
    icon: <FaMobileAlt />,
    title: "Applications Web Mobiles",
    shortDescription: "Applications mobiles performantes avec React Native et technologies web",
    description: "Je développe des applications web mobiles optimisées et des Progressive Web Apps (PWA) qui fonctionnent parfaitement sur tous les appareils. Je m'assure que votre application offre une expérience utilisateur native tout en utilisant des technologies web.",
    features: [
      "Applications React Native",
      "Progressive Web Apps (PWA)",
      "Design responsive",
      "Optimisation pour appareils mobiles",
      "Fonctionnalités hors ligne"
    ],
    pricing: {
      project: "À partir de 4000€",
      hourly: "85€ / heure"
    }
  },
  {
    id: "design",
    icon: <FaDesktop />,
    title: "UI/UX Design",
    shortDescription: "Conception d'interfaces intuitives et esthétiques centrées sur l'utilisateur",
    description: "Je crée des designs d'interface utilisateur modernes et intuitifs en mettant l'accent sur l'expérience utilisateur. Du wireframing aux maquettes finales, je conçois des interfaces qui allient esthétique et fonctionnalité pour une expérience optimale.",
    features: [
      "Wireframing et prototypage",
      "Design d'interface utilisateur",
      "Expérience utilisateur (UX)",
      "Design System",
      "Maquettes responsive"
    ],
    pricing: {
      project: "À partir de 2000€",
      hourly: "75€ / heure"
    }
  },
  {
    id: "performance",
    icon: <FaChartLine />,
    title: "Optimisation de Performance",
    shortDescription: "Amélioration des performances et de l'expérience utilisateur de vos applications",
    description: "J'analyse et optimise les performances de vos applications web existantes pour améliorer la vitesse de chargement, la réactivité et l'expérience utilisateur globale. Je m'assure que votre site répond aux meilleures pratiques et standards web actuels.",
    features: [
      "Audit de performance",
      "Optimisation du temps de chargement",
      "Optimisation SEO technique",
      "Amélioration des Core Web Vitals",
      "Optimisation des ressources"
    ],
    pricing: {
      project: "À partir de 1500€",
      hourly: "85€ / heure"
    }
  },
  {
    id: "maintenance",
    icon: <FaRocket />,
    title: "Maintenance & Support",
    shortDescription: "Suivi et maintenance continue de vos applications pour garantir leur bon fonctionnement",
    description: "Je propose des services de maintenance et de support pour assurer le bon fonctionnement de vos applications web dans la durée. De la correction de bugs aux mises à jour régulières, je m'assure que votre site reste à jour et performant.",
    features: [
      "Correctifs et résolution de bugs",
      "Mises à jour de sécurité",
      "Améliorations progressives",
      "Monitoring de performance",
      "Support technique"
    ],
    pricing: {
      project: "À partir de 500€ / mois",
      hourly: "70€ / heure"
    }
  }
];

// Données du processus de travail
const processSteps = [
  {
    icon: <FaLightbulb />,
    title: "1. Découverte",
    description: "Nous commençons par discuter de votre projet, vos objectifs et vos besoins spécifiques pour bien comprendre votre vision."
  },
  {
    icon: <FaPencilRuler />,
    title: "2. Planification",
    description: "Je crée un plan détaillé incluant l'architecture, les fonctionnalités et un calendrier pour la réalisation du projet."
  },
  {
    icon: <FaLaptopCode />,
    title: "3. Développement",
    description: "Je développe votre projet en suivant les meilleures pratiques et en vous tenant informé de l'avancement."
  },
  {
    icon: <FaRedo />,
    title: "4. Livraison & Support",
    description: "Après la livraison, je reste disponible pour les ajustements nécessaires et pour vous accompagner dans la suite."
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  
  // Ouvrir le modal de détail du service
  const openServiceDetail = (service) => {
    setSelectedService(service);
    setShowPricing(false);
    document.body.style.overflow = "hidden"; // Empêcher le défilement
  };
  
  // Fermer le modal
  const closeServiceDetail = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto"; // Rétablir le défilement
  };
  
  // Basculer l'affichage des prix
  const togglePricing = () => {
    setShowPricing(!showPricing);
  };
  
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero" id="services">
        <div className="container">
          <motion.div 
            className="services-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Mes Services</h1>
            <p className="lead-text">
              Solutions web sur mesure pour répondre à vos besoins spécifiques
            </p>
            <p>
              Je propose une gamme complète de services de développement web, de la conception d'interfaces utilisateur à la création d'applications web complètes. Découvrez ci-dessous comment je peux vous aider à concrétiser votre projet.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {servicesData.map((service, index) => (
              <motion.div 
                key={service.id}
                className="service-card"
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => openServiceDetail(service)}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <button className="service-btn">
                  En savoir plus <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Mon Processus
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
            >
              Une approche structurée pour mener votre projet au succès
            </motion.p>
          </div>
          
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="process-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="step-icon">
                  {step.icon}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
            
            <div className="process-line"></div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Questions Fréquentes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
            >
              Tout ce que vous devez savoir sur mes services
            </motion.p>
          </div>
          
          <div className="faq-grid">
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>Combien de temps faut-il pour développer un site web ?</h3>
              <p>La durée dépend de la complexité du projet. Un site vitrine simple peut prendre 2-3 semaines, tandis qu'une application web complète peut nécessiter 2-3 mois ou plus. Je fournis toujours une estimation détaillée avant de commencer.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Comment se déroule la collaboration à distance ?</h3>
              <p>Je travaille avec des outils de gestion de projet comme Trello ou Asana, et nous communiquons régulièrement par email, appels vidéo ou messagerie instantanée. Je vous tiens informé de l'avancement à chaque étape du projet.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3>Que se passe-t-il après la livraison du projet ?</h3>
              <p>Après la livraison, je propose une période de support pour résoudre tout problème éventuel. Je propose également des services de maintenance continue pour garder votre site à jour et optimisé.</p>
            </motion.div>
            
            <motion.div 
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3>Comment sont calculés les tarifs ?</h3>
              <p>Les tarifs dépendent de la complexité du projet, des fonctionnalités requises et du délai d'exécution. Je propose des tarifs forfaitaires pour les projets complets ou un taux horaire pour des missions spécifiques.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Prêt à démarrer votre projet ?</h2>
            <p>Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé.</p>
            <a href="/contact" className="btn btn-accent btn-lg">
              Demander un devis
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Modal pour les détails du service */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeServiceDetail}
          >
            <motion.div 
              className="service-modal"
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeServiceDetail}>×</button>
              
              <div className="service-modal-header">
                <div className="modal-icon">
                  {selectedService.icon}
                </div>
                <h2>{selectedService.title}</h2>
              </div>
              
              <div className="service-modal-content">
                <p className="modal-description">{selectedService.description}</p>
                
                <div className="modal-section">
                  <h3>Ce que j'offre</h3>
                  <ul className="feature-list">
                    {selectedService.features.map((feature, index) => (
                      <li key={index}>
                        <FaCheck className="feature-icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pricing-toggle">
                  <button onClick={togglePricing}>
                    {showPricing ? "Masquer les tarifs" : "Voir les tarifs"} <FaArrowRight className={showPricing ? "rotate-down" : ""} />
                  </button>
                </div>
                
                <AnimatePresence>
                  {showPricing && (
                    <motion.div 
                      className="modal-pricing"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="pricing-option">
                        <h4>Projet forfaitaire</h4>
                        <div className="price">{selectedService.pricing.project}</div>
                        <p>Pour des projets avec un périmètre bien défini</p>
                      </div>
                      
                      <div className="pricing-option">
                        <h4>Taux horaire</h4>
                        <div className="price">{selectedService.pricing.hourly}</div>
                        <p>Pour des missions ponctuelles ou à temps partiel</p>
                      </div>
                      
                      <p className="pricing-note">
                        * Les tarifs peuvent varier en fonction des spécificités de votre projet.
                        Contactez-moi pour obtenir un devis personnalisé.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="modal-cta">
                  <a href="/contact" className="btn btn-primary">
                    Demander un devis
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;