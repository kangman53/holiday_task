require('dotenv').config()
const {User} = require('../models')

const jwt = require('jsonwebtoken')

function checkToken(req, res, next) {
    const headers = req.headers.token
    if (headers) {
        let payloads = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        User.findById(payloads._id)
            .then((user) => {
                if(user) {
                    res.locals.payloads = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                    next()
                } else {
                    res.status(400).json({
                        result: null,
                        error: 'No such User'
                    })
                }
            })

            .catch((err) => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    } else {
        res.sendStatus(403)
    }
}

function checkAdmin(req, res, next) {
    let {role} = res.locals.role
    if (role === 'admin') {
        next()
    } else {
        res.sendStatus(403)
    }
}

module.exports = {checkToken, checkAdmin}