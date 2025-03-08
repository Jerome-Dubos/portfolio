const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre du projet est requis'],
      trim: true,
      minlength: [3, 'Le titre doit comporter au moins 3 caractères'],
      maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
    },
    description: {
      type: String,
      required: [true, 'La description du projet est requise'],
      trim: true,
      minlength: [10, 'La description doit comporter au moins 10 caractères'],
      maxlength: [1000, 'La description ne peut pas dépasser 1000 caractères']
    },
    category: {
      type: String,
      required: [true, 'La catégorie du projet est requise'],
      trim: true
    },
    image: {
      type: String,
      default: 'https://picsum.photos/800/800'
    },
    demoLink: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v);
        },
        message: props => `${props.value} n'est pas une URL valide`
      }
    },
    githubLink: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\.git)?(\/)?$/.test(v);
        },
        message: props => `${props.value} n'est pas une URL GitHub valide`
      }
    },
    featured: {
      type: Boolean,
      default: false
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function(v) {
          return v.every(tag => tag.trim().length > 0);
        },
        message: 'Les tags ne peuvent pas être vides'
      }
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

projectSchema.pre('save', function(next) {
  if (this.tags) {
    // Filtrer les tags vides et trimmer
    this.tags = this.tags
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }
  next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;