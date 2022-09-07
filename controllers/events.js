const Event = require('../models/Event')

module.exports = {
    // @desc - Show Events on Home Page
    getEvents: async (req, res)=> {
        try {
            const eventItems = await Event.find({userId:req.user.id})
            res.render('events.ejs', {eventItems: eventItems, user: req.user})
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
            console.log('Event has been added!')
            res.redirect('/events')
        }catch(err){
            console.log(err)
            res.render('error/500')
        }
    },

    // @desc - Show Single Event
    showSingle: async (req, res) => {
        try {
            let event = await Event.findById(req.params.id).exec()

            if (!event) {
                return res.render('error/404')
            } else {
                res.render('events/show', {
                    event
                })
            }
        } catch (err) {
            console.error(err)
            res.render('error/404')
        }
    },

    // @desc - Show Edit Event
    showEdit: async (req, res) => {
        try {
            let event = await Event.findOne({
                _id: req.params.id
            }).lean()

            if (!event) {
                return res.render('error/404')
            } else {
                res.render('events/edit', {
                    event,
                })
            }
        } catch (err) {
            console.error(err)
        }
    },

    // @desc - Edit Event
    editEvent: async (req, res) => {
    
       try {
           await Event.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
           })
           res.redirect('/events')
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

