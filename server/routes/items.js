const express = require('express');
const router = express.Router();
const {ItemController} = require('../controllers')
const {checkToken, checkAdmin} = require('../middlewares')

router.get('/', ItemController.getItems)
router.post('/', ItemController.addItem)
router.patch('/:id', ItemController.updateItem)
router.delete('/:id', ItemController.deleteItem)
module.exports = router;
