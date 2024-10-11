const express = require('express');
const messengerRouter = require('./routes/messenger.router');
const userRouter = require('./routes/user.router');
const config = require('./config');
const PORT = config.PORT;
const FRONT_URL = config.FRONT_URL;

const app = express();

// Middleware for JSON requests
app.use(express.json());

// Service the 'static' directory
app.use(express.static('static'));

// Set the routes
app.use('/api/messenger', messengerRouter);
app.use('/api/users', userRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is working on: ${FRONT_URL}`);
});
