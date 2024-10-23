const ApiError = require("../api-error/api-error");
const { userModel } = require("../models");

const isValidObjectId = (userId) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(userId);
}

module.exports = {
    checkIsEmailDuplicate: async (req, res, next) => {
        try {
            const { email = '' } = req.body;
            const user = await userModel.findOne({ email: email.toLowerCase().trim() });

            if (user && user?._id) {
                next(new ApiError(409, 4091, `User with '${email}' email already exists.`));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    verifyUserExistence: async (req, res, next) => {
        try {
            const { userId } = req.params;

            if (!isValidObjectId(userId)) {
                next(new ApiError(400, 4002, 'The provided ObjectId is not valid. It must be a 24-character hex string.'));
            }

            const user = await userModel.findOne({ _id: userId });

            if (!user && user?._id) {
                next(new ApiError(404, 4042, `User '${userId}' not found`));
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
}
