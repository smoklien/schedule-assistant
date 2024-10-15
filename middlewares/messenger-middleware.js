const path = require('path');

const MessengerModel = require(path.join('..', 'database', 'messenger-model'));
const UserModel = require(path.join('..', 'database', 'user-model'));

const isValidObjectId = (userId) => {
    const regex = /^[0-9a-fA-F]{24}$/;
    return regex.test(userId);
}

const checkIsMessageLarge = async (req, res, next) => {
    try {
        const { userMessage: userMessage } = req.body;

        // For now uses magic number 5000
        if (userMessage.length > 5000) {
            return res.status(400).json({ error: 'Message is too long. Limit is 5000 characters' });
        }

        next();
    } catch (error) {
        console.error('Error verifying promt length:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const checkIsMessageEmpty = async (req, res, next) => {
    try {
        const { userMessage: userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: 'Message is empty' });
        }

        next();
    } catch (error) {
        console.error('Error verifying promt emptiness:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const verifyUserExistence = async (req, res, next) => {
    try {
        const userId = req.body.userId || req.query.userId;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({
                error: 'Invalid ObjectId',
                message: 'The provided ObjectId is not valid. It must be a 24-character hex string'
            });
        }

        const user = await UserModel.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ error: `User '${userId}' not found` });
        }

        next();
    } catch (error) {
        console.error('Error verifying user existence:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    verifyUserExistence,
    checkIsMessageEmpty,
    checkIsMessageLarge
}