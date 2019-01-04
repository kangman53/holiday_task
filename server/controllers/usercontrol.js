require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {User} = require('../models')
const {Item} = require('../models')

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
                            _id: user._id
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

    static findById(req, res, next) {
        let {_id} = res.locals.payloads
        User.findById(_id)
            .then((user) => {
                if (user) {
                    res.status(200).json({
                        result: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            points: user.points
                        },
                        error: null
                    })
                } else {
                    res.status(400).json({
                        result: null,
                        error: {
                            message: 'User not found'
                        }
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

    static patch(req, res, next) {
        let {_id} = res.locals.payloads
        let params = req.body
        User.findById(_id)
            .then((user) => {
                if (!user) {
                    res.status(404).json({
                        result: null,
                        error: {
                            message: 'user not found'
                        }
                    })
                } else {      
                    if (req.body.password) {
                        user.name = req.body.name || user.name
                        user.email = req.body.email || user.email
                        user.password = req.body.password
                        return user.save()
                    } else {
                        return user.update(params)
                    }
                }
            })

            .then((done) => {
                if (done.nModified == 0) {
                    res.status(400).json({
                        result: null,
                        error: 'data did not modified'
                    })
                } else {
                    res.status(200).json({
                        result: 'successfully modified data',
                        error: null
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

    static getPoints(req, res, next) {
        let {_id} = res.locals.payloads
        User.findById(_id)
            .then((user) => {
                if (user) {
                    res.status(200).json({
                        result: {
                            _id: user._id,
                            points: user.points
                        },
                        error: null
                    })
                } else {
                    res.status(400).json({
                        result: null,
                        error: {
                            message: 'User not found'
                        }
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

    static addToCart(req, res, next) {
        let {_id} = req.locals.payloads
        let amount = req.body.amount
        let itemId = req.body.itemId
        Item.findById(itemId)
            .then((item) => {
                res.json(item)
            })

            .catch((err) => {
                res.json(err)
            })


        
    }
}

module.exports = UserController