const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/profile/:userId', userController.getProfile);

module.exports = router;
