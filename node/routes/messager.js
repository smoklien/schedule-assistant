const express = require('express');
const router = express.Router();

// Статичне повідомлення як відповідь
router.get('/', (req, res) => {
  res.json({ message: 'Відповідь бек' });
});

// Додавання повідомлення (приклад POST-запиту)
router.post('/', (req, res) => {
  const { text } = req.body;
  res.json({ message: `Ви надіслали: ${text}`, reply: 'Відповідь бек' });
});

module.exports = router;
