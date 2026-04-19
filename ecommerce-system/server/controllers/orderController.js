const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
    try {
        const { customerName, address, phone, products, totalAmount } = req.body;
        
        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = await Order.create({
            customerName,
            address,
            phone,
            products,
            totalAmount
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public (Will be Admin only later)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('products.product', 'name price');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Public (Will be Admin only later)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
