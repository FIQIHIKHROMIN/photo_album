
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY || "rahasia";

//generate token
function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY )
}

//verify
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    generateToken,
    verifyToken
}