const express = require('express');
const router = express.Router();
const FoodModel = require('../models/food.js');
const handler = require('express-async-handler');
const upload = require('../harper/upload.js');
const removeFile = require('../harper/removefile.js');

// Get all food items
router.get('/', handler(async (req, res) => {
  const foods = await FoodModel.find({});
  res.send(foods);
}));

// Get all tags
router.get('/tags', handler(async (req, res) => {
  const tags = await FoodModel.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $project: { _id: 0, name: '$_id', count: '$count' } }
  ]).sort({ count: -1 });
  const all = { name: 'All', count: await FoodModel.countDocuments() };
  tags.unshift(all);
  res.send(tags);
}));

// Get by search term
router.get('/search/:searchTerm', handler(async (req, res) => {
  const { searchTerm } = req.params;
  const searchRegex = new RegExp(searchTerm, 'i');
  const foods = await FoodModel.find({ name: { $regex: searchRegex } });
  res.send(foods);
}));

// Get by tag
router.get('/tags/:tag', handler(async (req, res) => {
  const { tag } = req.params;
  const foods = await FoodModel.find({ tags: tag });
  res.send(foods);
}));

// Get by id
router.get('/:id', getFood, handler(async (req, res) => {
  res.send(res.food);
}));

// Create food
router.post('/', upload, handler(async (req, res) => {
  const food = new FoodModel({
    name: req.body.name,
    price: req.body.price,
    tags: req.body.tags,
    favorite: req.body.favorite,
    stars: req.body.stars,
    imageUrl: req.file ? `uploads/${req.file.filename}` : req.body.imageUrl,
    availability: req.body.availability,
    origins: req.body.origins,
    cookTime: req.body.cookTime
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}));

// Update an existing food item
router.patch('/:id', getFood, upload, handler(async (req, res) => {
  if (req.file) {
    if (res.food.imageUrl) {
      await removeFile(`./uploads/${res.food.imageUrl}`);
    }
    res.food.imageUrl = `uploads/${req.file.filename}`;
  }
  
  if (req.body.name != null) res.food.name = req.body.name;
  if (req.body.price != null) res.food.price = req.body.price;
  if (req.body.tags != null) res.food.tags = req.body.tags;
  if (req.body.favorite != null) res.food.favorite = req.body.favorite;
  if (req.body.stars != null) res.food.stars = req.body.stars;
  if (req.body.availability != null) res.food.availability = req.body.availability;
  if (req.body.origins != null) res.food.origins = req.body.origins;
  if (req.body.cookTime != null) res.food.cookTime = req.body.cookTime;

  try {
    const updatedFood = await res.food.save();
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}));

// Delete a food item
router.delete('/:id', getFood, handler(async (req, res) => {
  if (res.food.imageUrl) {
    await removeFile(`./uploads/${res.food.imageUrl}`);
  }

  try {
    await res.food.remove();
    res.json({ message: 'Deleted Food' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}));

// Middleware to get a food item by ID
async function getFood(req, res, next) {
  let food;
  try { 
    food = await FoodModel.findById(req.params.id);  // Use `req.params.id` here to match the route
    if (food == null) {
      console.log('Food item not found');
      return res.status(404).json({ message: 'Cannot find food' });
    }
  } catch (err) {
    console.error(`Error finding food: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }

  res.food = food;
  next();
}

module.exports = router;
