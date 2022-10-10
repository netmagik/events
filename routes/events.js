const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events')
const { ensureAuth } = require('../middleware/auth')


router.get('/', eventsController.getEvents)
router.get('/add', eventsController.showAdd)
router.post('/createEvent', eventsController.createEvent)
router.get('/:id', eventsController.showSingle)
router.get('/:id/edit', eventsController.showEdit)
router.put('/:id', ensureAuth, eventsController.editEvent)
router.delete('/:id', eventsController.deleteEvent)
router.put('/inviteGuest/:id', eventsController.inviteGuest)
router.delete('/deleteGuest/:id/:email', eventsController.deleteGuest)


module.exports = router
