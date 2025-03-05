import { motion } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} - Mon Portfolio</p>
        <div className="footer-links">
          <a href="https://github.com/mon-profil" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/mon-profil" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
