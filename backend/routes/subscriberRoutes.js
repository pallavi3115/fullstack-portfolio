const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');
const authMiddleware = require('../middleware/auth');

// Public route
router.post('/', subscriberController.subscribe);

// Protected route (admin only)
router.get('/', authMiddleware, subscriberController.getAllSubscribers);

module.exports = router;