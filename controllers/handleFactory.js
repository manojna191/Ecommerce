const catchAsync = require("../utils/AsyncError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generateToken} = require('./generateToken')

const maxAge = 3 * 24 * 60 * 60

//Verify jwt token
exports.Authorize = (Model)=>
    (catchAsync(async(req,res,next)=>{
        const jwtToken = req.cookies.Authorization.split(" ")[1]
        if(!jwtToken){return res.status(401).json({ success: false, message: 'Token invalid' })}
        jwt.verify(jwtToken, process.env.JWTPASSWORD, async(err,id)=>{
            if(err){
                res.status(401).json({success: false, message: err.toString()})
            }
            const user = await Model.findOne({_id:id.id})
            if(!user){
                res.status(401).json({ success: false, message: 'invalid user' })
            }
            req.userId = user.id
            next();
        });
}));

//Signup purpose for buyer and seller
exports.CreateAccount = (Model)=>
    catchAsync(async(req,res)=>{
        const {email} = req.body
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10)
        }
        const user = await Model.find({ email });
        if(user.length)
            return res.status(400).json({ success: false, message: 'User already exists' })
        const newuser = await Model.create(req.body)
        const token = generateToken(newuser._id)
        res.cookie('Authorization', `Bearer ${token}`,{
            httpOnly: true,
            maxAge: maxAge* 1000
        })
        req.userId = newuser._id; //usualyy we assing while checking the authorization
        res.status(200).json({status: "Success"})
    })


//login for buyers and sellers
exports.LoginUser = (Model)=>
    catchAsync(async(req,res)=>{
        const {email,password} = req.body
        if(!email || !password){return res.status(400).json({ success: false, message: 'Empty Values' })}
        const user = await Model.findOne({email})
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        console.log(user)
        const auth = bcrypt.compare(password, user.password)
        if(!auth){
            return res.status(400).json({ success: false, message: 'Incorrect Password' })
        }
        const token = generateToken(user._id)
        res.cookie('Authorization', `Bearer ${token}`,{
                httpOnly: true,
                maxAge: maxAge* 1000,
        })
        req.userId = user._id
        res.status(200).json({
            status: "Success"
        })
    })


//Logout 
exports.LogoutUser =catchAsync(async(req,res)=>{
        req.userId = null
        res.clearCookie('Authorization',{
            httpOnly: true
        });
        res.status(200).json({status: "Success"})
})
