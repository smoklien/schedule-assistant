const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обробки JSON-запитів
app.use(express.json());

// Обслуговування статичних файлів з папки 'public'
app.use(express.static('public'));

// Імпорт роутера для повідомлень
const messengerRouter = require('./routes/messenger');
app.use('/api/messenger', messengerRouter);

// Базовий роут для перевірки роботи сервера
app.get('/', (req, res) => {
  res.send('Server is working.');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is working on: http://localhost:${PORT}`);
});
