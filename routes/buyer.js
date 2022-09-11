const express = require('express')
const router = express.Router();
const Buyer = require('../models/buyer')
const {sellerList, sellerCatalog, order} = require('../controllers/Buyer/buyer')
const {Authorize} = require('../controllers/handleFactory')

router.get("/list-of-sellers",Authorize(Buyer), sellerList)
router.get("/seller-catalog/:seller_id",Authorize(Buyer),sellerCatalog)
router.post("/create-order/:seller_id",Authorize(Buyer), order)

module.exports = router