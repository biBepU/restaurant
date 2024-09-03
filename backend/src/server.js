const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./routers/user');
const foodRoutes = require('./routers/food');
const orderRouter = require('./routers/order');
const ratingRoutes = require('./routers/rating.js');
const ratingMiddleware = require('./middleware/rating.middleware.js');

dotenv.config();

const app = express();

// CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'https://restaurant-kt2q.onrender.com'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true // Allow credentials to be sent with requests
}));

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files for uploads

// Environment Variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    });

// Route Definitions
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/rate', ratingMiddleware, ratingRoutes);

// Serve the React app from the build folder
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
    const indexFilePath = path.join(publicFolder, 'index.html');
    res.sendFile(indexFilePath);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
