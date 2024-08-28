const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { BAD_REQUEST, CREATED, UNAUTHORIZED } = require('../constants/httpStatus');
const User = require('../models/user');

const router = express.Router();

const PASSWORD_HASH_SALT_ROUNDS = 10;

// Helper function to generate JWT token
const generateTokenResponse = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    address: user.address,
    role: user.role,
    token,
  };
};


// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(BAD_REQUEST).json({ error: 'User already exists, please log in!' });
    }

    // Create new user without hashing password again
    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password, // Store plain password here, it's hashed in the pre-save hook
      address,
    });
    await newUser.save();

    // Generate token and send response
    const tokenResponse = generateTokenResponse(newUser);
    console.log('Token generated for new user:', tokenResponse.token);
    res.status(CREATED).json(tokenResponse);
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(BAD_REQUEST).json({ error: 'Registration failed. Please try again.' });
  }
});



// Authenticate a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(UNAUTHORIZED).json({ error: 'Invalid email' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Stored hashed password:', user.password);
    console.log('Provided password:', password);
    console.log('Password match:', isMatch); // Check if the passwords match

    if (!isMatch) {
      return res.status(UNAUTHORIZED).json({ error: 'Invalid password' });
    }

    // Generate token and send response
    const tokenResponse = generateTokenResponse(user);
    console.log('Token generated on login:', tokenResponse.token);
    res.json(tokenResponse);
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(BAD_REQUEST).json({ error: 'Login failed. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(BAD_REQUEST).json({ error: err.message });
  }
});
// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(id);

    // Check if the user was found and deleted
    if (!deletedUser) {
      return res.status(UNAUTHORIZED).json({ error: 'User not found' });
    }

    // Respond with success message
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err.message);
    res.status(BAD_REQUEST).json({ error: 'Failed to delete user. Please try again.' });
  }
});

module.exports = router;
