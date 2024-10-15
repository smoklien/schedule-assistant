const path = require('path');

const UserModel = require(path.join('..', 'database', 'user-model'));


module.exports = {
	getAllUser: async (req, res) => {
		const users = await UserModel.find()

		res.json(users);
	},

	getUserById: async (req, res) => {
		const user = req.user;

		res.json(user);
	},

	createUser: async (req, res) => {
		try {
			const newUser = await UserModel.create(req.body);

			res.status(201).json(newUser);
		} catch (error) {
			res.json(error);
		}
	}
}