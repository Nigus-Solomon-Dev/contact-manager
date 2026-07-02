const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name);

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'user already exist' });
    }

    // Create user
    const user = new User({ name, email, password });
    
    await user.save();

    res.status(201).json({
      message: 'user registerd succesfully',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Invalid credential' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credential' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };