const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const messengerRouter = require(path.join(__dirname, 'routes', 'messenger-router'));
const userRouter = require(path.join(__dirname, 'routes', 'user-router'));
const config = require(path.join(__dirname, 'config', 'config'));

const PORT = config.PORT;
const MONGODB_URL = config.MONGODB_URL;

const app = express();

// Middleware for JSON requests
app.use(express.json());

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

// Set the routes
app.use('/api/messenger', messengerRouter);
app.use('/api/users', userRouter);

mongoose.connect(MONGODB_URL)
	.then(() => {
		console.log(`Connection to ${MONGODB_URL} is successful`);
	})
	.catch((error) => {
		console.log(error);
	});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
