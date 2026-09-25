const express = require('express')
const userController = require('../controllers/userController.js')
const router = express.Router();
const validation = require('../middleware/validation.js')

router.post('/',userController.createUsers);
router.post('/login', userController.loginUsers);

module.exports = router;