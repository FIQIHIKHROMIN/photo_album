const {
    verifyToken
} = require("../utils/jwt")

const {
    User
} = require("../models")

const authentication = async(req, res, next) => {
    try {
        //check header, ada token atau tidak

        const token = req.headers["authorization"]

        if(!token) {
            throw {
                code: 401,
                message : "Token not provided!"
            }
        }

        // verivy token
        const decode = verifyToken(token)

        const userData = await User.findOne({
            where:{
                id: decode.id,
                email: decode.email
            }
        })

        if(!userData) {
            throw {
                code: 401,
                message: "User not found"
            }
        }

        req.Userdata = {
            id: userData.id,
            email: userData.email,
            username: userData.username
        }

        next()
    } catch (error) {
        res.status(error.code || 500).json(error.message)
    }
}

module.exports = {
    authentication
}