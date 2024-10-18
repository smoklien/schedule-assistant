const { Router } = require('express');
const { messengerMiddleware } = require('../middlewares');
const { messengerController } = require('../controllers');
const router = Router();

router.get(
    '/history',
    messengerMiddleware.verifyUserExistence,
    messengerController.getMessengerDataForUser
);

router.get(
    '/',
    messengerController.getAllMessengerData
);

router.post(
    '/',
    messengerMiddleware.isValidMessage,
    messengerController.sendMessage
);

module.exports = router;