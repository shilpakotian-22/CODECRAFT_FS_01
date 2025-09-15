const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');              // ✅ Import CORS
const User = require('./models/User');     // ✅ Import User model
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());                           // ✅ Allow frontend requests
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// ✅ Token verification middleware
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // Extract after "Bearer "
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Example protected test route
app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'You accessed a protected route 🎉', user: req.user });
});

// ✅ Protected route to fetch all users
app.get('/api/auth/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclude password field
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
