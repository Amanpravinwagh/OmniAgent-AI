const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // Optional for Google OAuth users
  googleId: { type: String, default: null },   // Stores Google OAuth unique ID
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);