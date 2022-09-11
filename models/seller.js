const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true 
    },
    items:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    orders:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Order'
    }]
})

const Seller = new mongoose.model('Seller', sellerSchema);
module.exports = Seller