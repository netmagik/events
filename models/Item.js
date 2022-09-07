const mongoose = require('mongoose')

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
        type: INTEGER,
        required: false,
    },
    needed: {
        type: Boolean,
        default: true,
    },
    eventId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Event',
            key: '_id'
        }
    }, 
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: '_id'
        }
    }
})

module.exports = mongoose.model('Item', ItemSchema)