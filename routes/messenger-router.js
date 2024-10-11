const { Router } = require('express');
const router = Router();
const messengerController = require('../controllers/messenger-controller');

router.get('/', messengerController.getBackendResponse);

router.post('/', messengerController.sendMessage);

module.exports = router;