const { messengerModel } = require("../models");

module.exports = {
    createDialog: ({ userId, userMessage, llmReply }) => messengerModel
        .create({ userId, userMessage, llmReply }),

    getUserDialogsWithPagination: (userId, limit, page) => {
        const skip = (page - 1) * limit;

        return messengerModel
            .find({ userId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .lean()
    },

    deleteUserDialogs: (userId) => messengerModel
        .deleteMany({ userId })
        .lean(),

    countUserDialogs: (userId) => messengerModel
        .countDocuments({ userId }),
};
