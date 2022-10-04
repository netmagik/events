const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/items')

router.post('/item/:id', itemsController.addItem)
router.delete('/item/:eventid/:itemid', itemsController.deleteItem)
router.patch('/editItem/:eventid/:itemid', itemsController.editItem)

module.exports = router;