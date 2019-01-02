const mongoose = require('mongoose')
const Schema = mongoose.Schema

var transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    }, 
    total: {
        type: Number
    },
    items: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Item'
        }, {
            amount: {
                type: number,
                required: [true, 'Items amount required']
            }
        }
    ]
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction