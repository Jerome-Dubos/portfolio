import { motion } from "framer-motion";
import { 
  FaReact, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaNodeJs, 
  FaVuejs,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaFigma
} from "react-icons/fa";
import "./About.css";

// Données pour la timeline du parcours
const timelineData = [
  {
    year: "2023",
    title: "Senior Frontend Developer",
    company: "TechInnovate",
    description: "Lead developer sur des projets d'applications web complexes. Mise en place d'architectures React modernes et scalables."
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "DigitalSolutions",
    description: "Développement d'interfaces utilisateur réactives pour des applications SaaS. Travail avec React, Vue.js et Node.js."
  },
  {
    year: "2018",
    title: "Web Developer",
    company: "WebCreate",
    description: "Création de sites vitrines et e-commerces pour différents clients. Focus sur l'expérience utilisateur et le responsive design."
  },
  {
    year: "2016",
    title: "Formation Développeur Web",
    company: "Tech Academy",
    description: "Formation intensive aux technologies web modernes. Spécialisation en JavaScript et frameworks frontend."
  }
];

// Données pour les compétences
const skills = [
  { name: "React", level: 90, icon: <FaReact /> },
  { name: "Vue.js", level: 85, icon: <FaVuejs /> },
  { name: "JavaScript", level: 95, icon: <FaJs /> },
  { name: "HTML5", level: 90, icon: <FaHtml5 /> },
  { name: "CSS3", level: 85, icon: <FaCss3Alt /> },
  { name: "Node.js", level: 80, icon: <FaNodeJs /> },
  { name: "Bases de données", level: 75, icon: <FaDatabase /> },
  { name: "Docker", level: 70, icon: <FaDocker /> },
  { name: "Git", level: 85, icon: <FaGitAlt /> },
  { name: "UI/UX Design", level: 80, icon: <FaFigma /> }
];

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <motion.div 
              className="about-image"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src="/assets/profile-photo.jpg" alt="Photo de profil" />
            </motion.div>
            
            <motion.div 
              className="about-intro"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>À propos de moi</h1>
              <p className="lead-text">
                Développeur Web Frontend passionné par la création d'interfaces modernes et intuitives.
              </p>
              <p>
                Avec plus de 7 ans d'expérience dans le développement web, je me spécialise dans la création d'applications web réactives et performantes en utilisant les dernières technologies frontend. Ma passion est de transformer des concepts complexes en expériences utilisateur fluides et accessibles.
              </p>
              <p>
                Basé à Paris, je travaille avec des clients du monde entier pour donner vie à leurs projets digitaux.
              </p>
              
              <div className="about-cta">
                <a href="/assets/cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Télécharger mon CV
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="skills-section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Mes Compétences
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
            >
              Technologies et outils que j'utilise au quotidien
            </motion.p>
          </div>
          
          <div className="skills-container">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="skill-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="skill-icon">
                  {skill.icon}
                </div>
                <div className="skill-info">
                  <div className="skill-name">{skill.name}</div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-level"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Mon Parcours
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
            >
              Mon expérience professionnelle et ma formation
            </motion.p>
          </div>
          
          <div className="timeline">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
            <div className="timeline-line"></div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Mes Valeurs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="section-subtitle"
            >
              Ce qui guide mon approche professionnelle
            </motion.p>
          </div>
          
          <div className="values-container">
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3>Qualité</h3>
              <p>Je m'engage à fournir un code propre, bien documenté et suivant les meilleures pratiques du secteur.</p>
            </motion.div>
            
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>Innovation</h3>
              <p>Je reste constamment à jour avec les dernières technologies et méthodologies pour proposer les meilleures solutions.</p>
            </motion.div>
            
            <motion.div 
              className="value-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3>Communication</h3>
              <p>Je crois en une communication claire et transparente pour garantir le succès de chaque projet.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Prêt à collaborer ensemble ?</h2>
            <p>Discutons de votre projet et de comment je peux vous aider à atteindre vos objectifs.</p>
            <a href="/contact" className="btn btn-accent btn-lg">
              Me contacter
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;