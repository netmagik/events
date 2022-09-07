const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    entryDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Event', EventSchema)