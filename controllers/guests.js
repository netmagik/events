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
           console.log(req.params.email)
         res.redirect(`/events/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
},
}