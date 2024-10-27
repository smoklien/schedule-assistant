const router = require('express').Router();

const { messengerRouter } = require('./');

router.use('/messenger', messengerRouter);

module.exports = router;
