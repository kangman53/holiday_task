const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers')
const {checkToken} = require('../middlewares')


router.post('/', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.use(checkToken)
router.get('/', UserController.findById)
router.patch('/', UserController.patch)
router.patch('/addcart', UserController.addToCart)
router.get('/points', UserController.getPoints)

module.exports = router;
