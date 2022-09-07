const express = require('express')
const router = express.Router()
const eventsController = require('../controllers/events')
const { ensureAuth } = require('../middleware/auth')


router.get('/', ensureAuth, eventsController.getEvents)
router.get('/add', ensureAuth, eventsController.showAdd)
router.post('/createEvent', ensureAuth, eventsController.createEvent)
router.get('/:id', ensureAuth, eventsController.showSingle)
router.get('/edit/:id', ensureAuth, eventsController.showEdit)
router.put('/:id', ensureAuth, eventsController.editEvent)
router.delete('/:id', ensureAuth, eventsController.deleteEvent)


module.exports = router
