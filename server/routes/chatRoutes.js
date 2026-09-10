// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { handleMessage } = require('../controllers/chatController');

// Import auth middleware safely (handles both default and named exports)
const authModule = require('../middleware/authMiddleware');
const protect = typeof authModule === 'function' ? authModule : authModule.protect;

const upload = require('../middleware/uploadMiddleware');

// 1. GET /api/chat/history: Handled inline in-memory to prevent undefined handler crashes
router.get('/history', protect, (req, res) => {
  return res.json([]);
});

// 2. POST /api/chat/message: Handled in-memory without database persistence
router.post('/message', protect, upload.single('pdf'), handleMessage);

module.exports = router;