const { Router } = require('express');
const router = Router();
const messengerController = require('../controllers/messenger.controller');

router.get('/', messengerController.getBackendResponse);

router.post('/', messengerController.fetchLLMResponse);

module.exports = router;