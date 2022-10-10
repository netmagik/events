const Event = require('../models/Event')
const Item = require('../models/Item')
const User = require('../models/User')

module.exports = {
    // @desc - Show Events on Home Page
    getEvents: async (req, res)=> {
        try {
            const creator = await User.findById(req.user.id)
            const eventItems = await Event.find({userId:req.user.id})
            const invitedEvents = await Event.find({
                guests: req.user.email
            })
            res.render('events.ejs', {
                eventItems: eventItems, 
                invitedEvents: invitedEvents, 
                creator: creator, 
                user: req.user
            })
                console.log(invitedEvents)
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
        // @desc - Show Add Page
        showAdd: (req,res) => {
            try {
                res.render('events/add', {user: req.user})
            } catch (err) {
                console.log(err)
            }
        },  

    // @desc - Create New Event
    createEvent: async (req, res) => {
        try{
            await Event.create({
                title: req.body.eventItem, 
                time: req.body.time,
                location: req.body.location,
                date: req.body.date,
                userId: req.user.id
            })
            res.redirect('/events')
        }catch(err){
            console.log(err)
            res.render('error/500')
        }
    },

    // @desc - Show Single Event and its Items
    showSingle: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id)
            const items = await Item.find({event: req.params.id})
            
            res.render('events/show.ejs', {
                    event: event,
                    items: items,
                    creator: req.params.userId,
                    user: req.user,
                    guests: event.guests
                })
           } catch (err) {
            console.error(err)
            res.render('error/404')
        }
    },

    // @desc - Show Edit Event
    showEdit: async (req, res) => {
        try {
            let event = await Event.findById({
                _id: req.params.id
            }).lean()

            if (!event) {
                return res.render('error/404')
            } else {
                res.render('events/edit', {
                    event: event,
                })
            }
        } catch (err) {
            console.error(err)
        }
    },

    // @desc - Edit Event
    editEvent: async (req, res) => {
        let event
        try {
            event = await Event.findById(req.params.id)
                event.title = req.body.eventItem
                event.date = req.body.date
                event.time = req.body.time
                event.location = req.body.location
             
            await event.save()
            res.redirect(`/events/${req.params.id}`)
           }
           catch (err) {
            console.error(err)
            return res.render('error/500')
        }
    },

    //@desc - Delete Event
    deleteEvent: async (req, res) => {
        try {
            await Event.findOneAndDelete({_id: req.params.id})
            console.log('Deleted Event')
            res.redirect('/events')
        } catch (err) {
            console.error(err)
            return res.render('error/500')
        }
    },
     // Invite Guest
     inviteGuest: async (req, res) => {
        try {
            await Event.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    $push: { guests: req.body.email}
                },
                {
                    new: true
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
            await Event.findOneAndUpdate(
                {
                    _id: req.params.id,
                },
                {
                    $pull: {guests: req.params.email}
                },
                {
                    new: true
                }
            )
            res.redirect(`/events/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    }
}