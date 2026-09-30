const express = require('express')
const userController = require('../controllers/userController.js')
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/',userController.createUsers);
router.post('/login', userController.loginUsers);
router.get('/userProfile/:id',authMiddleware, userController.getUserProfile);
router.delete('/:id',authMiddleware,roleMiddleware('admin'), userController.deleteUserData);

module.exports = router;