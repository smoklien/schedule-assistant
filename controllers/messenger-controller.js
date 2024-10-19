const apiError = require('../api-error/api-error');
const { groqService, messengerService } = require('../services');

module.exports = {
  getAllDialogs: async (req, res, next) => {
    try {
      const dialogs = await messengerService.getDialogs();
      const dialogsCount = await messengerService.countDialogs();

      res.json({
        data: dialogs,
        dataCount: dialogsCount
      });

    } catch (e) {
      next(e);
    }
  },

  getUserDialogs: async (req, res) => {
    try {
      // implement pagination
      const { limit = 10, page = 1, userId } = req.query;
      const skip = (page - 1) * limit;

      const dialogs = await messengerService.getUserDialogsWithPagination(userId, limit, skip);
      const dialogsCount = await messengerService.countUserDialogs(userId);

      res.json({
        pageNumber: page,
        perPage: limit,
        data: dialogs,
        dataCount: dialogsCount,
      });
    } catch (error) {
      res
        .status(400)
        .json({
          message: error.message
        })
    }
  },

  handleUserMessageAndRespond: async (req, res, next) => {
    try {
      const { userMessage, userId } = req.body;

      const llmReply = await groqService.getGroqResponse(userMessage);
      const dialog = await messengerService.createDialog({userId, userMessage, llmReply});

      res.json(dialog.llmReply);
    } catch (e) {
       next(e);
    }
  },
}