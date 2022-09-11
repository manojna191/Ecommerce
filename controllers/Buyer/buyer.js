const Seller = require('../../models/seller')
const Order = require('../../models/order')
const catchAsync = require("../../utils/AsyncError")

exports.sellerList = catchAsync(async(req,res)=>{
    const seller = await Seller.find({},{_id: 0,email:1 ,name: 1})
    if(!seller){
        return res.status(404).json({ success: false, message: 'Requested seller not found' })
    }
    console.log(seller);
    res.status(200).json(seller)
})

exports.sellerCatalog = catchAsync(async(req,res)=>{
    const id = req.params.seller_id
    const seller = await Seller.find({_id:id},{_id:0,items:1}).populate("items");
    if(!seller){
        return res.status(404).json({ success: false, message: 'Requested seller not found' })
    }
    res.status(200).json(seller);
})

exports.order = catchAsync(async(req,res)=>{
    const array = Object.keys(req.body);
    var items =[]
    const seller = await Seller.findById(req.params.seller_id)
    if(!seller){
        return res.status(404).json({ success: false, message: 'Requested seller not found' })
    }
    for(var i=0;i<array.length;i++){
        var item = req.body[array[i]];
        items.push(item);
    }
    const buyerId = req.userId;
    const order = await Order.create({
        items: items,
        buyer: buyerId,
        seller: seller._id,
        status: false
    })
    seller.orders.push(order._id);
    await seller.save();
    res.status(200).json({
        status: "success"
    })
})