import "./About.css";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";

const About = () => {
  useEffect(() => {
    document.title = "À Propos | Portfolio Développeur Web";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content", 
      "Découvrez mon parcours et mes valeurs en tant que développeur web frontend spécialisé en React et UI/UX."
    );
  }, []);

  return (
    <section className="about">
      <h1 className="about-title">À Propos de Moi</h1>
      <p className="about-description">
        Passionné par le développement web et la création d’expériences numériques immersives,
        j’aide les entreprises et entrepreneurs à concrétiser leurs idées à travers des sites modernes,
        performants et optimisés.
      </p>
      
      <h2 className="about-subtitle">Mon Parcours</h2>
      <p className="about-text">
        Développeur web spécialisé en technologies modernes comme React et Vue.js, 
        j’ai travaillé sur de nombreux projets allant de sites vitrines à des applications complexes.
      </p>
      
      <h2 className="about-subtitle">Mes Valeurs</h2>
      <ul className="about-values">
        <li>💡 Innovation et créativité</li>
        <li>🚀 Performance et optimisation</li>
        <li>📱 Accessibilité et expérience utilisateur</li>
        <li>🤝 Collaboration et transparence</li>
      </ul>

      <h2 className="about-subtitle" id="contact"></h2>
      <ContactForm />
    </section>
  );
};

export default About;