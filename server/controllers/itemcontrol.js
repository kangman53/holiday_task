const {Item} = require('../models')
class ItemControl {
    static addItem(req, res, next) {
        Item.create({
            name: req.body.name,
            price: req.body.price,
            pointsRequired: req.body.pointsRequired
        })

            .then((item) => {
                res.status(201).json({
                    result: item,
                    error: null
                })
            })

            .catch((err) => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static updateItem(req, res, next) {
        Item.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            price: req.body.price,
            pointsRequired: req.body.pointsRequired
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

    static getItems(req, res, next) {
        Item.find()
            .then((items) => {
                res.status(200).json({
                    result: items,
                    error: null
                })
            })

            .catch((err) => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }

    static deleteItem(req, res, next) {
        Item.findByIdAndDelete(req.params.id)
            .then((item) => {
                res.status(200).json({
                    result: item,
                    error: null
                })
            })

            .catch((err) => {
                res.status(500).json({
                    result: null,
                    error: err
                })
            })
    }
}

module.exports = ItemControl