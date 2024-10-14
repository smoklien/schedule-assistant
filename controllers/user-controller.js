const path = require('path');

const UserModel = require(path.join('..', 'database', 'user-model'));


module.exports = {
	getAllUser: async (req, res) => {
		const users = await UserModel.find()

		res.json(users);
	},

	getUserById: async (req, res) => {
		const { userId } = req.params;
		const user = await UserModel.findById(userId);

		res.json(user);
	},

	createUser: async (req, res) => {
		try {
			const newUser = await UserModel.create(req.body);

			res.status(201).json(newUser);
		} catch (e) {
			res.json(e);
		}
	}
}