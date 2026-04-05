const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const staffController = require('../controllers/staffController');

// Auth API endpoints
router.post('/login', authController.login);
router.post('/auth/reset-password', authController.resetPassword);

// Staff API endpoints
router.post('/staff/verify-email', staffController.verifyEmail);
router.get('/staff/check-verification', staffController.checkVerification);
router.post('/staff/finalize', staffController.finalize);

module.exports = router;
