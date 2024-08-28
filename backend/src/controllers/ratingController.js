const User = require('../models/user.js');
const Food = require('../models/food.js');

// Rate a food item
const rateFood = async (req, res) => {
    const { foodId } = req.params;
    const { rating } = req.body;
    const userId = req.user._id; // Assuming `req.user` contains authenticated user information

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Invalid rating value' });
    }

    try {
        // Find the food item
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        // Update the food item with the new rating
        food.ratings.push({ rating, ratedBy: userId });
        await food.save();

        // Update the user with the new rating
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user has already rated this food item
        const existingRating = user.ratingsGiven.find(rating => rating.foodId.toString() === foodId);
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            user.ratingsGiven.push({ foodId, rating });
        }
        await user.save();

        res.status(200).json({ message: 'Rating submitted successfully', food });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    rateFood
};
