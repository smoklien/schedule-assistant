/* eslint-disable no-undef */
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

module.exports = {
    PORT: process.env.PORT || 3000,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    DEFAULT_MODEL: process.env.DEFAULT_MODEL,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
};
