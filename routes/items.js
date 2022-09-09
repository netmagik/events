const express = require('express')
const router = express.Router()
const itemsController = require('../controllers/items')

router.get(':id', itemsController.getItems)
router.post('/item/:id', itemsController.addItem)

module.exports = router;