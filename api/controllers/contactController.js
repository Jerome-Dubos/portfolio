const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
});

const validateContactForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 40) {
    errors.name = "Le nom doit contenir entre 2 et 40 caractères";
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Adresse email invalide";
  }
  
  if (!data.message || data.message.trim().length < 10 || data.message.trim().length > 500) {
    errors.message = "Le message doit contenir entre 10 et 500 caractères";
  }
  
  if (data.phone && !/^(\+?\d{1,3}[-.\s]?)?(\d{10})$/.test(data.phone)) {
    errors.phone = "Numéro de téléphone invalide";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;

    const validation = validateContactForm({ name, email, message, phone });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation échouée',
        errors: validation.errors
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `Nouveau message de contact : ${name}`,
      html: `
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
        <p><strong>Message :</strong><br>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du mail:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de l\'envoi du message',
      error: error.message
    });
  }
};

module.exports = { sendContactEmail };
