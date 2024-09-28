const express = require('express');
const router = express.Router();

// Статичне повідомлення як відповідь
router.get('/', (req, res) => {
  res.json({ message: 'Відповідь бек' });
});

// Додавання повідомлення (POST-запит)
router.post('/', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Поле text є обов\'язковим.' });
    }
    res.json({ message: `Ви надіслали: ${text}`, reply: 'Відповідь бек' });
});

module.exports = router;
