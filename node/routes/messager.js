const express = require('express');
const router = express.Router();

// Static message as response
router.get('/', (req, res) => {
  res.json({ message: 'Back-end response.' });
});

// Adding messages (POST-request)
router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Please fill out this field' });
    }
    res.json({ message: `User message: ${text}`, reply: 'LLM response' });
});

module.exports = router;