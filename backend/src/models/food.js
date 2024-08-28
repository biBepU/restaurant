const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a food rating
const RatingSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  ratedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateRated: {
    type: Date,
    default: Date.now
  }
});

// Define the schema for a food item
const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  tags: [String],

  favorite: {
    type: Boolean,
    default: false,
  },

  stars: {
    type: Number,
    default: 3,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  availability: {
    type: Boolean,
    default: true,
  },

  origins: {
    type: [String],
    required: true,
  },

  cookTime: {
    type: String,
    required: true,
  },

  ratings: [RatingSchema] // Add the ratings array
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

// Export the Food model
module.exports = mongoose.model('Food', FoodSchema);
