const mongoose = require('mongoose')
const { Schema } = mongoose
const Event = require('./Event')
const User = require('./User')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        min: 0,
        required: false,
    },
    needed: {
        type: Boolean,
        default: true,
    },
    event: {
        type: Schema.Types.ObjectId,
       required: true,
       ref: 'Event'
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Item', ItemSchema)