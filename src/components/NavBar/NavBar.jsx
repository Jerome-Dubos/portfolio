import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./NavBar.css";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Données des liens de navigation
  const navLinks = [
    { path: "/", label: "Accueil" },
    { path: "/services", label: "Services" },
    { path: "/projects", label: "Projets" },
    { path: "/about", label: "À propos" },
  ];

  // Fermer le menu lors du changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Détecter le défilement pour changer le style de la barre de navigation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle menu mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Gestion du clic sur le bouton "Me contacter"
  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/about") {
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate("/about#contact");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <span className="logo-text">Dev<span className="logo-accent">Portfolio</span></span>
          </Link>
        </div>
        
        {/* Menu pour desktop */}
        <div className="desktop-menu">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <Link 
                  to={link.path} 
                  className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div 
                      className="nav-indicator" 
                      layoutId="navIndicator"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <ThemeToggle />
            <button className="btn btn-primary nav-cta" onClick={handleContactClick}>Me contacter</button>
          </div>
        </div>
        
        {/* Menu toggle pour mobile */}
        <div className="mobile-controls">
          <ThemeToggle />
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container">
              <ul className="mobile-nav-links">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.path}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                    className="mobile-nav-item"
                  >
                    <Link 
                      to={link.path} 
                      className={`mobile-nav-link ${location.pathname === link.path ? "active" : ""}`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * navLinks.length }}
                  className="mobile-nav-item cta-item"
                >
                  <button className="btn btn-primary w-full" onClick={handleContactClick}>Me contacter</button>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;