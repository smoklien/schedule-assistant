const path = require('path');

const UserModel = require(path.join('..', 'database', 'user-model'));

const isValidObjectId = (userId) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(userId);
}

const checkIsEmailDuplicate = async (req, res, next) => {
    try {
        const { email = '' } = req.body;
        const user = await UserModel.findOne({ email: email.toLowerCase().trim() });

        if (user) {
            return res.status(409).json({ error: `User with '${email}' email already exists.` });
        }

        next();
    } catch (error) {
        console.error('Error checking email duplication:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const verifyUserExistence = async (req, res, next) => {
    try {
        const { userId: userId } = req.params;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                error: 'Invalid ObjectId',
                message: 'The provided ObjectId is not valid. It must be a 24-character hex string.'
            });
        }

        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: `User '${userId}' not found` });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Error verifying user existence:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    checkIsEmailDuplicate,
    verifyUserExistence
}