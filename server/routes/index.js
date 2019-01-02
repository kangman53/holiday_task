const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontrol')
const usersRoutes = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(400).json({
    message: 'Check documentation for complete endpoint list'
  })
});

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.use('/users',usersRoutes)

router.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found'
  })
})

module.exports = router;
