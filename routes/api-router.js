const router = require('express').Router();

const messengerRouter = require('./messenger-router');
const userRouter  = require('./user-router');


router.use('/messenger', messengerRouter);
router.use('/users', userRouter);

module.exports = router;
