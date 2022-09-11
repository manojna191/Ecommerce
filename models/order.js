const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items:[{
        type: String
    }],
    buyer:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Buyer'
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Seller'
    },
    status: {
        type: Boolean,
        required: true
    }
})

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order