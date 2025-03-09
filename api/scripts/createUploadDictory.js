const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'projects');

try {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Dossier de téléchargement créé : ${uploadDir}`);
} catch (error) {
  console.error('Erreur lors de la création du dossier de téléchargement:', error);
}