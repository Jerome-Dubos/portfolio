const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const createAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount > 0) {
      console.log('Un administrateur existe déjà dans la base de données');
      process.exit();
    }

    const admin = await Admin.create({
      username: 'Fouzouille',
      password: 'Azeqsdwxc30.'
    });
    
    console.log(`Admin créé avec succès: ${admin.username}`);
    process.exit();
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();