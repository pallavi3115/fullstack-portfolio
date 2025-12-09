const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

// Public route
router.post('/', contactController.submitContact);

// Protected route (admin only)
router.get('/', authMiddleware, contactController.getAllContacts);

module.exports = router;