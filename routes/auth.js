const express = require('express');
const { signup, login } = require('../controllers/auth');

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
// router.get('/refresh',refresh);

module.exports = router;