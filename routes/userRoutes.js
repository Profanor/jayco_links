const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticate = require('../middleware/auth');

// get a user by id
router.get('/profile/:userId', authenticate, userController.getProfile);

// get all users
router.get('/users', authenticate, userController.getAllUsers);

// create a user
router.post('/users', userController.createUser);

module.exports = router;
