const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const OrderStatus = require('../constants/orderStatus.js'); // Ensure correct path
const FoodModel = require('./food.js'); // Ensure correct path
console.log( OrderStatus.NEW);
// Define the OrderItemSchema
const OrderItemSchema = new Schema(
    {
        food: { type: Schema.Types.ObjectId, ref: 'Food', required: true }, // Reference to Food
        name: { type: String, required: false }, // Name to be populated from Food model
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    },
    {
        _id: false,
    }
);

// Define the OrderSchema
const OrderSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
  
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    totalQuantity: { type: Number, required: true }, // Add totalQuantity field
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW }, // Default status to 'NEW'
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
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

// Middleware to populate name from Food model and calculate total price and total quantity
OrderSchema.pre('save', async function(next) {
    if (this.isModified('items')) {
        // Populate the name for each item from the Food model
        for (let item of this.items) {
            if (item.isModified('food')) {
                const food = await FoodModel.findById(item.food);
                if (food) {
                    item.name = food.name; // Set the name from Food model
                }
            }
        }

        // Calculate totalPrice and totalQuantity
        this.totalPrice = this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        this.totalQuantity = this.items.reduce((total, item) => total + item.quantity, 0);
    }
    next();
});

// Create and export the model
const OrderModel = model('Order', OrderSchema);

module.exports = { OrderModel };
    