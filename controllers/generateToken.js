const jwt = require('jsonwebtoken')

exports.generateToken = (id)=>{
    const token = jwt.sign({id}, process.env.JWTPASSWORD, {
        expiresIn: process.env.JWT_EXPIRESIN
    });
    return token
}