const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getCart,addToCart, removeFromCart, viewCart } = require('../controllers/cartController');



router.get('/', verifyToken, getCart);
router.get('/view', verifyToken, viewCart);
router.post('/add', verifyToken, addToCart);
router.delete('/remove/:mangaId', verifyToken, removeFromCart);


module.exports = router;
