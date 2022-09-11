const {CreateAccount, LoginUser, LogoutUser} = require('../handleFactory')
const Seller = require('../../models/seller')
const Buyer = require('../../models/buyer')
// const catchAsync = require("../../utils/AsyncError")
// const bcrypt = require('bcrypt')
// const {generateToken} = require('../generateToken')

exports.signupSeller = CreateAccount(Seller);

exports.signupBuyer = CreateAccount(Buyer);

exports.loginSeller = LoginUser(Seller);

exports.loginBuyer = LoginUser(Buyer);

exports.Logout = LogoutUser

