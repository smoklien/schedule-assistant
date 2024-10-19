const { Router } = require('express');
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const router = Router();

router.get(
    '/',
    userController.getAllUser
);

router.get(
    '/:userId', 
    userMiddleware.verifyUserExistence, 
    userController.getUserById
);

router.post(
    '/', 
    userMiddleware.checkIsEmailDuplicate,
    userController.createUser
);

module.exports = router;