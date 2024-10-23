/* eslint-disable no-undef */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
    PORT: process.env.PORT || 5000,
    FRONT_URL: process.env.FRONT_URL || `http://localhost:3000/`,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    DEFAULT_MODEL: process.env.DEFAULT_MODEL,
    MONGODB_URL: process.env.MONGODB_URL,
};
