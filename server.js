const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


dotenv.config();


const app = express();


connectDB();


app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend Internship API is running!',
        endpoints: {
            register: 'POST /api/register',
            adminLogin: 'POST /api/admin/login',
            getAllUsers: 'GET /api/users (requires admin token)'
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false, 
        message: 'Route not found' 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`POST http://localhost:${PORT}/api/register`);
    console.log(`POST http://localhost:${PORT}/api/admin/login`);
    console.log(`GET  http://localhost:${PORT}/api/users`);
});