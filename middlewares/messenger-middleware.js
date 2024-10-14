const path = require('path');

const MessengerModel = require(path.join('..', 'database', 'messenger-model'));
const UserModel = require(path.join('..', 'database', 'user-model'));

const verifyUserExistence = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const isUserPresent = await UserModel.findOne({ _id: userId });

        if (isUserPresent) {
            res.status(409).json()
        }
    } catch (e) {
        res.json(e);
    }
}

module.exports = {
    verifyUserExistence
}