const mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    }, 
    price: {
        type: Number,
        required: [true, 'Price required'],
        min: [1, 'Price must be more than 0']
    },
    pointsRequired: {
        type: Number,
        default: null
    }
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item