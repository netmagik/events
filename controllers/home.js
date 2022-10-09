const Event = require("../models/Event")

module.exports = {
        getIndex: async (req, res)=> {
            try {
                res.render('index.ejs', {
                    user: req.user
                })
            } catch (err) {
                console.error(err)
            }
        },
    }
