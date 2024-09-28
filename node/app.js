const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для обробки JSON-запитів
app.use(express.json());

// Обслуговування статичних файлів з папки 'public'
app.use(express.static('public'));

// Імпорт роутера для повідомлень
const messagerRouter = require('./routes/messager');
app.use('/api/messager', messagerRouter);

// Базовий роут для перевірки роботи сервера
app.get('/', (req, res) => {
  res.send('Сервер працює!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
