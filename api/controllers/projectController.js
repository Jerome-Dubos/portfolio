const Project = require('../models/Projects');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({ 
      success: true, 
      count: projects.length, 
      data: projects 
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
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
      return res.status(404).json({ 
        success: false, 
        message: 'Projet non trouvé' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: project 
    });
  } catch (error) {
    console.error(`Erreur lors de la récupération du projet ${req.params.id}:`, error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la récupération du projet',
      error: error.message 
    });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Projet créé avec succès',
      data: newProject
    });
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: messages
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la création du projet',
      error: error.message 
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { 
        new: true,
        runValidators: true
      }
    );
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Projet non trouvé' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Projet mis à jour avec succès',
      data: project
    });
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du projet ${req.params.id}:`, error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: messages
      });
    }
    
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la mise à jour du projet',
      error: error.message 
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Projet non trouvé' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Projet supprimé avec succès',
      data: {}
    });
  } catch (error) {
    console.error(`Erreur lors de la suppression du projet ${req.params.id}:`, error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la suppression du projet',
      error: error.message 
    });
  }
};

const updateProjectsOrder = async (req, res) => {
  try {
    const { projectsOrder } = req.body;
    
    if (!Array.isArray(projectsOrder) || projectsOrder.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Format de données invalide'
      });
    }
    
    for (const item of projectsOrder) {
      if (!item.id || typeof item.order !== 'number') {
        return res.status(400).json({
          success: false,
          message: 'Format de données invalide pour l\'ordre des projets'
        });
      }
      
      await Project.findByIdAndUpdate(
        item.id,
        { order: item.order },
        { runValidators: true }
      );
    }
    
    res.status(200).json({
      success: true,
      message: 'Ordre des projets mis à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'ordre des projets:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la mise à jour de l\'ordre',
      error: error.message 
    });
  }
};

const toggleFeatured = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Projet non trouvé' 
      });
    }
    
    project.featured = !project.featured;
    await project.save();
    
    res.status(200).json({
      success: true,
      message: `Projet ${project.featured ? 'mis en avant' : 'retiré des mis en avant'} avec succès`,
      data: project
    });
  } catch (error) {
    console.error(`Erreur lors de la modification du statut du projet ${req.params.id}:`, error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur serveur lors de la modification du statut',
      error: error.message 
    });
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