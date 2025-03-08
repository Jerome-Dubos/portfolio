const express = require('express');
const { loginAdmin, registerAdmin, getAdminProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', protect, registerAdmin);
router.get('/profile', protect, getAdminProfile);

module.exports = router;