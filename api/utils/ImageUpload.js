const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadImage = async (file, type = 'file') => {
  try {
    const uploadDir = path.join(__dirname, '..', 'public', 'uploads', 'projects');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${uuidv4()}.webp`;
    const fullPath = path.join(uploadDir, filename);

    if (type === 'base64') {
      // Conversion base64
      const buffer = Buffer.from(file, 'base64');
      await fs.promises.writeFile(fullPath, buffer);
    } else {
      await fs.promises.rename(file.path, fullPath);
    }

    return `/uploads/projects/${filename}`;
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    throw new Error('Erreur lors de l\'upload de l\'image');
  }
};

module.exports = { uploadImage };