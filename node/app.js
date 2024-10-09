const express = require('express');
const app = express();
const config = require('./config');
const messengerRouter = require('./routes/messenger');

const PORT = config.PORT;
const FRONT_URL = config.FRONT_URL;

// Middleware for JSON requests
app.use(express.json());

// Serve the static files from 'public' directory
app.use(express.static('public'));

// Import the messenger router
app.use('/api/messenger', messengerRouter);

// Basic GET request for checking the server's status
app.get('/', (req, res) => {
  res.send('Server is working.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is working on: ${FRONT_URL}`);
});
