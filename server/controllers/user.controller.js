// controllers/user.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

// Create (Register) a new user
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, activity, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, firstName, lastName, activity, image });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error: error.message });
  }
};

// Read (Get) all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
};

// Read (Get) a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user', error: error.message });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, firstName, lastName, activity, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update({ email, password: hashedPassword, firstName, lastName, activity, image }, { where: { id } });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};
