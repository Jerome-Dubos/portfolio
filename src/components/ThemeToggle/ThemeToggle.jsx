import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;
    return "dark";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const currentTheme = getInitialTheme();
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button 
      className="theme-toggle" 
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre"}
    >
      <div className="theme-toggle-inner">
        <motion.div
          className="toggle-thumb"
          layout
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />
        <span className="toggle-icon sun"><FaSun /></span>
        <span className="toggle-icon moon"><FaMoon /></span>
      </div>
    </motion.button>
  );
};

export default ThemeToggle;