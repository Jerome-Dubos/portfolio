import "./Services.css";
import CtaSection from "../../components/CtaSection/CtaSection";

const Services = () => {
  const servicesList = [
    { title: "Développement Web", description: "Création de sites web modernes et performants, adaptés aux besoins des entreprises et startups.", icon: "💻" },
    { title: "Design UI/UX", description: "Conception d'interfaces ergonomiques et esthétiques pour une meilleure expérience utilisateur.", icon: "🎨" },
    { title: "Optimisation SEO", description: "Stratégies avancées pour améliorer le référencement et la visibilité sur les moteurs de recherche.", icon: "📈" },
    { title: "Maintenance & Support", description: "Suivi et mise à jour des sites pour garantir leur sécurité et leur performance.", icon: "🔧" },
    { title: "Développement d'Applications Web", description: "Création d’applications web performantes et évolutives avec les technologies modernes.", icon: "⚙️" },
    { title: "Branding & Identité Visuelle", description: "Création d’une identité visuelle forte et cohérente pour renforcer l’image de marque.", icon: "🌟" }
  ];

  return (
    <section className="services">
      <h1 className="services-title">Nos Services</h1>
      <p className="services-intro">Nous proposons des solutions adaptées à vos besoins pour garantir la réussite de votre projet numérique.</p>
      <div className="services-container">
        {servicesList.map((service, index) => (
          <div className="service-card" key={index}>
            <span className="service-icon">{service.icon}</span>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
      <CtaSection />
    </section>
  );
};

export default Services;
