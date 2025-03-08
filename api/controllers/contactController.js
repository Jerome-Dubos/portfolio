const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    logger: true,
    debug: true  
});

const validateContactForm = (data) => {
  console.log('Données reçues pour validation:', data);
  const errors = {};

  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 40) {
    errors.name = "Le nom doit contenir entre 2 et 40 caractères";
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Adresse email invalide";
  }

  if (!data.message || data.message.trim().length < 10 || data.message.trim().length > 500) {
    errors.message = "Le message doit contenir entre 10 et 500 caractères";
  }

  if (data.phone) {
    const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
    if (!phoneRegex.test(data.phone)) {
      errors.phone = "Numéro de téléphone invalide";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const testSmtpConnection = async () => {
  try {
    await transporter.verify();
    console.log('Connexion SMTP réussie');
    return true;
  } catch (error) {
    console.error('Erreur de connexion SMTP:', error);
    return false;
  }
};

const sendContactEmail = async (req, res) => {
  try {
    console.log('--------- DEBUT TRAITEMENT CONTACT ---------');
    console.log('Corps de la requête reçue:', req.body);

    const smtpConnected = await testSmtpConnection();
    if (!smtpConnected) {
      return res.status(500).json({ 
        message: 'Impossible de se connecter au serveur email',
        details: 'Erreur de configuration SMTP'
      });
    }

    const validation = validateContactForm(req.body);
    if (!validation.isValid) {
      console.log('Erreurs de validation:', validation.errors);
      return res.status(400).json({ 
        message: 'Erreur de validation',
        errors: validation.errors 
      });
    }

    const { name, email, phone, message } = req.body;

    if (!process.env.EMAIL_USER) {
      console.error('EMAIL_USER non défini');
      return res.status(500).json({ 
        message: 'Configuration email incorrecte',
        details: 'EMAIL_USER manquant' 
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
          <p><strong>Message :</strong></p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
          <p style="color: #666; font-size: 0.9em;">
            Message envoyé le : ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `
    };

    try {
      console.log('Tentative d\'envoi d\'email...');
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé avec succès:', info);
      
      console.log('--------- FIN TRAITEMENT CONTACT SUCCÈS ---------');
      res.status(200).json({ 
        success: true, 
        message: 'Votre message a été envoyé avec succès.' 
      });
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email:', emailError);
      console.log('--------- FIN TRAITEMENT CONTACT ERREUR ---------');
      res.status(500).json({ 
        message: 'Erreur lors de l\'envoi du message',
        details: emailError.toString(),
        stack: process.env.NODE_ENV === 'development' ? emailError.stack : undefined
      });
    }

  } catch (error) {
    console.error('Erreur globale lors du traitement du contact:', error);
    console.log('--------- FIN TRAITEMENT CONTACT ERREUR GLOBALE ---------');
    res.status(500).json({ 
      message: 'Erreur serveur lors du traitement du message',
      details: error.toString(),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


testSmtpConnection();

module.exports = { sendContactEmail };