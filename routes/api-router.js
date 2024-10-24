const router = require('express').Router();

const { messengerRouter, userRouter } = require('./');

router.use('/messenger', messengerRouter);
router.use('/users', userRouter);

module.exports = router;
