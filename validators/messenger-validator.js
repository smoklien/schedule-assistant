const Joi = require('joi');
const { constantsEnum } = require('../constants');

const userIdSubSchema = Joi.string()
    .trim()
    .required()
    .pattern(new RegExp(constantsEnum.OBJECT_ID_PATTERN));

module.exports = {
    userIdSchema: Joi.object({
        userId: userIdSubSchema
    }),

    messageSchema: Joi.object({
        userMessage: Joi.string()
            .trim()
            .min(3)
            .max(constantsEnum.CHARACTER_LIMIT)
            .required(),

        userId: userIdSubSchema
    }),

    paginationSchema: Joi.object({
        limit: Joi.number()
            .integer()
            .positive()
            .min(1)
            .max(constantsEnum.MESSAGES_PER_PAGE)
            .default(10)
            .required(),

        page: Joi.number()
            .integer()
            .positive()
            .min(1)
            .default(1)
            .required(),

        userId: userIdSubSchema
    })
}
