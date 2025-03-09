const express = require('express');
const { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject,
  updateProjectsOrder,
  toggleFeatured
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProjectById);

router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.put('/order/update', protect, updateProjectsOrder);
router.put('/:id/toggle-featured', protect, toggleFeatured);

module.exports = router;