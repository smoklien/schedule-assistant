const { Router } = require('express');
const { messengerMiddleware } = require('../middlewares');
const { messengerController } = require('../controllers');
const router = Router();

router.get(
    '/history',
    messengerMiddleware.verifyUserExistence,
    messengerController.getUserDialogs,
);

router.get(
    '/',
    messengerController.getAllDialogs,
);

router.post(
    '/',
    messengerMiddleware.isValidMessage,
    messengerController.handleUserMessageAndRespond,
);

module.exports = router;