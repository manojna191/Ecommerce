const mongoose  = require('mongoose');

const buyserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    name:{
        type: String,
        required: true 
    },
    order:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Order'
    }]
})

const Buyer = new mongoose.model('Buyer', buyserSchema)
module.exports = Buyer