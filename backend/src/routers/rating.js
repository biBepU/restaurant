const express = require('express');
const router = express.Router();

const { rateFood } = require('../controllers/ratingController.js');

// Route to rate a food item
router.post('/:foodId', rateFood);

module.exports = router;
