const path = require('path');

const MessengerModel = require(path.join('..', 'database', 'messenger-model'));
const { getGroqResponse } = require(path.join('..', 'services', 'groqService'));

module.exports = {
	getAllMessages: async (req, res) => {
		const messages = await MessengerModel.find()

		res.json(messages);
	},

	getAllUserMessages: async (req, res) => {
		const { userId } = req.query

		try {
			const messages = await MessengerModel.find({ userId }).sort({ createdAt: 1});
			res.json(messages);
		} catch (error) {
			console.error("Error fetching messages:", error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	sendMessage: async (req, res) => {
		try {
			const { userMessage, userId } = req.body;
			const llmReply = await getGroqResponse(userMessage);
			const newMessageBlock = await MessengerModel.create({ userId: userId, userMessage: userMessage, llmReply: llmReply });

			res.json(llmReply);
		} catch (error) {
			console.error("Error in /api/messenger route:", error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},
}