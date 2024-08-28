const express = require('express');
const handler = require('express-async-handler');
const auth = require('../middleware/auth.middleware'); // Ensure correct path
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND } = require('../constants/httpStatus'); // Ensure correct path
const { OrderModel } = require('../models/order'); // Ensure correct path
const OrderStatus = require('../constants/orderStatus'); // Ensure correct path

const router = express.Router();

// Use authentication middleware
router.use(auth);

// Get all orders
router.get('/', handler(async (req, res) => {
    try {
        const orders = await OrderModel.find({})
            .sort({ createdAt: -1 }); // Sort by creation date in descending order
        res.status(200).send(orders);
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error fetching orders', error: error.message });
    }
}));

// Route to get all orders for the current user
router.get('/myOrders', handler(async (req, res) => {
    try {
        // Find all orders for the authenticated user
        const orders = await OrderModel.find({ user: req.user.id })
            .sort({ createdAt: -1 }); // Sort by creation date in descending order

        if (orders.length > 0) {
            res.status(200).send(orders);
        } else {
            res.status(NOT_FOUND).send({ message: 'No orders found for the current user' });
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error fetching orders', error: error.message });
    }
}));


// Route to create a new order
router.post('/create', handler(async (req, res) => {
    const order = req.body;

    // Validate order items
    if (!order.items || order.items.length <= 0) {
        return res.status(BAD_REQUEST).send('Cart is empty!');
    }

    try {
        // Remove any existing orders with NEW status for the user
        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.NEW, // Ensure OrderStatus is properly imported
        });

        // Create and save the new order
        const newOrder = new OrderModel({ ...order, user: req.user.id });
        await newOrder.save();
        res.status(201).send(newOrder); // Send response with status 201 Created
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error creating order', error: error.message });
    }
}));

// Route to get the new order for the current user
router.get('/newOrderForCurrentUser', handler(async (req, res) => {
    try {
        const order = await getNewOrderForCurrentUser(req);
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(NOT_FOUND).send({ message: 'No new order found for the current user' });
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error fetching order', error: error.message });
    }
}));

// Route to update the status of an order
router.patch('/updateStatus/:id', handler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!Object.values(OrderStatus).includes(status)) {
        return res.status(BAD_REQUEST).send({ message: 'Invalid status' });
    }

    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (updatedOrder) {
            res.status(200).send(updatedOrder);
        } else {
            res.status(NOT_FOUND).send({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error updating order status', error: error.message });
    }
}));

// Route to delete an order by ID
router.delete('/delete/:id', handler(async (req, res) => {
    const { id } = req.params;

    try {
        const result = await OrderModel.findByIdAndDelete(id);

        if (result) {
            res.status(200).send({ message: 'Order deleted successfully' });
        } else {
            res.status(NOT_FOUND).send({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Error deleting order', error: error.message });
    }
}));

// Function to get the new order for the current user
const getNewOrderForCurrentUser = async req => {
    return await OrderModel.findOne({
        user: req.user.id,
        status: OrderStatus.NEW // Ensure OrderStatus is properly imported
    });
};

module.exports = router;
