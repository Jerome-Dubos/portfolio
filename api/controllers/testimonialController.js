const Testimonial = require('../models/Testimonial');
const { sendNotificationEmail } = require('../config/emailConfig');

// @desc    Créer un nouveau témoignage
// @route   POST /api/testimonials
// @access  Public
const createTestimonial = async (req, res) => {
  try {
    const { name, position, rating, text } = req.body;

    if (!name || !position || !rating || !text) {
      res.status(400).json({ message: 'Veuillez remplir tous les champs' });
      return;
    }

    const testimonial = await Testimonial.create({
      name,
      position,
      rating,
      text,
      isApproved: false
    });

    // Envoyer une notification par email
    sendNotificationEmail(testimonial)
      .then(success => {
        if (!success) {
          console.log('L\'email de notification n\'a pas pu être envoyé, mais le témoignage a été créé');
        }
      })
      .catch(err => {
        console.error('Erreur d\'envoi d\'email:', err);
      });

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400).json({ message: messages.join(', ') });
    } else {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};

// @desc    Obtenir tous les témoignages approuvés
// @route   GET /api/testimonials
// @access  Public
const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir tous les témoignages (pour l'admin)
// @route   GET /api/testimonials/all
// @access  Private
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Approuver un témoignage
// @route   PUT /api/testimonials/:id/approve
// @access  Private
const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      res.status(404).json({ message: 'Témoignage non trouvé' });
      return;
    }
    
    testimonial.isApproved = true;
    await testimonial.save();
    
    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Rejeter/Supprimer un témoignage
// @route   DELETE /api/testimonials/:id
// @access  Private
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      res.status(404).json({ message: 'Témoignage non trouvé' });
      return;
    }
    
    // Utiliser deleteOne() au lieu de remove()
    await Testimonial.deleteOne({ _id: req.params.id });
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  approveTestimonial,
  deleteTestimonial
};