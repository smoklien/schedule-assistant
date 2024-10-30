/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const { join } = require('path');

const apiRouter = require(join(__dirname, 'routes', 'api-router'));
const config = require(join(__dirname, 'config', 'config'));

const PORT = config.PORT;
const MONGOOSE_URL = config.MONGOOSE_URL;

const app = express();

// Middleware for JSON requests
app.use(express.json());

// Serve static files from the 'views' directory
app.use(express.static(join(__dirname, 'views')));

mongoose.connect(MONGOOSE_URL)
    .then(() => {
        console.log(`Connection to database is successful`);
    })
    .catch((error) => {
        console.log(MONGOOSE_URL);
        console.log(error);
    });

app.use('/api', apiRouter);

app.use(_mainErrorHandler);

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, _req, res, _next) {
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
