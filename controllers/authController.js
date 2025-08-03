const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d', 
    });
};


const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;

        if (!name || !email || !password || !role || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: name, email, password, role, phone'
            });
        }

        // Check if role is valid
        if (!['volunteer', 'intern'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Role must be either "volunteer" or "intern"'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists'
            });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password,
            role,
            phone
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: user.getPublicProfile(),
                token
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(err => err.message).join(', ');
            return res.status(400).json({
                success: false,
                message: `Validation Error: ${message}`
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error during registration'
        });
    }
};


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid admin credentials'
            });
        }

        const token = jwt.sign(
            { id: 'admin', role: 'admin' }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.json({
            success: true,
            message: 'Admin login successful',
            data: {
                admin: {
                    email: adminEmail,
                    role: 'admin'
                },
                token
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during admin login'
        });
    }
};

module.exports = {
    registerUser,
    adminLogin
};