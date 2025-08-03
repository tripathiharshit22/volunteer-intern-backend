# Backend Internship Assignment

A comprehensive Node.js backend application with user registration, admin authentication, and user management features built with Express.js and MongoDB.

## 🚀 Features

- **User Registration** - Register volunteers and interns with validation
- **Admin Authentication** - Secure JWT-based admin login system
- **User Management** - Admin can view all registered users
- **Password Security** - Bcrypt password hashing
- **Input Validation** - Comprehensive data validation and sanitization
- **Error Handling** - Robust error handling with meaningful messages
- **RESTful API** - Clean and organized API endpoints

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Environment Variables:** dotenv
- **CORS:** cors middleware

## 📁 Project Structure

```
backend-internship/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   ├── authController.js    # Authentication logic (register, admin login)
│   └── userController.js    # User management logic
├── middleware/
│   └── authMiddleware.js    # JWT verification and admin protection
├── models/
│   └── User.js             # User schema and methods
├── routes/
│   ├── authRoutes.js       # Authentication routes
│   └── userRoutes.js       # User management routes
├── .env                    # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project dependencies and scripts
├── README.md              # Project documentation
└── server.js              # Application entry point
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd backend-internship
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/internship_db

# JWT Secret (use a strong secret in production)
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000

# Admin Credentials
ADMIN_EMAIL=admin@company.com
ADMIN_PASSWORD=admin123
```

### 4. Start MongoDB
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas cloud connection
# Update MONGODB_URI in .env with your Atlas connection string
```

### 5. Run the Application
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. User Registration
**POST** `/api/register`

Register a new user (volunteer or intern).

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "volunteer",
    "phone": "1234567890"
}
```

**Response:**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "user": {
            "_id": "...",
            "name": "John Doe",
            "email": "john@example.com",
            "role": "volunteer",
            "phone": "1234567890",
            "registeredAt": "2024-01-15T10:30:00.000Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

#### 2. Admin Login
**POST** `/api/admin/login`

Authenticate admin and receive JWT token.

**Request Body:**
```json
{
    "email": "admin@company.com",
    "password": "admin123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Admin login successful",
    "data": {
        "admin": {
            "email": "admin@company.com",
            "role": "admin"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

#### 3. Get All Users
**GET** `/api/users`

Retrieve all registered users (Admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
    "success": true,
    "message": "Users retrieved successfully",
    "data": {
        "users": [
            {
                "_id": "...",
                "name": "John Doe",
                "email": "john@example.com",
                "role": "volunteer",
                "phone": "1234567890",
                "registeredAt": "2024-01-15T10:30:00.000Z"
            }
        ],
        "statistics": {
            "total": 1,
            "volunteers": 1,
            "interns": 0
        }
    }
}
```

## 🧪 Testing with Postman

### Step 1: Register a User
1. **Method:** POST
2. **URL:** `http://localhost:5000/api/register`
3. **Headers:** `Content-Type: application/json`
4. **Body:** Use the registration JSON from API docs
5. **Expected:** 201 status with user data and token

### Step 2: Admin Login
1. **Method:** POST
2. **URL:** `http://localhost:5000/api/admin/login`
3. **Headers:** `Content-Type: application/json`
4. **Body:** Use admin credentials from API docs
5. **Expected:** 200 status with admin data and token
6. **Important:** Copy the token for next step

### Step 3: Get All Users
1. **Method:** GET
2. **URL:** `http://localhost:5000/api/users`
3. **Headers:** 
   - `Content-Type: application/json`
   - `Authorization: Bearer <paste_admin_token_here>`
4. **Expected:** 200 status with users array and statistics

### Postman Collection Export
1. Create a collection named "Backend Internship APIs"
2. Add all three requests to the collection
3. Right-click collection → Export → Collection v2.1
4. Save the JSON file for submission

## 🔒 Security Features

- **Password Hashing:** All passwords are hashed using bcrypt with salt rounds
- **JWT Authentication:** Secure token-based authentication for protected routes
- **Input Validation:** Comprehensive validation using Mongoose schemas
- **CORS Enabled:** Cross-origin resource sharing configured
- **Environment Variables:** Sensitive data stored in environment variables
- **Admin Protection:** Role-based access control for admin routes

## 🚨 Error Handling

The API provides comprehensive error handling:

- **400 Bad Request:** Validation errors, missing fields
- **401 Unauthorized:** Invalid credentials, missing/expired tokens
- **403 Forbidden:** Insufficient permissions (non-admin access)
- **404 Not Found:** Resource not found
- **409 Conflict:** Duplicate email registration
- **500 Internal Server Error:** Server-side errors

**Error Response Format:**
```json
{
    "success": false,
    "message": "Descriptive error message"
}
```

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/internship_db` |
| `JWT_SECRET` | Secret for JWT token signing | `your_super_secret_jwt_key_here` |
| `PORT` | Server port number | `5000` |
| `ADMIN_EMAIL` | Admin login email | `admin@company.com` |
| `ADMIN_PASSWORD` | Admin login password | `admin123` |

## 🧪 Testing Different Scenarios

### Valid Test Cases
- Register volunteer user
- Register intern user  
- Admin login with correct credentials
- Access user list with valid admin token

### Error Test Cases
- Register with duplicate email (409 error)
- Register with invalid email format (400 error)
- Admin login with wrong credentials (401 error)
- Access user list without token (401 error)
- Access user list with invalid token (401 error)

## 🚀 Deployment Considerations

### Environment Setup
- Use strong JWT secrets in production
- Configure MongoDB Atlas for cloud database
- Set up proper CORS origins for production
- Use environment-specific configuration

### Production Optimizations
- Add rate limiting middleware
- Implement request logging
- Add API documentation with Swagger
- Set up monitoring and health checks
- Configure SSL/HTTPS


## 🔍 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Make sure MongoDB is running
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

**Port Already in Use**
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

**JWT Token Issues**
- Ensure JWT_SECRET is set in .env
- Check token format: "Bearer TOKEN" (with space)
- Verify token hasn't expired (7 days for users, 1 day for admin)

**Validation Errors**
- Email must be valid format
- Password minimum 6 characters
- Phone must be exactly 10 digits
- Role must be 'volunteer' or 'intern'

## 📊 Development Scripts

```bash
# Install dependencies
npm install

# Start development server with auto-restart
npm run dev

# Start production server
npm start

# Run tests (if configured)
npm test
```
