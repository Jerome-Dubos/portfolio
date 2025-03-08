const Testimonial = require('../models/Testimonial');
const { sendNotificationEmail } = require('../config/emailConfig');

const createTestimonial = async (req, res) => {
  try {
    const { name, position, rating, text } = req.body;

    if (!name || !position || !rating || !text) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs' });
    }

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

const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true }).sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: testimonials.length, 
      data: testimonials 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages approuvés:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la récupération des témoignages',
      error: error.message 
    });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: testimonials.length, 
      data: testimonials 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les témoignages:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la récupération des témoignages',
      error: error.message 
    });
  }
};

const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      { isApproved: true },
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Témoignage non trouvé' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Témoignage approuvé avec succès',
      data: testimonial 
    });
  } catch (error) {
    console.error('Erreur lors de l\'approbation du témoignage:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de l\'approbation du témoignage',
      error: error.message 
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Témoignage non trouvé' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Témoignage supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du témoignage:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de la suppression du témoignage',
      error: error.message 
    });
  }
};

module.exports = { 
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  approveTestimonial,
  deleteTestimonial
};