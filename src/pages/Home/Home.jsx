import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCode, FaLaptopCode, FaRocket, FaCheckCircle } from "react-icons/fa";
import "./Home.css";

// Vous devrez créer ces assets ou utiliser des imports conditionnels
const techLogos = [
  { name: "React", logo: "react-logo.svg" },
  { name: "Vue", logo: "vue-logo.svg" },
  { name: "JavaScript", logo: "javascript-logo.svg" },
  { name: "Node.js", logo: "nodejs-logo.svg" },
  { name: "CSS3", logo: "css3-logo.svg" },
  { name: "HTML5", logo: "html5-logo.svg" }
];

const Home = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  
  // Animation du titre
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Web Developer";
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Animation des stats
  const stats = [
    { number: 50, label: "Projets Réalisés" },
    { number: 20, label: "Clients Satisfaits" },
    { number: 5, label: "Années d'Expérience" }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <motion.div 
              className="hero-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge">Disponible pour missions freelance</span>
            </motion.div>
            
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transformez votre vision en<br />
              <span className="gradient-text">expériences digitales</span><br />
              exceptionnelles
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="typewriter">{displayedText}</span>
              <span className="cursor"></span> spécialisé en création d'interfaces modernes
              et performantes avec React et Vue.js
            </motion.p>
            
            <motion.div 
              className="hero-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/projects" className="btn btn-primary btn-lg">
                Voir mes projets
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Me contacter
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <img src="/assets/hero-illustration.svg" alt="Développement web illustration" />
          </motion.div>
        </div>
        
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,170.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Clients & Technologies Section */}
      <section className="tech-section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Technologies maîtrisées
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
            >
              Je travaille avec les frameworks et librairies modernes pour créer des applications performantes
            </motion.p>
          </div>
          
          <motion.div 
            className="tech-logos"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {techLogos.map((tech, index) => (
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
      
      {/* Value Proposition Section */}
      <section className="value-section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Pourquoi me choisir ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
            >
              Je combine expertise technique et approche centrée sur les besoins clients
            </motion.p>
          </div>
          
          <div className="value-cards">
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="value-icon">
                <FaCode />
              </div>
              <h3>Développement sur mesure</h3>
              <p>Des solutions personnalisées répondant parfaitement à vos besoins spécifiques.</p>
              <ul className="value-features">
                <li><FaCheckCircle /> Sites responsive</li>
                <li><FaCheckCircle /> Applications interactives</li>
                <li><FaCheckCircle /> Code propre et maintenable</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="value-icon">
                <FaRocket />
              </div>
              <h3>Performance optimale</h3>
              <p>Des applications rapides et fluides offrant une expérience utilisateur exceptionnelle.</p>
              <ul className="value-features">
                <li><FaCheckCircle /> Chargement rapide</li>
                <li><FaCheckCircle /> SEO optimisé</li>
                <li><FaCheckCircle /> Expérience utilisateur fluide</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="value-icon">
                <FaLaptopCode />
              </div>
              <h3>Collaboration efficace</h3>
              <p>Une communication claire et un processus transparent du début à la fin du projet.</p>
              <ul className="value-features">
                <li><FaCheckCircle /> Suivi régulier</li>
                <li><FaCheckCircle /> Réactivité</li>
                <li><FaCheckCircle /> Conseils professionnels</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Project Section */}
      <section className="featured-project">
        <div className="container">
          <div className="featured-content">
            <motion.div 
              className="featured-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="featured-label">Projet en vedette</span>
              <h2>Dashboard Analytics</h2>
              <p>Une application web avec des graphiques interactifs permettant de visualiser et analyser des données complexes. Interface intuitive et performances optimisées.</p>
              <div className="featured-tags">
                <span className="tag">React</span>
                <span className="tag">Chart.js</span>
                <span className="tag">Node.js</span>
                <span className="tag">Express</span>
              </div>
              <Link to="/projects" className="btn btn-primary">
                Voir le projet <FaArrowRight />
              </Link>
            </motion.div>
            
            <motion.div 
              className="featured-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img src="/assets/featured-project.jpg" alt="Dashboard Analytics" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-row">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="stat-number">{stat.number}+</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call To Action Section */}
      <section className="home-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Prêt à concrétiser votre projet ?</h2>
            <p>Discutons de vos besoins et de la manière dont je peux vous aider à atteindre vos objectifs.</p>
            <Link to="/contact" className="btn btn-accent btn-lg">
              Me contacter
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;