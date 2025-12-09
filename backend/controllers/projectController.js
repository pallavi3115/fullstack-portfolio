const Project = require('../models/Project');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Crop and resize image using Sharp
    const imagePath = req.file.path;
    const croppedImagePath = `uploads/cropped-${req.file.filename}`;
    
    await sharp(imagePath)
      .resize(450, 350, { // Crop to 450x350 as per requirements
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
      .toFile(croppedImagePath);

    // Remove original uploaded file
    fs.unlinkSync(imagePath);

    // Create project with cropped image
    const project = new Project({
      name,
      description,
      category: category || 'General',
      image: `/uploads/${path.basename(croppedImagePath)}`
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Delete image file if exists
    if (project.image) {
      const imagePath = path.join(__dirname, '..', project.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};