require('dotenv').config()

const jwt = require('jsonwebtoken')

function checkToken(req, res, next) {
    const headers = req.headers.token
    if (headers) {
        let payloads = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        res.locals.payloads = payloads
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = checkToken