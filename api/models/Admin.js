const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Veuillez fournir un nom d\'utilisateur'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Veuillez fournir un mot de passe'],
      minlength: [6, 'Le mot de passe doit comporter au moins 6 caractères'],
      select: false
    }
  },
  {
    timestamps: true
  }
);

// Middleware pour hacher le mot de passe avant d'enregistrer
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour comparer les mots de passe
adminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;