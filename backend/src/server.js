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
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/uploads', express.static('uploads'));

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

// Base Route
app.get('/', (req, res) => {
  res.send('Static file server is running.');
});

// Route Definitions
app.use('/api/users', userRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/rate', ratingMiddleware, ratingRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Serve React App from the build folder
const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
  const indexFilePath = path.join(publicFolder, 'index.html');
  res.sendFile(indexFilePath);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
