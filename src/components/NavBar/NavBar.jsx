import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import handleContactClick from "../../utils/handleContactClick"; // Import centralisé
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

const navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/services", label: "Services" },
  { path: "/projects", label: "Projets" },
  { path: "/about", label: "À propos" },
];

const NavBar = () => {
  const [state, setState] = useState({ menuOpen: false, scrolled: false, hidden: false });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setState((prev) => ({ ...prev, menuOpen: false }));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setState((prev) => ({
        ...prev,
        scrolled: window.scrollY > 50,
        hidden: location.pathname === "/" && window.scrollY === 0,
      }));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  const handleNavClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  return (
    <nav className={`navbar glass ${state.scrolled ? "scrolled" : ""} ${state.hidden ? "hidden" : ""}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo-link">
          <span className="logo-text">Dubos <span className="logo-accent">Web Services</span></span>
        </Link>

        <div className="desktop-menu">
          <ul className="nav-links">
            {navLinks.map(({ path, label }) => (
              <li key={path} className="nav-item">
                <Link
                  to={path}
                  className={`nav-link ${location.pathname === path ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, path)}
                >
                  {label}
                  {location.pathname === path && <motion.div className="nav-indicator" layoutId="navIndicator" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <ThemeToggle />
            <motion.button 
              className="btn btn-primary nav-cta" 
              onClick={(e) => handleContactClick(navigate, location, e)} 
              whileHover={{ scale: 1.03 }}
            >
              Me contacter
            </motion.button>
          </div>
        </div>

        <div className="mobile-controls">
          <ThemeToggle />
          <motion.button 
            className="menu-toggle" 
            onClick={() => setState((prev) => ({ ...prev, menuOpen: !prev.menuOpen }))}
          >
            {state.menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {state.menuOpen && (
          <motion.div className="mobile-menu glass">
            <ul className="mobile-nav-links">
              {navLinks.map(({ path, label }) => (
                <li key={path} className="mobile-nav-item">
                  <Link
                    to={path}
                    className={`mobile-nav-link ${location.pathname === path ? "active" : ""}`}
                    onClick={(e) => handleNavClick(e, path)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="mobile-nav-item">
                <button 
                  className="btn btn-primary w-full" 
                  onClick={(e) => handleContactClick(navigate, location, e)}
                >
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