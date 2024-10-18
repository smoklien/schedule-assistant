const messengerModel = require("../models/messenger-model");

module.exports = {
    createDialog: (dialogData) => messengerModel.create(dialogData),
    geDialogs: () => messengerModel.find().lean(),
    getUserDialogs: (userData) => messengerModel.findOne(userData).lean(),
};
