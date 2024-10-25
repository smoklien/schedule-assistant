const { groqService, messengerService } = require('../services');

module.exports = {
    fetchUserDialogs: async (req, res, next) => {
        try {
            const { userId, limit, page } = req.query;

            const dialogs = await messengerService.getUserDialogsWithPagination(userId, limit, page);
            const dialogsCount = await messengerService.countUserDialogs(userId);

            res.status(200).json({
                pageNumber: page,
                perPage: limit,
                dialogs,
                dialogsCount,
            });

        } catch (e) {
            next(e);
        }
    },

    deleteUserDialogs: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const deleteInfo = await messengerService.deleteUserDialogs(userId);

            res.status(200).json(deleteInfo);
        } catch (e) {
            next(e);
        }
    },

    processUserMessage: async (req, res, next) => {
        try {
            const { userMessage, userId } = req.body;

            const llmReply = await groqService.getGroqResponse(userMessage);
            const dialog = await messengerService.createDialog({ userId, userMessage, llmReply });

            res.status(201).json(dialog);
        } catch (e) {
            next(e);
        }
    },
}
