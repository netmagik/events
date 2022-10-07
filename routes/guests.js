const express = require('express')
const router = express.Router()
const guestsController = require('../controllers/guests')

router.post('/inviteGuest/:id', guestsController.inviteGuest)
router.delete('/deleteGuest/:eventid/:guestid', guestsController.deleteGuest)
// router.patch('/editItem/:eventid/:itemid', itemsController.editItem)

module.exports = router;