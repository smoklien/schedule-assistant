const Joi = require('joi');
const { CHARACTER_LIMIT } = require('../constants/constants-enum');

const isValidObjectId = (userId) => {
  const regex = /^[0-9a-fA-F]{24}$/;
  return regex.test(userId);
}

const MessengerSchema = Joi.object({
  userMessage: Joi
    .string()
    .trim()
    .min(3)
    .max(CHARACTER_LIMIT)
    .required(),
  userId: Joi
    .string()
    .trim()
    .required()
});

module.exports = MessengerSchema;