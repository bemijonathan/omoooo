const jwt = require('jsonwebtoken')
const userController = require("../controllers/user.controller")


const verifyToken = token =>
    new Promise((resolve, reject) => {
        console.log('here')
        jwt.verify(token, "secretValue", (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

module.exports.verifyToken = verifyToken

module.exports.protect = async (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).send({
            status: false,
            message: 'unauthenticated'
        })
    }

    const token = bearer.split('Bearer ')[1].trim()
    let payload
    try {
        payload = await verifyToken(token)
    } catch (e) {
        return res.status(401).send({
            status: false,
            message: 'unauthenticated'
        })
    }

    const user = userController.getUser(payload.id, );

    if (!user) {
        return res.status(401).send({
            status: false,
            message: 'unauthenticated'
        })
    }

    req.user = user
    next()
}
