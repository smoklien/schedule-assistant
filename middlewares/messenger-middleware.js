const { messengerValidator } = require('../validators');
const ApiError = require('../api-error/api-error');
const { userModel } = require('../models');

const isValidObjectId = (userId) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(userId);
}

module.exports = {
    isValidMessage: (req, res, next) => {
        try {
            const { value, error } = messengerValidator.validate(req.body);

            if (error) {
                next(new ApiError(404, 4041, error.details[0].message));
                return;
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    verifyUserExistence: async (req, res, next) => {
        try {
            // smell
            const userId = req.body.userId || req.query.userId;

            if (!isValidObjectId(userId)) {
                next(new ApiError(400, 4001, 'The provided ObjectId is not valid. It must be a 24-character hex string'));
            }

            // move to services
            const user = await userModel.findOne({ _id: userId });

            if (!user && user?._id) {
                next(new ApiError(404, 4042, `User '${userId}' not found`));
            }

            next();
        } catch (e) {
            next(e)
        }
    }
}
