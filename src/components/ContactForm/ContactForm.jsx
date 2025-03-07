import "./ContactForm.css";
import { useState, useEffect } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [validation, setValidation] = useState({
    name: { isValid: null, errorMessage: "" },
    email: { isValid: null, errorMessage: "" },
    phone: { isValid: null, errorMessage: "" },
    message: { isValid: null, errorMessage: "" },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Regex patterns
  const patterns = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    phone: /^(\+33|0)[1-9](\d{2}){4}$/, // Format français: +33612345678 ou 0612345678
    message: /^.{10,500}$/,
  };

  // Messages d'erreur
  const errorMessages = {
    name: "Veuillez entrer un nom valide (2-40 caractères, lettres uniquement)",
    email: "Veuillez entrer une adresse email valide",
    phone: "Veuillez entrer un numéro de téléphone français valide",
    message: "Votre message doit contenir entre 10 et 500 caractères",
  };

  const validateField = (name, value) => {
    if (!value) {
      return { isValid: null, errorMessage: "" };
    }
    
    const isValid = patterns[name].test(value);
    return {
      isValid,
      errorMessage: isValid ? "" : errorMessages[name],
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    setValidation({
      ...validation,
      [name]: validateField(name, value),
    });
  };

  // Valider et mettre à jour l'état du formulaire
  useEffect(() => {
    const formFields = Object.keys(formData);
    const isValid = formFields.every(field => {
      // Le téléphone est optionnel
      if (field === 'phone' && !formData[field]) return true;
      
      // Pour les autres champs, ils doivent être valides
      return validation[field].isValid === true;
    });
    
    setIsFormValid(isValid);
  }, [validation, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Valider tous les champs avant l'envoi
    const validationResults = {};
    Object.keys(formData).forEach(field => {
      // Ne pas valider le téléphone s'il est vide
      if (field === 'phone' && !formData[field]) {
        validationResults[field] = { isValid: null, errorMessage: "" };
      } else {
        validationResults[field] = validateField(field, formData[field]);
      }
    });
    
    setValidation(validationResults);
    
    // Vérifier si tous les champs obligatoires sont valides
    const requiredFields = ['name', 'email', 'message'];
    const isFormValid = requiredFields.every(field => validationResults[field].isValid);
    
    if (isFormValid) {
      console.log("Form submitted:", formData);
      alert("Message envoyé avec succès !");
      
      // Réinitialiser le formulaire
      setFormData({ name: "", email: "", phone: "", message: "" });
      setValidation({
        name: { isValid: null, errorMessage: "" },
        email: { isValid: null, errorMessage: "" },
        phone: { isValid: null, errorMessage: "" },
        message: { isValid: null, errorMessage: "" },
      });
    } else {
      alert("Veuillez corriger les erreurs dans le formulaire");
    }
  };

  // Classe CSS dynamique en fonction de l'état de validation
  const getInputClass = (field) => {
    if (validation[field].isValid === null) return "";
    return validation[field].isValid ? "input-valid" : "input-invalid";
  };

  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="contact-title">Contactez-nous</h2>
        <div className="form-legend">
          <span className="required">*</span> <span className="legend-text">Champs obligatoires</span>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom <span className="required">*</span></label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className={getInputClass("name")}
              required 
            />
            {validation.name.errorMessage && (
              <div className="error-message">{validation.name.errorMessage}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className={getInputClass("email")}
              required 
            />
            {validation.email.errorMessage && (
              <div className="error-message">{validation.email.errorMessage}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Téléphone <span className="optional">(optionnel)</span></label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className={getInputClass("phone")}
            />
            {validation.phone.errorMessage && (
              <div className="error-message">{validation.phone.errorMessage}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message <span className="required">*</span></label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              className={getInputClass("message")}
              required
            ></textarea>
            {validation.message.errorMessage && (
              <div className="error-message">{validation.message.errorMessage}</div>
            )}
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isFormValid ? 'submit-valid' : ''}`}
            disabled={!isFormValid && Object.keys(validation).some(field => validation[field].isValid === false)}
          >
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;