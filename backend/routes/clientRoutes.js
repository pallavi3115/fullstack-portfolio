const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', clientController.getAllClients);

// Protected routes
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  clientController.createClient
);

router.delete(
  '/:id',
  authMiddleware,
  clientController.deleteClient
);

module.exports = router;