const express = require('express')
const userController = require('../controllers/userController.js')
const router = express.Router();
const validation = require('../middleware/validation.js')


router.get('/', userController.getUsersData);
  
router.get('/:id', userController.getUserbyId);

router.post('/', validation, userController.createEmployess);
router.put('/', validation, userController.updateUsers);
router.patch('/', validation, userController.patchUser);
router.delete('/:id',userController.deleteUser);
router.post('/',userController.createUsers);

module.exports = router;