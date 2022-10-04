const Event = require('../models/Event')
const User = require('../models/User')
const Item = require('../models/Item')

module.exports = {
    // Add Items
    addItem: async (req, res) => {
        try {
            const eventCreator = await User.findById(req.user.id)
            await Item.create(
                {
                    name: req.body.name,
                    description: req.body.description,
                    quantity: req.body.quantity,
                    event: req.params.id,
                    createdBy: eventCreator.userName,
                }
            )
           
         res.redirect(`/events/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
},

// Delete Item
deleteItem: async (req, res) =>  {
    try {
        await Item.deleteOne({
            _id: req.params.itemid
        })
        res.redirect(`events/${req.params.eventid}`)
    } catch (error) {
        console.log(error)
    }
},

// Edit Item 
editItem: async (req, res) => {
    let item
    try {
        item = await Item.findById(req.params.itemid)

        if (!item) {
            return res.render('error/404')
        }
        item.name = req.body.name;
        item.description = req.body.description,
        item.quantity = req.body.quantity,
        await item.save()
        res.redirect(`/events/${req.params.eventid}`)
    } catch (error) {
        console.log(error)
    }
}
}