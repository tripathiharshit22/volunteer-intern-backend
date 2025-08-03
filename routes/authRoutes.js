const express = require('express');
const { registerUser, adminLogin } = require('../controllers/authController');

const router = express.Router();


router.post('/register', registerUser);

router.post('/admin/login', adminLogin);

module.exports = router;