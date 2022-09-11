const express = require('express');
const router = express.Router();
const Seller = require('../models/seller')
const {Authorize} = require('../controllers/handleFactory')
const {addItem, orderList} = require('../controllers/Seller/seller');

//add Item
router.post("/addItem", Authorize(Seller), addItem);
router.get("/orders", Authorize(Seller), orderList);

module.exports = router