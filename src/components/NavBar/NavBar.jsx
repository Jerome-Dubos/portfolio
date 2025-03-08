import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import handleContactClick from "../../utils/handleContactClick";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FaBars, FaTimes, FaArrowRight } from "react-icons/fa";
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
  const navItemsRef = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({});

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

  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.path === location.pathname);
    
    if (activeIndex !== -1 && navItemsRef.current[activeIndex]) {
      const activeItem = navItemsRef.current[activeIndex];
      const navLinksElement = document.querySelector('.nav-links');
      
      if (activeItem && navLinksElement) {
        const { width, left } = activeItem.getBoundingClientRect();
        const navLeft = navLinksElement.getBoundingClientRect().left;
        
        const relativeLeft = left - navLeft;
        
        setIndicatorStyle({
          width: `${width}px`,
          left: `${relativeLeft}px`,
          opacity: 1
        });
      }
    } else {
      setIndicatorStyle({ opacity: 0 });
    }
  }, [location.pathname, navItemsRef.current.length]);

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
        <Link 
          to="/" 
          className="logo-link"
          onClick={(e) => handleNavClick(e, "/")}
        >
          <span className="logo-text">Dubos <span className="logo-accent">Web Services</span></span>
        </Link>

        <div className="desktop-menu">
          <ul className="nav-links">
            {navLinks.map(({ path, label }, index) => (
              <li 
                key={path} 
                className="nav-item"
                ref={el => navItemsRef.current[index] = el}
              >
                <Link
                  to={path}
                  className={`nav-link ${location.pathname === path ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, path)}
                >
                  {label}
                </Link>
              </li>
            ))}
            <motion.div 
              className="nav-indicator"
              initial={false}
              animate={indicatorStyle}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            />
          </ul>
          <div className="nav-actions">
            <ThemeToggle />
            <motion.button 
              className="btn btn-primary btn-cta btn-glow-hover" 
              onClick={(e) => handleContactClick(navigate, location, e)} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Me contacter <FaArrowRight className="btn-icon" />
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
          <motion.div className="mobile-menu glass"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
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
              <li className="mobile-nav-item cta-item">
                <motion.button 
                  className="btn btn-primary btn-cta btn-glow-hover w-full" 
                  onClick={(e) => handleContactClick(navigate, location, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Me contacter <FaArrowRight className="btn-icon" />
                </motion.button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;