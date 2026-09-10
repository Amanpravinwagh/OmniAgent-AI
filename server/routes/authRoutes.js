const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { register, login, googleLogin } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user & return JWT token
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Authenticate user & return JWT token
// @access  Public
router.post('/login', login);

router.post('/google', googleLogin); // Google Auth route

module.exports = router;