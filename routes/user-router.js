const path = require('path');
const { Router } = require('express');
const router = Router();

const userController = require(path.join('..', 'controllers', 'user-controller'));
const userMiddleware = require(path.join('..', 'middlewares', 'user-middleware'));

router.get('/', userController.getAllUser);

router.get('/:userId', userMiddleware.verifyUserExistence, userController.getUserById);

router.post('/', userMiddleware.checkIsEmailDuplicate, userController.createUser);

module.exports = router;