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

 

    // // @ desc - Add new Item associated with an event
    // addItem: async (req, res) => {
    //         try {
    //             // const event = await Event.findById(req.params.id)
    //             await Item.create({
    //             name: req.body.item,
    //             description: req.body.description,
    //             quantity: req.body.quantity,
    //             event: req.event.id,
    //             user: req.userId.id
    //             })
    //             console.log('Item added')
    //             res.redirect('/events/show.ejs')
    //             } catch (err) {
    //             console.log(err)
    //         }
    // },

    // @desc - Show Single Event and its Items
    showSingle: async (req, res) => {
        try {
            const event = await Event.findById(req.params.id)
            // const item = await Item.find({event: req.params.id}).populate().exec()
                res.render('events/show.ejs', {
                    event: event,
                    // items: req.params.items
                })
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

