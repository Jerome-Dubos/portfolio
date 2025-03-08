const express = require('express');
const { 
  createTestimonial, 
  getApprovedTestimonials, 
  getAllTestimonials,
  approveTestimonial,
  deleteTestimonial
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(createTestimonial)
  .get(getApprovedTestimonials);

router.get('/all', protect, getAllTestimonials);
router.put('/:id/approve', protect, approveTestimonial);
router.delete('/:id', protect, deleteTestimonial);

module.exports = router;