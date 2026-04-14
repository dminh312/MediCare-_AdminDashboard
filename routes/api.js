const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const staffController = require('../controllers/staffController');
const medicineController = require('../controllers/medicineController');
const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');

// Auth API endpoints
router.post('/login', authController.login);
router.post('/auth/reset-password', authController.resetPassword);

// Dashboard API endpoints
router.get('/dashboard/stats', dashboardController.getStats);

// Staff API endpoints
router.get('/staff', staffController.getStaffs);
router.post('/staff/verify-email', staffController.verifyEmail);
router.get('/staff/check-verification', staffController.checkVerification);
router.post('/staff/finalize', staffController.finalize);
router.put('/staff/:uid', staffController.updateStaff);

// Medicine API endpoints
router.get('/medicines', medicineController.getMedicines);
router.post('/medicines', medicineController.addMedicine);
router.put('/medicines/:id', medicineController.updateMedicine);
router.delete('/medicines/:id', medicineController.deleteMedicine);

// Users API endpoints
router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);
router.delete('/users/:uid', userController.deleteUser);

module.exports = router;
