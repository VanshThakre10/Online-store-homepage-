const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');

router.route('/')
    .get(getOrders)
    .post(createOrder);

router.route('/:id')
    .put(updateOrderStatus);

module.exports = router;
