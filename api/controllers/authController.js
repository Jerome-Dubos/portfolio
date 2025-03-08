const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Générer JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Authentifier admin & obtenir token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const admin = await Admin.findOne({ username }).select('+password');
    
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Enregistrer un nouvel admin
// @route   POST /api/auth/register
// @access  Private
const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const adminExists = await Admin.findOne({ username });

    if (adminExists) {
      res.status(400).json({ message: 'Cet administrateur existe déjà' });
      return;
    }

    // Créer un nouvel admin
    const admin = await Admin.create({
      username,
      password,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Données administrateur invalides' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Obtenir le profil admin
// @route   GET /api/auth/profile
// @access  Private
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);

    if (admin) {
      res.json({
        _id: admin._id,
        username: admin.username,
      });
    } else {
      res.status(404).json({ message: 'Administrateur non trouvé' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { loginAdmin, registerAdmin, getAdminProfile };