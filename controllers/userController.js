const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });

        const totalUsers = users.length;
        const volunteers = users.filter(user => user.role === 'volunteer').length;
        const interns = users.filter(user => user.role === 'intern').length;

        res.json({
            success: true,
            message: 'Users retrieved successfully',
            data: {
                users,
                statistics: {
                    total: totalUsers,
                    volunteers,
                    interns
                }
            }
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching users'
        });
    }
};


const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User retrieved successfully',
            data: { user }
        });

    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching user'
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById
};