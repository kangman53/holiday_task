const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usercontrol')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.get('/dashboard', UserController.dashboard)

module.exports = router;
