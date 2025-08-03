const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();


router.get('/users', protect, adminOnly, getAllUsers);

router.get('/users/:id', protect, adminOnly, getUserById);

module.exports = router;