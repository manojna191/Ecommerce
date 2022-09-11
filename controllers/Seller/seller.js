const Seller = require('../../models/seller')
const Item = require('../../models/items')
const catchAsync = require('../../utils/AsyncError')

//Seller adding items
exports.addItem = (catchAsync(async(req,res)=>{
    const id = req.userId
    const user = await Seller.findById(id);
    if(!user){
        return res.status(401).json({ success: false, message: 'Unauthorized view' })
    }
    const {name, price} = req.body;
    req.body.sellerName = user.name;
    if(!name || !price){return res.status(400).json({ success: false, message: 'Empty Values' })}
    req.body.seller = req.userId
    const item = await Item.create(req.body)
    user.items.push(item._id);
    await user.save();
    res.status(200).json({
        status: "success"
    })
}))

//vewing the orders list
exports.orderList = (catchAsync(async(req,res)=>{
    const seller = await Seller.find({_id: req.userId},{_id:0,orders:1}).populate("orders");
    if(!seller){
        return res.status(401).json({ success: false, message: 'Unauthorized view' })
    }
    res.status(200).json({seller}) 

}))

