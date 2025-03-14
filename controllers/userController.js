import express from 'express';
import { Authenticate } from '../utils/authUtils.js';
import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';

const userController = express.Router();

// Route to handle user login
userController.post('/login', Authenticate);

// Route to get list of users
userController.get('/', async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: ['id', 'firstname', 'lastname', 'email', 'password', 'is_active', 'createdAt', 'updatedAt']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to create a new user
userController.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      is_active: true
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default userController;