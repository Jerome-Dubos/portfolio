const Project = require('../models/Projects');
const { uploadImage } = require('../utils/imageUpload');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });

    const projectsWithDefaultImages = projects.map(project => ({
      ...project.toObject(),
      image: project.image || req.defaultProjectImage
    }));

    const categories = [...new Set(projectsWithDefaultImages.map(p => p.category))];

    res.status(200).json({ 
      success: true, 
      count: projectsWithDefaultImages.length, 
      data: projectsWithDefaultImages,
      categories
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la récupération des projets',
      error: error.message 
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Projet non trouvé' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : req.body.tags.split(',').map(tag => tag.trim()).filter(Boolean);

    const imageUrl = req.file
      ? await uploadImage(req.file)
      : req.defaultProjectImage;

    const newProject = await Project.create({ ...req.body, tags, image: imageUrl });

    req.io.emit('project:created', newProject);

    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : req.body.tags.split(',').map(tag => tag.trim()).filter(Boolean);

    const imageUrl = req.file
      ? await uploadImage(req.file)
      : req.body.image || req.defaultProjectImage;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, tags, image: imageUrl },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ success: false, message: 'Projet non trouvé' });
    }

    req.io.emit('project:updated', project);

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Projet non trouvé' });
    }

    req.io.emit('project:deleted', req.params.id);

    res.status(200).json({ success: true, message: 'Projet supprimé' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProjectsOrder = async (req, res) => {
  try {
    const { projectsOrder } = req.body;

    for (const item of projectsOrder) {
      await Project.findByIdAndUpdate(item.id, { order: item.order });
    }

    req.io.emit('projects:reordered', projectsOrder);

    res.status(200).json({ success: true, message: 'Ordre mis à jour' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    project.featured = !project.featured;
    await project.save();

    req.io.emit('project:featured:toggled', project);

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectsOrder,
  toggleFeatured
};
