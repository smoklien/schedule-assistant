const { userModel } = require("../models");

module.exports = {
    getAllUser: async (req, res, next) => {
        try {
            const users = await userModel.find()

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const user = req.user;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const newUser = await userModel.create(req.body);

            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    }
}
