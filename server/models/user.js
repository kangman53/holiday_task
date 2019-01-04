const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

var userSchema = new Schema({
    name: {
        type: String,
        required: [true,'Name required!']
    },
    email: {
        type: String,
        validate: [
            {
                validator: v => {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v)
                },
                message: `Invalid email format`
            }, {
                isAsync: true,
                validator: function(value, callback) {
                    User.findOne({email: value}, (err, user) => {
                        if (user) {
                            if (mongoose.Types.ObjectId(user._id).toString() != mongoose.Types.ObjectId(this._id).toString()) {
                                callback(false)
                            } else {
                                callback(true)
                            }
                        } else {
                            callback(true)
                        }
                    })
                },
                message: 'This email address is already registered'
            }
        ],
        required: [true, 'Email required!']
    },
    password: {
        type: String,
        required: [true, 'Password required!'],
        minlength: [6, 'Your password must be at least 6 characters long. Try another password.']
    },
    role: {
        type: String,
        default: 'customer'
    },
    points: {
        type: Number,
        default: 0
    }
})

userSchema.pre('save', function(next) {
    const saltRounds = 10
    var salt = bcrypt.genSaltSync(saltRounds)
    var hash = bcrypt.hashSync(this.password, salt)
    
    this.password = hash;

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User