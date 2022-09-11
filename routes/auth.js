const express = require('express');
const router = express.Router();
const Seller = require('../models/seller')
const Buyer = require('../models/buyer')
const {signupSeller, signupBuyer, loginSeller, loginBuyer, Logout} = require('../controllers/Auth/auth')


//Singup
router.post("/Seller/register", signupSeller)
router.post("/Buyer/register", signupBuyer)

//Login
router.post("/Seller/Login", loginSeller)
router.post("/Buyer/Login", loginBuyer)

//Logout
router.post("/Logout", Logout)

module.exports = router