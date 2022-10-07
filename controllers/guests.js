const Event = require('../models/Event')
// const User = require('../models/User')
// const Item = require('../models/Item')
const Guest = require('../models/Guest')

module.exports = {

    // Invite Guest
    inviteGuest: async (req, res) => {
        try {
            // await Event.findById(req.params.id)
            await Guest.create(
                {
                    email: req.body.email,
                    event: req.params.id,
                }
            )
         res.redirect(`/events/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
},

// Delete Guest
    deleteGuest: async (req, res) => {
        try {
            await Guest.deleteOne({
                _id: req.params.guestid
            })
            res.redirect(`/events/${req.params.eventid}`)
        } catch (error) {
            console.log(error)
        }
    }
}