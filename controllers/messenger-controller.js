const path = require('path');
const apiError = require('../api-error/api-error');

const MessengerModel = require(path.join('..', 'database', 'messenger-model'));

const { getGroqResponse } = require(path.join('..', 'services', 'groq-service'));

module.exports = {
  getAllMessengerData: async (req, res, next) => {
    try {
      // throw new apiError(403, 1, "test error");

      // move models to the service
      const messages = await MessengerModel.find()
      const messagesCount = await MessengerModel.countDocuments({});

      res.json({
        data: messages,
        dataCount: messagesCount
      });

    } catch (e) {
      next(e);
    }
  },

  getMessengerDataForUser: async (req, res) => {
    try {
      // implement pagination
      const { limit = 10, page = 1, userId } = req.query;
      const skip = (page - 1) * limit;

      const messages = await MessengerModel
        .find({ userId })
        .sort({ createdAt: 1 })
        .limit(limit)
        .skip(skip);

      const messagesCount = await MessengerModel.countDocuments({ userId });

      res.json({
        pageNumber: page,
        perPage: limit,
        data: messages,
        dataCount: messagesCount
      });
    } catch (error) {
      res
        .status(400)
        .json({
          message: error.message
        })
    }
  },

  sendMessage: async (req, res) => {
    try {
      const { userMessage, userId } = req.body;
      const llmReply = await getGroqResponse(userMessage);

      const dialog = await MessengerModel
        .create({
          userId,
          userMessage,
          llmReply
        });

      res.json(dialog.llmReply);
    } catch (error) {
      res
        .status(400)
        .json({
          message: error.message
        })
    }
  },
}