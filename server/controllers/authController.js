const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// Initialize OAuth2Client without a forced redirect_uri in constructor
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server registration error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.password) {
      return res.status(400).json({ 
        message: 'This account was created using Google Sign-In. Please log in with Google.' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server login error' });
  }
};

exports.googleAuth = async (req, res) => {
  const { credential, code, token: bodyToken } = req.body;
  const idToken = credential || bodyToken;

  try {
    let email, name, googleId;

    // 1. Handle standard Google ID Token (from React GoogleLogin button)
    if (idToken) {
      const ticket = await googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      googleId = payload.sub;
    } 
    // 2. Handle OAuth Authorization Code exchange (from useGoogleLogin code flow)
    else if (code) {
      // Force 'postmessage' redirect_uri required for popup auth flow
      const { tokens } = await googleClient.getToken({
        code: code,
        redirect_uri: 'postmessage',
      });

      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      googleId = payload.sub;
    } else {
      return res.status(400).json({ message: 'No credential or code provided' });
    }

    // Find or create user in Database
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, googleId });
    } else if (!user.googleId) {
      user.googleId = googleId;
      await user.save();
    }

    // Generate App JWT Token
    const appToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      token: appToken,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('--- DETAILED GOOGLE AUTH ERROR ---');
    console.error(error.message);
    console.error(error);
    return res.status(400).json({ message: 'Google authentication failed' });
  }
};