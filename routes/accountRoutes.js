const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');

router.post('/deposit', accountController.deposit);

router.post('/withdrawal', accountController.withdrawal);

module.exports = router;
