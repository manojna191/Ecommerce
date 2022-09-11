const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        validate: [
            function (v) {
              if (v < 0) return false;
              else return true;
            },
            "The price needs to be positive",
          ],
        required: true
    },
    sellerName:{
        type: String,
        required: true
    },
    seller: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Seller' //exported one from the seller
    },
})

//we need to export models 
const Item = new mongoose.model('Item', itemSchema)
module.exports = Item
