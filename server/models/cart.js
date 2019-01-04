const mongoose = require('mongoose')
const Schema = mongoose.Schema

var cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

var Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart