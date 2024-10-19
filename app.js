const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const apiRouter = require(path.join(__dirname, 'routes', 'api-router'));
const config = require(path.join(__dirname, 'config', 'config'));

const PORT = config.PORT;
const MONGODB_URL = config.MONGODB_URL;

const app = express();

// Middleware for JSON requests
app.use(express.json());

// Serve static files from the 'static' directory
app.use(express.static(path.join(__dirname, 'static')));

mongoose.connect(MONGODB_URL)
	.then(() => {
		console.log(`Connection to ${MONGODB_URL} is successful`);
	})
	.catch((error) => {
		console.log(error);
	});

app.use('/api', apiRouter);

app.use(_mainErrorHandler);

function _mainErrorHandler(err, req, res, next) {
    console.log(err);
	
	res.status(err.status || 500).json({
        status: err.status || 500,
        errorStatus: err.errorStatus || 0,
        message: err.message || '',
    });
}

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// TODO
// 1. More services
// 2. Extract model query logic to the external services
// 3. JOI, Bcrypt
// 4. Error Handlers
