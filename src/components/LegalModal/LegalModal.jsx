import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./LegalModal.css";

const LegalModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <button className="legal-button" onClick={() => setIsOpen(true)}>
        Mentions légales
      </button>
      
      {isOpen && createPortal(
        <div className="legal-modal-overlay show" onClick={() => setIsOpen(false)}>
          <div className="legal-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            <h2 className="legal-title">Mentions légales</h2>
            <div className="legal-content">
              <p><strong>Éditeur du site :</strong> Dubos Web Services</p>
              <p><strong>Responsable de publication :</strong> Jérôme Dubos</p>
              <p><strong>Adresse :</strong> Adresse sur demande</p>
              <p><strong>Email :</strong> contact@duboswebservices.com</p>
              <p><strong>Numéro SIRET :</strong> 94064933800016</p>
              <p><strong>Hébergeur :</strong> Vercel</p>
              <p>
                Conformément à l'article 6 de la loi LCEN, ces mentions légales
                précisent l'identité de l'éditeur et les modalités d'hébergement.
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default LegalModal;
