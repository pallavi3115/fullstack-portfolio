const Client = require('../models/Client');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new client
exports.createClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a client image'
      });
    }

    // Process image
    const imagePath = req.file.path;
    const croppedImagePath = `uploads/cropped-${req.file.filename}`;
    
    await sharp(imagePath)
      .resize(400, 400, {
        fit: sharp.fit.cover,
        position: sharp.strategy.attention
      })
      .toFile(croppedImagePath);

    fs.unlinkSync(imagePath);

    const client = new Client({
      name,
      designation,
      description,
      image: `/uploads/${path.basename(croppedImagePath)}`
    });

    await client.save();

    res.status(201).json({
      success: true,
      message: 'Client added successfully',
      data: client
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding client',
      error: error.message
    });
  }
};

// Delete client - ADD THIS FUNCTION
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Delete image file if exists
    if (client.image) {
      const imagePath = path.join(__dirname, '..', client.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await client.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting client',
      error: error.message
    });
  }
};