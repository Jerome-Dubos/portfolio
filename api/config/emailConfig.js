const nodemailer = require('nodemailer');

// Configurer le transporteur d'email
const transporter = nodemailer.createTransport({
    service: 'gmail', // ou un autre service comme 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Fonction pour envoyer un email de notification
const sendNotificationEmail = async (testimonial) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'Nouvel avis soumis',
            html: `
        <h2>Un nouveau témoignage a été soumis</h2>
        <p><strong>Nom :</strong> ${testimonial.name}</p>
        <p><strong>Poste / Entreprise :</strong> ${testimonial.position}</p>
        <p><strong>Note :</strong> ${testimonial.rating}/5</p>
        <p><strong>Message :</strong> ${testimonial.text}</p>
        <p><strong>Date de soumission :</strong> ${new Date(testimonial.createdAt).toLocaleString('fr-FR')}</p>
        <p>Connectez-vous au <a href="${process.env.ADMIN_URL || 'http://localhost:5173/admin'}">panneau d'administration</a> pour approuver ou supprimer cet avis.</p>
      `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès:', info.response);
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return false;
    }
};

module.exports = { sendNotificationEmail };