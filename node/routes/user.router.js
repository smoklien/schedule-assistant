const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUser);

router.get('/:userIndex', userController.getUserByID);

router.post('/', userController.createUser);

module.exports = router;