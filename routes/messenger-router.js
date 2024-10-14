const path = require('path');
const { Router } = require('express');
const router = Router();

const messengerController = require(path.join('..', 'controllers', 'messenger-controller'));
const messengerMiddleware = require(path.join('..', 'middlewares', 'messenger-middleware'));

router.get('/', messengerController.getBackendResponse);

router.post('/', messengerController.sendMessage);

module.exports = router;