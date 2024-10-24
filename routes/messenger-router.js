const { Router } = require('express');
const { messengerMiddleware } = require('../middlewares');
const { messengerController } = require('../controllers');
const router = Router();

router.get(
    '/',
    messengerMiddleware.validatePagination,
    messengerController.fetchUserDialogs,
);

router.post(
    '/',
    messengerMiddleware.validateMessage,
    messengerController.processUserMessage,
);

router.post(
    '/delete/:userId',
    messengerMiddleware.validateUser,
    messengerController.deleteUserMessages,
);

module.exports = router;
