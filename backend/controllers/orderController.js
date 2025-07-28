const Order = require('../models/Order');
const User = require('../models/User');
const Manga = require('../models/Manga');

const checkout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('cart.mangaId');

        if (!user || user.cart.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' });
        }

        // Calculate total
        let total = 0;
        const orderItems = user.cart.map(item => {
            total += item.quantity * item.mangaId.price;
            return {
                mangaId: item.mangaId._id,
                quantity: item.quantity
            };
        });

        // Create order
        const newOrder = new Order({
            userId: user._id,
            items: orderItems,
            totalPrice: total
        });

        await newOrder.save();

        // Clear user cart
        user.cart = [];
        await user.save();

        res.status(201).json({ msg: 'Checkout successful', order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong during checkout' });
    }
};

module.exports = { checkout };
