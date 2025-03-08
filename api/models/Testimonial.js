const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Veuillez fournir un nom'],
      trim: true,
      minlength: [3, 'Le nom doit comporter au moins 3 caractères'],
      maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
    },
    position: {
      type: String,
      required: [true, 'Veuillez fournir un poste/entreprise'],
      trim: true,
      minlength: [3, 'Le poste doit comporter au moins 3 caractères'],
      maxlength: [50, 'Le poste ne peut pas dépasser 50 caractères']
    },
    rating: {
      type: Number,
      required: [true, 'Veuillez attribuer une note'],
      min: [1, 'La note doit être au moins de 1'],
      max: [5, 'La note ne peut pas dépasser 5']
    },
    text: {
      type: String,
      required: [true, 'Veuillez fournir un avis'],
      trim: true,
      minlength: [10, 'Votre avis doit comporter au moins 10 caractères'],
      maxlength: [500, 'Votre avis ne peut pas dépasser 500 caractères']
    },
    isApproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;