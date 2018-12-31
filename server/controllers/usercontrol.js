require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
    static registerUser(req, res, next){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
            .then((user) => {
                res.status(201).json({
                    result: user,
                    error: null
                })        
            })

            .catch((err) => {
                if (err.name === 'ValidationError') {
                    res.status(400).json({
                        result: null,
                        error: err.errors
                    })    
                } else {
                    res.status(500).json({
                        result: null,
                        error: err
                    })                        
                }
            })
    }

    static loginUser(req, res, next) {
        User.findOne({
            email: req.body.email
        })
            .then((user) => {                
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        let token = jwt.sign({
                            id: user._id,
                            name: user.name,
                            email: user.email
                        }, process.env.JWT_SECRET)

                        res.status(200).json({
                            result: {
                                message: 'successfully logged in',
                                token
                            },
                            error: null
                        })                            
                    } else {
                        res.status(400).json({
                            result: null,
                            error: 'The password you entered is incorrect'
                        })    
                    }
                } else {
                    res.status(404).json({
                        result: null,
                        error: 'The email you entered does not match any user'
                    })
                }
            })

            .catch((err) => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static dashboard(req, res, next) {
        res.json({
            data1: req.headers,
            data2: res.locals
        })
    }
}

module.exports = UserController