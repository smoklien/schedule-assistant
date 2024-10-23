const { messengerModel } = require("../models");

module.exports = {
    createDialog: ({ userId, userMessage, llmReply }) => messengerModel
        .create({ userId, userMessage, llmReply }),

    getDialogs: () => messengerModel
        .find()
        .lean(),

    getUserDialogsWithPagination: (userId, limit, skip) => messengerModel
        .find({ userId })
        .sort({ createdAt: 1 })
        .limit(limit)
        .skip(skip)
        .lean(),

    countUserDialogs: (userId) => messengerModel
        .countDocuments({ userId }),

    countDialogs: () => messengerModel
        .countDocuments(),
};
