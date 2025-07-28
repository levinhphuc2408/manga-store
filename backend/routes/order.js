const express = require('express');
const router = express.Router();
const { checkout } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/checkout', verifyToken, checkout);

module.exports = router;
