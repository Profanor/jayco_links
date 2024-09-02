const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// get a user by id
router.get('/profile/:userId', userController.getProfile);

// get all users
router.get('/users', userController.getAllUsers);

// create a user
router.post('/users', userController.createUser);

module.exports = router;
