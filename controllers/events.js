const Event = require('../models/Event')
const Item = require('../models/Item')
const User = require('../models/User')
const Guest = require('../models/Guest')

module.exports = {
    // @desc - Show Events on Home Page
    getEvents: async (req, res)=> {
        try {
            const creator = await User.findById(req.user.id)
            const eventItems = await Event.find({userId:req.user.id})
            res.render('events.ejs', {eventItems: eventItems, creator: creator, user: req.user})
        } catch (err) {
            console.error(err)
            res.render('error/500')
        }
    },
        // @desc - Show Add Page
        showAdd: (req,res) => {
            try {
                res.render('events/add')
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
            const guests = await Guest.find({event: req.params.id})
            res.render('events/show.ejs', {
                    event: event,
                    items: items,
                    creator: req.params.userId,
                    user: req.user.id,
                    guests: guests
                })
                // console.log(`req.user.id ${req.user.id} and event.userId is ${event.userId}`)
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
    }
}

