const Joi = require('joi');
const { messengerLimit, CHARACTER_LIMIT } = require('../constants/constants-enum');

const MessengerSchema = Joi.object({
  userMessage: Joi
    .string()
    .trim()
    .min(3)
    .max(CHARACTER_LIMIT)
    .required()
});

module.exports = MessengerSchema;