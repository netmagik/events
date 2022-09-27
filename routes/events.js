const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events')
const { ensureAuth } = require('../middleware/auth')


router.get('/', eventsController.getEvents)
router.get('/add', eventsController.showAdd)
router.post('/createEvent', eventsController.createEvent)
router.get('/:id', eventsController.showSingle)
router.get('/edit/:id', eventsController.showEdit)
router.put('/:id', eventsController.editEvent)
router.delete('/:id', eventsController.deleteEvent)


module.exports = router
