const { messengerValidator } = require('../validators');
const ApiError = require('../api-error/api-error');

// eslint-disable-next-line no-unused-vars
const validateRequest = (schema, errorCode, dataLocation) => (req, res, next) => {
    try {
        const dynamicData = req[dataLocation];
        const { value, error } = schema.validate(dynamicData);

        if (error) {
            next(new ApiError(400, errorCode, error.details[0].message));
            return;
        }

        req[dataLocation] = value;

        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    // validateUser: (validateRequest(messengerValidator.userIdSchema), 'params', 4001),
    // validateMessage: (validateRequest(messengerValidator.messageSchema), 'body', 4002),
    // validatePagination: (validateRequest(messengerValidator.paginationSchema), 'query', 4003),

    validateUser: (req, res, next) => {
        try {
            const { value, error } = messengerValidator.userIdSchema.validate(req.params);

            if (error) {
                next(new ApiError(400, 4001, error.details[0].message));
                return;
            }

            req.body = value

            next()
        } catch (e) {
            next(e)
        }
    },

    validateMessage: (req, res, next) => {
        try {
            const { value, error } = messengerValidator.messageSchema.validate(req.body);

            if (error) {
                next(new ApiError(400, 4002, error.details[0].message));
                return;
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    validatePagination: (req, res, next) => {
        try {
            const { value, error } = messengerValidator.paginationSchema.validate(req.query);

            if (error) {
                next(new ApiError(400, 4003, error.details[0].message));
                return;
            }

            req.query = value;

            next();
        } catch (e) {
            next(e)
        }
    }
}
