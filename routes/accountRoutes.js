const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');
const authenticate = require('../middleware/auth');

router.post('/deposit', authenticate, accountController.deposit);

router.post('/withdrawal', authenticate, accountController.withdrawal);

module.exports = router;
