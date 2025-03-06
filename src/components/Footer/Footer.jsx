import LegalModal from "../LegalModal/LegalModal";
import "./Footer.css";
import { FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Dubos Web Services. Tous droits réservés.
        </p>
        <nav className="footer-nav">
          <a href="https://github.com/TON_GITHUB" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaGithub />
          </a>
          <a href="https://instagram.com/TON_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <FaInstagram />
          </a>
          <LegalModal />
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
