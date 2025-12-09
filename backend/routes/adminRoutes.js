const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Public routes
router.post('/login', adminController.login);

module.exports = router;