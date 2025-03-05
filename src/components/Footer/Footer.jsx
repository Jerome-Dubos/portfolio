import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaArrowRight,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  
  // Gestion de l'inscription à la newsletter
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // En production, vous ajouteriez ici l'appel à votre service d'e-mailing
      setSubscribed(true);
      setEmail("");
      
      // Réinitialiser après quelques secondes
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  // Année courante pour le copyright
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-main">
            {/* Colonne principale */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="logo-text">Dev<span className="logo-accent">Portfolio</span></span>
              </Link>
              <p className="footer-description">
                Développeur frontend spécialisé dans la création d'interfaces modernes et performantes avec React et Vue.js.
              </p>
              
              <div className="footer-contact">
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>Paris, France</span>
                </div>
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <a href="mailto:contact@votre-domaine.com">contact@votre-domaine.com</a>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <a href="tel:+33600000000">+33 6 XX XX XX XX</a>
                </div>
              </div>
            </div>
            
            {/* Sections de liens */}
            <div className="footer-nav">
              <div className="footer-col">
                <h3>Navigation</h3>
                <ul className="footer-links">
                  <li><Link to="/">Accueil</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/projects">Projets</Link></li>
                  <li><Link to="/about">À propos</Link></li>
                  <li><Link to="/testimonials">Témoignages</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              
              <div className="footer-col">
                <h3>Services</h3>
                <ul className="footer-links">
                  <li><Link to="/services#frontend">Développement Frontend</Link></li>
                  <li><Link to="/services#fullstack">Développement Fullstack</Link></li>
                  <li><Link to="/services#mobile">Applications Web Mobiles</Link></li>
                  <li><Link to="/services#design">UI/UX Design</Link></li>
                  <li><Link to="/services#performance">Optimisation de Performance</Link></li>
                </ul>
              </div>
              
              <div className="footer-col">
                <h3>Légal</h3>
                <ul className="footer-links">
                  <li><Link to="/mentions-legales">Mentions légales</Link></li>
                  <li><Link to="/confidentialite">Politique de confidentialité</Link></li>
                  <li><Link to="/cgv">Conditions générales</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="footer-newsletter">
              <h3>Newsletter</h3>
              <p>Abonnez-vous pour recevoir des conseils et actualités sur le développement web.</p>
              
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    <FaArrowRight />
                  </button>
                </div>
                
                {subscribed && (
                  <motion.div 
                    className="newsletter-success"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaCheckCircle /> Merci pour votre inscription !
                  </motion.div>
                )}
              </form>
              
              <div className="footer-social">
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="mailto:contact@votre-domaine.com" aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pied de page avec copyright */}
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} DevPortfolio. Tous droits réservés.</p>
          <p>Conçu et développé avec <span className="heart">❤</span> en France</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;