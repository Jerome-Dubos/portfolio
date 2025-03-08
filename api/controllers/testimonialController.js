const Testimonial = require('../models/Testimonial');
const { sendNotificationEmail } = require('../config/emailConfig');

// @desc    Créer un nouveau témoignage
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = async (req, res) => {
  try {
    const { name, position, rating, text } = req.body;

    if (!name || !position || !rating || !text) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    }

    // Validation supplémentaire
    if (name.length < 2 || name.length > 50) {
      return res.status(400).json({ message: 'Le nom doit contenir entre 2 et 50 caractères' });
    }

    if (position.length < 2 || position.length > 50) {
      return res.status(400).json({ message: 'Le poste/entreprise doit contenir entre 2 et 50 caractères' });
    }

    if (text.length < 10 || text.length > 500) {
      return res.status(400).json({ message: 'Le témoignage doit contenir entre 10 et 500 caractères' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'La note doit être entre 1 et 5' });
    }

    const testimonial = await Testimonial.create({
      name,
      position,
      rating,
      text,
      isApproved: false
    });

    // Envoyer une notification par email
    try {
      await sendNotificationEmail(testimonial);
    } catch (emailError) {
      console.error('Erreur lors de l\'envoi de l\'email de notification:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Votre témoignage a été soumis et sera examiné par l\'administrateur.',
      data: testimonial
    });

  } catch (error) {
    console.error('Erreur lors de la création du témoignage:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la soumission du témoignage',
      error: error.message 
    });
  }
};

module.exports = { createTestimonial };