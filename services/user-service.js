const userModel = require('../models/user-model');

module.exports = {
    createUser: (user) => userModel.create(user),
    getUsers: () => userModel.find().lean(),
    getUser: (userData) => userModel.findOne(userData).lean(),
};
