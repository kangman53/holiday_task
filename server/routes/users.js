const express = require('express');
const router = express.Router();
const {UserController} = require('../controllers')
const {checkToken} = require('../middlewares')


router.post('/', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.use(checkToken)
router.get('/', UserController.findById)
router.patch('/', UserController.patch)
router.get('/points', UserController.getPoints)
router.post('/transactions', UserController.addTransaction)
router.get('/transactions', UserController.getTransactions)
router.get('/transactions/:id', UserController.detailTransaction)

module.exports = router;
