const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', projectController.getAllProjects);

// Protected routes (admin only)
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  projectController.createProject
);

router.delete(
  '/:id',
  authMiddleware,
  projectController.deleteProject
);

module.exports = router;