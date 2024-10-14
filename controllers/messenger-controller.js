const Groq = require("groq-sdk");
const path = require('path');

const config = require(path.join('..', 'config', 'config'));

const GROQ_API_KEY = config.GROQ_API_KEY;
const DEFAULT_MODEL = config.DEFAULT_MODEL;

const groq = new Groq({ apiKey: GROQ_API_KEY });

const MessengerModel = require(path.join('..', 'database', 'messenger-model'));
const UserModel = require(path.join('..', 'database', 'user-model'));

async function verifyUserExistence(userId) {
	const user = await UserModel.findOne({ _id: userId });
	console.log(user);

	return !!user;
}

async function getGroqResponse(promt, model = DEFAULT_MODEL) {
	try {
		const completion = await groq.chat.completions.create({
			messages: [
				{
					role: "user",
					content: promt,
				},
			],
			model: model,
		});

		// console.log(completion);

		return completion.choices[0]?.message?.content || "No response from Groq";
	} catch (error) {
		console.error("Error with Groq API:", error);
		throw error;
	}
}

module.exports = {
	getBackendResponse: (req, res) => {
		res.json({ message: 'Back-end response.' });
	},

	sendMessage: async (req, res) => {
		const { promt, userId } = req.body;

		if (!promt) {
			return res.status(400).json({ error: 'Prompt is empty.' });
		}

		if (promt.length > 5000) {
			return res.status(400).json({ error: 'Prompt is too long. Limit is 5000 characters' });
		}

		if (!userId || !(await verifyUserExistence(userId))) {
			return res.status(401).json({ error: 'Invalid userId.' });
		}

		try {
			const groqReply = await getGroqResponse(promt);
			res.json({ message: `User message: ${promt}`, reply: groqReply });
		} catch (error) {
			console.error("Error in /api/messenger route:", error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},
}