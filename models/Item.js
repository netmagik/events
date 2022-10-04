const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

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
        type: ObjectId,
        required: true,
        ref: 'Event'
    }, 
    user: {
        type: ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Item', ItemSchema)