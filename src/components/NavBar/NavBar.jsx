import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

// Définition des liens de navigation
const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/services", label: "Services" },
  { path: "/projects", label: "Projets" },
  { path: "/about", label: "À propos" },
];

const NavBar = () => {
  const [state, setState] = useState({ menuOpen: false, scrolled: false });
  const location = useLocation();
  const navigate = useNavigate();

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setState((prev) => ({ ...prev, menuOpen: false }));
  }, [location]);

  // Détecter le scroll pour appliquer le style scrolled à la navbar
  useEffect(() => {
    const handleScroll = () => {
      setState((prev) => ({ ...prev, scrolled: window.scrollY > 20 }));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Gestion du bouton "Me contacter"
  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/about") {
      // Si l'utilisateur est déjà sur la page "À propos", faire défiler jusqu'à la section contact
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Sinon, naviguer vers la page "À propos" puis faire défiler jusqu'à la section contact
      navigate("/about#contact");
      setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 500);
    }
  };

  return (
    <nav className={`navbar glass ${state.scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <span className="logo-text">Dubos <span className="logo-accent">Web Services</span></span>
        </Link>

        {/* Navbar pour desktop */}
        <div className="desktop-menu">
          <ul className="nav-links">
            {navLinks.map(({ path, label }) => (
              <li key={path} className="nav-item">
                <Link to={path} className={`nav-link ${location.pathname === path ? "active" : ""}`}>
                  {label}
                  {/* Animation de soulignement lorsque le lien est actif */}
                  {location.pathname === path && <motion.div className="nav-indicator" layoutId="navIndicator" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <ThemeToggle />
            <motion.button className="btn btn-primary nav-cta" onClick={handleContactClick} whileHover={{ scale: 1.03 }}>
              Me contacter
            </motion.button>
          </div>
        </div>

        {/* Navbar pour mobile */}
        <div className="mobile-controls">
          <ThemeToggle />
          <motion.button 
            className="menu-toggle" 
            onClick={() => setState((prev) => ({ ...prev, menuOpen: !prev.menuOpen }))} 
            aria-label="Menu"
          >
            {state.menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Menu mobile affiché lorsqu'il est ouvert */}
      <AnimatePresence>
        {state.menuOpen && (
          <motion.div 
            className="mobile-menu glass" 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="mobile-nav-links">
              {navLinks.map(({ path, label }) => (
                <li key={path} className="mobile-nav-item">
                  <Link to={path} className={`mobile-nav-link ${location.pathname === path ? "active" : ""}`}>
                    {label}
                  </Link>
                </li>
              ))}
              {/* Bouton de contact dans le menu mobile */}
              <li className="mobile-nav-item">
                <button className="btn btn-primary w-full" onClick={handleContactClick}>
                  Me contacter
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
