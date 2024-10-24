const { groqService, messengerService } = require('../services');

module.exports = {
    fetchUserDialogs: async (req, res, next) => {
        try {
            const { userId, limit, page } = req.query;

            const dialogs = await messengerService.getUserDialogsWithPagination(userId, limit, page);
            const dialogsCount = await messengerService.countUserDialogs(userId);

            res.json({
                pageNumber: page,
                perPage: limit,
                dialogs,
                dialogsCount,
            });

        } catch (e) {
            next(e);
        }
    },

    deleteUserMessages: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const messagesDeleted = await messengerService.deleteUserDialogs(userId);

            res.json({ messagesDeleted });
        } catch (e) {
            next(e);
        }
    },

    processUserMessage: async (req, res, next) => {
        try {
            const { userMessage, userId } = req.body;

            const llmReply = await groqService.getGroqResponse(userMessage);
            const dialog = await messengerService.createDialog({ userId, userMessage, llmReply });

            res.json(dialog.llmReply);
        } catch (e) {
            next(e);
        }
    },
}
