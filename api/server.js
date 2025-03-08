const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Charger les variables d'environnement
dotenv.config();

// Connecter à la base de données
connectDB();

// Routes
const testimonialRoutes = require('./routes/testimonialRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Utiliser les routes
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/auth', authRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route pour gérer les erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});