const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            mangaId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Manga',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
