const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontrol')
const checkToken = require('../middlewares/checkToken')

router.use(checkToken)

router.get('/', UserController.findById)
router.patch('/', UserController.patch)

module.exports = router;
