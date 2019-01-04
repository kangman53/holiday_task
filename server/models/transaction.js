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
    items: {
        type: Array
    }
})

var Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction