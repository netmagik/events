const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const GuestSchema = new mongoose.Schema({
    email: { 
        type: String, 
        unique: true 
    },
    event: {
        type: ObjectId,
        required: true,
        ref: 'Event'
    }, 
    item: {
        type: ObjectId,
        ref: 'Item'
    },
    
})

module.exports = mongoose.model('Guest', GuestSchema)