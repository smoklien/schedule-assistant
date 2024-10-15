const path = require('path');
const { Router } = require('express');
const router = Router();

const messengerController = require(path.join('..', 'controllers', 'messenger-controller'));
const messengerMiddleware = require(path.join('..', 'middlewares', 'messenger-middleware'));

router.get('/', messengerController.getAllMessages);

router.post('/', messengerMiddleware.verifyUserExistence, messengerMiddleware.checkIsMessageEmpty, messengerMiddleware.checkIsMessageLarge, messengerController.sendMessage);

module.exports = router;