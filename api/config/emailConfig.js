const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: true,
    port: 465,
    logger: true,
    debug: true
});

const sendNotificationEmail = async (testimonial) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'Nouveau témoignage en attente d\'approbation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Nouveau témoignage</h2>
                    <p><strong>Nom :</strong> ${testimonial.name}</p>
                    <p><strong>Poste / Entreprise :</strong> ${testimonial.position}</p>
                    <p><strong>Note :</strong> ${testimonial.rating}/5</p>
                    <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <p><strong>Message :</strong></p>
                        <p>${testimonial.text}</p>
                    </div>
                    <p style="color: #666;">
                        <a href="${process.env.ADMIN_URL}">Connectez-vous à l'administration</a> pour approuver ou rejeter ce témoignage.
                    </p>
                    <p style="color: #999; font-size: 0.8em;">
                        Date de soumission : ${new Date(testimonial.createdAt).toLocaleString('fr-FR')}
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email de notification envoyé avec succès:', info.response);
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de notification:', error);
        return false;
    }
};

transporter.verify((error, success) => {
    if (error) {
        console.error('Erreur de configuration du transporteur email:', error);
    } else {
        console.log('Configuration du serveur email prête');
    }
});

module.exports = { 
    transporter, 
    sendNotificationEmail 
};