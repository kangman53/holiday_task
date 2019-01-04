const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

var transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    }, 
    totalPrice: {
        type: Number
    },
    items: [
        {
            itemId: {
            type: Schema.Types.ObjectId, 
            ref: 'Item'
            }, 
            amount: {
                type: Number,
                required: [true, 'Items amount required']
            }
        }
    ]
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction