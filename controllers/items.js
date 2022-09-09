const Event = require('../models/Event')
const User = require('../models/User')

module.exports = {
    // Load Items
    getItems: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id)
            const user = await User.findById(event.userId)
            console.log(user)
            res.render('events/show.ejs', {
                event: event, user: req.user, 
            })
        } catch (error) {
            console.log(error)
        }
    }, 

    // Add Items
    addItem: async (req, res) => {
        try {
            console.log(req.user, req.body.name)
            const item = {name: req.body.name, quantity: req.body.quantity}
            await Event.findOneAndUpdate(
                {_id: req.params.id},
                {
                    $push: {items: item},
                },
                {new: true}
            )
            console.log('item added')
            res.redirect(`/events/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
},
}