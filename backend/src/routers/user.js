const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { BAD_REQUEST, CREATED, UNAUTHORIZED, OK } = require('../constants/httpStatus');
const User = require('../models/user');

const router = express.Router();


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
    phone: user.phone,
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
  

    if (!isMatch) {
      return res.status(UNAUTHORIZED).json({ error: 'Invalid password' });
    }

    // Generate token and send response
    const tokenResponse = generateTokenResponse(user);
   
    res.json(tokenResponse);
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(BAD_REQUEST).json({ error: 'Login failed. Please try again.' });
  }
});

// Get all users
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

// Update user role by ID
router.put('/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    // Find the user by ID and update the role
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(UNAUTHORIZED).json({ error: 'User not found' });
    }

    // Respond with the updated user information
    res.status(OK).json(updatedUser);
  } catch (err) {
    console.error('Error updating user role:', err.message);
    res.status(BAD_REQUEST).json({ error: 'Failed to update user role. Please try again.' });
  }
});

// Update user profile
router.put('/profile/:id', async (req, res) => {
  const { name, email, address, phone } = req.body;
  const { id } = req.params;
  console.log(phone)
  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).json({ error: 'Invalid user ID' });
  }

  try {
    // Find the user and update their profile
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, address, phone }, { new: true });

    if (!updatedUser) {
      return res.status(UNAUTHORIZED).json({ error: 'User not found' });
    }

    res.status(OK).json(updatedUser);
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(BAD_REQUEST).json({ error: 'Failed to update profile. Please try again.' });
  }
});

// Change user password
router.put('/change-password/:id', async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(UNAUTHORIZED).json({ error: 'User not found' });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(UNAUTHORIZED).json({ error: 'Old password is incorrect' });
    }

    
    user.password = newPassword
    await user.save();

    res.status(OK).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password:', err.message);
    res.status(BAD_REQUEST).json({ error: 'Failed to change password. Please try again.' });
  }
});

module.exports = router;


module.exports = router;
