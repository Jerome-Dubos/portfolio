import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone,
  FaCheck,
  FaSpinner
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    status: "idle", // idle, submitting, success, error
    message: ""
  });
  
  const [formErrors, setFormErrors] = useState({});
  const formRef = useRef(null);
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Réinitialiser l'erreur lorsque l'utilisateur corrige le champ
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  // Validation du formulaire
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Le nom est requis";
    }
    
    if (!formData.email.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format d'email invalide";
    }
    
    if (!formData.subject.trim()) {
      errors.subject = "Le sujet est requis";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Le message est requis";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Le message doit contenir au moins 10 caractères";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormStatus({
      status: "submitting",
      message: "Envoi en cours..."
    });
    
    // Simuler un envoi d'API (à remplacer par votre logique d'envoi réelle)
    setTimeout(() => {
      setFormStatus({
        status: "success",
        message: "Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais."
      });
      
      // Réinitialiser le formulaire après succès
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Réinitialiser le statut après quelques secondes
      setTimeout(() => {
        setFormStatus({
          status: "idle",
          message: ""
        });
      }, 5000);
    }, 1500);
  };
  
  return (
    <section className="contact-section">
      <div className="container">
        <div className="section-title">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Me Contacter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="section-subtitle"
          >
            Discutons de votre projet et de comment je peux vous aider
          </motion.p>
        </div>
        
        <div className="contact-container">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="info-card">
              <h3>Informations de contact</h3>
              <p>N'hésitez pas à me contacter pour toute question, je serai ravi de vous aider.</p>
              
              <ul className="contact-details">
                <li>
                  <div className="detail-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="detail-text">
                    <h4>Localisation</h4>
                    <p>Paris, France</p>
                  </div>
                </li>
                <li>
                  <div className="detail-icon">
                    <FaEnvelope />
                  </div>
                  <div className="detail-text">
                    <h4>Email</h4>
                    <p>contact@votre-domaine.com</p>
                  </div>
                </li>
                <li>
                  <div className="detail-icon">
                    <FaPhone />
                  </div>
                  <div className="detail-text">
                    <h4>Téléphone</h4>
                    <p>+33 6 XX XX XX XX</p>
                  </div>
                </li>
              </ul>
              
              <div className="social-links">
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-header">
                <h3>Envoyez-moi un message</h3>
                <p>Je vous répondrai dans les 24 heures</p>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={formErrors.name ? 'error' : ''}
                  />
                  {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={formErrors.email ? 'error' : ''}
                  />
                  {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={formErrors.subject ? 'error' : ''}
                />
                {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={formErrors.message ? 'error' : ''}
                ></textarea>
                {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={formStatus.status === "submitting"}
                >
                  {formStatus.status === "submitting" ? (
                    <>
                      <FaSpinner className="icon-spin" /> Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le message"
                  )}
                </button>
              </div>
              
              {formStatus.status !== "idle" && (
                <div className={`form-status ${formStatus.status}`}>
                  {formStatus.status === "success" && <FaCheck />}
                  {formStatus.message}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
      
      {/* Map ou image de fond décorative */}
      <div className="contact-map">
        <img src="/assets/map-placeholder.jpg" alt="Localisation" />
      </div>
    </section>
  );
};

export default Contact;